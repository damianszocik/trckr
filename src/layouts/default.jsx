import React from 'react';
import { isMobile } from 'react-device-detect';
import MainBegin from '../scenes/mainBegin';
import { Layout, Menu, Icon, Input, Select, Card, Col, Row, Button } from 'antd';
import MobileMenu from './components/mobileMenu';
import DesktopMenu from './components/desktopMenu';

const { Header, Content, Footer, Sider } = Layout;

export default class DefaultLayout extends React.Component {
  renderMenuItems(items) {
    let result = [];
    result = items.map(item => {
      if (item.type == 'tracker') {
        return (
          <Menu.Item key={item.name}>
            <span>
              <Icon type="stock" />
              <span>{item.name}</span>
            </span>
          </Menu.Item>
        );
      } else if (item.type == 'category') {
        return (
          <Menu.SubMenu
            key={item.name}
            title={
              <span>
                <Icon type="mail" />
                <span>{item.name}</span>
              </span>
            }>
            {this.renderMenuItems(item.data)}
          </Menu.SubMenu>
        );
      }
    });
    return result;
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        {isMobile ? <MobileMenu>{this.renderMenuItems(this.props.store)}</MobileMenu> : <DesktopMenu>{this.renderMenuItems(this.props.store)}</DesktopMenu>}
        <Layout>
          <MainBegin store={this.props.store} addCategory={this.props.addCategory} addTracker={this.props.addTracker} />
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
