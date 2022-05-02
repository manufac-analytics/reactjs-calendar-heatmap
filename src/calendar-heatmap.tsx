import { Component, createRef } from 'react';
import moment from 'moment';
import {
  extent,
  select,
  timeYears,
  timeMonths,
  timeDays,
  timeHours,
  timeSecond,
  scaleLinear,
  easeLinear,
  scaleBand,
  scaleTime,
} from 'd3';
import {
  createColorGenerator,
  getYearSummary,
  calculateSummary,
} from './utils';
import type {
  CalendarHeatmapProps,
  CalendarHeatmapState,
  CalendarHeatmapSummary,
  CalendarHeatmapDatum,
  CalendarHeatmapDetail,
} from './interfaces';
import type { RefObject } from 'react';
import type { Selection } from 'd3';
import './calendar-heatmap.css';

export class CalendarHeatmap extends Component<
  CalendarHeatmapProps,
  CalendarHeatmapState
> {
  ref: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  svg!: Selection<SVGSVGElement, unknown, null, undefined>;
  items!: Selection<SVGGElement, unknown, null, undefined>;
  labels!: Selection<SVGGElement, unknown, null, undefined>;
  buttons!: Selection<SVGGElement, unknown, null, undefined>;

  createElements() {
    if (this.ref.current !== null) {
      // Create SVG container element
      this.svg = select(this.ref.current).append('svg').attr('class', 'svg');

      // Create children group elements
      this.items = this.svg.append('g');
      this.labels = this.svg.append('g');
      this.buttons = this.svg.append('g');
    }
  }

  // Calculate dimensions based on available width
  calcDimensions() {
    let dayIndex = Math.round(
      (moment().valueOf() -
        moment().subtract(1, 'year').startOf('week').valueOf()) /
        86400000
    );
    let colIndex = Math.trunc(dayIndex / 7);
    let numWeeks = colIndex + 1;

    this.setState((prevState) => {
      const offsetWidth = this.ref.current?.offsetWidth ?? NaN;
      const newWidth = offsetWidth < 1000 ? 1000 : offsetWidth;
      const newItemSize =
        (this.state.settings.width - this.state.settings.label_padding) /
          numWeeks -
        this.state.settings.gutter;
      const newHeight =
        this.state.settings.label_padding +
        7 * (this.state.settings.item_size + this.state.settings.gutter);
      return {
        ...prevState,
        settings: {
          ...prevState.settings,
          width: newWidth,
          item_size: newItemSize,
          height: newHeight,
        },
      };
    });
  }

  drawChart() {
    switch (this.state.history.at(-1)) {
      case 'global':
        this.drawGlobalOverview();
        break;
      case 'year':
        this.drawYearOverview();
        break;
      case 'month':
        this.drawMonthOverview();
        break;
      case 'week':
        this.drawWeekOverview();
        break;
      case 'day':
        this.drawDayOverview();
        break;
      default:
        break;
    }
  }

  /**
   * Draw global overview (multiple years)
   */
  drawGlobalOverview() {
    // Define start and end of the dataset | Assumption: this.state.data is in chronological order
    let start = moment(this.state.data[0].date).startOf('year');
    let end = moment(this.state.data[this.state.data.length - 1].date).endOf(
      'year'
    );

    // Define array of years and total values
    let year_data = timeYears(start.toDate(), end.toDate()).map((d) => {
      let date = moment(d);
      return {
        date,
        total: this.state.data.reduce((prev, current) => {
          if (moment(current.date).year() === date.year()) {
            prev += current.total;
          }
          return prev;
        }, 0),
        summary: getYearSummary(this.state.data, d),
      };
    });

    // Calculate min and max value of all the years in the dataset
    let [min_value, max_value] = extent(year_data, (d) => {
      return d.total;
    });

    // Generates color generator function
    const colorGenerator = createColorGenerator(
      min_value ?? NaN,
      max_value ?? NaN,
      this.props.color
    );

    // Define year labels and axis
    let year_labels = timeYears(start.toDate(), end.toDate()).map((d) => {
      return d.getFullYear().toString();
    });
    let yearScale = scaleBand()
      .rangeRound([0, this.state.settings.width])
      .padding(0.05)
      .domain(year_labels);

    // Add global data items to the overview
    const yearBlocks = this.items.selectAll('.item-block-year').data(year_data);
    yearBlocks.exit().remove();
    yearBlocks
      .enter()
      .append('rect')
      .attr('class', 'item item-block-year')
      .style('cursor', 'pointer')
      .attr('width', () => {
        return (
          (this.state.settings.width - this.state.settings.label_padding) /
            year_labels.length -
          this.state.settings.gutter * 5
        );
      })
      .attr('height', () => {
        return this.state.settings.height - this.state.settings.label_padding;
      })
      .attr('transform', (d) => {
        return `translate(${yearScale(d.date.year().toString())}, ${
          this.state.settings.tooltip_padding * 2
        })`;
      })
      .attr('fill', (d) => colorGenerator(d.total))
      .on('click', (_event, datum) => {
        if (this.state.in_transition) {
          return;
        }

        // Set in_transition flag
        // Set selected date to the one clicked on
        this.setState((prev): CalendarHeatmapState => {
          return {
            ...prev,
            in_transition: true,
            selected: { ...datum, date: datum.date.toString() },
            history: [...this.state.history, 'year'],
          };
        });

        // Hide tooltip
        this.props.onHideTooltip?.();

        // Remove all global overview related items and labels
        this.removeGlobalOverview();
      })
      .style('opacity', 0)
      .on('mouseover', (_event, d) => {
        if (this.state.in_transition) {
          return;
        }
        this.props.onTooltip?.({ value: d });
      })
      .on('mouseout', () => {
        if (this.state.in_transition) {
          return;
        }
        this.props.onHideTooltip?.();
      })
      .transition()
      .delay((_d, i) => {
        return (this.state.settings.transition_duration * (i + 1)) / 10;
      })
      .duration(() => {
        return this.state.settings.transition_duration;
      })
      .ease(easeLinear)
      .style('opacity', 1)
      .call(
        (transition, callback) => {
          if (transition.empty()) {
            callback();
          }
          let n = 0;
          transition
            .each(() => {
              ++n;
            })
            .on('end', function () {
              if (!--n) {
                callback.apply(this, arguments);
              }
            });
        },
        () => {
          this.setState((prev): CalendarHeatmapState => {
            return { ...prev, in_transition: false };
          });
        }
      );

    // Add year labels
    const yearLabels = this.items.selectAll('.label-year').data(year_labels);
    yearLabels.exit().remove();
    yearLabels
      .enter()
      .append('text')
      .attr('class', 'label label-year')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      // Passes what text would be shown in the element
      .text((d) => d)
      .attr('x', (d) => {
        return yearScale(d) ?? NaN;
      })
      .attr('y', this.state.settings.label_padding / 2)
      .on('mouseenter', (_event, year_label) => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll<
              SVGRectElement,
              {
                date: moment.Moment;
                total: number;
                summary: CalendarHeatmapSummary[];
              }
            >('.item-block-year')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return d.date.year().toString() === year_label ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-block-year')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      })
      .on('click', (_event, d) => {
        if (this.state.in_transition === false) {
          this.setState((prev): CalendarHeatmapState => {
            return {
              ...prev,
              in_transition: true,
              selected: { date: d },
              history: [...this.state.history, 'year'],
            };
          });

          // Hide tooltip
          this.props.onHideTooltip?.();

          // Remove all global overview related items and labels
          this.removeGlobalOverview();
        }
      });
  }

  /**
   * Draw year overview
   */
  drawYearOverview() {
    // Define start and end date of the selected year
    let start_of_year = moment(this.state.selected.date).startOf('year');
    let end_of_year = moment(this.state.selected.date).endOf('year');

    // Filter data down to the selected year
    let year_data = this.state.data.filter((d) => {
      return start_of_year <= moment(d.date) && moment(d.date) < end_of_year;
    });

    // Calculate min and max value of the year data
    let [min_value, max_value] = extent(year_data, (d) => d.total);

    // Generates color generator function
    const colorGenerator = createColorGenerator(
      min_value ?? NaN,
      max_value ?? NaN,
      this.props.color
    );

    let calcItemX = (d: CalendarHeatmapDatum) => {
      let date = moment(d.date);
      let dayIndex = Math.round(
        (date.valueOf() - moment(start_of_year).startOf('week').valueOf()) /
          86400000
      );
      let colIndex = Math.trunc(dayIndex / 7);
      return (
        colIndex *
          (this.state.settings.item_size + this.state.settings.gutter) +
        this.state.settings.label_padding
      );
    };

    let calcItemY = (d: CalendarHeatmapDatum) => {
      return (
        this.state.settings.label_padding +
        moment(d.date).weekday() *
          (this.state.settings.item_size + this.state.settings.gutter)
      );
    };

    let calcItemSize = (d: CalendarHeatmapDatum) => {
      let output = this.state.settings.item_size;
      if ((max_value ?? NaN) > 0) {
        output =
          this.state.settings.item_size * 0.75 +
          ((this.state.settings.item_size * d.total) / (max_value ?? NaN)) *
            0.25;
      }
      return output;
    };

    const itemCircles = this.items.selectAll('.item-circle').data(year_data);
    itemCircles.exit().remove();
    itemCircles
      .enter()
      .append('rect')
      .attr('class', 'item item-circle')
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .attr('x', (d) => {
        return (
          calcItemX(d) + (this.state.settings.item_size - calcItemSize(d)) / 2
        );
      })
      .attr('y', (d) => {
        return (
          calcItemY(d) + (this.state.settings.item_size - calcItemSize(d)) / 2
        );
      })
      .attr('rx', (d) => {
        return calcItemSize(d);
      })
      .attr('ry', (d) => {
        return calcItemSize(d);
      })
      .attr('width', (d) => {
        return calcItemSize(d);
      })
      .attr('height', (d) => {
        return calcItemSize(d);
      })
      .attr('fill', (d) => {
        const finalColor = colorGenerator(d.total);
        return d.total > 0 ? finalColor : 'transparent';
      })
      .on('click', (_event, d) => {
        if (this.state.in_transition === false && d.total !== 0) {
          this.setState((prev): CalendarHeatmapState => {
            return {
              ...prev,
              in_transition: true,
              selected: d,
              history: [...this.state.history, 'day'],
            };
          });

          // Hide tooltip
          this.props.onHideTooltip?.();

          // Remove all year overview related items and labels
          this.removeYearOverview();
        }
      })
      .on('mouseover', (event, d) => {
        if (this.state.in_transition === false) {
          // Pulsating animation
          let circle = select<SVGRectElement, CalendarHeatmapDatum>(
            event.currentTarget
          );
          let repeat = () => {
            circle
              .transition()
              .duration(this.state.settings.transition_duration)
              .ease(easeLinear)
              .attr('x', (d) => {
                return (
                  calcItemX(d) -
                  (this.state.settings.item_size * 1.1 -
                    this.state.settings.item_size) /
                    2
                );
              })
              .attr('y', (d) => {
                return (
                  calcItemY(d) -
                  (this.state.settings.item_size * 1.1 -
                    this.state.settings.item_size) /
                    2
                );
              })
              .attr('width', this.state.settings.item_size * 1.1)
              .attr('height', this.state.settings.item_size * 1.1)
              .transition()
              .duration(this.state.settings.transition_duration)
              .ease(easeLinear)
              .attr('x', (d) => {
                return (
                  calcItemX(d) +
                  (this.state.settings.item_size - calcItemSize(d)) / 2
                );
              })
              .attr('y', (d) => {
                return (
                  calcItemY(d) +
                  (this.state.settings.item_size - calcItemSize(d)) / 2
                );
              })
              .attr('width', (d) => {
                return calcItemSize(d);
              })
              .attr('height', (d) => {
                return calcItemSize(d);
              })
              .on('end', repeat);
          };
          repeat();

          this.props.onTooltip?.({ value: d });
        }
      })
      .on('mouseout', (event, _d) => {
        if (this.state.in_transition === false) {
          // Set circle radius back to what its supposed to be
          select<SVGRectElement, CalendarHeatmapDatum>(event.currentTarget)
            .transition()
            .duration(this.state.settings.transition_duration / 2)
            .ease(easeLinear)
            .attr('x', (d) => {
              return (
                calcItemX(d) +
                (this.state.settings.item_size - calcItemSize(d)) / 2
              );
            })
            .attr('y', (d) => {
              return (
                calcItemY(d) +
                (this.state.settings.item_size - calcItemSize(d)) / 2
              );
            })
            .attr('width', (d) => {
              return calcItemSize(d);
            })
            .attr('height', (d) => {
              return calcItemSize(d);
            });

          // Hide tooltip
          this.props.onHideTooltip?.();
        }
      })
      .transition()
      .delay(() => {
        return (
          (Math.cos(Math.PI * Math.random()) + 1) *
          this.state.settings.transition_duration
        );
      })
      .duration(() => {
        return this.state.settings.transition_duration;
      })
      .ease(easeLinear)
      .style('opacity', 1)
      .call(
        (transition, callback) => {
          if (transition.empty()) {
            callback();
          }
          let n = 0;
          transition
            .each(() => ++n)
            .on('end', function () {
              if (!--n) {
                callback.apply(this, arguments);
              }
            });
        },
        () => {
          this.setState((prev): CalendarHeatmapState => {
            return { ...prev, in_transition: false };
          });
        }
      );

    // Add month labels
    let month_labels = timeMonths(start_of_year.toDate(), end_of_year.toDate());
    let monthScale = scaleLinear()
      .range([0, this.state.settings.width])
      .domain([0, month_labels.length]);
    const monthLabels = this.labels
      .selectAll('.label-month')
      .data(month_labels);
    monthLabels.exit().remove();
    monthLabels
      .enter()
      .append('text')
      .attr('class', 'label label-month')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => {
        return d.toLocaleDateString('en-us', { month: 'short' });
      })
      .attr('x', (_d, i) => {
        return monthScale(i) + (monthScale(i) - monthScale(i - 1)) / 2;
      })
      .attr('y', this.state.settings.label_padding / 2)
      .on('mouseenter', (_event, d) => {
        if (this.state.in_transition === false) {
          let selected_month = d;
          this.items
            .selectAll<SVGRectElement, CalendarHeatmapDatum>('.item-circle')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return new Date(d.date).getMonth() === selected_month.getMonth()
                ? 1
                : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-circle')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      })
      .on('click', (_event, d) => {
        if (this.state.in_transition === false) {
          // Check month data
          let month_data = this.state.data.filter((e) => {
            return (
              moment(d).startOf('month') <= moment(e.date) &&
              moment(e.date) < moment(d).endOf('month')
            );
          });
          if (month_data.length > 0) {
            this.setState((prev): CalendarHeatmapState => {
              return {
                ...prev,
                in_transition: true,
                selected: { date: d.toISOString() },
                history: [...this.state.history, 'month'],
              };
            });

            // Hide tooltip
            this.props.onHideTooltip?.();

            // Remove all year overview related items and labels
            this.removeYearOverview();
          }
        }
      });

    // Add day labels
    let day_labels = timeDays(
      moment().startOf('week').toDate(),
      moment().endOf('week').toDate()
    );
    let dayScale = scaleBand()
      .rangeRound([
        this.state.settings.label_padding,
        this.state.settings.height,
      ])
      .domain(
        day_labels.map((d) => {
          return d.getDay().toString();
        })
      );
    this.labels.selectAll('.label-day').remove();
    this.labels
      .selectAll('.label-day')
      .data(day_labels)
      .enter()
      .append('text')
      .attr('class', 'label label-day')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('x', this.state.settings.label_padding / 3)
      .attr('y', (_d, i) => {
        return dayScale(i.toString()) ?? NaN + dayScale.bandwidth() / 1.75;
      })
      .style('text-anchor', 'left')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => {
        return moment(d).format('dddd')[0];
      })
      .on('mouseenter', (_event, d) => {
        if (this.state.in_transition === false) {
          let selected_day = d;
          console.log(d.getDate());
          this.items
            .selectAll<SVGRectElement, CalendarHeatmapDatum>('.item-circle')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return new Date(d.date).getDay() === selected_day.getDay()
                ? 1
                : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-circle')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      });

    // Add button to switch back to previous overview
    this.drawButton();
  }

  /**
   * Draw month overview
   */
  drawMonthOverview() {
    // Define beginning and end of the month
    let start_of_month = moment(this.state.selected.date).startOf('month');
    let end_of_month = moment(this.state.selected.date).endOf('month');

    // Filter data down to the selected month
    let month_data = this.state.data.filter((d) => {
      return start_of_month <= moment(d.date) && moment(d.date) < end_of_month;
    });
    const monthSummaries = month_data.flatMap((e) => e.summary);

    // Calculate min and max value of month in the dataset
    const [min_value, max_value] = extent(monthSummaries, (d) => d?.value);

    // Generates color generator function
    const colorGenerator = createColorGenerator(
      min_value ?? NaN,
      max_value ?? NaN,
      this.props.color
    );

    // Define day labels and axis
    let day_labels = timeDays(
      moment().startOf('week').toDate(),
      moment().endOf('week').toDate()
    );
    let dayScale = scaleBand()
      .rangeRound([
        this.state.settings.label_padding,
        this.state.settings.height,
      ])
      .domain(
        day_labels.map((d) => {
          return moment(d).weekday().toString();
        })
      );

    // Define week labels and axis
    let week_labels = [start_of_month.clone()];
    while (start_of_month.week() !== end_of_month.week()) {
      week_labels.push(start_of_month.add(1, 'week').clone());
    }
    let weekScale = scaleBand()
      .rangeRound([
        this.state.settings.label_padding,
        this.state.settings.width,
      ])
      .padding(0.05)
      .domain(
        week_labels.map((weekday) => {
          return weekday.week().toString();
        })
      );

    // Add month data items to the overview
    let item_block = this.items.selectAll('.item-block-month').data(month_data);
    item_block.exit().remove();
    item_block
      .enter()
      .append('g')
      .attr('class', 'item item-block-month')
      .style('cursor', 'pointer')
      .attr('width', () => {
        return (
          (this.state.settings.width - this.state.settings.label_padding) /
            week_labels.length -
          this.state.settings.gutter * 5
        );
      })
      .attr('height', () => {
        return Math.min(
          dayScale.bandwidth(),
          this.state.settings.max_block_height
        );
      })
      .attr('transform', (d) => {
        return `translate(${weekScale(moment(d.date).week().toString())}, ${
          (dayScale(moment(d.date).weekday().toString()) ?? NaN) +
          dayScale.bandwidth() / 1.75 -
          15
        })`;
      })
      .attr('total', (d) => {
        return d.total;
      })
      .attr('date', (d) => {
        return d.date;
      })
      .attr('offset', 0)
      .on('click', (_event, d) => {
        if (this.state.in_transition === false && d.total !== 0) {
          this.setState((prev): CalendarHeatmapState => {
            return {
              ...prev,
              in_transition: true,
              selected: d,
              history: [...this.state.history, 'day'],
            };
          });
          // Hide tooltip
          this.props.onHideTooltip?.();

          // Remove all month overview related items and labels
          this.removeMonthOverview();
        }
      });

    let item_width =
      (this.state.settings.width - this.state.settings.label_padding) /
        week_labels.length -
      this.state.settings.gutter * 5;
    let itemScale = scaleLinear().rangeRound([0, item_width]);

    let item_gutter = this.state.settings.item_gutter;

    item_block.each((datum, idx, arr) => {
      select(arr[idx])
        .selectAll('.item-block-rect')
        .data(datum.summary ?? [])
        .enter()
        .append('rect')
        .attr('class', 'item item-block-rect')
        .style('cursor', 'pointer')
        .attr('x', (d) => {
          let total = parseInt(select(arr[idx]).attr('total'));
          let offset = parseInt(select(arr[idx]).attr('offset'));
          itemScale.domain([0, total]);
          select(arr[idx]).attr('offset', offset + itemScale(d.value));
          return offset;
        })
        .attr('width', function (d) {
          let total = parseInt(select(arr[idx]).attr('total'));
          itemScale.domain([0, total]);
          return Math.max(itemScale(d.value) - item_gutter, 1);
        })
        .attr('height', () => {
          return Math.min(
            dayScale.bandwidth(),
            this.state.settings.max_block_height
          );
        })
        .attr('fill', (d) => colorGenerator(d.value))
        .style('opacity', 0)
        .on('mouseover', (_event, d) => {
          if (this.state.in_transition === false) {
            this.props.onTooltip?.({ value: d });
          }
        })
        .on('mouseout', () => {
          if (this.state.in_transition === false) {
            this.props.onHideTooltip?.();
          }
        })
        .transition()
        .delay(() => {
          return (
            (Math.cos(Math.PI * Math.random()) + 1) *
            this.state.settings.transition_duration
          );
        })
        .duration(() => {
          return this.state.settings.transition_duration;
        })
        .ease(easeLinear)
        .style('opacity', 1)
        .call(
          (transition, callback) => {
            if (transition.empty()) {
              callback();
            }
            let n = 0;
            transition
              .each(() => ++n)
              .on('end', function () {
                if (!--n) {
                  callback.apply(this, arguments);
                }
              });
          },
          () => {
            this.setState((prev): CalendarHeatmapState => {
              return { ...prev, in_transition: false };
            });
          }
        );
    });

    // Add week labels
    const weekLabels = this.labels.selectAll('.label-week').data(week_labels);
    weekLabels.exit().remove();
    weekLabels
      .enter()
      .append('text')
      .attr('class', 'label label-week')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('font-size', () => {
        return Math.floor(this.state.settings.label_padding / 3) + 'px';
      })
      .text((d) => {
        return `Week ${d.week()}`;
      })
      .attr('x', (d) => {
        return weekScale(d.week().toString()) ?? NaN;
      })
      .attr('y', this.state.settings.label_padding / 2)
      .on('mouseenter', (_event, weekday) => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll<SVGGElement, CalendarHeatmapDatum>('.item-block-month')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return moment(d.date).week() === weekday.week() ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll<SVGGElement, CalendarHeatmapDatum>('.item-block-month')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      })
      .on('click', (_event, d) => {
        if (this.state.in_transition === false) {
          // Check week data
          let week_data = this.state.data.filter((e) => {
            return (
              d.startOf('week') <= moment(e.date) &&
              moment(e.date) < d.endOf('week')
            );
          });
          if (week_data.length > 0) {
            this.setState((prev): CalendarHeatmapState => {
              return {
                ...prev,
                in_transition: true,
                selected: { date: d.toISOString() },
                history: [...this.state.history, 'week'],
              };
            });
            // Hide tooltip
            this.props.onHideTooltip?.();
            // Remove all year overview related items and labels
            this.removeMonthOverview();
          }
        }
      });

    // Add day labels
    const dayLabels = this.labels.selectAll('.label-day').data(day_labels);
    dayLabels.exit().remove();
    dayLabels
      .enter()
      .append('text')
      .attr('class', 'label label-day')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('x', this.state.settings.label_padding / 3)
      .attr('y', (_d, i) => {
        return dayScale(i.toString()) ?? NaN + dayScale.bandwidth() / 1.75;
      })
      .style('text-anchor', 'left')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => {
        return moment(d).format('dddd')[0];
      })
      .on('mouseenter', (_event, d) => {
        if (this.state.in_transition === false) {
          let selected_day = moment(d);
          this.items
            .selectAll<SVGGElement, CalendarHeatmapDatum>('.item-block-month')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return moment(d.date).day() === selected_day.day() ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-block-month')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      });

    // Add button to switch back to previous overview
    this.drawButton();
  }

  /**
   * Draw week overview
   */
  drawWeekOverview() {
    // Define beginning and end of the week
    let start_of_week = moment(this.state.selected.date).startOf('week');
    let end_of_week = moment(this.state.selected.date).endOf('week');

    // Filter data down to the selected week
    let week_data = this.state.data.filter((d) => {
      return start_of_week <= moment(d.date) && moment(d.date) < end_of_week;
    });
    const weekSummaries = week_data.flatMap((e) => e.summary);

    // Calculate min and max value of week in the dataset
    const [min_value, max_value] = extent(weekSummaries, (d) => d?.value);

    // Generates color generator function
    const colorGenerator = createColorGenerator(
      min_value ?? NaN,
      max_value ?? NaN,
      this.props.color
    );

    // Define day labels and axis
    let day_labels = timeDays(
      moment().startOf('week').toDate(),
      moment().endOf('week').toDate()
    );
    let dayScale = scaleBand()
      .rangeRound([
        this.state.settings.label_padding,
        this.state.settings.height,
      ])
      .domain(
        day_labels.map((d) => {
          return moment(d).weekday().toString();
        })
      );

    // Define week labels and axis
    let week_labels = [start_of_week];
    let weekScale = scaleBand()
      .rangeRound([
        this.state.settings.label_padding,
        this.state.settings.width,
      ])
      .padding(0.01)
      .domain(
        week_labels.map((weekday) => {
          return weekday.week().toString();
        })
      );

    // Add week data items to the overview
    this.items.selectAll('.item-block-week').remove();
    let item_block = this.items
      .selectAll('.item-block-week')
      .data(week_data)
      .enter()
      .append('g')
      .attr('class', 'item item-block-week')
      .style('cursor', 'pointer')
      .attr('width', () => {
        return (
          (this.state.settings.width - this.state.settings.label_padding) /
            week_labels.length -
          this.state.settings.gutter * 5
        );
      })
      .attr('height', () => {
        return Math.min(
          dayScale.bandwidth(),
          this.state.settings.max_block_height
        );
      })
      .attr('transform', (d) => {
        return `translate(${weekScale(moment(d.date).week().toString())}, 
          ${
            dayScale(moment(d.date).weekday().toString()) ??
            NaN + dayScale.bandwidth() / 1.75 - 15
          })`;
      })
      .attr('total', (d) => {
        return d.total;
      })
      .attr('date', (d) => {
        return d.date;
      })
      .attr('offset', 0)
      .on('click', (_event, d) => {
        if (this.state.in_transition === false && d.total !== 0) {
          this.setState((prev): CalendarHeatmapState => {
            return {
              ...prev,
              in_transition: true,
              selected: d,
              history: [...this.state.history, 'day'],
            };
          });
          // Hide tooltip
          this.props.onHideTooltip?.();

          // Remove all week overview related items and labels
          this.removeWeekOverview();
        }
      });

    let item_width =
      (this.state.settings.width - this.state.settings.label_padding) /
        week_labels.length -
      this.state.settings.gutter * 5;
    let itemScale = scaleLinear().rangeRound([0, item_width]);

    let item_gutter = this.state.settings.item_gutter;

    item_block.each((datum, idx, arr) => {
      select(arr[idx])
        .selectAll('.item-block-rect')
        .data(datum.summary ?? [])
        .enter()
        .append('rect')
        .attr('class', 'item item-block-rect')
        .style('cursor', 'pointer')
        .attr('x', function (d) {
          let total = parseInt(select(arr[idx]).attr('total'));
          let offset = parseInt(select(arr[idx]).attr('offset'));
          itemScale.domain([0, total]);
          select(arr[idx]).attr('offset', offset + itemScale(d.value));
          return offset;
        })
        .attr('width', function (d) {
          let total = parseInt(select(arr[idx]).attr('total'));
          itemScale.domain([0, total]);
          return Math.max(itemScale(d.value) - item_gutter, 1);
        })
        .attr('height', () => {
          return Math.min(
            dayScale.bandwidth(),
            this.state.settings.max_block_height
          );
        })
        .attr('fill', (d) => colorGenerator(d.value))
        .style('opacity', 0)
        .on('mouseover', (_event, d) => {
          if (this.state.in_transition === false) {
            this.props.onTooltip?.({ value: d });
          }
        })
        .on('mouseout', () => {
          if (this.state.in_transition === false) {
            this.props.onHideTooltip?.();
          }
        })
        .transition()
        .delay(() => {
          return (
            (Math.cos(Math.PI * Math.random()) + 1) *
            this.state.settings.transition_duration
          );
        })
        .duration(() => {
          return this.state.settings.transition_duration;
        })
        .ease(easeLinear)
        .style('opacity', 1)
        .call(
          (transition, callback) => {
            if (transition.empty()) {
              callback();
            }
            let n = 0;
            transition
              .each(() => ++n)
              .on('end', function () {
                if (!--n) {
                  callback.apply(this, arguments);
                }
              });
          },
          () => {
            this.setState((prev): CalendarHeatmapState => {
              return { ...prev, in_transition: false };
            });
          }
        );
    });

    // Add week labels
    const weekLabels = this.labels.selectAll('.label-week').data(week_labels);
    weekLabels.exit().remove();
    weekLabels
      .enter()
      .append('text')
      .attr('class', 'label label-week')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => {
        return `Week ${d.week()}`;
      })
      .attr('x', (d) => {
        return weekScale(d.week().toString()) ?? NaN;
      })
      .attr('y', this.state.settings.label_padding / 2)
      .on('mouseenter', (_event, weekday) => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll<SVGGElement, CalendarHeatmapDatum>('.item-block-week')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return moment(d.date).week() === weekday.week() ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-block-week')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      });

    // Add day labels
    const dayLabels = this.labels.selectAll('.label-day').data(day_labels);
    dayLabels.exit().remove();
    dayLabels
      .enter()
      .append('text')
      .attr('class', 'label label-day')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('x', this.state.settings.label_padding / 3)
      .attr('y', (_d, i) => {
        return dayScale(i.toString()) ?? NaN + dayScale.bandwidth() / 1.75;
      })
      .style('text-anchor', 'left')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => {
        return moment(d).format('dddd')[0];
      })
      .on('mouseenter', (_event, d) => {
        if (this.state.in_transition === false) {
          let selected_day = moment(d);
          this.items
            .selectAll<SVGGElement, CalendarHeatmapDatum>('.item-block-week')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return moment(d.date).day() === selected_day.day() ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-block-week')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
        }
      });

    // Add button to switch back to previous overview
    this.drawButton();
  }

  /**
   * Draw day overview
   */
  drawDayOverview() {
    let project_labels =
      this.state.selected?.summary?.map((project) => {
        return project.name;
      }) ?? [];
    let projectScale = scaleBand()
      .rangeRound([
        this.state.settings.label_padding,
        this.state.settings.height,
      ])
      .domain(project_labels);

    // Define beginning and end of the day
    let start_of_day = moment(this.state.selected.date).startOf('day');
    let end_of_day = moment(this.state.selected.date).endOf('day');

    // Filter data down to the selected week
    let day_data = this.state.data.filter((d) => {
      return start_of_day <= moment(d.date) && moment(d.date) < end_of_day;
    });
    const daySummaries = day_data.flatMap((e) => e.summary);

    // Calculate min and max value of day in the dataset
    const [min_value, max_value] = extent(daySummaries, (d) => d?.value);

    // Generates color generator function
    const colorGenerator = createColorGenerator(
      min_value ?? NaN,
      max_value ?? NaN,
      this.props.color
    );

    let itemScale = scaleTime()
      .range([this.state.settings.label_padding * 2, this.state.settings.width])
      .domain([
        moment(this.state.selected.date).startOf('day'),
        moment(this.state.selected.date).endOf('day'),
      ]);

    const itemBlocks = this.items
      .selectAll('.item-block')
      .data(this.state.selected?.details ?? []);
    itemBlocks.exit().remove();
    itemBlocks
      .enter()
      .append('rect')
      .attr('class', 'item item-block')
      .style('cursor', 'pointer')
      .attr('x', (d) => {
        return itemScale(moment(d.date));
      })
      .attr('y', (d) => {
        return projectScale(d.name) ?? NaN + projectScale.bandwidth() / 2 - 15;
      })
      .attr('width', (d) => {
        let end = itemScale(
          timeSecond.offset(moment(d.date).toDate(), d.value)
        );
        return Math.max(end - itemScale(moment(d.date)), 1);
      })
      .attr('height', () => {
        return Math.min(
          projectScale.bandwidth(),
          this.state.settings.max_block_height
        );
      })
      .attr('fill', (d) => colorGenerator(d.value))
      .style('opacity', 0)
      .on('mouseover', (_event, d) => {
        if (this.state.in_transition === false) {
          this.props.onTooltip?.({ value: d });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.props.onHideTooltip?.();
        }
      })
      .on('click', (_event, d) => {
        if (typeof this.props.handler == 'function') {
          this.props.handler(d);
        }
      })
      .transition()
      .delay(() => {
        return (
          (Math.cos(Math.PI * Math.random()) + 1) *
          this.state.settings.transition_duration
        );
      })
      .duration(() => {
        return this.state.settings.transition_duration;
      })
      .ease(easeLinear)
      .style('opacity', 0.5)
      .call(
        (transition, callback) => {
          if (transition.empty()) {
            callback();
          }
          let n = 0;
          transition
            .each(() => ++n)
            .on('end', function () {
              if (!--n) {
                callback.apply(this, arguments);
              }
            });
        },
        () => {
          this.setState((prev): CalendarHeatmapState => {
            return { ...prev, in_transition: false };
          });
        }
      );

    // Add time labels
    let timeLabels = timeHours(
      moment(this.state.selected.date).startOf('day').toDate(),
      moment(this.state.selected.date).endOf('day').toDate()
    );
    let timeScale = scaleTime()
      .range([this.state.settings.label_padding * 2, this.state.settings.width])
      .domain([0, timeLabels.length]);

    const timeLabelContainers = this.labels
      .selectAll('.label-time')
      .data(timeLabels);
    timeLabelContainers.exit().remove();
    timeLabelContainers
      .enter()
      .append('text')
      .attr('class', 'label label-time')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => {
        return moment(d).format('HH:mm');
      })
      .attr('x', (_d, i) => {
        return timeScale(i);
      })
      .attr('y', this.state.settings.label_padding / 2)
      .on('mouseenter', (_event, datum) => {
        if (this.state.in_transition === false) {
          let selected = itemScale(moment(datum));
          this.items
            .selectAll<SVGRectElement, CalendarHeatmapDetail>('.item-block')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              let start = itemScale(moment(d.date));
              let end = itemScale(moment(d.date).add(d.value, 'seconds'));
              return selected >= start && selected <= end ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-block')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0.5);
        }
      });

    // Add project labels
    let label_padding = this.state.settings.label_padding;

    const projectLabels = this.labels
      .selectAll('.label-project')
      .data(project_labels);
    projectLabels.exit().remove();
    projectLabels
      .enter()
      .append('text')
      .attr('class', 'label label-project')
      .style('cursor', 'pointer')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('x', this.state.settings.gutter)
      .attr('y', (d) => {
        return projectScale(d) ?? NaN + projectScale.bandwidth() / 2;
      })
      .attr('min-height', () => {
        return projectScale.bandwidth();
      })
      .style('text-anchor', 'left')
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .text((d) => d)
      .each((_d, idx, arr) => {
        let obj = select(arr[idx]);
        let text_length = obj?.node()?.getComputedTextLength() ?? NaN;
        let text = obj.text();
        while (text_length > label_padding * 1.5 && text.length > 0) {
          text = text.slice(0, -1);
          obj.text(`${text}...`);
          text_length = obj?.node()?.getComputedTextLength() ?? NaN;
        }
      })
      .on('mouseenter', (_event, project) => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll<SVGRectElement, CalendarHeatmapDetail>('.item-block')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', (d) => {
              return d.name === project ? 1 : 0.1;
            });
        }
      })
      .on('mouseout', () => {
        if (this.state.in_transition === false) {
          this.items
            .selectAll('.item-block')
            .transition()
            .duration(this.state.settings.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0.5);
        }
      });

    // Add button to switch back to previous overview
    this.drawButton();
  }

  /**
   * Draw the button for navigation purposes
   */
  drawButton() {
    this.buttons.selectAll('.button').remove();
    let button = this.buttons
      .append('g')
      .attr('class', 'button button-back')
      .style('cursor', 'pointer')
      .attr('fill', 'transparent')
      .style('opacity', 0)
      .style('stroke-width', 2)
      .style('stroke', 'rgb(170, 170, 170)')
      .on('click', () => {
        if (this.state.in_transition === false) {
          // Clean the canvas from whichever overview type was on
          switch (this.state.history.at(-1)) {
            case 'year':
              this.removeYearOverview();
              break;
            case 'month':
              this.removeMonthOverview();
              break;
            case 'week':
              this.removeWeekOverview();
              break;
            case 'day':
              this.removeDayOverview();
              break;
            default:
              break;
          }
          this.setState((prev): CalendarHeatmapState => {
            return {
              ...prev,
              in_transition: true,
              history: [...prev.history.slice(0, -1)],
            };
          });
        }
      });
    button
      .append('circle')
      .attr('cx', this.state.settings.label_padding / 2.25)
      .attr('cy', this.state.settings.label_padding / 2.5)
      .attr('r', this.state.settings.item_size / 2);
    button
      .append('text')
      .style('stroke-width', 1)
      .style('text-anchor', 'middle')
      .style('fill', 'rgb(170, 170, 170)')
      .attr('x', this.state.settings.label_padding / 2.25)
      .attr('y', this.state.settings.label_padding / 2.5)
      .attr('dy', () => {
        return Math.floor(this.state.settings.width / 100) / 3;
      })
      .attr('font-size', () => {
        return `${Math.floor(this.state.settings.label_padding / 3)}px`;
      })
      .html('&#x2190');
    button
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 1);
  }

  /**
   * Transition and remove items and labels related to global overview
   */
  removeGlobalOverview() {
    this.items
      .selectAll('.item-block-year')
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 0)
      .remove();
    this.labels.selectAll('.label-year').remove();
  }

  /**
   * Transition and remove items and labels related to year overview
   */
  removeYearOverview() {
    this.items
      .selectAll('.item-circle')
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 0)
      .remove();
    this.labels.selectAll('.label-day').remove();
    this.labels.selectAll('.label-month').remove();
    this.hideBackButton();
  }

  /**
   * Transition and remove items and labels related to month overview
   */
  removeMonthOverview() {
    this.items
      .selectAll('.item-block-month')
      .selectAll('.item-block-rect')
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 0)
      .attr('x', (_d, i) => {
        return i % 2 === 0
          ? -this.state.settings.width / 3
          : this.state.settings.width / 3;
      })
      .remove();
    this.labels.selectAll('.label-day').remove();
    this.labels.selectAll('.label-week').remove();
    this.hideBackButton();
  }

  /**
   * Transition and remove items and labels related to week overview
   */
  removeWeekOverview() {
    this.items
      .selectAll('.item-block-week')
      .selectAll('.item-block-rect')
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 0)
      .attr('x', (_d, i) => {
        return i % 2 === 0
          ? -this.state.settings.width / 3
          : this.state.settings.width / 3;
      })
      .remove();
    this.labels.selectAll('.label-day').remove();
    this.labels.selectAll('.label-week').remove();
    this.hideBackButton();
  }

  /**
   * Transition and remove items and labels related to daily overview
   */
  removeDayOverview() {
    this.items
      .selectAll('.item-block')
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 0)
      .attr('x', (_d, i) => {
        return i % 2 === 0
          ? -this.state.settings.width / 3
          : this.state.settings.width / 3;
      })
      .remove();
    this.labels.selectAll('.label-time').remove();
    this.labels.selectAll('.label-project').remove();
    this.hideBackButton();
  }

  /**
   * Helper function to hide the back button
   */
  hideBackButton() {
    this.buttons
      .selectAll('.button')
      .transition()
      .duration(this.state.settings.transition_duration)
      .ease(easeLinear)
      .style('opacity', 0)
      .remove();
  }

  constructor(props: CalendarHeatmapProps) {
    super(props);

    this.state = {
      settings: {
        gutter: 5,
        item_gutter: 1,
        width: 1000,
        height: 200,
        item_size: 10,
        label_padding: 40,
        max_block_height: 20,
        transition_duration: 500,
        tooltip_width: 250,
        tooltip_padding: 15,
      },
      in_transition: false,
      // First entry for history should be 'global', so that even if the user enters the chart first time he will be able to go back till global overview
      history:
        props.overview === 'global'
          ? [props.overview]
          : ['global', props.overview ?? 'year'],
      selected: props.data.at(-1) ?? {},
      data: calculateSummary(props.data),
    };

    this.calcDimensions = this.calcDimensions.bind(this);
  }

  componentDidMount() {
    this.createElements();
    this.calcDimensions();
    window.addEventListener('resize', this.calcDimensions);
  }

  componentDidUpdate(
    prevProps: CalendarHeatmapProps,
    prevState: CalendarHeatmapState
  ) {
    if (
      this.state.settings.width !== prevState.settings.width ||
      this.state.settings.height !== prevState.settings.height
    ) {
      this.svg
        .attr('width', this.state.settings.width)
        .attr('height', this.state.settings.height);
      this.drawChart();
    }
    if (this.state.history.at(-1) !== prevState.history.at(-1)) {
      this.drawChart();
    }
    if (prevProps.data !== this.props.data) {
      this.setState((prev) => {
        return { ...prev, data: calculateSummary(this.props.data) };
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcDimensions);
  }

  render() {
    return <div className="calendarHeatmap" ref={this.ref} />;
  }
}
