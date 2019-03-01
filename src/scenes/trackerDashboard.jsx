import React from 'react';
import { connect } from 'react-redux';

class TrackerDashboard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   result: null
  };
 }
 componentDidMount() {
  this.getTrackerDataToState(this.props.match.params.id, this.props.storeData);
 }
 componentDidUpdate(prevProps) {
  if (prevProps.match.params.id != this.props.match.params.id) {
   this.getTrackerDataToState(this.props.match.params.id, this.props.storeData);
  }
 }
 getTrackerDataToState = (id, store) => {
  for (let i = 0; i < store.length; i++) {
   if (store[i].id == id) {
    this.setState({
     result: store[i]
    });
   } else if (store[i].type == 'category' && store[i].data) {
    this.getTrackerDataToState(id, store[i].data);
   }
  }
 };
 render() {
  return (
   <div>
    <h1>This is a tracker dashboard for {this.props.match.params.id}</h1>
    {this.state.result ? (
     <div>
      <h1>{this.state.result.name}</h1>
      <h2>{this.state.result.id}</h2>
      <p>{this.state.result.description}</p>
     </div>
    ) : (
     <h1>loading</h1>
    )}
   </div>
  );
 }
}

const mapStateToProps = state => {
 return { storeData: state.data };
};

export default connect(mapStateToProps)(TrackerDashboard);
