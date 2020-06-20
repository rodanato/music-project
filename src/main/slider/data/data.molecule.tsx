import React from 'react';

import styled from '@emotion/styled'
import MainImageAtom from './main-image.atom';
import CardAtom from '../../../shared/card.atom';
import MetadataMolecule from './metadata/metadata.molecule';
import GenresMolecule from './genres/genres.molecule';

const Data = styled.section({
  display: 'flex',
  flexDirection: 'column',
  flex: '1.5',
})

const sampleData = { title: "Only by the night", author: "Kings of Leon" };

function DataMolecule() {
  return (
    <Data>
      <CardAtom paddingLess>
        <MainImageAtom url="https://dummyimage.com/250x250/000000/fff" />
      </CardAtom>

      <CardAtom>
        <MetadataMolecule data={sampleData} />
      </CardAtom>

      <CardAtom>
        <GenresMolecule genres={["Rock", "Progressive Rock", "Indie", "Soft Rock"]} />
      </CardAtom>
    </Data>
  );
}

export default DataMolecule;
