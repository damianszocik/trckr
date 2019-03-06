import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'antd';
import EditCategoryTracker from '../components/shared/editCategoryTracker';
import AddCategoryTracker from '../components/shared/addCategoryTracker';

class CategoryDashboard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   category: null,
   addCategoryTrackerModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  };
 }
 componentDidMount() {
  this.getCategoryDataToState(this.props.match.params.id, this.props.storeData);
 }
 componentDidUpdate(prevProps) {
  if (prevProps.match.params.id != this.props.match.params.id) {
   this.getCategoryDataToState(this.props.match.params.id, this.props.storeData);
  }
 }
 dismissModal = refreshCategory => {
  this.setState({
   addCategoryTrackerModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  });
  if (refreshCategory == true) {
   this.getCategoryDataToState(this.props.match.params.id, this.props.storeData);
  }
 };
 showModal = type => {
  this.setState({
   [`${type}ModalVisibility`]: true,
   modalTitle: type == 'addCategoryTracker' ? 'Add' : 'Edit',
   modalIcon: type == 'addCategoryTracker' ? 'plus' : 'edit'
  });
 };
 getCategoryDataToState = (id, store) => {
  for (let i = 0; i < Object.keys(store).length; i++) {
   let currentStoreItem = store[Object.keys(store)[i]];
   if (currentStoreItem.id == id) {
    this.setState({
     category: currentStoreItem
    });
    //TODO: connect component state directly to item in redux store
   } else if (currentStoreItem.type == 'category' && Object.keys(currentStoreItem.data).length) {
    this.getCategoryDataToState(id, currentStoreItem.data);
   }
  }
 };
 render() {
  return (
   <div>
    <h1>
     This is a category dashboard for {this.props.match.params.id}
     <Icon onClick={() => this.showModal('editCategoryTracker')} className="ml-2" type="edit" />
    </h1>
    {this.state.category ? (
     <div>
      <h1>{this.state.category.name}</h1>
      <h2>{this.state.category.id}</h2>
      <p>{this.state.category.description}</p>
     </div>
    ) : (
     <h1>loading</h1>
    )}
    <Modal
     title={
      <div style={{ textAlign: 'center' }}>
       <Icon type={this.state.modalIcon} />
       <span className="pl-1">{this.state.modalTitle}</span>
      </div>
     }
     footer={false}
     visible={this.state.addCategoryTrackerModalVisibility || this.state.editCategoryTrackerModalVisibility}
     onCancel={this.dismissModal}
     destroyOnClose
     centered={true}>
     {this.state.addCategoryTrackerModalVisibility ? (
      <AddCategoryTracker category={this.state.category.name} categoryAddress={this.state.category.address} />
     ) : (
      <EditCategoryTracker itemToEdit={this.state.category} itemType="category" closeModal={this.dismissModal} />
     )}
    </Modal>
    <Button
     style={{ position: 'absolute', bottom: '1em', right: '1em' }}
     type="primary"
     shape="circle"
     icon="plus"
     size="large"
     onClick={() => this.showModal('addCategoryTracker')}
    />
   </div>
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

export default connect(mapStateToProps)(CategoryDashboard);
