import React from 'react';
import PropTypes from 'prop-types'
import {Button} from 'antd';

export default function FloatingAddButton({clickHandler}) {
    return (
        <Button style={{ position: 'absolute', bottom: '1em', right: '1em' }} type="primary" shape="circle" icon="plus" size="large" onClick={clickHandler} />
    )
}
FloatingAddButton.propTypes = {
    clickHandler: PropTypes.func
}