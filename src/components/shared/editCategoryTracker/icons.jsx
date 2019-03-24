import React from 'react';
import { Form, Radio, Row, Col, Icon } from 'antd';

export default function Icons(props) {
 return (
  <Form.Item label="tracker icons" {...props.formItemLayout}>
   <Radio.Group
    defaultValue={JSON.stringify(props.defaultValue)}
    className="flex flex-justify-between"
    onChange={event => props.extraFieldValue({ field: 'binaryIcons', value: JSON.parse(event.target.value) })}>
    <Row>
     <Col className="mb-4" span={12}>
      <Radio className="font-size-150" value='{"good":"like","bad":"dislike"}'>
       <Icon className="text-vertical-middle" type="like" />
       &nbsp;
       <Icon className="text-vertical-middle" type="dislike" />
      </Radio>
     </Col>
     <Col className="mb-4" span={12}>
      <Radio className="font-size-150" value='{"good":"check","bad":"close"}'>
       <Icon className="text-vertical-middle" type="check" />
       &nbsp;
       <Icon className="text-vertical-middle" type="close" />
      </Radio>
     </Col>
     <Col span={12}>
      <Radio className="font-size-150" value='{"good":"plus","bad":"minus"}'>
       <Icon className="text-vertical-middle" type="plus" />
       &nbsp;
       <Icon className="text-vertical-middle" type="minus" />
      </Radio>
     </Col>
     <Col span={12}>
      <Radio className="font-size-150" value='{"good":"smile","bad":"frown"}'>
       <Icon className="text-vertical-middle" type="smile" />
       &nbsp;
       <Icon className="text-vertical-middle" type="frown" />
      </Radio>
     </Col>
    </Row>
   </Radio.Group>
  </Form.Item>
 );
}
