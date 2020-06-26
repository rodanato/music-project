import React from 'react'; // eslint-disable-line
import { useMachine } from "@xstate/react";

import styled from '@emotion/styled';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import { responsive } from '../utils/responsive';
import HeaderOrganism from './header/header.organism';
import FooterOrganism from './footer/footer.organism';
import SliderOrganism from './slider/slider.organism';
import { mainMachine, MainStateContext } from './main.state';
import ThemeMolecule from './theme/theme.molecule';

type ContainerRowProps = {
  content?: boolean,
  children: any
}

const Main = styled.main({
  backgroundColor: 'var(--mpp-primary)',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
  left: '0',
  top: '0',
  height: '100%',
  position: 'absolute',
  width: '100%'
})

const Container = styled.div({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  width: '100%'
})

const Div = ({ className, content, text, children, ...props }: any) => (
  <div {...props} className={className}>
    {children}
  </div>
)

const ContainerRow = styled(Div) <ContainerRowProps>`
  display: flex;
  width: 100%;
  height: ${props => (props.content ? 'calc(100% - 150px)' : 'auto')};
`

const MediaQueries = {
  [responsive('tablet')]: {
    color: 'blue'
  },
  [responsive('desktop')]: {
    color: 'red'
  },
};


function MainOrganism() {
  const [state] = useMachine(mainMachine);

  return (
    <Main className={`${state.value}-theme`}>
      <Container>
        <ContainerRow css={MediaQueries}>
          <HeaderOrganism />
        </ContainerRow>

        <ContainerRow content >
          <SliderOrganism />
        </ContainerRow>

        <ContainerRow>
          <FooterOrganism />
        </ContainerRow>
      </Container>


      <MainStateContext.Provider value={state}>
        <ThemeMolecule />
      </MainStateContext.Provider>
    </Main>
  );
}

export default MainOrganism;
