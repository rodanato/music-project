import React from 'react';

import styled from '@emotion/styled'

type HeaderProps = {
  theme: {
    primaryDark: string
  }
}

const Header = styled.header<HeaderProps>({
  height: '50px',
  width: '100%',
},
props => ({
  backgroundColor: props.theme.primaryDark
}))

function HeaderOrganism() {
  return (
    <Header>
      Header
    </Header>
  );
}

export default HeaderOrganism;
