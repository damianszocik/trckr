import React from 'react';
import { Card, Row, Col, Icon, Typography } from 'antd';
import { Link } from 'react-router-dom';

const countValues = category => {
    let trackers = 0;
    let categories = 0;

    for (let el in category.data) {
        if (category.data[el].type == 'category') {
            categories++;
        } else if (category.data[el].type == 'tracker') {
            trackers++;
        }
    }
    return { trackers, categories };
};

const CardHeader = () => {
    return (
        <Row>
            <Col>
                <Typography.Text type="secondary">
                    <Icon type="folder" /> Category
                </Typography.Text>
            </Col>
        </Row>
    )
}

export default function CategoryCard(props) {
    return (
        <Card
            className="mt-4 flex flex-column"
            title={<CardHeader />}
            style={{ width: '100%' }}
            bodyStyle={{ flexGrow: 1 }}>
            <div className="height-100 flex flex-column flex-justify-between">
                <Row className="mb-4">
                    <Col>
                        <Typography.Title className="m-0" level={4}>{props.category.name}</Typography.Title>
                    </Col>
                </Row>
                {Object.keys(props.category.data).length ? (
                    <React.Fragment>
                        <Row>
                            <Col>
                                <Typography.Text>
                                    <Icon type="folder" className="mr-1" />
                                    {countValues(props.category).categories} {countValues(props.category).categories === 1 ? 'category' : 'categories'}
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col>
                                <Typography.Text>
                                    <Icon type="stock" className="mr-1" />
                                    {countValues(props.category).trackers} {countValues(props.category).trackers === 1 ? 'tracker' : 'trackers'}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </React.Fragment>) : (
                        <Row className="my-2">
                            <Col>
                                <Typography.Text>
                                    <Icon type="info-circle" className="mr-1" />Empty category
               </Typography.Text>
                            </Col>
                        </Row>
                    )}
                <Row className="mt-4">
                    <Col>
                        <Link to={`/category/${props.category.id}`}>
                            Open
                   <Icon type="arrow-right" className="ml-1" />
                        </Link>
                    </Col>
                </Row>
            </div>
        </Card>
    );
}
