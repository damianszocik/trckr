import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import UserMenu from './components/userMenu';
import AnimatedLogo from 'components/shared/animatedLogo';

let openKeys = [];
const getOpenMenuKeys = (id, store) => {
  for (let i = 0; i < Object.keys(store).length; i++) {
    let currentStoreItem = store[Object.keys(store)[i]];
    if (currentStoreItem.id == id) {
      openKeys = currentStoreItem.address.map(addressItem => String(addressItem.id));
    } else if (currentStoreItem.type == 'category' && Object.keys(currentStoreItem.data).length) {
      getOpenMenuKeys(id, currentStoreItem.data);
    }
  }
};

function DesktopMenu(props) {
  if (props.match.params.id) {
    getOpenMenuKeys(props.match.params.id, props.storeData);
  }
  return (
    <Layout.Sider style={{ overflow: 'auto' }} width={250}>
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
      {(!props.match.params.id || openKeys.length > 0) && (
        <Menu
          theme="dark"
          className="desktopSideMenu"
          defaultOpenKeys={openKeys}
          selectedKeys={props.match.params.id ? [props.match.params.id] : []}
          mode="inline">
          {props.children}
        </Menu>
      )}
    </Layout.Sider>
  );
}

const mapStateToProps = state => {
  return {
    storeUser: state.user,
    storeData: state.data
  };
};

export default connect(mapStateToProps)(DesktopMenu);
