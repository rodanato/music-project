// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import { CardProps } from './card.types';

// STYLES 
import { card } from './card.styles';

function CardAtom(props: CardProps) {
  return (
    <div css={[card]} className={props.paddingLess ? "is-paddingless" : ""}>
      {props.children}
    </div>
  );
}

export default CardAtom;
