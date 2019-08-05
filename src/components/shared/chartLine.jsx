import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import { ReactComponent as TimeIcon } from 'assets/img/time.svg';
import { ReactComponent as CalendarIcon } from 'assets/img/calendar.svg';
import { ReactComponent as TagIcon } from 'assets/img/tag.svg';

const TooltipRow = styled.div`
 display: flex;
 align-items: center;
 margin: ${props => (props.lastRow ? '6px 0' : '12px 0')};
 color: #000 !important;
 opacity: ${props => (props.lastRow ? '1' : '0.45')};
 font-size: 1em;
 svg {
  height: 1.5em;
  margin-right: 1em;
 }
`;

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
         <TooltipRow>
          <TimeIcon />
          {new Date(value).toLocaleDateString()}
         </TooltipRow>
         <TooltipRow>
          <CalendarIcon />
          {new Date(value).toLocaleTimeString()}
         </TooltipRow>
        </div>
       )}
       formatter={value => [
        <TooltipRow lastRow>
         <TagIcon />
         {value} {this.props.unit || ''}
        </TooltipRow>,
        null
       ]}
      />
     )}
     <Area type="monotone" dataKey="value" stroke="#1890ff" fillOpacity={1} fill="url(#chartGradient)" />
    </AreaChart>
   </ResponsiveContainer>
  );
 }
}
