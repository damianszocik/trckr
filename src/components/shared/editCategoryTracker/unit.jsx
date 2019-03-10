import React from 'react';
import { Form, Input } from 'antd';

export default function Unit(props) {
 return (
  <Form.Item label="tracker unit" {...props.formItemLayout}>
   <Input value={props.defaultValue} onChange={event => props.extraFieldValue({ field: 'unit', value: event.target.value })} />
  </Form.Item>
 );
}
