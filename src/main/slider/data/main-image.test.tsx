

import React from 'react';
import renderer from 'react-test-renderer';
import MainImageAtom from './main-image.atom';

it('MainImageAtom snapshot example', () => {
  const tree = renderer.create(
    <MainImageAtom url="https://dummyimage.com/111x92/000000/fff"/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});