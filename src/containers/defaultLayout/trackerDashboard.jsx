import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon, Card, Spin, Row, Col, Statistic, Typography, Empty } from 'antd';
import EditCategoryTracker from '../../components/shared/editCategoryTracker';
import AddEditTrackerEntry from '../../components/trackerDashboard/addEditTrackerEntry';
import DataTable from '../../components/trackerDashboard/dataTable';
import ChartLine from '../../components/shared/chartLine';
import ChartBar from '../../components/shared/chartBar';
import Trend from '../../components/shared/trend';
import GoUpButton from '../../components/shared/goUpButton';

let trackerData;
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
 dismissModal = () => {
  this.setState({
   addTrackerEntryModalVisibility: false,
   editCategoryTrackerModalVisibility: false,
   modalIcon: null,
   modalTitle: null
  });
 };
 showModal = type => {
  this.setState({
   [`${type}ModalVisibility`]: true,
   modalTitle: type == 'addTrackerEntry' ? `Add entry to: ${trackerData.name}` : 'Edit',
   modalIcon: type == 'addTrackerEntry' ? 'plus' : 'edit'
  });
 };

 getTrackerData = (id, store) => {
  for (let i = 0; i < Object.keys(store).length; i++) {
   let currentStoreItem = store[Object.keys(store)[i]];
   if (currentStoreItem.id == id) {
    trackerData = currentStoreItem;
   } else if (currentStoreItem.type == 'category' && Object.keys(currentStoreItem.data).length) {
    this.getTrackerData(id, currentStoreItem.data);
   }
  }
 };

 render() {
  this.getTrackerData(this.props.match.params.id, this.props.storeData);
  let sortedEntries, trackingSince, trackingFor;
  if (Object.keys(trackerData.data).length > 2) {
   sortedEntries = Object.keys(trackerData.data).map(entry => {
    return trackerData.data[entry];
   });
   sortedEntries.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
   trackingSince = parseInt((new Date(sortedEntries[sortedEntries.length - 1].dateTime) - new Date(sortedEntries[0].dateTime)) / (1000 * 60 * 60 * 24));
   trackingFor = new Date(sortedEntries[0].dateTime).toLocaleDateString();
  }

  return trackerData ? (
   <div className="height-100">
    <div className="flex flex-justify-between mb-1">
     <Typography.Title>
      <span>
       <Icon type="stock" />
       <span className="mx-1">{trackerData.name}</span>
      </span>
     </Typography.Title>
     <Typography.Title level={3} className="m-0">
      <GoUpButton additionalClassName="mr-1" address={trackerData.address} />
      <a title="Edit tracker">
       <Icon onClick={() => this.showModal('editCategoryTracker')} type="edit" />
      </a>
     </Typography.Title>
    </div>

    <Row>
     <Col xs={24} sm={12}>
      <Typography.Text>{trackerData.description}</Typography.Text>
     </Col>
    </Row>

    {Object.keys(trackerData.data).length > 2 && (
     <React.Fragment>
      <Row className="mt-4">
       <Col span={24}>
        <Card bodyStyle={trackerData.options.trackerType == 'binary' ? { padding: 'auto' } : { paddingLeft: 0, paddingBottom: 0 }}>
         {trackerData.options.trackerType == 'binary' ? <ChartBar chartData={trackerData.data} icons={trackerData.options.binaryIcons} /> : <ChartLine chartData={trackerData.data} unit={trackerData.options.unit} />}
        </Card>
       </Col>
      </Row>
      <Row gutter={16}>
       {trackerData.options.trackerType != 'binary' && (
        <Col className="mt-4" md={24} lg={12}>
         <Card title="Trends">
          <Col span={12}>
           <Trend tracker={trackerData} type="last" />
          </Col>
          <Col span={12}>
           <Trend tracker={trackerData} type="overall" />
          </Col>
         </Card>
        </Col>
       )}
       <Col className="mt-4" md={24} lg={trackerData.options.trackerType != 'binary' ? 12 : 24}>
        <Card title="Stats">
         <Col sm={24} md={8}>
          <Statistic title="Tracking since" value={trackingFor} />
         </Col>
         <Col sm={24} md={8}>
          <Statistic title="Tracking for" value={trackingSince} suffix="days" />
         </Col>
         <Col sm={24} md={8}>
          <Statistic title="Number of entries" value={sortedEntries.length} />
         </Col>
        </Card>
       </Col>
      </Row>
     </React.Fragment>
    )}

    {Object.keys(trackerData.data).length ? (
     <Card className="my-4" bodyStyle={{ padding: 0 }}>
      <DataTable tracker={trackerData} />
     </Card>
    ) : (
     <Empty description="No entries" />
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
     {this.state.addTrackerEntryModalVisibility ? <AddEditTrackerEntry tracker={trackerData} closeModal={this.dismissModal} /> : <EditCategoryTracker itemToEdit={trackerData} itemType="tracker" closeModal={this.dismissModal} />}
    </Modal>

    <Button style={{ position: 'absolute', bottom: '1em', right: '1em' }} type="primary" shape="circle" icon="plus" size="large" onClick={() => this.showModal('addTrackerEntry')} />
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