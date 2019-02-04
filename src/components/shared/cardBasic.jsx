import React from 'react';
import {Card, Icon} from 'antd';

export default class CardBasic extends React.Component {
    render() {
        return (
            <Card bodyStyle={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} headStyle={{display: 'flex', justifyContent: 'center'}} title={<span><Icon type={this.props.icon} /> {this.props.title}</span>} bordered={false}>
                {this.props.children}
            </Card>
        )
    }
}