import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'antd';
import EditCategoryTracker from '../components/shared/editCategoryTracker';
import AddTrackerEntry from '../components/shared/addTrackerEntry';

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
  return (
   <div>
    <h1>
     This is a tracker dashboard for {this.props.match.params.id}
     <Icon onClick={() => this.showModal('editCategoryTracker')} className="ml-2" type="edit" />
    </h1>
    {this.state.tracker ? (
     <div>
      <h1>{this.state.tracker.name}</h1>
      <h2>{this.state.tracker.id}</h2>
      <p>{this.state.tracker.description}</p>
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
     visible={this.state.addTrackerEntryModalVisibility || this.state.editCategoryTrackerModalVisibility}
     onCancel={this.dismissModal}
     destroyOnClose
     centered={true}>
     {this.state.addTrackerEntryModalVisibility ? (
      <AddTrackerEntry />
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
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

export default connect(mapStateToProps)(TrackerDashboard);
