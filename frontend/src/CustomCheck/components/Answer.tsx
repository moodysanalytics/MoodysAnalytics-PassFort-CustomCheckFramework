import { Box, Text, Flex } from '@passfort/castle';
import React from 'react';

type Props = {
  answer: string;
};

export const Answer = ({ answer }: Props) => {
  return (
    <Box className="dropdown-details">
      <Box display="flex" backgroundColor="N0">
        <Flex
          pl={10}
          justifyContent={'center'}
          lineHeight="48px"
          display="flex"
          alignItems="center"
          gap={2}
          color="N300"
          minW="445px"
          w="100%"
          borderLeft="1px"
          borderRight="1px"
          borderBottom="1px"
          borderColor="N100"
          className="dropdown-cell-left"
        >
          <Box display="flex" flex={1}>
            <Text lineHeight={1.3} mt={2} mb={2}>
              {answer}
            </Text>
          </Box>{' '}
        </Flex>
      </Box>
    </Box>
  );
};

export default Answer;
