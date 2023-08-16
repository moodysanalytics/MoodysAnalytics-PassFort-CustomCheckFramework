import React from 'react';
import { Box, Text } from '@passfort/castle';
import Arrow from './Arrow';

type Props = {
  showAnswer: boolean;
  setShowAnswer: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  question: string;
};

const Question = ({ showAnswer, setShowAnswer, question }: Props) => {
  return (
    <Box display="flex">
      <Box
        display="flex"
        flex={1}
        onClick={setShowAnswer.toggle}
        minW="445px"
        borderBottom="1px"
        borderLeft="1px"
        borderRight="1px"
        borderColor="N100"
        className={`arrow ${showAnswer ? '' : 'dropdown-header'} Question`}
        backgroundColor="N25"
      >
        <Box display="flex" flex={1}>
          <Arrow showAnswer={showAnswer} />
          <Text lineHeight="48px" bold>
            {question}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Question;
