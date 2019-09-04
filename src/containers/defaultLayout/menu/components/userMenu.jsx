import React from 'react';
import { Icon, Avatar, Menu } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logOut } from 'actions/user';
import PropTypes from 'prop-types';

const MenuRow = styled.div`
 display: flex;
 cursor: pointer;
 padding-left: 24px;
 align-items: center;
`;

const StyledMenu = styled(Menu)`
 padding-top: 24px;
`;

const StyledAvatar = styled(Avatar)`
 margin-right: 16px;
 color: #001529;
 .anticon {
  font-size: initial;
  margin: 0;
 }
`;

const UserMenu = ({ userName, logOut }) => {
 return (
  <StyledMenu theme="dark" mode="inline" className="user-menu">
   <StyledMenu.SubMenu
    key={0}
    title={
     <span>
      <StyledAvatar icon="user" />
      {userName}
     </span>
    }>
    <StyledMenu.Item>
     <MenuRow>
     <span onClick={logOut}>
     Logout &nbsp; <Icon type="logout" />
     </span>
     </MenuRow>
    </StyledMenu.Item>
   </StyledMenu.SubMenu>
  </StyledMenu>
 );
};

UserMenu.propTypes = {
 userName: PropTypes.string,
 logOut: PropTypes.func
};

const mapDispatchToProps = {
 logOut
};

export default connect(
 null,
 mapDispatchToProps
)(UserMenu);
