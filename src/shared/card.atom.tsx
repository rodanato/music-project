/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const Card = css`
  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 2px 9px 0 rgba(157, 165, 173, 0.29);
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  width: 100%;
`

function CardAtom(props: any) {
  return (
    <div css={Card}>
      {props.children}
    </div>
  );
}

export default CardAtom;
