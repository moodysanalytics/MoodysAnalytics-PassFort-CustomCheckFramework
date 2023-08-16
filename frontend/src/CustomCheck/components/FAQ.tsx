import { Box, useBoolean } from '@passfort/castle';
import React from 'react';
import Question from './Question';
import Answer from './Answer';

type Props = {
  question: string;
  answer: string;
};

const FAQ = ({ question, answer }: Props) => {
  const [showAnswer, setShowAnswer] = useBoolean();

  return (
    <Box minW="850px" w={'70%'} className={'FAQ'}>
      <Question
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        question={question}
      />
      <Box>{showAnswer ? <Answer answer={answer} /> : null}</Box>
    </Box>
  );
};

export default FAQ;
