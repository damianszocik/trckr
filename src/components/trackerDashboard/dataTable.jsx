import React from 'react';
import { connect } from 'react-redux';
import { removeTrackerData } from '../../state/state';
import AddEditTrackerEntry from './addEditTrackerEntry';
import { Table, Rate, Icon, Popconfirm, message, Modal } from 'antd';
import moment from 'moment';

export class DataTable extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   editTrackerEntryModalVisibility: false,
   filteredInfo: null,
   sortedInfo: null
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
     return value;
     break;
    default:
     return <span>---</span>;
   }
  };
  for (let entry in data) {
   result.push({
    key: entry,
    value: valueRecord(data[entry].value),
    date: new Date(data[entry].dateTime).toLocaleDateString(),
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
  let valueSorter;
  switch (this.props.tracker.options.trackerType) {
   case 'binary':
    valueSorter = undefined;
    break;
   case 'custom':
    valueSorter = (a, b) => (a ? a.value - b.value : null);
    break;
   case 'rating':
    valueSorter = (a, b) => (a.value.props ? a.value.props.value - b.value.props.value : null);
    break;
  }

  const tableColumns = [
   {
    title: 'Value' + (this.props.tracker.options.unit ? ` (${this.props.tracker.options.unit})` : ''),
    dataIndex: 'value',
    key: 'value',
    sorter: valueSorter,
    sortDirections: ['descend', 'ascend'],
    filters:
     this.props.tracker.options.trackerType == 'binary'
      ? [
         {
          text: <Icon type={this.props.tracker.options.binaryIcons.good} />,
          value: this.props.tracker.options.binaryIcons.good
         },
         {
          text: <Icon type={this.props.tracker.options.binaryIcons.bad} />,
          value: this.props.tracker.options.binaryIcons.bad
         }
        ]
      : undefined,
    onFilter: this.props.tracker.options.trackerType == 'binary' ? (value, record) => record.value.props.type == value : undefined
   },
   {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => new moment(a.date, 'DD.MM.YYYY').format('YYYYMMDD') - new moment(b.date, 'DD.MM.YYYY').format('YYYYMMDD'),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend'
   },
   {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    sorter: (a, b) => new moment(a.time, 'HH:mm:ss').format('HHmmss') - new moment(b.time, 'HH:mm:ss').format('HHmmss'),
    sortDirections: ['descend', 'ascend']
   },
   {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
   }
  ];

  const trackerTableData = this.parseTrackerData(this.props.tracker.data);

  return (
   <React.Fragment>
    <Table
     pagination={false}
     expandedRowRender={record => record.notes}
     dataSource={trackerTableData}
     onChange={this.handleTableState}
     columns={tableColumns}
    />
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
