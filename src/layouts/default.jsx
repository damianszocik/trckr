import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MainDashboard from '../scenes/mainDashboard';
import { Layout, Menu, Icon, Modal, Empty } from 'antd';
import MobileMenu from './components/mobileMenu';
import DesktopMenu from './components/desktopMenu';
import AddCategoryTracker from '../components/shared/addCategoryTracker';
import TrackerDashboard from '../scenes/trackerDashboard';
import CategoryDashboard from '../scenes/categoryDashboard';

export default class DefaultLayout extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   addModalVisibility: false,
   addModalCategory: null,
   addModalCategoryId: null,
   addModalCategoryAddress: null
  };
 }
 dismissAddModal = () => {
  this.setState({
   addModalVisibility: false
  });
 };
 showAddModal = (catName, catAddress) => {
  this.setState({
   addModalVisibility: true,
   addModalCategory: catName,
   addModalCategoryAddress: catAddress
  });
 };
 renderMenuItems(items) {
  let result = [];
  result = items.map(item => {
   if (item.type == 'tracker') {
    return (
     <Menu.Item address={item.address} key={item.address[item.address.length - 1].id}>
      <Link style={{ color: 'rgba(255, 255, 255, .65' }} to={`/tracker/${item.id}`}>
       <span>
        <Icon type="stock" />
        {item.name}
       </span>
      </Link>
     </Menu.Item>
    );
   } else if (item.type == 'category') {
    return (
     <Menu.SubMenu
      address={item.address}
      key={item.address[item.address.length - 1].id}
      title={
       <Link style={{ color: 'rgba(255, 255, 255, .65' }} to={`/category/${item.id}`}>
        <span>
         <Icon type="mail" />
         {item.name}
        </span>
       </Link>
      }>
      {this.renderMenuItems(item.data)}
      <Menu.Item key={item.address[item.address.length - 1].id + '+add'} onClick={() => this.showAddModal(item.name, item.address)}>
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
      destroyOnClose
      centered={true}>
      <AddCategoryTracker category={this.state.addModalCategory} categoryAddress={this.state.addModalCategoryAddress} />
     </Modal>
     <Layout style={{ height: '100%' }}>
      <Switch>
       <Route exact path="/" component={MainDashboard} />
       <Route path="/tracker/:id" component={TrackerDashboard} />
       <Route path="/category/:id" component={CategoryDashboard} />
       <Route component={Empty} />
      </Switch>
      <Layout.Footer style={{ textAlign: 'center' }}>Trckr ©2019 Created by Damian Szocik</Layout.Footer>
     </Layout>
    </Layout>
   </Router>
  );
 }
}
