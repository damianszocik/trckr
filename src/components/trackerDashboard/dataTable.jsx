import React from 'react';
import { connect } from 'react-redux';
import { removeTrackerData } from '../../state/state';
import AddEditTrackerEntry from './addEditTrackerEntry';
import { Table, Rate, Icon, Popconfirm, message, Modal } from 'antd';

const columns = [
 { title: 'Value', dataIndex: 'value', key: 'value' },
 {
  title: 'Date',
  dataIndex: 'date',
  key: 'date'
 },
 {
  title: 'Time',
  dataIndex: 'time',
  key: 'time'
 },
 {
  title: 'Action',
  dataIndex: 'action',
  key: ''
 }
];

export class DataTable extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   editTrackerEntryModalVisibility: false
  };
 }

 dismissModal = () => {
  this.setState({ editTrackerEntryModalVisibility: false });
 };

 editEntry = (entryData, entryId) => {
  this.setState({ ...this.state, editTrackerEntryModalVisibility: true, entryToEdit: { entryData, entryId } });
 };

 parseTrackerData = data => {
  let result = [];
  let valueRecord = value => {
   switch (this.props.tracker.options.trackerType) {
    case 'rating':
     return <Rate disabled count={this.props.tracker.options.ratingRange} value={value} />;
     break;
    case 'binary':
     return <Icon type={value == 'good' ? this.props.tracker.options.binaryIcons.good : this.props.tracker.options.binaryIcons.bad} />;
     break;
    case 'custom':
     return <span>{`${value} ${this.props.tracker.options.unit}`}</span>;
     break;
    default:
     return <span>---</span>;
   }
  };
  for (let entry in data) {
   result.push({
    key: entry,
    value: valueRecord(data[entry].value),
    date: new Date(data[entry].dateTime).toDateString(),
    time: new Date(data[entry].dateTime).toLocaleTimeString(),
    notes: data[entry].note,
    action: (
     <span>
      <Popconfirm
       title="Are you sure？"
       okText="Yes"
       cancelText="Cancel"
       onConfirm={() => this.props.removeTrackerData(this.props.tracker.address, entry)}
       icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
       <Icon className="cursor-pointer" type="delete" />
      </Popconfirm>
      <Icon className="cursor-pointer ml-2" type="edit" onClick={() => this.editEntry(data[entry], entry)} />
     </span>
    )
   });
  }
  return result;
 };

 render() {
  const trackerTableData = this.parseTrackerData(this.props.tracker.data);
  return (
   <React.Fragment>
    <Table pagination={false} expandedRowRender={record => record.notes} dataSource={trackerTableData} columns={columns} />
    <Modal
     title={
      <div style={{ textAlign: 'center' }}>
       <Icon type="edit" />
       <span className="pl-1">Edit entry</span>
      </div>
     }
     footer={false}
     visible={this.state.editTrackerEntryModalVisibility}
     onCancel={this.dismissModal}
     destroyOnClose
     centered={true}>
     <AddEditTrackerEntry tracker={this.props.tracker} editedEntry={this.state.entryToEdit} closeModal={this.dismissModal} />
    </Modal>
   </React.Fragment>
  );
 }
}

const mapDispatchToProps = {
 removeTrackerData
};

export default connect(
 null,
 mapDispatchToProps
)(DataTable);
