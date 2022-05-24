# Drilldown Calendar Heatmap | ReactJS | D3

[![](https://data.jsdelivr.com/v1/package/npm/@manufac/reactjs-calendar-heatmap/badge)](https://www.jsdelivr.com/package/npm/@manufac/reactjs-calendar-heatmap)

This [d3.js](https://d3js.org/) heatmap representing time series data is used to visualize tracked time over the past year, showing details for each of the days on demand.

Includes a global overview of multiple years and visualizations of year, month, week and day overview with zoom for details-on-demand.

Inspired by 
- [Calendar]https://observablehq.com/@d3/calendar) by [Mike Bostock](https://github.com/mbostock)
- [ReactJS Calendar Heatmap](https://github.com/g1eb/reactjs-calendar-heatmap) by [Gleb](https://github.com/g1eb)

### Demo

[Live Link](https://manufac-analytics.github.io/reactjs-calendar-heatmap/)

### Global overview

[![calendar heatmap - global overview](https://github.com/manufac-analytics/reactjs-calendar-heatmap/blob/main/images/global.png)](https://rawgit.com/g1eb/reactjs-calendar-heatmap/master/)

### Year overview

[![calendar heatmap - year overview](https://github.com/manufac-analytics/reactjs-calendar-heatmap/blob/main/images/year.png)](https://rawgit.com/g1eb/reactjs-calendar-heatmap/master/)

### Month overview

[![calendar heatmap - month overview](https://github.com/manufac-analytics/reactjs-calendar-heatmap/blob/main/images/month.png)](https://rawgit.com/g1eb/reactjs-calendar-heatmap/master/)

### Week overview

[![calendar heatmap - week overview](https://github.com/manufac-analytics/reactjs-calendar-heatmap/blob/main/images/week.png)](https://rawgit.com/g1eb/reactjs-calendar-heatmap/master/)

### Day overview

[![calendar heatmap - day overview](https://github.com/manufac-analytics/reactjs-calendar-heatmap/blob/main/images/day.png)](https://rawgit.com/g1eb/reactjs-calendar-heatmap/master/)

## Install

1. Install `@manufac/reactjs-calendar-heatmap` with `yarn` (or `npm`):

```
yarn add @manufac/reactjs-calendar-heatmap
```

2. Import `CalendarHeatmap` in your component

```js
import { CalendarHeatmap } from '@manufac/reactjs-calendar-heatmap';
```

3. Render `CalendarHeatmap` component

```jsx
<CalendarHeatmap
  data={data}
  color={color}
  overview={overview}
  handler={print}
  onTooltip={show}
  onHideTooltip={hide}
/>
```

## CDN

Available via [JSDelivr](https://www.jsdelivr.com/package/npm/@manufac/reactjs-calendar-heatmap).

### Interfaces

```ts
export interface CalendarHeatmapDetail {
  date: string;
  name: string;
  value: number;
}
```

```ts
interface CalendarHeatmapDatum {
  date: string;
  total: number;
  details: CalendarHeatmapDetail[];
  summary?: { name: string; value: number }[];
}
```

### Properties
| Property      | Type                                                                                 | Usage                                                                | Default | Required |
|:--------------|:-------------------------------------------------------------------------------------|:---------------------------------------------------------------------|:-------:|:--------:|
| data          | `CalendarHeatmapDatum[]`                                                             | Time series data spanning over 1 year or more years                  |  none   |   yes    |
| color         | color hex code, valid css color name or color scheme names (`'spectral'` or `'hsl'`) | Theme color for the visual elements                                  | #ff4500 |    no    |
| overview      | `'global' \| 'year' \| 'month' \| 'week' \| 'day'`                                   | Initial overview for the map                                         |  year   |    no    |
| handler       | `(d: CalendarHeatmapDetail) => void;`                                                | Handler function is fired on click of a time entry in daily overview |  none   |    no    |
| onTooltip     | `(datum: { value: unknown }) => void;`                                               | onTooltip function is fired on "mouseover" over a visual element     |  none   |    no    |
| onHideTooltip | `() => void;`                                                                        | onHideTooltip function is fired on "mouseout" over a visual element  |  none   |    no    |

### Example data

Time series data where each day has a total time tracked (in seconds).  
Details, if provided, are shown in a tooltip on mouseover in different overviews.

```js
var data = [{
  "date": "2016-01-01",
  "total": 17164,
  "details": [{
    "name": "Project 1",
    "date": "2016-01-01 12:30:45",
    "value": 9192
  }, {
    "name": "Project 2",
    "date": "2016-01-01 13:37:00",
    "value": 6753
  },
  .....
  {
    "name": "Project N",
    "date": "2016-01-01 17:52:41",
    "value": 1219
  }]
}]
```

### Optimization

In some cases details array could be large and in order to fit the data into the tooltip a short summary is generated with distinct projects and their total tracked time for that date.
In terms of optimization, summary data can be computed server-side and passed in using the ``summary'' attribute.
And in addition to the data structure described above this would result in a summary dictionary with distinct project names and total values of tracked time in seconds, e.g.:

```js
var data = [{
  "date": "2016-01-01",
  "total": 17164,
  "details": [.....],
  "summary": [{
    "name": "Project 1",
    "value": 9192
  }, {
    "name": "Project 2",
    "value": 6753
  },
  .....
  {
    "name": "Project N",
    "value": 1219
  }]
}]
```
