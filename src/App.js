import DefaultLayout from './layouts/default';
import {connect} from 'react-redux';
import {addCategory, addTracker} from './state/state'
import "antd/dist/antd.css";
import './App.css';

const mapStateToProps = (state) => {
  return {store: state}
}

const mapDispatchToProps = {
  addCategory,
  addTracker
}

export const App =  connect(mapStateToProps, mapDispatchToProps)(DefaultLayout); 