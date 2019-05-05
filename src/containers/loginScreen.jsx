import React from 'react';
import { Row, Col } from 'antd';
import LoginBanner from '../components/loginScreen/loginBanner';
import LoginForm from '../components/loginScreen/loginForm';

export default class LoginScreen extends React.Component {
 render() {
  return (
   <Row className="height-100">
    <Col className="height-100" xs={0} sm={0} md={12} lg={14} xl={16} xxl={28}>
     <LoginBanner />
    </Col>
    <Col className="height-100" xs={24} sm={24} md={12} lg={10} xl={8} xxl={6}>
     <LoginForm />
    </Col>
   </Row>
  );
 }
}
