

import React from 'react';
import renderer from 'react-test-renderer';
import MainOrganism from './main.organism';
import HeaderOrganism from './header/header.organism';
import SliderOrganism from './slider/slider.organism';
import FooterOrganism from './footer/footer.organism';
import NavigationOrganism from './navigation/navigation.organism';

it('MainOrganism snapshot example', () => {
  const tree = renderer.create(
    <MainOrganism
      header={<HeaderOrganism/>}
      slider={<SliderOrganism/>}
      footer={<FooterOrganism/>}
      navigation={<NavigationOrganism/>}
    >
    </MainOrganism>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});