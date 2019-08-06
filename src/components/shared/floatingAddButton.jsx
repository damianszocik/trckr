import React from 'react';
import PropTypes from 'prop-types'
import {Button} from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    position: absolute; 
    bottom: 24px; 
    right: 24px; 
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

export default function FloatingAddButton({clickHandler}) {
    return (
        <StyledButton type="primary" shape="circle" icon="plus" size="large" onClick={clickHandler} />
    )
}


FloatingAddButton.propTypes = {
    clickHandler: PropTypes.func
}