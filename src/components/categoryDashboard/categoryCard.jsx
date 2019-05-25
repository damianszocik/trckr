import React from 'react';
import { Card, Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Trend from '../shared/trend';

export default function CategoryCard(props) {
 return (
  <Card
   className="mt-4"
   title={
    <span>
     <Icon type="folder" /> {props.category.name}
    </span>
   }
   extra={
    <Link to={`/category/${props.category.id}`}>
     <Icon type="arrow-right" />
    </Link>
   }
   style={{ width: '100%' }}>
   <Row>
    <Col lg={24} xl={12}>
     <Row type="flex" justify="center">
      <Col>
       <Icon style={{ fontSize: '4em' }} className="mb-1" type="folder" />
      </Col>
     </Row>
     <Row type="flex" justify="center">
      <Col>
       <p className="width-100 text-center my-1">Categories</p>
      </Col>
     </Row>
    </Col>
    <Col lg={24} xl={12}>
     <Row type="flex" justify="center">
      <Col>
       <Icon style={{ fontSize: '4em' }} className="mb-1" type="stock" />
      </Col>
     </Row>
     <Row type="flex" justify="center">
      <Col>
       <p className="text-center my-1">Trackers</p>
      </Col>
     </Row>
    </Col>
   </Row>
  </Card>
 );
}