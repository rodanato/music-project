import React from 'react';
import { v4 as uuidv4 } from "uuid";

import styled from '@emotion/styled'
import GenreAtom from './genre.atom';

type GenresProps = {
  genres: string[]
};

const Genres = styled.section({
})

function GenresMolecule({ genres }: GenresProps) {
  return (
    <Genres>
      {genres.map(genre => (
        <GenreAtom key={uuidv4()} genre={genre} />
      ))}
    </Genres>
  );
}

export default GenresMolecule;
