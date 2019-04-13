import React from 'react';
import { Card, Icon, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import ChartBar from '../shared/chartBar';
import ChartLine from '../shared/chartLine';
import Trend from '../shared/trend';

export default class TrackerCard extends React.Component {
 render() {
  let barChartData = [];
  if (this.props.tracker.options.trackerType == 'binary') {
   barChartData = [{ name: this.props.tracker.options.binaryIcons.good, value: 0 }, { name: this.props.tracker.options.binaryIcons.bad, value: 0 }];
   Object.keys(this.props.tracker.data).forEach(entry => {
    if (this.props.tracker.data[entry].value == 'good') {
     barChartData[0].value = barChartData[0].value + 1;
    } else {
     barChartData[1].value = barChartData[1].value + 1;
    }
   });
  }
  return (
   <Card
    className="mt-4"
    title={
     <span>
      <Icon type="stock" /> {this.props.tracker.name}
     </span>
    }
    extra={
     <Link to={`/tracker/${this.props.tracker.id}`}>
      <Icon type="arrow-right" />
     </Link>
    }
    style={{ width: '100%' }}>
    <Row>
     <Col>
      {this.props.tracker.options.trackerType == 'binary' ? (
       <ChartBar chartData={this.props.tracker.data} icons={this.props.tracker.options.binaryIcons} mini />
      ) : (
       <ChartLine chartData={this.props.tracker.data} unit={this.props.tracker.options.unit} mini />
      )}
     </Col>
    </Row>
    {this.props.tracker.options.trackerType != 'binary' ? (
     <Row type="flex" justify="space-around">
      <Col className="mt-2">
       <Trend tracker={this.props.tracker} type="last" />
      </Col>
      <Col className="mt-2">
       <Trend tracker={this.props.tracker} type="overall" />
      </Col>
     </Row>
    ) : (
     <Row className="mt-2">
      <Col span={12}>
       <div className="flex flex-column flex-align-center flex-justify-center">
        <Icon style={{ fontSize: '2em' }} type={this.props.tracker.options.binaryIcons.good} />
        <Typography.Title level={4} className="m-0 mt-1">
         {barChartData[0].value}
        </Typography.Title>
        <p className="m-0">({((barChartData[0].value * 100) / (barChartData[0].value + barChartData[1].value)).toFixed(2)}%)</p>
       </div>
      </Col>
      <Col span={12}>
       <div className="flex flex-column flex-align-center flex-justify-center">
        <Icon style={{ fontSize: '2em' }} type={this.props.tracker.options.binaryIcons.bad} />
        <Typography.Title level={4} className="m-0 mt-1">
         {barChartData[1].value}
        </Typography.Title>
        <p className="m-0">({((barChartData[1].value * 100) / (barChartData[0].value + barChartData[1].value)).toFixed(2)}%)</p>
       </div>
      </Col>
     </Row>
    )}
   </Card>
  );
 }
}
