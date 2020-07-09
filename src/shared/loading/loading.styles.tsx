import styled from '@emotion/styled';
import { LoadingBlockProps } from './loading.types';

export const LoadingBlock = styled("div")<LoadingBlockProps>`
  flex: ${props => props.flex};
`;