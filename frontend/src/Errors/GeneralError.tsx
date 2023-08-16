import { Box, ErrorState } from '@passfort/castle';
import React from 'react';
import { useRouteError } from 'react-router';

const GeneralError = () => {
  const error = useRouteError();

  return (
    <Box mt={5}>
      <ErrorState title="Error" description="An error occurred." />
    </Box>
  );
};

export default GeneralError;
