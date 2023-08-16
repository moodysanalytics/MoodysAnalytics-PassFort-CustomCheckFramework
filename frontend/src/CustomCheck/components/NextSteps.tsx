// brief paragraph, and reference back to readme where instructions are for the
// mini frontend react app that will contain the diagramSlides

import React from 'react';
import { Box, H4, Text, Link } from '@passfort/castle';

const NextSteps = () => {
  return (
    <Box mb={6}>
      <H4> Next Steps</H4>
      <Text>
        {' '}
        Now that you are able to communicate with PassFort, you can begin to
        transpose your app or data source into this framework.{' '}
      </Text>
      <Text>
        {' '}
        For a guide to get you started, please visit the
        <Link href="https://github.com/moodysanalytics/npi-pf-oscc#">
          {' '}
          next steps section of the README.md
        </Link>{' '}
        for this project.{' '}
      </Text>
    </Box>
  );
};

export default NextSteps;
