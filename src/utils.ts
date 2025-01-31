import {
  axisLeft,
  axisTop,
  axisBottom,
  axisLabelOffset,
  axisLabelRotate,
} from '@d3fc/d3fc-axis';
import {
  easeLinear,
  hsl,
  interpolateSpectral,
  scaleBand,
  scaleLinear,
  scaleSequential,
  select,
  selectAll,
} from 'd3';
import type { D3FCAxis } from '@d3fc/d3fc-axis';
import type { ScaleBand, ScaleLinear, ScaleSequential, AxisDomain } from 'd3';
import type { HTMLProps } from 'react';

export interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface CalendarHeatmapDetail {
  date: string;
  value: number;
}

export interface CalendarHeatmapDatum {
  date: string;
  total: number;
  details?: CalendarHeatmapDetail[];
}

export type Response = 'rotate' | 'offset' | 'hide';

export interface BaseOverviewHeatmapProps<T>
  extends Omit<HTMLProps<HTMLDivElement>, 'data'> {
  color?: string;
  fade?: boolean;
  response?: Response;
  onCellClick?: (d: T) => void;
  onTooltip?: (datum: { value: unknown }) => void;
  onHideTooltip?: () => void;
  onFadeComplete?: () => void;
}

interface ScaleAndAxisProps {
  labels: string[];
  element: HTMLDivElement;
  margin: Margin;
  paddingInner: number;
  response?: Response;
  align?: 'top' | 'bottom' | 'left' | 'right';
}

function axisLabelHide<Domain extends AxisDomain>(
  axis: D3FCAxis<Domain>
): D3FCAxis<Domain> {
  /**
   * Offsets axis labels when they overlap with each other.
   */
  const xAxisWithOffset = axisLabelOffset(axis);
  /**
   * Since in every scenario of offsetting of labels, first label from origin always remain in its positioned.
   * We are hiding those labels which have offseted from its position by comparing their 'transform' property to that of first label.
   */
  return xAxisWithOffset.decorate((container) => {
    const firstNodeTransformValue = container
      .select<SVGTextElement>('text')
      .attr('transform');
    container.selectAll<SVGTextElement, string>('text').each(function hide() {
      if (select(this).attr('transform') !== firstNodeTransformValue) {
        select(this).attr('visibility', 'hidden');
      }
    });
    return container;
  });
}

export function addAxisLabelResponsivness<Domain extends AxisDomain>(
  axis: D3FCAxis<Domain>,
  response?: Response
): D3FCAxis<Domain> {
  let output = axis;
  switch (response) {
    case 'offset':
      output = axisLabelOffset(axis);
      break;
    case 'rotate':
      output = axisLabelRotate(axis);
      break;
    case 'hide':
    default:
      output = axisLabelHide(axis);
      break;
  }
  return output;
}

export function getXScaleAndAxis({
  labels,
  element,
  margin,
  paddingInner,
  response,
  align,
}: ScaleAndAxisProps): [ScaleBand<string>, D3FCAxis<string>] {
  let range = element.clientWidth - margin.left - margin.right;
  range = range > 0 ? range : 0;
  const xScale = scaleBand()
    .domain(labels)
    .range([0, range])
    .paddingInner(paddingInner);

  const axisFunction = align === 'bottom' ? axisBottom : axisTop;
  let xAxis = axisFunction(xScale).tickValues(labels).tickSize(0);
  xAxis = addAxisLabelResponsivness(xAxis, response);
  return [xScale, xAxis];
}

export function getYScaleAndAxis({
  labels,
  element,
  margin,
  paddingInner,
  response,
}: ScaleAndAxisProps): [ScaleBand<string>, D3FCAxis<string>] {
  let range = element.clientHeight - margin.top - margin.bottom;
  range = range > 0 ? range : 0;
  const yScale = scaleBand()
    .domain(labels)
    .range([0, range])
    .paddingInner(paddingInner);
  let yAxis = axisLeft(yScale).tickValues(labels).tickSize(0);
  yAxis = addAxisLabelResponsivness(yAxis, response);
  return [yScale, yAxis];
}

