import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import UserMenu from './components/userMenu';
import AnimatedLogo from 'components/shared/animatedLogo';

function DesktopMenu(props) {
 return (
  <Layout.Sider width={250}>
   <UserMenu userName={props.storeUser.authUser.displayName} />
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
   <Menu theme="dark" className="desktopSideMenu" defaultSelectedKeys={['1']} mode="inline">
    {props.children}
   </Menu>
  </Layout.Sider>
 );
}

const mapStateToProps = state => {
 return { storeUser: state.user };
};

export default connect(mapStateToProps)(DesktopMenu);
