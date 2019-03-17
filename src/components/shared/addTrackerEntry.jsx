import React from 'react';
import { connect } from 'react-redux';
import { addTrackerData } from '../../state/state';
import { Row, Form, Button, Input, Icon, DatePicker } from 'antd';
import Binary from './addTrackerEntry/binary';
import Rating from './addTrackerEntry/rating';
import Custom from './addTrackerEntry/custom';

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

class AddTrackerEntryForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tracker: this.props.itemToAdd,
   valueFieldTouched: false
  };
 }

 setEntryValue = val => {
  this.setState({ ...this.state, entryValue: val, valueFieldTouched: true });
 };

 handleFormSubmit = event => {
  event.preventDefault();
  this.setState({ valueFieldTouched: true });
  this.props.form.validateFields(error => {
   if (!error) {
    this.props.addTrackerData(this.state.tracker.address, this.state.entryValue, this.state.entryTime, this.state.notes);
    this.props.closeModal(true);
   }
  });
 };

 render() {
  const timeFieldError = this.props.form.getFieldError('time');
  const valueFieldError = this.state.valueFieldTouched && !(this.state.entryValue || this.state.entryValue == 0) ? true : false;

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
      ]
     })(
      <DatePicker
       showTime
       disabledSeconds
       allowClear={false}
       format="DD.MM.YYYY H:mm"
       placeholder="Select date and time"
       onChange={moment => this.setState({ entryTime: moment ? moment._d : null })}
       onOk={moment => this.setState({ entryTime: moment ? moment._d : null })}
      />
     )}
    </Form.Item>
    <Form.Item label="Value" {...formItemLayout} validateStatus={valueFieldError ? 'error' : ''} help={valueFieldError ? 'Please, provide entry value.' : ''}>
     {this.state.tracker.options.trackerType == 'binary' && <Binary icons={this.state.tracker.options.binaryIcons} emitEntryValue={this.setEntryValue} />}
     {this.state.tracker.options.trackerType == 'rating' && <Rating range={this.state.tracker.options.ratingRange} emitEntryValue={this.setEntryValue} />}
     {this.state.tracker.options.trackerType == 'custom' && <Custom onClick={() => console.log('blur')} emitEntryValue={this.setEntryValue} />}
    </Form.Item>
    <Form.Item label="Notes" {...formItemLayout}>
     <Input.TextArea rows={2} onChange={event => this.setState({ notes: event.target.value })} />
    </Form.Item>
    <Row type="flex" justify="end">
     <Button type="primary" htmlType="submit" disabled={hasErrors(this.props.form.getFieldsError(), this.state.entryValue)}>
      <span className="text-vertical-middle">
       <Icon type="plus" /> Add
      </span>
     </Button>
    </Row>
   </Form>
  );
 }
}

const wrappedForm = Form.create({ name: 'add_tracker_entry' })(AddTrackerEntryForm);

const mapDispatchToProps = {
 addTrackerData
};
export default connect(
 null,
 mapDispatchToProps
)(wrappedForm);
