import React from 'react';
import { H4, Box } from '@passfort/castle';
import { FAQs, FAQtype } from '../../Types/FAQtype';
import FAQ from './FAQ';

const FAQList = () => {
  return (
    <Box>
      <H4 mb={2}> FAQs</H4>
      {FAQs.map((FAQitem: FAQtype) => {
        return <FAQ question={FAQitem.question} answer={FAQitem.answer} />;
      })}
    </Box>
  );
};

export default FAQList;
