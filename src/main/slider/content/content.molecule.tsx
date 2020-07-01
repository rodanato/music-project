import React from 'react'; // eslint-disable-line
import styled from '@emotion/styled'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import CardAtom from '../../../shared/card.atom';

type ContentProps= {
  children: any;
};

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
})

const Flex = css`
  flex: 2;
`

function ContentMolecule(props: ContentProps) {
  return (
    <div css={Flex} className="mpp-show-slowly">
      <CardAtom>
        <Content>
          {props.children}
        </Content>
      </CardAtom>
    </div>
  );
}

export default ContentMolecule;
