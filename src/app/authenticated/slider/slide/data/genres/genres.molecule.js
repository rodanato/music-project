// @flow
// EXTERNAL
import React from "react";
import { v4 as uuidv4 } from "uuid";
import type { Node } from "react";

// DEPENDENCIES
import GenreAtom from "./genre/genre.atom";
import type { GenresProps } from "./genres.types";

// STYLES

function GenresMolecule({ genres }: GenresProps): Node {
  console.log("loading genres on genresMOolecule");
  return (
    <div>
      {genres.map((genre) => (
        <GenreAtom key={uuidv4()} genreName={genre} />
      ))}
    </div>
  );
}

export default GenresMolecule;