function getHSL(val: number): string {
  return hsl(360 * val, 0.85, 0.7).formatHsl();
}

function getDrilldownBackgroundColor(): string {
  const container = document.querySelectorAll('.dark, .light'); // Choose container with either of the 'class'
  let initialColor = '#ffffff';
  if (container.length > 0) {
    /**
     * 'getPropertyValue' returns a string containing the value of a specified CSS property.
     * Ref: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue
     */
    const backgroundColor = getComputedStyle(container[0]).getPropertyValue(
      '--background_color'
    );
    initialColor = backgroundColor === '' ? initialColor : backgroundColor;
  }
  return initialColor;
}

export function createColorGenerator(
  minValue: number,
  maxValue: number,
  color?: string | undefined | null
): ScaleSequential<string> | ScaleLinear<string, string> {
  let colorGenerator: ScaleSequential<string> | ScaleLinear<string, string>;
  const initialColor = getDrilldownBackgroundColor();
  switch (color) {
    case 'spectral':
      colorGenerator = scaleSequential()
        .domain([maxValue, minValue])
        .interpolator(interpolateSpectral);
      break;
    case 'hsl':
      colorGenerator = scaleSequential()
        .domain([minValue, maxValue])
        .interpolator(getHSL);
      break;
    case 'hslModified':
      colorGenerator = scaleLinear<string>()
        .domain([minValue, (minValue + maxValue) / 2, maxValue])
        .range([
          hsl(180, 0.85, 0.6).formatHsl(),
          'white',
          hsl(0, 0.85, 0.6).formatHsl(),
        ]);
      break;
    case null:
    case undefined:
      colorGenerator = scaleLinear<string>()
        .range([initialColor, '#ff4500'])
        .domain([minValue, maxValue]);
      break;
    default:
      colorGenerator = scaleLinear<string>()
        .range([initialColor, color])
        .domain([minValue, maxValue]);
  }
  return colorGenerator;
}

/**
 * ISO counts a week as the first week of the year only when that week has >=4 days in that year. Ref: https://en.wikipedia.org/wiki/ISO_week_date
 * Checking and discarding data that are part of the last week of the previous year.
 * @param dataArray
 * @returns
 */
export function removeLastYearWeekData<T extends { day: number }>(
  dataArray: T[]
): T[] {
  let updatedDataArray: T[] = [];
  if (dataArray.length > 0) {
    const firstDayOfYear = dataArray[0].day;
    updatedDataArray = dataArray;
    if (firstDayOfYear >= 5) {
      const numberOfDaysToCompleteLastYearWeek = 8 - firstDayOfYear; // Get the total number of days that are part of the last week of the last year
      /**
       * Slicing the whole 'dataArray' from the first day of first week i.e. from 'numberOfDaysToCompleteLastYearWeek' + 1 till
       * the last element of 'dataArray' since 'numberOfDaysToCompleteLastYearWeek' is the last day of the last week of the last year.
       * Array is a 0 based index data structre so 'numberOfDaysToCompleteLastYearWeek' is the first day of first week in the 'dataArray'.
       */
      updatedDataArray = dataArray.slice(numberOfDaysToCompleteLastYearWeek);
    }
  }
  return updatedDataArray;
}

/**
 * Fade away elements passed
 * @param selectorsList
 * @returns
 */
export async function fadeAwayElements(selectorsList: string[]): Promise<void> {
  const selectors = selectorsList.join(',');
  return selectAll(selectors) // Comma separated selectors are used to select union of elements of that selector. Ref: https://drafts.csswg.org/selectors-4/#grouping
    .transition()
    .duration(500)
    .ease(easeLinear)
    .style('opacity', 0)
    .end(); // Returns a promise when when every selected element finishes transitioning. Ref: https://github.com/d3/d3-transition#transition_end
}

export function getColor(
  colorGenerator: ScaleSequential<string> | ScaleLinear<string, string>,
  value: number
): string {
  const color = Number.isFinite(value)
    ? colorGenerator(value)
    : 'var(--background_color)';
  return color;
}
