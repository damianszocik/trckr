import React from 'react';
import { Drawer, Button, Menu } from 'antd';
import { ArrowTurn } from 'react-burgers';
import { ReactComponent as Logo } from '../../assets/img/logo1.svg';

export default class MobileMenu extends React.Component {
  state = {
    visible: true,
    burgerActive: false
  };
  toggleBurgerClick = () => {
    this.setState({
      burgerActive: !this.state.burgerActive,
      visible: !this.state.visible
    });
  };
  componentDidMount() {
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <Drawer placement="left" closable={false} onClose={this.toggleBurgerClick} visible={this.state.visible}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px 24px 0'
          }}>
          <Logo style={{ width: '70%' }} />
        </div>
        <Menu theme="dark" mode="inline">
          {this.props.children}
        </Menu>
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: 0,
            transform: this.state.visible ? 'none' : 'translateX(100%)',
            transition: 'transform .3s',
            background: '#001529'
          }}>
          <ArrowTurn
            onClick={this.toggleBurgerClick}
            active={this.state.burgerActive}
            width={16}
            lineHeight={2}
            lineSpacing={2}
            padding="12px"
            color="rgba(255, 255, 255, 0.65)"
          />
        </div>
      </Drawer>
    );
  }
}
