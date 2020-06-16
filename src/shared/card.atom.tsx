/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type CardProps = {
  paddingLess?: boolean;
  children: any;
};

const Card = css`
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgba(157, 165, 173, 0.29);
  box-sizing: border-box;
  display: block;
  margin: 10px;
  overflow: hidden;
  padding: 20px;
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
