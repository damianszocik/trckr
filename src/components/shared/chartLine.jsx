import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { isMobile } from 'react-device-detect';

export default class ChartLine extends React.Component {
 render() {
  const chartDataArray = Object.keys(this.props.chartData).map(entry => {
   return this.props.chartData[entry];
  });

  return (
   <ResponsiveContainer width="100%" aspect={this.props.mini ? 3 : isMobile ? 1.5 : 3}>
    <LineChart data={chartDataArray}>
     {!this.props.mini && (
      <XAxis
       dataKey="dateTime"
       tickFormatter={ts => {
        return new Date(ts).toLocaleDateString();
       }}
      />
     )}
     <YAxis domain={[dataMin => parseInt(dataMin * 0.98), dataMax => parseInt(dataMax * 1.02)]} hide={this.props.mini} />
     {!this.props.mini && (
      <Tooltip
       payload={chartDataArray.map(entry => {
        return {
         name: new Date(entry.dateTime).toLocaleDateString(),
         value: entry.value,
         unit: 'kg'
        };
       })}
       labelFormatter={value => `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`}
       formatter={value => `${value}${this.props.unit || ''}`}
      />
     )}

     <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={2} dot={!this.props.mini} />
    </LineChart>
   </ResponsiveContainer>
  );
 }
}
