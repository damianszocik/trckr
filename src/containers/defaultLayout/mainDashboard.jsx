import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import AddCategoryTracker from 'components/shared/addCategoryTracker';
import CategoryDashboard from './categoryDashboard';
import { Row, Icon, Modal, Button, Typography, Divider } from 'antd';
import WelcomeImage from 'assets/img/welcome.svg';

const WelcomeImageContainer = styled.img`
  max-width: ${isMobile ? '100%' : '60%'};
  margin: 24px 0;
`;

const TextContainer = styled.div`
  max-width: ${isMobile ? '100%' : '80%'};
  font-size: 1.2em;
  margin: 24px 0;
`;

function MainDashboard({ storeData }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const dismissAddModal = () => {
    setModalVisibility(false);
    Modal.destroyAll();
  };
  const showAddModal = () => {
    setModalVisibility(true);
  };
  return (
    <React.Fragment>
      {Object.keys(storeData) ? (
        <CategoryDashboard mainDashboardData={{address: [], data: { ...storeData }, description: '', name: 'Dashboard', type: 'category'}} />
      ) : (
        <React.Fragment>
          <Row>
            <Typography.Title className="text-center">Glad to see you here!</Typography.Title>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <WelcomeImageContainer src={WelcomeImage} />
          </Row>
          <Row type="flex" justify="center">
            <TextContainer>
              <Typography.Paragraph className="">
                Trckr let you keep, arrange and visualize data of any kind. In order to do that, you can use trackers and categories.
              </Typography.Paragraph>
              <Typography.Paragraph className="">
                Trackers let you collect and recap data. You can record any data that matters to you. You can choose between binary, range or custom type
                tracker.
              </Typography.Paragraph>
              <Typography.Paragraph className="">Categories are a way to keep your trackers organized.</Typography.Paragraph>
            </TextContainer>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Divider>Add a Tracker or a Category</Divider>
            <Button type="primary" shape="circle" icon="plus" size="large" onClick={showAddModal} />
          </Row>
        </React.Fragment>
      )}
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <Icon type="plus" />
            <span> Add</span>
          </div>
        }
        footer={false}
        visible={modalVisibility}
        onCancel={dismissAddModal}
        destroyOnClose
        centered={true}>
        <AddCategoryTracker />
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return { storeData: state.data };
};

export default connect(mapStateToProps)(MainDashboard);
