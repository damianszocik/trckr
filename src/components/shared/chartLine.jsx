import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { isMobile } from 'react-device-detect';

export default class ChartLine extends React.Component {
 render() {
  const chartDataArray = Object.keys(this.props.chartData).map(entry => {
   return this.props.chartData[entry];
  });
  return (
   <ResponsiveContainer width="100%" aspect={this.props.mini ? 3 : isMobile ? 1.5 : 3}>
    <AreaChart data={chartDataArray}>
     {!this.props.mini && (
      <defs>
       <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1890ff" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
       </linearGradient>
      </defs>
     )}
     {!this.props.mini && <XAxis dataKey="dateTime" tickFormatter={() => ''} height={45} label="Time" axisLine={false} />}
     <YAxis domain={[dataMin => Math.trunc(dataMin * 0.99), 'auto']} tickMargin={10} axisLine={false} width={45} allowDecimals={false} hide={this.props.mini} />
     {!this.props.mini && <CartesianGrid strokeDasharray="3 3" />}
     {!this.props.mini && (
      <Tooltip
       labelFormatter={value => (
        <div>
         <div>{new Date(value).toLocaleDateString()}</div>
         <div>{new Date(value).toLocaleTimeString()}</div>
        </div>
       )}
       formatter={value => [`${value} ${this.props.unit || ''}`, null]}
      />
     )}
     <Area type="monotone" dataKey="value" stroke="#1890ff" fillOpacity={1} fill="url(#chartGradient)" />
    </AreaChart>
   </ResponsiveContainer>
  );
 }
}
