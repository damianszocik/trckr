import React from 'react';
import { Icon, Typography } from 'antd';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { isMobile } from 'react-device-detect';

export default class ChartBar extends React.Component {
 render() {
  const chartDataArray = [{ name: this.props.icons.good, value: 0 }, { name: this.props.icons.bad, value: 0 }];
  Object.keys(this.props.chartData).forEach(entry => {
   if (this.props.chartData[entry].value == 'good') {
    chartDataArray[0].value = chartDataArray[0].value + 1;
   } else {
    chartDataArray[1].value = chartDataArray[1].value + 1;
   }
  });
  return (
   <div className="flex flex-align-center flex-justify-around">
    {!this.props.mini && (
     <div className="flex flex-column flex-align-center flex-justify-center">
      <Icon style={{ fontSize: '3em' }} type={this.props.icons.good} />
      <Typography.Title className="m-0 mt-1">{chartDataArray[0].value}</Typography.Title>
      <Typography.Title className="m-0" level={4}>
       ({((chartDataArray[0].value * 100) / (chartDataArray[0].value + chartDataArray[1].value)).toFixed(2)}%)
      </Typography.Title>
     </div>
    )}
    <ResponsiveContainer width={this.props.mini ? '100%' : '70%'} aspect={this.props.mini ? 3 : isMobile ? 0.5 : 2}>
     <BarChart data={chartDataArray}>
      <Bar dataKey="value" fill="#40a9ff" />
     </BarChart>
    </ResponsiveContainer>
    {!this.props.mini && (
     <div className="flex flex-column flex-align-center flex-justify-center">
      <Icon style={{ fontSize: '3em' }} type={this.props.icons.bad} />
      <Typography.Title className="m-0 mt-1">{chartDataArray[1].value}</Typography.Title>
      <Typography.Title className="m-0" level={4}>
       ({((chartDataArray[1].value * 100) / (chartDataArray[0].value + chartDataArray[1].value)).toFixed(2)}%)
      </Typography.Title>
     </div>
    )}
   </div>
  );
 }
}
