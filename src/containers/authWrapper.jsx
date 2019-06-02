import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from './defaultLayout';
import LoginScreen from './loginScreen';

function AuthWrapper(props) {
 const [authStatus, setAuthStatus] = useState(false);
 useEffect(() => {
  if (props.storeUser.authUser && (props.storeUser.authUser.uid && props.storeUser.authUser.emailVerified)) {
   setAuthStatus(true);
  } else {
   setAuthStatus(false);
  }
 }, [props.storeUser.authUser]);
 if (authStatus) {
  return <DefaultLayout />;
 } else {
  return <LoginScreen />;
 }
}

const mapStateToProps = state => {
 return {
  storeUser: state.user
 };
};

export default connect(mapStateToProps)(AuthWrapper);
