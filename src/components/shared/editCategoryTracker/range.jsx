import React from 'react';
import { Form, InputNumber } from 'antd';

export default function Range(props) {
 return (
  <Form.Item label="tracker range" {...props.formItemLayout}>
   <InputNumber min={3} max={10} defaultValue={props.defaultValue} onChange={value => props.extraFieldValue({ field: 'range', value: value })} />
  </Form.Item>
 );
}
