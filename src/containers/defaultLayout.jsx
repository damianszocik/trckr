import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { addCategory, addTracker, overwriteStoreData } from '../actions/data';
import { Layout, Menu, Icon, Modal, message } from 'antd';
import MainDashboard from './defaultLayout/mainDashboard';
import MobileMenu from './defaultLayout/menu/mobileMenu';
import DesktopMenu from './defaultLayout/menu/desktopMenu';
import AddCategoryTracker from '../components/shared/addCategoryTracker';
import TrackerDashboard from './defaultLayout/trackerDashboard';
import CategoryDashboard from './defaultLayout/categoryDashboard';
import NotFound from 'components/shared/notFound';
import NotFoundImage from 'assets/img/not-found.svg';
import { store } from '../store';
import firebase from '../store/firebase';
import throttle from 'lodash.throttle';
let storeUnsubscribe;

class DefaultLayout extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   addModalVisibility: false,
   addModalCategory: null,
   addModalCategoryId: null,
   addModalCategoryAddress: null
  };
 }

 componentDidMount() {
  message.success('You have been successfuly logged.', 6);
  let { uid, email } = this.props.storeUser.authUser;
  localStorage.removeItem(email);

  this.props.overwriteStoreData({});
  firebase
   .database()
   .ref(`${uid}/data`)
   .once('value')
   .then(snapshot => {
    //overwrite local data store with firebase copy
    this.props.overwriteStoreData(snapshot.val());
    //sync local user store to firebase
    firebase
     .database()
     .ref(`${uid}/user`)
     .set(JSON.parse(JSON.stringify(store.getState().user)));
    //subsribe firebase to local data & system store
    //TODO: fix throttled sync
    storeUnsubscribe = store.subscribe(() => {
     const throttledSync = throttle(() => {
      firebase
       .database()
       .ref(`${uid}/data`)
       .set(store.getState().data);
      firebase
       .database()
       .ref(`${uid}/system`)
       .set(JSON.parse(JSON.stringify(store.getState().system)));
     }, 10000);
     throttledSync();
    });
   });
 }

 componentWillUnmount() {
  //unsubscribe firebase form local data & system stores
  storeUnsubscribe();
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
         <Icon type="folder" />
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
     {isMobile ? <MobileMenu>{this.renderMenuItems(this.props.storeData)}</MobileMenu> : <DesktopMenu>{this.renderMenuItems(this.props.storeData)}</DesktopMenu>}
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
     <Layout className="p-4" style={{ height: '100%', overflow: 'auto' }}>
      <Switch>
       <Route exact path="/" component={MainDashboard} />
       <Route path="/tracker/:id" component={TrackerDashboard} />
       <Route path="/category/:id" component={CategoryDashboard} />
       <Route render={() => <NotFound image={NotFoundImage} message="The page you're looking for can't be found." />} />
      </Switch>
      <Layout.Footer style={{ textAlign: 'center' }}>Trckr ©2019 Created by Damian Szocik</Layout.Footer>
     </Layout>
    </Layout>
   </Router>
  );
 }
}

const mapStateToProps = state => {
 const { data, user, system } = state;
 return {
  storeData: data,
  storeUser: user,
  storeSystem: system
 };
};

const mapDispatchToProps = {
 addCategory,
 addTracker,
 overwriteStoreData
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(DefaultLayout);
