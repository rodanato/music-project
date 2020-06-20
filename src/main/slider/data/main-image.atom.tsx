/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type MainImageProps = {
  url: string;
}

const MainImage = css`
  height: 100%;
  width: 100%;
`

function MainImageAtom({ url }: MainImageProps) {
  return (
    <img css={MainImage} src={url} alt="" />
  );
}

export default MainImageAtom;
