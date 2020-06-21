import React from 'react'; // eslint-disable-line
import styled from '@emotion/styled'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import MenuItemAtom from './menu-item.atom';
import CardAtom from '../../../shared/card.atom';

const Menu = styled.section({
  display: 'flex',
  flexDirection: 'column',
})

const Flex = css`
  flex: 1;
`

function MenuMolecule() {
  return (
    <div css={Flex} className="mpp-show-slowly">
      <CardAtom>
        <Menu>
          <MenuItemAtom name="Albums" />
          <MenuItemAtom name="Artists" />
          <MenuItemAtom name="Songs" />
        </Menu>
      </CardAtom>
    </div>
  );
}

export default MenuMolecule;
