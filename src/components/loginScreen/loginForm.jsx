import React from 'react';
import { Row, Col, Icon, Typography, Button, Form, Input, Radio, notification, message } from 'antd';
import { socialAuth, logOut, emailLogin, emailSignup, successfulAuth, failedAuth } from '../../actions/user';
import { connect } from 'react-redux';
import FacebookLogo from '../../assets/img/facebookLogo';
import * as firebase from 'firebase';
import './loginForm.sass';

window.firebase = firebase;

const FacebookIcon = props => <Icon component={FacebookLogo} {...props} />;

class LoginForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   formSelection: 'login',
   authorization: {
    logged: false,
    verified: false,
    uid: null
   }
  };
 }

 componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    if (user.emailVerified) {
     this.props.successfulAuth(user);
    } else {
     const verificationStatus = localStorage.getItem(user.email);
     if (verificationStatus == 'sent') {
      notification.open({
       message: 'Verify email',
       duration: 0,
       key: 'resend',
       placement: 'topLeft',
       onClick: () => {
        notification.close('resend');
        this.sendVerifyingEmail();
       },
       description: `Verification message for: ${user.email} has been already sent. Check your inbox and click on a link provided in the message or click on this notification to resend vertification message.`,
       icon: <Icon type="mail" style={{ color: '#108ee9' }} />
      });
     } else {
      this.sendVerifyingEmail();
     }
    }
   }
  });

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
   var email = window.localStorage.getItem('emailForSignIn');
   if (!email) {
    email = window.prompt('Please provide your email for confirmation');
   }
   if (email) {
    firebase
     .auth()
     .signInWithEmailLink(email, window.location.href)
     .then(responseData => {
      this.props.successfulAuth(responseData.user);
      window.localStorage.removeItem('emailForSignIn');
     })
     .catch(error => this.props.failedAuth(error));
   }
  }
 }

 sendVerifyingEmail() {
  var user = firebase.auth().currentUser;
  user
   .sendEmailVerification()
   .then(() => {
    localStorage.setItem(user.email, 'sent');
    notification.open({
     message: 'Verify email',
     duration: 0,
     placement: 'topLeft',
     description: "We have sent you a message to verify email addres you've provided. Check your inbox and click on a link provided in the message.",
     icon: <Icon type="mail" style={{ color: '#108ee9' }} />
    });
   })
   .catch(error => {
    message.error(error.message);
   });
 }

 passwordAuth = event => {
  event.preventDefault();
  if (this.state.formSelection == 'login') {
   this.props.emailLogin(this.state.mail, this.state.password);
  } else {
   this.props.emailSignup(this.state.mail, this.state.password);
  }
 };

 render() {
  return (
   <Row className="height-100 login-form-container" type="flex" align="middle">
    <Col xs={{ span: 20, offset: 2 }} sm={{ span: 18, offset: 3 }} md={{ span: 16, offset: 4 }}>
     <Row>
      <Typography.Title className="text-center mb-2">Hi!</Typography.Title>
     </Row>
     <Row>
      <p className="text-justify my-0">Trckr is an app, that let’s you keep, arrange and visualize data of any kind. Fill out the form to create an account or sign in if you already have one.</p>
     </Row>
     <Row type="flex" justify="center" className="my-4">
      <Radio.Group defaultValue={this.state.formSelection} value={this.state.formSelection} onChange={event => this.setState({ formSelection: event.target.value })} className="radio-no-outline">
       <Radio.Button className="radio-no-outline__element" value="login">
        Login
       </Radio.Button>
       <Radio.Button className="radio-no-outline__element" value="sign-up">
        Sign up
       </Radio.Button>
      </Radio.Group>
     </Row>
     <Form hideRequiredMark onSubmit={this.passwordAuth}>
      {this.state.formSelection == 'sign-up' && (
       <Form.Item className="mb-2">
        {this.props.form.getFieldDecorator('name', {
         rules: [
          {
           required: true,
           message: 'Please provide your name'
          }
         ]
        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={event => this.setState({ name: event.target.value })} placeholder="Name" />)}
       </Form.Item>
      )}
      <Form.Item className="mb-2">
       {this.props.form.getFieldDecorator('email', {
        rules: [
         {
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please provide a valid e-mail'
         }
        ]
       })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" onChange={event => this.setState({ mail: event.target.value })} placeholder="E-mail" />)}
      </Form.Item>
      <Form.Item className="mb-4">
       {this.props.form.getFieldDecorator('password', {
        rules: [
         {
          required: true,
          message: 'Please provide your desired password'
         }
        ]
       })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onChange={event => this.setState({ password: event.target.value })} placeholder="Password" />)}
      </Form.Item>
      <Form.Item className="mb-2">
       <Button type="primary" htmlType="submit" block>
        {this.state.formSelection == 'login' ? 'Login' : 'Sign up'}
       </Button>
      </Form.Item>
     </Form>
     <Row type="flex" align="middle" justify="space-between">
      <Col>
       <span>or use social login</span>
      </Col>
      <Col>
       <Button className="mx-1" type="primary" shape="circle" onClick={() => this.props.socialAuth('google')} icon="google" />
       <Button className="mx-1" type="primary" shape="circle" onClick={() => this.props.socialAuth('facebook')}>
        <FacebookIcon />
       </Button>
       <Button className="ml-1" type="primary" shape="circle" onClick={() => this.props.socialAuth('twitter')} icon="twitter" />
      </Col>
     </Row>
    </Col>
   </Row>
  );
 }
}

const wrappedForm = Form.create({ name: 'login_form' })(LoginForm);

const mapStateToProps = state => {
 return { storeUser: state.user };
};

const mapDispatchToProps = {
 emailLogin,
 emailSignup,
 socialAuth,
 logOut,
 successfulAuth,
 failedAuth
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(wrappedForm);
