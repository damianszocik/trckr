import React from 'react';
import { Layout, Input, Select, Col, Row, Icon, Radio } from 'antd';

export default class addCategoryTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'category',
      addValue: '',
      addCategory: this.props.store[0].name
    };
  }
  handleSelection = event => {
    this.setState({
      selection: event.target.value
    });
  };
  handleAdd = () => {
    if (this.state.selection == 'category') {
      this.props.addCategory(this.state.addValue, this.state.addCategory);
    } else if (this.state.selection == 'tracker') {
      this.props.addTracker(this.state.addValue, this.state.addCategory);
    }
    this.setState({
      addValue: ''
    });
  };
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <Radio.Group defaultValue="category" size="large" onChange={this.handleSelection}>
            <Radio.Button value="category">
              <Icon type="folder" /> Category
            </Radio.Button>
            <Radio.Button value="tracker">
              <Icon type="line-chart" /> Tracker
            </Radio.Button>
          </Radio.Group>
        </div>
        {this.state.selection == 'category' ? (
          <div>Categories are convinient way to manage your trackers. Add one and keep you data organized!</div>
        ) : (
          <div>
            Trackers let's you collect and recap data. You can record your push-ups progress, time spent working, your weight or any other figure that's matters
            to you. Select category and start tracking!
          </div>
        )}
        <div>
          <Input.Group size="default" compact style={{ padding: '1em 0' }}>
            <Select
              style={{ width: '40%' }}
              defaultValue={this.state.addCategory}
              defaultActiveFirstOption={true}
              onChange={value => {
                this.setState({ addCategory: value });
              }}>
              <Select.Option key="" value="">
                <Icon type="home" theme="filled" /> Main category
              </Select.Option>
              {this.props.store.map(el => {
                if (el.type == 'category') {
                  return (
                    <Select.Option key={el.name} value={el.name}>
                      {el.name}
                    </Select.Option>
                  );
                }
              })}
            </Select>
            <Input.Search
              style={{ width: '60%' }}
              placeholder={`${this.state.selection} name`}
              enterButton={<Icon type="plus" />}
              value={this.state.addValue}
              onChange={event => {
                this.setState({ addValue: event.target.value });
              }}
              onSearch={this.handleAdd}
            />
          </Input.Group>
        </div>
      </div>
    );
  }
}
