import React from 'react'; // eslint-disable-line
import styled from '@emotion/styled';
import { ContainerRowProps } from './main.types';

const Div = ({ className, content, text, children, ...props }: any) => (
  <div {...props} className={className}>
    {children}
  </div>
)

export const ContainerRow = styled(Div) <ContainerRowProps>`
  display: flex;
  height: ${props => (props.content ? 'calc(100% - 150px)' : 'auto')};
  width: 100%;
`

export const main = `
  background-color: var(--mpp-primary);
  box-sizing: border-box;
  font-family: Roboto; sans-serif;
  font-weight: 400;
  left: 0;
  top: 0;
  height: 100%;
  position: absolute;
  width: 100%;
`;

export const container = `
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;