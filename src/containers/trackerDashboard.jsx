import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon, Card, Spin } from 'antd';
import EditCategoryTracker from '../components/shared/editCategoryTracker';
import AddEditTrackerEntry from '../components/trackerDashboard/addEditTrackerEntry';
import DataTable from '../components/trackerDashboard/dataTable';

class TrackerDashboard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tracker: null,
   addTrackerEntryModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  };
 }
 componentDidMount() {
  this.getTrackerDataToState(this.props.match.params.id, this.props.storeData);
 }
 componentDidUpdate(prevProps) {
  if (prevProps.match.params.id != this.props.match.params.id) {
   this.getTrackerDataToState(this.props.match.params.id, this.props.storeData);
  }
 }
 dismissModal = refreshCategory => {
  this.setState({
   addTrackerEntryModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  });
  if (refreshCategory == true) {
   this.getTrackerDataToState(this.props.match.params.id, this.props.storeData);
  }
 };
 showModal = type => {
  this.setState({
   [`${type}ModalVisibility`]: true,
   modalTitle: type == 'addTrackerEntry' ? `Add entry to: ${this.state.tracker.name}` : 'Edit',
   modalIcon: type == 'addTrackerEntry' ? 'plus' : 'edit'
  });
 };
 getTrackerDataToState = (id, store) => {
  for (let i = 0; i < Object.keys(store).length; i++) {
   let currentStoreItem = store[Object.keys(store)[i]];
   if (currentStoreItem.id == id) {
    this.setState({
     tracker: currentStoreItem
    });
   } else if (currentStoreItem.type == 'category' && Object.keys(currentStoreItem.data).length) {
    this.getTrackerDataToState(id, currentStoreItem.data);
   }
  }
 };

 render() {
  return this.state.tracker ? (
   <div className="height-100">
    <h1 className="flex flex-justify-between">
     <span>
      <Icon type="stock" />
      <span className="mx-1">{this.state.tracker.name}</span>
     </span>
     <a>
      <Icon onClick={() => this.showModal('editCategoryTracker')} style={{ opacity: '.5' }} type="edit" />
     </a>
    </h1>
    <p>{this.state.tracker.description}</p>

    <Card className="mt-4" bodyStyle={{ padding: 0 }}>
     <DataTable tracker={this.state.tracker} />
    </Card>

    <Modal
     title={
      <div style={{ textAlign: 'center' }}>
       <Icon type={this.state.modalIcon} />
       <span className="pl-1">{this.state.modalTitle}</span>
      </div>
     }
     footer={false}
     visible={this.state.addTrackerEntryModalVisibility || this.state.editCategoryTrackerModalVisibility}
     onCancel={this.dismissModal}
     destroyOnClose
     centered={true}>
     {this.state.addTrackerEntryModalVisibility ? (
      <AddEditTrackerEntry tracker={this.state.tracker} closeModal={this.dismissModal} />
     ) : (
      <EditCategoryTracker itemToEdit={this.state.tracker} itemType="tracker" closeModal={this.dismissModal} />
     )}
    </Modal>

    <Button
     style={{ position: 'absolute', bottom: '1em', right: '1em' }}
     type="primary"
     shape="circle"
     icon="plus"
     size="large"
     onClick={() => this.showModal('addTrackerEntry')}
    />
   </div>
  ) : (
   <Spin size="large" />
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

export default connect(mapStateToProps)(TrackerDashboard);
