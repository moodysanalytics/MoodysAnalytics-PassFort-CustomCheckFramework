// this will be the heading congrats and sub heading "you arehosting...", and icon/animation

import React from 'react';
import { Box, H1, H3, Icon } from '@passfort/castle';
import { CheckDataType } from '../../Types/CheckDataType';

type Props = {
  data: CheckDataType;
};

const Congrats = ({ data }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignSelf={'center'}>
      <H1 alignSelf={'center'} mb={3}>
        Congratulations!
      </H1>
      <H3 alignSelf={'center'}>
        {' '}
        You are hosting your own custom check in PassFort.
      </H3>
      {/* insert animation or icon here, check icon placeholding.. */}
      <Icon icon="check_circle" color="G100" size="xxl" h={200} />
    </Box>
  );
};

export default Congrats;
