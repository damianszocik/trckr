import React from 'react';
import { Layout, Menu } from 'antd';
import { ReactComponent as Logo } from '../../assets/img/logo1.svg';

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
          <Logo style={{ width: '70%' }} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {this.props.children}
        </Menu>
      </Layout.Sider>
    );
  }
}
