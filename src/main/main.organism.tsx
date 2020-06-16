import React, { Suspense } from 'react';
import styled from '@emotion/styled';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import { responsive } from '../utils/responsive';
import HeaderOrganism from './header/header.organism';
import FooterOrganism from './footer/footer.organism';

const SliderOrganism = React.lazy(() => import('./slider/slider.organism'));

type MainProps = {
  theme: {
    bg: string
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
  flexDirection: 'column',
  height: '100%',
  padding: '0 100px',
  position: 'relative',
  width: '100%'
})

const Div = ({ className, content, text, children, ...props }: any) => (
  <div {...props} className={className}>
    {children}
  </div>
)

const ContainerRow = styled(Div)`
  display: flex;
  width: 100%;
  max-height: ${props => (props.content ? 'calc(100% - 200px)' : 'none')};
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
          <Suspense fallback={<div className="mpp__loading-block"></div>}>
            <SliderOrganism/>
          </Suspense>
        </ContainerRow>

        <ContainerRow>
          <FooterOrganism/>
        </ContainerRow>
      </Container>
    </Main>
  );
}

export default MainOrganism;
