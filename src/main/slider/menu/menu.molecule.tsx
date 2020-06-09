import React from 'react';
import styled from '@emotion/styled'

import MenuItemAtom from './menu-item.atom';

const Menu = styled.section({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
})

function MenuMolecule() {
  return (
    <Menu>
      <MenuItemAtom name="Albums" />
      <MenuItemAtom name="Artists" />
      <MenuItemAtom name="Songs" />
    </Menu>
  );
}

export default MenuMolecule;
