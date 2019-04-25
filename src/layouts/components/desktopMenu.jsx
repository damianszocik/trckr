import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import AnimatedLogo from '../../components/shared/animatedLogo';

export default class DesktopMenu extends React.Component {
 render() {
  return (
   <Layout.Sider>
    <div
     style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px 24px 0'
     }}>
     <Link to="/" style={{ textAlign: 'center' }}>
      <AnimatedLogo width="70%" />
     </Link>
    </div>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
     {this.props.children}
    </Menu>
   </Layout.Sider>
  );
 }
}
