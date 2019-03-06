import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MainDashboard from '../containers/mainDashboard';
import { Layout, Menu, Icon, Modal, Empty } from 'antd';
import MobileMenu from './components/mobileMenu';
import DesktopMenu from './components/desktopMenu';
import AddCategoryTracker from '../components/shared/addCategoryTracker';
import TrackerDashboard from '../containers/trackerDashboard';
import CategoryDashboard from '../containers/categoryDashboard';

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
  result = Object.keys(items).map(item => {
   let currentItem = items[item];
   if (currentItem.type == 'tracker') {
    return (
     <Menu.Item address={currentItem.address} key={currentItem.address[currentItem.address.length - 1].id}>
      <Link style={{ color: 'rgba(255, 255, 255, .65' }} to={`/tracker/${currentItem.id}`}>
       <span>
        <Icon type="stock" />
        {currentItem.name}
       </span>
      </Link>
     </Menu.Item>
    );
   } else if (currentItem.type == 'category') {
    return (
     <Menu.SubMenu
      address={currentItem.address}
      key={currentItem.address[currentItem.address.length - 1].id}
      title={
       <Link style={{ color: 'rgba(255, 255, 255, .65' }} to={`/category/${currentItem.id}`}>
        <span>
         <Icon type="mail" />
         {currentItem.name}
        </span>
       </Link>
      }>
      {this.renderMenuItems(currentItem.data)}
      <Menu.Item key={currentItem.address[currentItem.address.length - 1].id + '+add'} onClick={() => this.showAddModal(currentItem.name, currentItem.address)}>
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
