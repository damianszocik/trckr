import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon, Row, Col, Typography, Spin, Empty } from 'antd';
import EditCategoryTracker from 'components/shared/editCategoryTracker';
import AddCategoryTracker from 'components/shared/addCategoryTracker';
import TrackerCard from 'components/categoryDashboard/trackerCard';
import CategoryCard from 'components/categoryDashboard/categoryCard';
import GoUpButton from 'components/shared/goUpButton';

let categoryData;
class CategoryDashboard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   addCategoryTrackerModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  };
 }
 dismissModal = () => {
  this.setState({
   addCategoryTrackerModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  });
 };
 showModal = type => {
  this.setState({
   [`${type}ModalVisibility`]: true,
   modalTitle: type == 'addCategoryTracker' ? 'Add' : 'Edit',
   modalIcon: type == 'addCategoryTracker' ? 'plus' : 'edit'
  });
 };
 getCategoryData = (id, store) => {
  for (let i = 0; i < Object.keys(store).length; i++) {
   let currentStoreItem = store[Object.keys(store)[i]];
   if (currentStoreItem.id == id) {
    categoryData = currentStoreItem;
   } else if (currentStoreItem.type == 'category' && Object.keys(currentStoreItem.data).length) {
    this.getCategoryData(id, currentStoreItem.data);
   }
  }
 };

 render() {
  this.getCategoryData(this.props.match.params.id, this.props.storeData);
  return (
   <div style={{ height: 'inherit' }}>
    {categoryData ? (
     <React.Fragment>
      <div className="flex flex-justify-between mb-1">
       <Typography.Title>
        <span>
         <Icon type="folder" />
         <span className="mx-1">{categoryData.name}</span>
        </span>
       </Typography.Title>
       <Typography.Title level={3} className="m-0">
        <GoUpButton additionalClassName="mr-1" address={categoryData.address} />
        <a title="Edit category">
         <Icon onClick={() => this.showModal('editCategoryTracker')} type="edit" />
        </a>
       </Typography.Title>
      </div>

      <Row>
       <Col span={24}>
        <Typography.Text>{categoryData.description}</Typography.Text>
       </Col>
      </Row>
      {Object.keys(categoryData.data).length ? (
       <Row className="mt-3" gutter={16}>
        {Object.keys(categoryData.data).map(element => {
         if (categoryData.data[element].type == 'tracker') {
          return (
           <Col key={categoryData.data[element].id} xs={24} sm={12} md={8} lg={6}>
            <TrackerCard tracker={categoryData.data[element]} />
           </Col>
          );
         } else {
          return (
           <Col key={categoryData.data[element].id} xs={24} sm={12} md={8} lg={6}>
            <CategoryCard category={categoryData.data[element]} />
           </Col>
          );
         }
        })}
       </Row>
      ) : (
       <Row className="mt-4 pt-4" type="flex" justify="center" align="middle">
        <Empty
         description={
          <span className="text-center">
           There are no categories/trackers.
           <br />
           Use a "plus" button in the right bottom corner to add one.{' '}
          </span>
         }
        />
       </Row>
      )}
     </React.Fragment>
    ) : (
     <div className="flex flex-justify-center flex-align-center width-100 height-100">
      <Spin size="large" />
     </div>
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
     {this.state.addCategoryTrackerModalVisibility ? <AddCategoryTracker category={categoryData.name} categoryAddress={categoryData.address} /> : <EditCategoryTracker itemToEdit={categoryData} itemType="category" closeModal={this.dismissModal} />}
    </Modal>
    <Button style={{ position: 'absolute', bottom: '1em', right: '1em' }} type="primary" shape="circle" icon="plus" size="large" onClick={() => this.showModal('addCategoryTracker')} />
   </div>
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

export default connect(mapStateToProps)(CategoryDashboard);
