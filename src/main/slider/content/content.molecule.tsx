import React from 'react'; // eslint-disable-line
import styled from '@emotion/styled'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import CardAtom from '../../../shared/card.atom';

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
})

const Flex = css`
  flex: 2;
`

function ContentMolecule() {
  return (
    <div css={Flex}>
      <CardAtom>
        <Content>
          Content
        </Content>
      </CardAtom>
    </div>
  );
}

export default ContentMolecule;
