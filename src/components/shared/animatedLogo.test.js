import React from 'react';
import {
    shallow
} from 'enzyme';
import 'setupTests';
import AnimatedLogo from './animatedLogo';

it('renders without crashing', () => {
    shallow( < AnimatedLogo / > );
});