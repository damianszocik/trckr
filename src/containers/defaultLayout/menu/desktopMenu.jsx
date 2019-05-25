import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../../actions/user';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import AnimatedLogo from '../../../components/shared/animatedLogo';

class DesktopMenu extends React.Component {
 render() {
  const {
   authUser: { uid },
   authUser: { emailVerified }
  } = this.props.storeUser;
  return (
   <Layout.Sider>
    {uid && emailVerified && (
     <Row type="flex" justify="end">
      <Icon style={{ fontSize: '2em', color: '#fff' }} className="mt-3 mr-3" type="logout" onClick={this.props.logOut}/>
     </Row>
    )}
    <div
     style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px 24px 0'
     }}>
     <Link to="/" style={{ textAlign: 'center' }}>
      <AnimatedLogo width="70%" />
     </Link>
    </div>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
     {this.props.children}
    </Menu>
   </Layout.Sider>
  );
 }
}

const mapDispatchToProps = {
 logOut
};

const mapStateToProps = state => {
 return { storeUser: state.user };
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(DesktopMenu);
