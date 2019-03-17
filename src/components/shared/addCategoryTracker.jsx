import React from 'react';
import { connect } from 'react-redux';
import { addCategory, addTracker } from '../../state/state';
import { Input, InputNumber, Icon, Radio, TreeSelect, Carousel, Button, Row, Col } from 'antd';

class addCategoryTracker extends React.Component {
 constructor(props) {
  super(props);
  this.stageSwitch = React.createRef();
  this.trackerTypeSwitch = React.createRef();
  this.binaryTrackerOptions = React.createRef();
  this.ratingTrackerOptions = React.createRef();
  this.customTrackerOptions = React.createRef();

  this.state = {
   selection: 'category',
   addValue: '',
   addDescription: '',
   addCategory: this.props.category || 'main-category',
   addCategoryAddress: this.props.categoryAddress || null,
   currentStage: 1,
   trackerType: 'binary',
   trackerOptions: {}
  };
 }
 handleAddSelection = event => {
  this.setState({
   selection: event.target.value
  });
 };
 handleAddButton = () => {
  if (this.state.selection == 'category' || (this.state.selection == 'tracker' && this.state.currentStage != 1)) {
   if (this.state.selection == 'category') {
    this.props.addCategory(this.state.addValue, this.state.addDescription, this.state.addCategoryAddress);
   } else if (this.state.selection == 'tracker') {
    this.props.addTracker(this.state.addValue, this.state.addDescription, this.state.addCategoryAddress, this.state.trackerOptions);
   }
   this.setState({
    addValue: '',
    addDescription: ''
   });
   this.stageBack();
  } else {
   this.setState({ currentStage: 2 });
   this.stageSwitch.next();
   this.setState({ trackerOptions: { trackerType: 'binary', binaryIcons: JSON.parse(this.binaryTrackerOptions.state.value) } });
  }
 };
 handleTrackerTypeSelection = event => {
  this.setState({ trackerType: event.target.value });
  switch (event.target.value) {
   case 'binary':
    this.trackerTypeSwitch.goTo(0);
    this.setState({ trackerOptions: { trackerType: 'binary', binaryIcons: JSON.parse(this.binaryTrackerOptions.state.value) } });
    break;
   case 'rating':
    this.trackerTypeSwitch.goTo(1);
    this.setState({
     trackerOptions: {
      trackerType: 'rating',
      ratingRange: this.ratingTrackerOptions.state ? this.ratingTrackerOptions.state.value : this.ratingTrackerOptions.props.defaultValue
     }
    });
    break;
   case 'custom':
    this.trackerTypeSwitch.goTo(2);
    this.setState({ trackerOptions: { trackerType: 'custom', unit: this.customTrackerOptions.state.value || '' } });
    break;
  }
 };
 renderCategories = items => {
  let result = [];
  result.push(
   Object.keys(items).map(item => {
    let currentItem = items[item];
    if (currentItem.type == 'category' && Object.keys(currentItem.data).length) {
     return (
      <TreeSelect.TreeNode value={currentItem.name} title={currentItem.name} key={currentItem.id} address={currentItem.address}>
       {this.renderCategories(currentItem.data)}
      </TreeSelect.TreeNode>
     );
    } else if (currentItem.type == 'category') {
     return <TreeSelect.TreeNode value={currentItem.name} title={currentItem.name} key={currentItem.id} address={currentItem.address} />;
    }
   })
  );
  return result;
 };
 stageBack = () => {
  this.setState({ currentStage: 1 });
  this.stageSwitch.prev();
 };
 render() {
  return (
   <div>
    <Carousel infinite={false} speed="300" accessibility={false} dots={false} cssEase="ease-in-out" ref={node => (this.stageSwitch = node)}>
     <div>
      <Row>
       <div className="flex flex-justify-center mb-3">
        <Radio.Group defaultValue="category" size="large" onChange={this.handleAddSelection}>
         <Radio.Button value="category">
          <Icon type="folder" /> Category
         </Radio.Button>
         <Radio.Button value="tracker">
          <Icon type="line-chart" /> Tracker
         </Radio.Button>
        </Radio.Group>
       </div>
       {this.state.selection == 'category' ? (
        <div className="text-justify mb-1">Categories are convinient way to manage your trackers. Add one and keep you data organized!</div>
       ) : (
        <div className="text-justify mb-1">
         Trackers let's you collect and recap data. You can record your push-ups progress, time spent working, your weight or any other figure that matters to
         you. Select category and start tracking!
        </div>
       )}
       <div>
        <Input.Group size="default" compact className="py-2">
         <TreeSelect
          className="width-50"
          defaultValue={this.state.addCategory}
          value={this.state.addCategory}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select category"
          onSelect={(value, event) => {
           this.setState({ addCategory: value, addCategoryAddress: event.props.address });
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
          {this.renderCategories(this.props.storeData)}
         </TreeSelect>
         <Input
          className="width-50"
          placeholder={`${this.state.selection} name`}
          value={this.state.addValue}
          onChange={event => {
           this.setState({ addValue: event.target.value });
          }}
          onPressEnter={this.handleAddButton}
         />
        </Input.Group>
       </div>
       <div>
        <Input.TextArea
         placeholder={`${this.state.selection} description`}
         value={this.state.addDescription}
         onChange={event => {
          this.setState({ addDescription: event.target.value });
         }}
         autosize
        />
       </div>
      </Row>
     </div>
     <div>
      <Row>
       <Col span={24} className="text-center pb-2">
        <strong>Tracker type</strong>
       </Col>
      </Row>
      <Row type="flex" justify="center" className="pb-2">
       <Radio.Group defaultValue="binary" size="large" onChange={this.handleTrackerTypeSelection}>
        <Radio.Button value="binary">
         <Icon type="like" /> Binary
        </Radio.Button>
        <Radio.Button value="rating">
         <Icon type="star" /> Rating
        </Radio.Button>
        <Radio.Button value="custom">
         <Icon type="experiment" /> Custom
        </Radio.Button>
       </Radio.Group>
      </Row>
      <Carousel infinite={false} speed="300" accessibility={false} dots={false} cssEase="ease-in-out" ref={node => (this.trackerTypeSwitch = node)}>
       <div>
        <Row className="pb-2">
         Binary tracker has just two values. It's basically 0 or 1, but you can use it e.g. as done/undone, good/bad. Here are some icons that may help
         visualizing the values. Pick the one that suits your tracker best.
        </Row>
        <Row>
         <Radio.Group
          defaultValue='{"good":"like","bad":"dislike"}'
          className="flex flex-justify-between"
          onChange={event => {
           this.setState({ trackerOptions: { trackerType: 'binary', binaryIcons: JSON.parse(event.target.value) } });
          }}
          ref={node => (this.binaryTrackerOptions = node)}>
          <Radio className="font-size-150" value='{"good":"like","bad":"dislike"}'>
           <Icon className="text-vertical-middle" type="like" />
           &nbsp;
           <Icon className="text-vertical-middle" type="dislike" />
          </Radio>
          <Radio className="font-size-150" value='{"good":"check","bad":"close"}'>
           <Icon className="text-vertical-middle" type="check" />
           &nbsp;
           <Icon className="text-vertical-middle" type="close" />
          </Radio>
          <Radio className="font-size-150" value='{"good":"plus","bad":"minus"}'>
           <Icon className="text-vertical-middle" type="plus" />
           &nbsp;
           <Icon className="text-vertical-middle" type="minus" />
          </Radio>
          <Radio className="font-size-150" value='{"good":"smile","bad":"frown"}'>
           <Icon className="text-vertical-middle" type="smile" />
           &nbsp;
           <Icon className="text-vertical-middle" type="frown" />
          </Radio>
         </Radio.Group>
        </Row>
       </div>
       <div>
        <Row className="pb-2">
         Rating tracker allows to easily set value in spcified range. It's just like rating an item after purchase, hence the name. Customize allowed range of
         value in the tracker.
        </Row>
        <Row type="flex">
         <Col>
          <span className="text-vertical-sub">
           <strong>Value range</strong>:&nbsp;
          </span>
         </Col>
         <Col xs={12} md={6}>
          <InputNumber
           min={3}
           max={10}
           defaultValue={5}
           onChange={value => {
            this.setState({ trackerOptions: { trackerType: 'rating', ratingRange: value } });
           }}
           ref={node => (this.ratingTrackerOptions = node)}
          />
         </Col>
        </Row>
       </div>
       <div>
        <Row className="pb-2">This kind of tracker let's you evaluate any numeric value. Just set an unit and you're ready to go.</Row>
        <Row type="flex">
         <Col>
          <span className="text-vertical-sub">
           <strong>Tracker unit</strong>:&nbsp;
          </span>
         </Col>
         <Col xs={12} md={6}>
          <Input
           placeholder="e.g. reps"
           onChange={event => {
            this.setState({ trackerOptions: { trackerType: 'custom', unit: event.target.value } });
           }}
           onPressEnter={this.handleAddButton}
           ref={node => (this.customTrackerOptions = node)}
          />
         </Col>
        </Row>
       </div>
      </Carousel>
     </div>
    </Carousel>
    <Row type="flex" justify={this.state.currentStage == 1 ? 'end' : 'space-between'} className="pt-3">
     {this.state.currentStage == 2 ? (
      <Button type="default" onClick={this.stageBack}>
       <span className="text-vertical-middle">
        <Icon type="left" /> Overview
       </span>
      </Button>
     ) : null}
     <Button type="primary" onClick={this.handleAddButton}>
      {this.state.currentStage == 1 && this.state.selection == 'tracker' ? (
       <span className="text-vertical-middle">
        Details <Icon type="right" />
       </span>
      ) : (
       <span className="text-vertical-middle">
        <Icon type="plus" /> Add
       </span>
      )}
     </Button>
    </Row>
   </div>
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

const mapDispatchToProps = {
 addCategory,
 addTracker
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(addCategoryTracker);
