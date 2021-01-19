// @flow
import React from "react"; // eslint-disable-line
import type { ComponentType } from "react"; // eslint-disable-line
// $FlowIgnore
import styled from "@emotion/styled";
import type { ContainerRowProps, DivProps } from "./authenticated.types";

const Div = ({ className, content, text, children, ...props }: DivProps) => (
  <div {...props} className={className}>
    {children}
  </div>
);

export const ContainerRow: ComponentType<ContainerRowProps> = styled(Div)`
  display: flex;
  height: ${(props: ContainerRowProps) =>
    props.content ? "calc(100% - 150px)" : "auto"};
  width: 100%;
`;

export const themeContainer: string = `
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

export const container: string = `
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;
