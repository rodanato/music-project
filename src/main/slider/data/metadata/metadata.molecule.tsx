import React from 'react'; // eslint-disable-line

import styled from '@emotion/styled'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import MetadataAuthorAtom from './metadata-author.atom';
import MetadataTitleAtom from './metadata-title.atom';

type MetadataProps = {
  data: DataProps;
};

type DataProps = {
  title: string;
  author: string;
};

const Metadata = styled.section({
})


function MetadataMolecule(props: MetadataProps) {
  const { title, author } = props.data;
  return (
    <Metadata>
      <MetadataTitleAtom title={title} />
      <MetadataAuthorAtom author={author} />
    </Metadata>
  );
}

export default MetadataMolecule;
