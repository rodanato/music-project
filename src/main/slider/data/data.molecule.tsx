import React from 'react';

import styled from '@emotion/styled'
import MainImageAtom from './main-image.atom';
import CardAtom from '../../../shared/card.atom';

const Data = styled.section({
  display: 'flex',
  flexDirection: 'column',
  flex: '1.5',
})

function DataMolecule() {
  return (
    <Data>
      <CardAtom>
        <MainImageAtom url="https://dummyimage.com/250x250/000000/fff"/>
      </CardAtom>
    </Data>
  );
}

export default DataMolecule;
