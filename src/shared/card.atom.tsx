import React, { ReactNode } from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type CardProps = {
  paddingLess?: boolean;
  children?: ReactNode;
};

const Card = css`
  background: var(--mpp-secondary);
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  box-sizing: border-box;
  color: var(--mpp-on-secondary);
  display: block;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 25px;
`

const PaddingLess = css`
  padding: 0;
`

function CardAtom(props: CardProps) {
  return (
    <div css={[Card, props.paddingLess ? PaddingLess : "" ]}>
      {props.children}
    </div>
  );
}

export default CardAtom;
