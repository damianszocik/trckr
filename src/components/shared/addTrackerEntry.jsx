import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon } from 'antd';

const formItemLayout = {
 labelCol: {
  xs: { span: 8 }
 },
 wrapperCol: {
  xs: { span: 16 }
 }
};

export default class AddTrackerEntryForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 render() {
  return (
   <Form layout="vertical" hideRequiredMark onSubmit={this.handleSaveButton}>
    <Form.Item label="Value" {...formItemLayout}>
     <Input />
    </Form.Item>
    <Form.Item>
     <Button type="primary" htmlType="submit">
      <span className="text-vertical-middle">
       <Icon type="plus" /> Add
      </span>
     </Button>
    </Form.Item>
   </Form>
  );
 }
}
