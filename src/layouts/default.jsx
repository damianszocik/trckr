import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MainDashboard from '../scenes/mainDashboard';
import { Layout, Menu, Icon, Modal, Empty } from 'antd';
import MobileMenu from './components/mobileMenu';
import DesktopMenu from './components/desktopMenu';
import AddCategoryTracker from '../components/shared/addCategoryTracker';
import TrackerDashboard from '../scenes/trackerDashboard';

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
     <Menu.Item key={item.id}>
      <span>
       <Icon type="stock" />
       <Link style={{ color: 'rgba(255, 255, 255, .65' }} to={`/tracker/${item.name}`}>
        {item.name}
       </Link>
      </span>
     </Menu.Item>
    );
   } else if (item.type == 'category') {
    return (
     <Menu.SubMenu
      key={item.id}
      title={
       <span>
        <Icon type="mail" />
        <Link style={{ color: 'rgba(255, 255, 255, .65' }} to={`/category/${item.name}`}>
         {item.name}
        </Link>
       </span>
      }>
      {this.renderMenuItems(item.data)}
      <Menu.Item key={item.id + '+add'} onClick={() => this.showAddModal(item.name)}>
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
   <Router>
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
      <AddCategoryTracker category={this.state.addModalCategory} />
     </Modal>
     <Layout>
      <Switch>
       <Route exact path="/" component={MainDashboard} />
       <Route path="/tracker/:name" component={TrackerDashboard} />
       <Route path="/category/:name" component={TrackerDashboard} />
       <Route component={Empty} />
      </Switch>
      <Layout.Footer style={{ textAlign: 'center' }}>Trckr ©2019 Created by Damian Szocik</Layout.Footer>
     </Layout>
    </Layout>
   </Router>
  );
 }
}
