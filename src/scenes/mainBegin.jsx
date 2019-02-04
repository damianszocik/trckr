import React from 'react';
import CardBasic from '../components/shared/cardBasic';
import AddCategoryTracker from '../components/shared/addCategoryTracker';
import { Layout, Input, Select, Col, Row, Icon, Radio } from 'antd';

export default class MainBegin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout.Content style={{ padding: 64 }}>
        <Row>
          <Col span={24} lg={12}>
            <CardBasic title="Add" icon="plus">
              <AddCategoryTracker store={this.props.store} addCategory={this.props.addCategory} addTracker={this.props.addTracker} />
            </CardBasic>
          </Col>
        </Row>
      </Layout.Content>
    );
  }
}
