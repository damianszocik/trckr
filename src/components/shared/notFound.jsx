import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Typography, Row, Icon } from 'antd';

export default function NotFound({ message }) {
 return (
  <div>
   <Row type="flex" justify="center">
    <Empty
     image={<Icon type="frown" />}
     imageStyle={{ fontSize: '10vw', height: '10vw' }}
     description={
      <Typography.Title level={2} className="mt-5">
       {message}
      </Typography.Title>
     }
    />
   </Row>
  </div>
 );
}

NotFound.PropTypes = {
 message: PropTypes.string
};
