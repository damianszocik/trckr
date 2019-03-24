import React from 'react';
import { InputNumber } from 'antd';

export default function Custom(props) {
 return <InputNumber defaultValue={props.initialVal} onChange={value => props.emitEntryValue(value)} />;
}
