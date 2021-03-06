import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Drawer, Menu } from 'antd';
import { ArrowTurn } from 'react-burgers';
import AnimatedLogo from 'components/shared/animatedLogo';
import UserMenu from './components/userMenu';

const LogoContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 24px 16px 24px 0;
`;

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

function MobileMenu(props) {
 if (props.match.params.id) {
  getOpenMenuKeys(props.match.params.id, props.storeData);
 }
 const [menuVisibility, setMenuVisibility] = useState(true);
 const [menuActive, setMenuActive] = useState(false);

 useEffect(menuVisibility => {
  setMenuVisibility(false);
 }, []);

 const toggleBurgerClick = () => {
  setMenuActive(!menuActive);
  setMenuVisibility(!menuVisibility);
 };

 const BurgerContainer = styled.div`
  position: absolute;
  bottom: 24px;
  right: 0;
  transform: translateX(36px);
  background: #001529;
  width: 40px;
  height: 40px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: -1;
 `;

 return (
  <Drawer placement="left" closable={false} onClose={toggleBurgerClick} visible={menuVisibility}>
   <UserMenu userName={props.storeUser.authUser.displayName} />
   <LogoContainer>
    <Link to="/" style={{ textAlign: 'center' }}>
     <AnimatedLogo width="70%" />
    </Link>
   </LogoContainer>
   {(!props.match.params.id || openKeys.length > 0) && (
    <Menu theme="dark" defaultOpenKeys={openKeys} selectedKeys={props.match.params.id ? [props.match.params.id] : []} mode="inline">
     {props.children}
    </Menu>
   )}
   <BurgerContainer>
    <ArrowTurn onClick={toggleBurgerClick} active={menuActive} width={16} lineHeight={2} lineSpacing={2} padding="12px" color="rgba(255, 255, 255, 0.65)" />
   </BurgerContainer>
  </Drawer>
 );
}

const mapStateToProps = state => {
 return {
  storeUser: state.user,
  storeData: state.data
 };
};

export default connect(mapStateToProps)(MobileMenu);
