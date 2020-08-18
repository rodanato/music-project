// @flow
// EXTERNAL
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import type { MainImageProps } from './data-main-image.types';

// STYLES
import { mainImage } from './data-main-image.styles';

function MainImageAtom({ url }: MainImageProps) {
  return (
    <img css={[mainImage]} src={url} alt="" />
  );
}

export default MainImageAtom;
