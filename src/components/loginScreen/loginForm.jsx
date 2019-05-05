import React from 'react';
import { Row, Col, Icon, Typography, Button, Form, Input, Radio } from 'antd';
import FacebookLogo from '../../assets/img/facebookLogo';
import * as firebase from 'firebase';

const FacebookIcon = props => <Icon component={FacebookLogo} {...props} />;

class LoginForm extends React.Component {
 facebookLogin = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
   .auth()
   .signInWithPopup(provider)
   .then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(result);
   })
   .catch(function(error) {
    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
   });
 };
 render() {
  return (
   <Row className="height-100" type="flex" align="middle">
    <Col span={16} offset={4}>
     <Row>
      <Typography.Title className="text-center">Hi!</Typography.Title>
     </Row>
     <Row>
      <p className="text-justify">Trckr is an app, that let’s you keep, arrange and visualize data of any kind. Fill out the form to create an account or sign in if you already have one.</p>
     </Row>
     <Row type="flex" justify="center">
      <Radio.Group defaultValue="login">
       <Radio.Button value="login">Login</Radio.Button>
       <Radio.Button value="sign-up">Sign up</Radio.Button>
      </Radio.Group>
     </Row>
     <Form hideRequiredMark onSubmit={null}>
      <Form.Item>
       {this.props.form.getFieldDecorator('name', {
        rules: [
         {
          required: true,
          message: 'Please provide your name'
         }
        ]
       })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />)}
      </Form.Item>
      <Form.Item>
       {this.props.form.getFieldDecorator('email', {
        rules: [
         {
          required: true,
          message: 'Please provide a valid e-mail'
         }
        ]
       })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="E-mail" />)}
      </Form.Item>
      <Form.Item>
       {this.props.form.getFieldDecorator('password', {
        rules: [
         {
          required: true,
          message: 'Please provide your desired password'
         }
        ]
       })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
      </Form.Item>
      <Form.Item>
       <Button type="primary" htmlType="submit" className="width-100">
        Sign in
       </Button>
      </Form.Item>
     </Form>
     <Row type="flex" align="middle">
      <Col span={14}>
       <span>or use social login</span>
      </Col>
      <Col span={10} className="flex flex-justify-between">
       <Button type="primary" shape="circle" icon="google" />
       <Button type="primary" shape="circle">
        <FacebookIcon />
       </Button>
       <Button type="primary" shape="circle" icon="twitter" />
      </Col>
     </Row>
    </Col>
   </Row>
  );
 }
}

export default Form.create({ name: 'login_form' })(LoginForm);
