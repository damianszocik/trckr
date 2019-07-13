import React from 'react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { Empty, Typography, Row } from 'antd';

export default function NotFound({ message, image }) {
 return (
  <div>
   <Row type="flex" justify="center">
    <Empty
     image={image}
     imageStyle={{ height: isMobile ? '50vw' : 'calc(60vw - 250px)', maxHeight: '40vh' }}
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

NotFound.propTypes = {
 message: PropTypes.string,
 image: PropTypes.string
};
