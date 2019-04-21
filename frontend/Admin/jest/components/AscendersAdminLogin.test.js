import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';


it('renders correctly', () => {
    const tree = renderer
      .create(<Link page="https://prettier.io">Prettier</Link>)
      .toJSON();
    expect(tree).toMatchInlineSnapshot();
  });