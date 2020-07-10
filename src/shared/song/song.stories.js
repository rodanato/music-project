import React from 'react';
import SongMolecule from './song.molecule';

const songSampleData = {
  name: "Sex on fire",
  artist: "Kings of Leon",
  album: "I don't know"
};

export default {
  title: 'SongMolecule',
  component: SongMolecule,
};

export const List = () => <SongMolecule data={songSampleData}></SongMolecule>;
export const Playing = () => <SongMolecule mode="playing" data={songSampleData}></SongMolecule>;
