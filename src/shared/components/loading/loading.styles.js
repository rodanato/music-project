// @flow
// $FlowIgnore
import styled from "@emotion/styled";
import type { LoadingBlockProps } from "./loading.types";
import type { ComponentType } from "react";

export const LoadingBlock: ComponentType<LoadingBlockProps> = styled("div")`
  flex: ${(props: LoadingBlockProps) => props.flex};
`;
