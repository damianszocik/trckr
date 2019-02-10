import React from 'react';
import { Input, Icon, Radio, TreeSelect } from 'antd';

export default class addCategoryTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'category',
      addValue: '',
      initCategoryProps: '',
      addCategory: this.props.category || 'main-category'
    };
  }
  handleSelection = event => {
    this.setState({
      selection: event.target.value,
      initCategoryProps: event.target.value
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
  renderCategories = items => {
    let result = [];
    result.push(
      items.map(el => {
        if (el.type == 'category' && el.data.length) {
          return (
            <TreeSelect.TreeNode value={el.name} title={el.name} key={el.name}>
              {this.renderCategories(el.data)}
            </TreeSelect.TreeNode>
          );
        } else if (el.type == 'category') {
          return <TreeSelect.TreeNode value={el.name} title={el.name} key={el.name} />;
        }
      })
    );
    return result;
  };
  componentDidUpdate() {
    if (this.props.category && this.props.category != this.state.initCategoryProps) {
      this.setState({
        initCategoryProps: this.props.category,
        addCategory: this.props.category
      });
    }
  }
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
            <TreeSelect
              style={{ width: '40%' }}
              defaultValue={this.state.addCategory}
              value={this.state.addCategory}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Select category"
              onSelect={value => {
                this.setState({ addCategory: value });
              }}>
              <TreeSelect.TreeNode
                value="main-category"
                title={
                  <span>
                    <Icon type="home" theme="filled" /> Main Category
                  </span>
                }
                key="main-category"
              />
              {this.renderCategories(this.props.store)}
            </TreeSelect>
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
