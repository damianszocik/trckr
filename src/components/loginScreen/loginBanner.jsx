import React from 'react';
import { Row, Col } from 'antd';
import AnimatedLogo from '../shared/animatedLogo';
import './loginBanner.sass';

export default function LoginBanner(props) {
 return (
  <Row className="height-100 login-banner" type="flex" justify="center" align="middle">
   <Col className="width-100 text-center">
    <AnimatedLogo width="80%" color="#fff" />
   </Col>
  </Row>
 );
}
