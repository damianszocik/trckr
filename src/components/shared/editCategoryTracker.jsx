import React from 'react';
import { connect } from 'react-redux';
import { editCategoryTrackerData } from '../../state/state';
import { Form, Button, Input } from 'antd';

const formItemLayout = {
 labelCol: {
  xs: { span: 8 }
 },
 wrapperCol: {
  xs: { span: 16 }
 }
};
function hasErrors(fieldsError) {
 return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class editCategoryTrackerForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   itemToEdit: this.props.itemToEdit
  };
 }
 componentDidMount() {
  this.setState({ itemToEdit: this.props.itemToEdit });
  this.props.form.validateFields();
  this.props.form.setFieldsValue({ name: this.state.itemToEdit.name });
 }
 handleSaveButton = event => {
  event.preventDefault();
  this.props.form.validateFields(error => {
   if (!error) {
    this.props.editCategoryTrackerData(this.state.itemToEdit);
    this.props.closeModal(true);
   }
  });
 };
 render() {
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  const nameError = isFieldTouched('name') && getFieldError('name');

  return (
   <Form layout="vertical" hideRequiredMark onSubmit={this.handleSaveButton}>
    <Form.Item label={`${this.props.itemType} name`} validateStatus={nameError ? 'error' : ''} help={nameError || ''} {...formItemLayout}>
     {getFieldDecorator('name', {
      rules: [{ required: true, message: `Please, input ${this.props.itemType} name!` }]
     })(<Input onChange={event => this.setState({ itemToEdit: { ...this.state.itemToEdit, name: event.target.value } })} />)}
    </Form.Item>
    <Form.Item label={`${this.props.itemType} description`} {...formItemLayout}>
     <Input.TextArea
      value={this.state.itemToEdit.description}
      onChange={event => this.setState({ itemToEdit: { ...this.state.itemToEdit, description: event.target.value } })}
     />
    </Form.Item>
    <Form.Item>
     <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
      Save
     </Button>
    </Form.Item>
   </Form>
  );
 }
}

const wrappedForm = Form.create({ name: 'edit_category_tracker_form' })(editCategoryTrackerForm);

const mapDispatchToProps = {
 editCategoryTrackerData
};
export default connect(
 null,
 mapDispatchToProps
)(wrappedForm);
