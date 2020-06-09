import React from 'react';
import styled from '@emotion/styled';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import { responsive } from '../utils/responsive';

type MainProps = {
  theme: {
    bg: string
  }
}

type MainOrganismProps = {
  header: any,
  slider: any,
  footer: any,
  children: never[]
}


const Main = styled.main<MainProps>({
  boxSizing: 'border-box',
  fontFamily: 'Open Sans, sans-serif',
  left: '0',
  top: '0',
  height: '100%',
  padding: '50px',
  position: 'absolute',
  width: '100%'
},
props => ({
  backgroundColor: props.theme.bg
}))

const Container = styled.div({
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'wrap',
  height: '100%',
  padding: '0 100px',
  position: 'relative',
  width: '100%'
})

const ContainerRow = styled.div({
  display: 'flex',
  width: '100%'
})

const MediaQueries = {
  [responsive('tablet')]: {
    color: 'blue'
  },
  [responsive('desktop')]: {
    color: 'red'
  },
};

function MainOrganism({ header, slider, footer }: MainOrganismProps) {
  return (
    <React.Fragment>
      <Main>
        <Container>
          <ContainerRow css={MediaQueries}>{header}</ContainerRow>
          <ContainerRow>{slider}</ContainerRow>
          <ContainerRow>{footer}</ContainerRow>
        </Container>
      </Main>
    </React.Fragment>
  );
}

export default MainOrganism;
