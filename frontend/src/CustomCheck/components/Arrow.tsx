import { Icon } from '@passfort/castle';
import React from 'react';

type Props = {
  showAnswer: boolean;
};

const Arrow = ({ showAnswer }: Props) => {
  if (!showAnswer) {
    return (
      <Icon ml={4} lineHeight="40px" icon="keyboard_arrow_down" size="md" />
    );
  } else {
    return <Icon ml={4} lineHeight="40px" icon="keyboard_arrow_up" size="md" />;
  }
};

export default Arrow;
