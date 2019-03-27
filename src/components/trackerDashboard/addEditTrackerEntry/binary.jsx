import React from 'react';
import { Radio, Icon } from 'antd';

export default function Binary(props) {
 return (
  <Radio.Group defaultValue={props.initialVal} onChange={event => props.emitEntryValue(event.target.value)}>
   <Radio className="font-size-150" value={'good'}>
    <Icon className="text-vertical-middle" type={props.icons.good} />
   </Radio>
   <Radio className="font-size-150" value={'bad'}>
    <Icon className="text-vertical-middle" type={props.icons.bad} />
   </Radio>
  </Radio.Group>
 );
}
