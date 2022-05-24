import { startOfMonth, endOfMonth } from 'date-fns';
import { generateStorySampleDataForHeatmap } from '../dev-utils';
import { MonthOverviewHeatMap } from '.';
import type { CalendarHeatmapDatum } from '../utils';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import './index.css';

// Funtion to create filtered data of a month, to simulate parent component filtered data.
function filterMonthData(data: CalendarHeatmapDatum[]): CalendarHeatmapDatum[] {
  const selectedDate = new Date(data[0].date);
  const minDate = startOfMonth(selectedDate);
  const maxDate = endOfMonth(selectedDate);
  // Filter data down to the selected month
  const monthData = data.filter((d) => {
    return minDate <= new Date(d.date) && new Date(d.date) < maxDate;
  });
  return monthData;
}

const Meta: ComponentMeta<typeof MonthOverviewHeatMap> = {
  title: 'MonthOverviewHeatMap',
  component: MonthOverviewHeatMap,
  args: {
    data: filterMonthData(generateStorySampleDataForHeatmap(1, 1)),
    onTooltip: (d: { value: unknown }) => {
      console.log(d);
    },
    color: 'spectral',
  },
};
export default Meta;

const Template: ComponentStory<typeof MonthOverviewHeatMap> = (args) => (
  <MonthOverviewHeatMap
    {...args}
    style={{ height: '90vh', width: '100%', border: '1px solid black' }}
  />
);

export const Light = Template.bind({});
Light.args = { className: 'light' };

export const Dark = Template.bind({});
Dark.args = { className: 'dark' };

export const HSL = Template.bind({});
HSL.args = { color: 'hsl' };

export const Default = Template.bind({});
Default.args = { color: undefined };
