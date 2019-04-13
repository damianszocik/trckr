import React from 'react';
import { Statistic, Icon } from 'antd';

export default class Trend extends React.Component {
 render() {
  const sortedEntries = Object.keys(this.props.tracker.data).map(entry => {
   return this.props.tracker.data[entry];
  });
  sortedEntries.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const lastTrend = sortedEntries[sortedEntries.length - 1].value - sortedEntries[sortedEntries.length - 2].value;
  const overallTrend = sortedEntries[sortedEntries.length - 1].value - sortedEntries[0].value;
  const selectedTrend = this.props.type == 'last' ? lastTrend : overallTrend;
  return (
   <Statistic
    title={this.props.type == 'last' ? 'Last measure' : 'Overall'}
    value={selectedTrend}
    precision={2}
    valueStyle={selectedTrend > 0 ? { color: '#3f8600' } : { color: '#cf1322' }}
    prefix={selectedTrend > 0 ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
    suffix={this.props.tracker.options.unit}
   />
  );
 }
}
