import React from 'react'; // eslint-disable-line
import styled from '@emotion/styled';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import { responsive } from '../utils/responsive';
import HeaderOrganism from './header/header.organism';
import FooterOrganism from './footer/footer.organism';
import SliderOrganism from './slider/slider.organism';

type MainProps = {
  theme: {
    primary: string
  }
}

type ContainerRowProps = {
  content?: boolean,
  children: any
}

const Main = styled.main<MainProps>({
  boxSizing: 'border-box',
  fontFamily: 'Open Sans, sans-serif',
  left: '0',
  top: '0',
  height: '100%',
  position: 'absolute',
  width: '100%'
},
props => ({
  backgroundColor: props.theme.primary
}))

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

const ContainerRow = styled(Div)<ContainerRowProps>`
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
  return (
    <Main>
      <Container>
        <ContainerRow css={MediaQueries}>
          <HeaderOrganism/>
        </ContainerRow>

        <ContainerRow content >
          <SliderOrganism/>
        </ContainerRow>

        <ContainerRow>
          <FooterOrganism/>
        </ContainerRow>
      </Container>
    </Main>
  );
}

export default MainOrganism;
