/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon, Row, Col, Typography, Spin } from 'antd';
import EditCategoryTracker from 'components/shared/editCategoryTracker';
import AddCategoryTracker from 'components/shared/addCategoryTracker';
import TrackerCard from 'components/categoryDashboard/trackerCard';
import CategoryCard from 'components/categoryDashboard/categoryCard';
import GoUpButton from 'components/shared/goUpButton';
import FloatingAddButton from 'components/shared/floatingAddButton';
import NotFound from 'components/shared/notFound';
import NotFoundImage from 'assets/img/not-found.svg';
import EmptyImage from 'assets/img/empty.svg';

let categoryData;
class CategoryDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCategoryTrackerModalVisibility: false,
      editCategoryTrackerModalVisibility: false,
      modalIcon: null,
      modalTitle: null,
      notFound: false
    };
  }

  componentDidMount() {
    //5s to search for category in redux store, after that considered as not found
    if (this.props.mainDashboardData) {
      this.setState({ notFound: false });
    } else if (this.props.match.params.id.length == 13 && typeof this.props.match.params.id == 'string') {
      setTimeout(() => {
        if (!categoryData) {
          this.setState({ notFound: true });
        }
      }, 5000);
    } else {
      this.setState({ notFound: true });
    }
  }

  dismissModal = () => {
    this.setState({
      addCategoryTrackerModalVisibility: false,
      editCategoryTrackerModalVisibility: false,
      modalIcon: null,
      modalTitle: null
    });
  };
  showModal = type => {
    this.setState({
      [`${type}ModalVisibility`]: true,
      modalTitle: type == 'addCategoryTracker' ? 'Add' : 'Edit',
      modalIcon: type == 'addCategoryTracker' ? 'plus' : 'edit'
    });
  };
  getCategoryData = (id, store) => {
    for (let i = 0; i < Object.keys(store).length; i++) {
      let currentStoreItem = store[Object.keys(store)[i]];
      if (currentStoreItem.id == id) {
        categoryData = currentStoreItem;
      } else if (currentStoreItem.type == 'category' && Object.keys(currentStoreItem.data).length) {
        this.getCategoryData(id, currentStoreItem.data);
      }
    }
  };

  render() {
    if (this.props.mainDashboardData) {
      categoryData = this.props.mainDashboardData;
    } else {
      this.getCategoryData(this.props.match.params.id, this.props.storeData);
    }
    if (categoryData) {
      return (
        <React.Fragment>
          <div className="flex flex-justify-between">
            <Typography.Title className="mb-0" level={2}>
              <span>
                {!this.props.mainDashboardData && <Icon type="folder" />}
                <span className="mx-1">{categoryData.name}</span>
              </span>
            </Typography.Title>
            {!this.props.mainDashboardData && (
              <Typography.Title level={2} className="m-0">
                <GoUpButton additionalClassName="mr-1" address={categoryData.address} />
                <a title="Edit category">
                  <Icon onClick={() => this.showModal('editCategoryTracker')} type="edit" />
                </a>
              </Typography.Title>
            )}
          </div>

          <Row>
            <Col span={24}>
              <Typography.Text>{categoryData.description}</Typography.Text>
            </Col>
          </Row>
          {Object.keys(categoryData.data).length ? (
            <Row className="mt-3" gutter={16} type="flex">
              {Object.keys(categoryData.data).map(element => {
                return categoryData.data[element].type == 'tracker' ? (
                  <Col className="flex" key={categoryData.data[element].id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                    <TrackerCard tracker={categoryData.data[element]} />
                  </Col>
                ) : (
                  <Col className="flex" key={categoryData.data[element].id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                    <CategoryCard category={categoryData.data[element]} />
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="mt-5">
              <NotFound message="No data so far." image={EmptyImage} />
              <Row type="flex" justify="center">
                <Col>
                  <Typography.Paragraph className="mt-2 font-size-120" level={4}>
                    Use a "plus" button in the right bottom corner to add some.
                  </Typography.Paragraph>
                </Col>
              </Row>
            </div>
          )}
          <Modal
            title={
              <div style={{ textAlign: 'center' }}>
                <Icon type={this.state.modalIcon} />
                <span className="pl-1">{this.state.modalTitle}</span>
              </div>
            }
            footer={false}
            visible={this.state.addCategoryTrackerModalVisibility || this.state.editCategoryTrackerModalVisibility}
            onCancel={this.dismissModal}
            destroyOnClose
            centered={true}>
            {this.state.addCategoryTrackerModalVisibility ? (
              <AddCategoryTracker
                category={!this.props.mainDashboardData ? categoryData.name : undefined}
                categoryAddress={!this.props.mainDashboardData ? categoryData.address : undefined}
              />
            ) : (
              <EditCategoryTracker itemToEdit={categoryData} itemType="category" closeModal={this.dismissModal} />
            )}
          </Modal>
          <FloatingAddButton clickHandler={() => this.showModal('addCategoryTracker')} />
        </React.Fragment>
      );
    } else if (this.state.notFound) {
      return <NotFound message="Can't find a category with the provided id." image={NotFoundImage} />;
    } else {
      return (
        <div className="width-100 height-100 flex flex-justify-center flex-align-center">
          <Spin size="large" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { storeData: state.data };
};

export default connect(mapStateToProps)(CategoryDashboard);
