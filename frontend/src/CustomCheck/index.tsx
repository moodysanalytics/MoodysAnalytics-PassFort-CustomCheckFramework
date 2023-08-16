import React from 'react';
import { Box, Flex } from '@passfort/castle';
import { useLoaderData } from 'react-router';
import Congrats from './components/Congrats';
import DocsAndResources from './components/DocsAndResources';
import FAQList from './components/FAQList';
import NextSteps from './components/NextSteps';
import { CheckDataType } from '../Types/CheckDataType';

const CustomCheck = () => {
  const data: CheckDataType = useLoaderData() as CheckDataType;

  return (
    <Box m={6} minW="680px" display={'flex'} flexDirection={'column'}>
      <Congrats data={data} />
      <NextSteps />
      <DocsAndResources />
      <FAQList />
    </Box>
  );
};

export default CustomCheck;
