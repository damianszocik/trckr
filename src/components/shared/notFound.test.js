import React from 'react';
import 'setupTests.js';
import NotFound from './notFound';

let notFoundRender;
let notFoundShallow;
const component = < NotFound message = "test string" / > ;

beforeEach(() => {

    notFoundRender = render(component);
    notFoundShallow = shallow(component);
});

afterEach(() => {
    notFoundRender = undefined;
    notFoundShallow = undefined;
})

it('renders a div', () => {
    expect(notFoundShallow.first().type()).toBe('div');
})

it('renders text content based on prop passed', () => {
    expect(notFoundRender.text()).toBe('test string');
})

it('renders an image', () => {
    expect(notFoundRender.find('img').length).toBe(1);
})