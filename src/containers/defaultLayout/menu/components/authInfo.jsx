import React from 'react';
import { Row, Col, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import { logOut } from 'actions/user';

function AuthInfo(props) {
 return (
  <Row className={`${props.mobile? 'mt-5 pt-2' : 'mt-3'} mx-2 white`} type="flex" justify="space-between">
   <Col className="flex flex-align-center">
    <Avatar icon="user" style={{ color: '#001529' }} className="mr-1" />
    <span>{props.displayName}</span>
   </Col>
   <Col className="flex flex-align-center font-size-150">
    <Icon type="logout" onClick={props.logOut} />
   </Col>
  </Row>
 );
}

const mapDispatchToProps = {
 logOut
};

export default connect(
 null,
 mapDispatchToProps
)(AuthInfo);
