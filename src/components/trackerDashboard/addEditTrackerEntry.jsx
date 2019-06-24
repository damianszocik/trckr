import React from 'react';
import { connect } from 'react-redux';
import { addTrackerData, editTrackerEntry } from '../../actions/data';
import { Row, Form, Button, Input, Icon, DatePicker } from 'antd';
import Binary from './addEditTrackerEntry/binary';
import Rating from './addEditTrackerEntry/rating';
import Custom from './addEditTrackerEntry/custom';
import moment from 'moment';

const formItemLayout = {
 labelCol: {
  xs: { span: 8 }
 },
 wrapperCol: {
  xs: { span: 16 }
 }
};

function hasErrors(fieldsError, valueField) {
 let notValid = Object.keys(fieldsError).some(field => fieldsError[field]);
 if (!(valueField || valueField == 0)) {
  notValid = true;
 }
 return notValid;
}

class AddEditTrackerEntryForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tracker: this.props.tracker,
   valueFieldTouched: false,
   value: this.props.editedEntry ? this.props.editedEntry.entryData.value : undefined,
   dateTime: this.props.editedEntry ? this.props.editedEntry.entryData.dateTime : undefined,
   note: this.props.editedEntry ? this.props.editedEntry.entryData.note : ''
  };
 }

 setEntryValue = val => {
  this.setState({ ...this.state, value: val, valueFieldTouched: true });
 };

 handleFormSubmit = event => {
  event.preventDefault();
  this.setState({ valueFieldTouched: true });
  this.props.form.validateFields(error => {
   if (!error) {
    if (this.props.editedEntry) {
     const updatedValues = { value: this.state.value, dateTime: this.state.dateTime, note: this.state.note };
     this.props.editTrackerEntry(this.state.tracker.address, this.props.editedEntry.entryId, updatedValues);
    } else {
     this.props.addTrackerData(this.state.tracker.address, this.state.value, this.state.dateTime, this.state.note);
    }

    this.props.closeModal(true);
   }
  });
 };

 render() {
  const timeFieldError = this.props.form.getFieldError('time');
  const valueFieldError = this.state.valueFieldTouched && !(this.state.value || this.state.value == 0) ? true : false;

  return (
   <Form layout="vertical" hideRequiredMark onSubmit={this.handleFormSubmit}>
    <Form.Item label="Entry time" {...formItemLayout} validateStatus={timeFieldError ? 'error' : ''}>
     {this.props.form.getFieldDecorator('time', {
      rules: [
       {
        type: 'object',
        required: true,
        message: 'Please, select entry date and time.'
       }
      ],
      initialValue: this.props.editedEntry ? moment(this.props.editedEntry.entryData.dateTime) : undefined
     })(<DatePicker showTime disabledSeconds allowClear={false} format="DD.MM.YYYY H:mm" placeholder="Select date and time" onChange={moment => this.setState({ dateTime: moment ? moment.toJSON() : null })} onOk={moment => this.setState({ dateTime: moment ? moment.toJSON() : null })} />)}
    </Form.Item>
    <Form.Item label="Value" {...formItemLayout} validateStatus={valueFieldError ? 'error' : ''} help={valueFieldError ? 'Please, provide entry value.' : ''}>
     {this.state.tracker.options.trackerType == 'binary' && <Binary icons={this.state.tracker.options.binaryIcons} initialVal={this.props.editedEntry ? this.props.editedEntry.entryData.value : null} emitEntryValue={this.setEntryValue} />}
     {this.state.tracker.options.trackerType == 'rating' && <Rating range={this.state.tracker.options.ratingRange} initialVal={this.props.editedEntry ? this.props.editedEntry.entryData.value : null} emitEntryValue={this.setEntryValue} />}
     {this.state.tracker.options.trackerType == 'custom' && <Custom initialVal={this.props.editedEntry ? this.props.editedEntry.entryData.value : null} emitEntryValue={this.setEntryValue} />}
    </Form.Item>
    <Form.Item label="Notes" {...formItemLayout}>
     <Input.TextArea defaultValue={this.props.editedEntry ? this.props.editedEntry.entryData.note : ''} rows={2} onChange={event => this.setState({ note: event.target.value })} />
    </Form.Item>
    <Row type="flex" justify="end">
     <Button type="primary" htmlType="submit" disabled={this.props.editedEntry ? false : hasErrors(this.props.form.getFieldsError(), this.state.value)}>
      <span className="text-vertical-middle">
       {this.props.editedEntry ? (
        <React.Fragment>
         <Icon type="save" /> Save
        </React.Fragment>
       ) : (
        <React.Fragment>
         <Icon type="plus" /> Add
        </React.Fragment>
       )}
      </span>
     </Button>
    </Row>
   </Form>
  );
 }
}

const wrappedForm = Form.create({ name: 'add_tracker_entry' })(AddEditTrackerEntryForm);

const mapDispatchToProps = {
 addTrackerData,
 editTrackerEntry
};
export default connect(
 null,
 mapDispatchToProps
)(wrappedForm);
