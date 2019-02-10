import React from 'react';
import { isMobile } from 'react-device-detect';
import AddCategoryTracker from '../components/shared/addCategoryTracker';
import { Layout, Empty, Row, Icon, Modal, Button, Divider } from 'antd';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalVisibility: false
    };
  }
  dismissAddModal = () => {
    this.setState({
      addModalVisibility: false
    });
    Modal.destroyAll();
  };
  showAddModal = () => {
    this.setState({
      addModalVisibility: true
    });
  };
  render() {
    return (
      <Layout.Content style={{ padding: 64 }}>
        <Row type="flex" justify="center" align="middle">
          <Empty />
        </Row>
        <Row style={{ marginTop: '5em' }} type="flex" justify="center" align="middle">
          <Divider>Add a Tracker or a Category</Divider>
          <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.showAddModal} />
          <Modal
            style={{ marginLeft: '200px' }}
            title={
              <div style={{ textAlign: 'center' }}>
                <Icon type="plus" />
                <span>Add</span>
              </div>
            }
            footer={false}
            visible={this.state.addModalVisibility}
            onCancel={this.dismissAddModal}
            centered={true}>
            <AddCategoryTracker store={this.props.store} addCategory={this.props.addCategory} addTracker={this.props.addTracker} />
          </Modal>
        </Row>
      </Layout.Content>
    );
  }
}
