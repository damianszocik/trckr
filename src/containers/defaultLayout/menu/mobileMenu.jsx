import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer, Menu } from 'antd';
import { ArrowTurn } from 'react-burgers';
import AnimatedLogo from 'components/shared/animatedLogo';
import AuthInfo from './components/authInfo';

function MobileMenu(props) {

const [menuVisibility, setMenuVisibility] = useState(true);
const [menuActive, setMenuActive] = useState(false);

useEffect( (menuVisibility) => {
    setMenuVisibility(false);
}, [])

const toggleBurgerClick = () => {
    setMenuActive(!menuActive);
    setMenuVisibility(!menuVisibility)
};

  return (
   <Drawer placement="left" closable={false} onClose={toggleBurgerClick} visible={menuVisibility}>
    <AuthInfo mobile displayName={props.storeUser.authUser.displayName} />
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
    <Menu theme="dark" mode="inline">
     {props.children}
    </Menu>
    <div
     style={{
      position: 'absolute',
      top: '0',
      right: 0,
      transform: menuVisibility ? 'none' : 'translateX(100%)',
      transition: 'transform .3s',
      background: '#001529'
     }}>
     <ArrowTurn onClick={toggleBurgerClick} active={menuActive} width={16} lineHeight={2} lineSpacing={2} padding="12px" color="rgba(255, 255, 255, 0.65)" />
    </div>
   </Drawer>
  );
}

const mapStateToProps = state => {
 return { storeUser: state.user };
};

export default connect(mapStateToProps)(MobileMenu);
