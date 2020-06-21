import React from 'react';

import styled from '@emotion/styled'

type FooterProps = {
  theme: {
    primaryDark: string
  }
}

const Footer = styled.footer<FooterProps>({
  height: '100px',
  margin: '0 auto',
  width: '70%',
},
props => ({
  backgroundColor: props.theme.primaryDark
}))

function FooterOrganism() {
  return (
    <Footer>
      Footer
    </Footer>
  );
}

export default FooterOrganism;
