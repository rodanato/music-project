import React from 'react';
import LoadingAtom from './loading.atom';

export default {
  title: 'LoadingAtom',
  component: LoadingAtom,
};

export const TwoColumns = () => {
  return (
    <LoadingAtom flex="2">
    </LoadingAtom>
  );
};
export const FiveColumns = () => <LoadingAtom flex="5" />;
