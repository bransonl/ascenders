import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/components/AdminLogin.js';


it('renders correctly when there are no input', () => {
    const tree = renderer.create(<Login/>).toJSON();
    expect(tree).toMatchSnapshot();
});