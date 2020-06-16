import React from 'react';
import { v4 as uuidv4 } from "uuid";

import styled from '@emotion/styled'

type GenresProps = {
  genres: string[]
};

const Genres = styled.section({
})

function GenresMolecule({genres}: GenresProps) {
  return (
    <Genres>
      {genres.map(genre => (
        <span key={uuidv4()}>{genre}</span>
      ))}
    </Genres>
  );
}

export default GenresMolecule;
