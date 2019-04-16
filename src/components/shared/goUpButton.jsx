import React from 'react';
import { Icon } from 'antd';
import { Route } from 'react-router-dom';

export default function GoUpButton(props) {
 const getParentRoute = () => {
  if (props.address.length > 1) {
   const parentId = props.address[props.address.length - 2].id;
   return `/category/${parentId}`;
  } else {
   return '/';
  }
 };
 return (
  <Route
   render={({ history }) => (
    <a className={props.additionalClassName} title="Go to parent category">
     <Icon onClick={() => history.push(getParentRoute())} type="to-top" />
    </a>
   )}
  />
 );
}
