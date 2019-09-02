import React from 'react';
import { Card, Icon, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import NoDataImage from 'assets/img/no-data.svg';

const CardHeader = ({ trackerType }) => {
    return (
        <Row>
            <Col>
                <Typography.Text type="secondary">
                    <Icon type="stock" /> <span className="text-capitalize">{trackerType}</span> tracker
                </Typography.Text>
            </Col>
        </Row>
    )
}
export default class TrackerCard extends React.Component {
    render() {
        return (
            <Card
                title={<CardHeader trackerType={this.props.tracker.options.trackerType} />}
                className="mt-4 flex flex-column"
                style={{ width: '100%' }}
                bodyStyle={{ flexGrow: 1 }}>
                <div className="height-100 flex flex-column flex-justify-between">
                    <Row className="mb-4">
                        <Col>
                            <Typography.Title className="m-0" level={4}>{this.props.tracker.name}</Typography.Title>
                        </Col>
                    </Row>
                    {Object.keys(this.props.tracker.data).length ? (
                        <React.Fragment>
                            <Row>
                                <Col>
                                    <Typography.Text>
                                        <Icon type="edit" className="mr-1" />
                                        {(new Date(this.props.tracker.lastModificationTime)).toLocaleString()}
                                    </Typography.Text>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col>
                                    <Typography.Text>
                                        <Icon type="diff" className="mr-1" />
                                        {Object.keys(this.props.tracker.data).length} entries
                                </Typography.Text>
                                </Col>
                            </Row>
                        </React.Fragment>) : (
                            <Row className="my-2">
                                <Col>
                                    <Typography.Text>
                                        <Icon type="info-circle" className="mr-1" />Empty tracker
                                </Typography.Text>
                                </Col>
                            </Row>
                        )}
                    <Row className="mt-4">
                        <Col>
                            <Link to={`/tracker/${this.props.tracker.id}`}>
                                Open
                                    <Icon type="arrow-right" className="ml-1" />
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Card>
        );
    }
}
