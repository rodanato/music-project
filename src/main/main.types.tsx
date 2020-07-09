import { ReactNode } from 'react';

export type ContainerRowProps = {
  content?: boolean;
}
export type DivProps = {
  className?: string;
  content?: boolean | undefined;
  text?: string;
  children?: ReactNode;
}