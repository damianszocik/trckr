import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Unit from './editCategoryTracker/unit';
import Range from './editCategoryTracker/range';
import Icons from './editCategoryTracker/icons';
import { editCategoryTrackerData, removeCategoryTracker } from '../../state/state';
import { Form, Button, Input, InputNumber, Radio, Icon, Row, Col } from 'antd';

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
   removeWarning: false,
   parentRoute: null,
   itemToEdit: this.props.itemToEdit
  };
 }
 componentDidMount() {
  this.setState({ itemToEdit: this.props.itemToEdit });
  this.computeTrackerOptionsFieled();
  this.props.form.validateFields();
  this.props.form.setFieldsValue({ name: this.state.itemToEdit.name });
  this.computeParentRoute(this.state.itemToEdit);
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
 computeTrackerOptionsFieled = () => {
  if (this.state.itemToEdit.type == 'tracker') {
   let extraField;
   switch (this.state.itemToEdit.options.trackerType) {
    case 'custom':
     extraField = 'unit';
     break;
    case 'binary':
     extraField = 'icons';
     break;
    case 'rating':
     extraField = 'range';
     break;
   }
   this.setState({ extraField });
  }
 };
 computeParentRoute(childItem) {
  const parentId = childItem.address[childItem.address.length - 2].id;
  this.setState({ parentRoute: `/category/${parentId}` });
 }
 extraFieldValue = data => {
  this.setState({ itemToEdit: { ...this.state.itemToEdit, options: { ...this.state.itemToEdit.options, [data.field]: data.value } } });
 };
 render() {
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  const nameError = isFieldTouched('name') && getFieldError('name');
  if (!this.state.removeWarning) {
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
     {this.state.extraField == 'unit' && (
      <Unit formItemLayout={formItemLayout} defaultValue={this.state.itemToEdit.options.unit} extraFieldValue={this.extraFieldValue} />
     )}
     {this.state.extraField == 'range' && (
      <Range formItemLayout={formItemLayout} defaultValue={this.state.itemToEdit.options.ratingRange} extraFieldValue={this.extraFieldValue} />
     )}
     {this.state.extraField == 'icons' && (
      <Icons formItemLayout={formItemLayout} defaultValue={this.state.itemToEdit.options.binaryIcons} extraFieldValue={this.extraFieldValue} />
     )}
     <Form.Item>
      <Row type="flex" justify="end">
       <Button className="mr-2" type="danger" onClick={() => this.setState({ removeWarning: true })}>
        {`Remove ${this.state.itemToEdit.type}`}
       </Button>
       <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
        Save
       </Button>
      </Row>
     </Form.Item>
    </Form>
   );
  } else {
   return (
    <div>
     <Row type="flex" justify="center">
      {
       <span>
        Are you sure you want to remove <strong>{this.state.itemToEdit.name}</strong> {this.state.itemToEdit.type}?
       </span>
      }
     </Row>
     <Row className="mt-4" type="flex" justify="end">
      <Button className="mr-2" type="default" onClick={() => this.setState({ removeWarning: false })}>
       Cancel
      </Button>
      <Route
       render={({ history }) => (
        <Button
         type="primary"
         onClick={() => {
          history.push(this.state.parentRoute);
          this.props.removeCategoryTracker(this.state.itemToEdit.id, this.state.itemToEdit.address);
         }}>
         Remove
        </Button>
       )}
      />
     </Row>
    </div>
   );
  }
 }
}

const wrappedForm = Form.create({ name: 'edit_category_tracker_form' })(editCategoryTrackerForm);

const mapDispatchToProps = {
 editCategoryTrackerData,
 removeCategoryTracker
};
export default connect(
 null,
 mapDispatchToProps
)(wrappedForm);
