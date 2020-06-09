/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type MainImageProps = {
  url: string;
}

const MainImage = css`
  width: 100%;
`

function MainImageAtom({ url }: MainImageProps) {
  return (
    <img css={MainImage} src={url} />
  );
}

export default MainImageAtom;
