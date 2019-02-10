import React from 'react';
import { isMobile } from 'react-device-detect';
import Dashboard from '../scenes/dashboard';
import { Layout, Menu, Icon, Input, Select, Card, Col, Row, Button, Modal } from 'antd';
import MobileMenu from './components/mobileMenu';
import DesktopMenu from './components/desktopMenu';
import AddCategoryTracker from '../components/shared/addCategoryTracker';

const { Header, Content, Footer, Sider } = Layout;

export default class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalVisibility: false,
      addModalCategory: null
    };
  }
  dismissAddModal = () => {
    this.setState({
      addModalVisibility: false
    });
  };
  showAddModal = cat => {
    this.setState({
      addModalVisibility: true,
      addModalCategory: cat
    });
  };
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
            <Menu.Item key={item.name + '-add'} onClick={() => this.showAddModal(item.name)}>
              <span>
                <Icon type="plus" />
                <span>Add</span>
              </span>
            </Menu.Item>
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
        <Modal
          title={
            <div style={{ textAlign: 'center' }}>
              <Icon type="plus" />
              <span>Add</span>
            </div>
          }
          footer={false}
          visible={this.state.addModalVisibility}
          onCancel={this.dismissAddModal}
          centered={true}>
          <AddCategoryTracker
            store={this.props.store}
            category={this.state.addModalCategory}
            addCategory={this.props.addCategory}
            addTracker={this.props.addTracker}
          />
        </Modal>
        <Layout>
          <Dashboard store={this.props.store} addCategory={this.props.addCategory} addTracker={this.props.addTracker} />
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
