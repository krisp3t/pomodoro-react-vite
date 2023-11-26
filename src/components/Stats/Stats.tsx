import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';

import StatsItem from './StatsItem';
import { CompletedTasks } from '../../types/types';

export default function Stats({ tasks } : { tasks: CompletedTasks }) {
  const workingLength = tasks.work.reduce(
    (prev, currentValue) => prev + currentValue.taskLength,
    0,
  );
  const restingLength = tasks.breaks.reduce(
    (prev, currentValue) => prev + currentValue.taskLength,
    0,
  );
  const pausedLength = tasks.pauses.reduce(
    (prev, currentValue) => prev + currentValue.taskLength,
    0,
  );

  return (
    <Box display="flex" w="100%" py={5}>
      <StatsItem
        label="Working"
        number={Math.floor(workingLength / 60000)}
        color={useColorModeValue('green.400', 'green.200')}
      />
      <StatsItem
        label="Resting"
        number={Math.floor(restingLength / 60000)}
        color={useColorModeValue('blue.400', 'blue.200')}
      />
      <StatsItem
        label="Paused"
        number={Math.floor(pausedLength / 60000)}
        color={useColorModeValue('red.400', 'red.200')}
      />
    </Box>
  );
}
