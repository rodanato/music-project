import React from 'react'; // eslint-disable-line
import styled from '@emotion/styled';

type LoadingBlockProps = {
  flex: string
}

const LoadingBlock = styled("div")<LoadingBlockProps>`
  flex: ${props => props.flex};
`

function LoadingAtom({ flex }: LoadingBlockProps) {
  return (
    <LoadingBlock className="mpp__loading-block" flex={flex} />
  );
}

export default LoadingAtom;
