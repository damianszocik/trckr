import React from 'react';
import { connect } from 'react-redux';
import AddCategoryTracker from 'components/shared/addCategoryTracker';
import { Layout, Empty, Row, Icon, Modal, Button, Divider } from 'antd';
class MainDashboard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   addModalVisibility: false
  };
 }
 dismissAddModal = () => {
  this.setState({
   addModalVisibility: false
  });
  Modal.destroyAll();
 };
 showAddModal = () => {
  this.setState({
   addModalVisibility: true
  });
 };
 render() {
  return (
   <React.Fragment>
    <Row type="flex" justify="center" align="middle">
     <Empty />
    </Row>
    <Row style={{ marginTop: '5em' }} type="flex" justify="center" align="middle">
     <Divider>Add a Tracker or a Category</Divider>
     <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.showAddModal} />
    </Row>
    <Modal
     title={
      <div style={{ textAlign: 'center' }}>
       <Icon type="plus" />
       <span> Add</span>
      </div>
     }
     footer={false}
     visible={this.state.addModalVisibility}
     onCancel={this.dismissAddModal}
     destroyOnClose
     centered={true}>
     <AddCategoryTracker />
    </Modal>
   </React.Fragment>
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

export default connect(mapStateToProps)(MainDashboard);
