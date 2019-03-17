import React from 'react';
import { InputNumber } from 'antd';

export default function Custom(props) {
 return <InputNumber onChange={value => props.emitEntryValue(value)} />;
}
