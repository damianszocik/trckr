import React from 'react';
import { Rate } from 'antd';

export default function Rating(props) {
 return <Rate defaultValue={props.initialVal ? props.initialVal : ''} count={props.range} onChange={value => props.emitEntryValue(value)} />;
}
