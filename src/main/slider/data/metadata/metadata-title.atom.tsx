import React from 'react';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type TitleProps = {
  title: string
}

const Title = css`
  margin-bottom: 10px;
`;

function MetadataTitleAtom({ title }: TitleProps) {
  return (
    <div css={Title} className="mpp-font--subtitle">{title}</div>
  );
}

export default MetadataTitleAtom;
