// @flow
// EXTERNAL
import React from 'react'; // eslint-disable-line

// DEPENDENCIES
import type { LoadingBlockProps } from './loading.types';

// STYLES
import { LoadingBlock } from './loading.styles';


function LoadingAtom({ flex }: LoadingBlockProps) {
  return (
    <LoadingBlock className="mpp__loading-block" flex={flex} />
  );
}

export default LoadingAtom;
