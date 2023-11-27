import { Box, Button } from '@chakra-ui/react';
import { VscClearAll, VscCheck, VscDebugPause } from 'react-icons/vsc';
import { GiNightSleep } from 'react-icons/gi';

import LogMode from './LogMode';
import { CompletedTasks, TaskModeEnum } from '../../types/types';

export default function Log({ clear, items } : { clear: () => void, items: CompletedTasks }) {
  return (
    <Box w="100%">
      <Box textAlign="right" mb={5}>
        <Button
          size="sm"
          colorScheme="gray"
          onClick={clear}
          leftIcon={<VscClearAll />}
        >
          Clear Log
        </Button>
      </Box>
      <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} w="100%" gap={10}>
        <LogMode
          mode={TaskModeEnum.WORKING}
          tasks={items.work}
          colorScheme="green"
          icon={VscCheck}
        />
        <LogMode
          mode={TaskModeEnum.SHORT_BREAK}
          tasks={items.breaks}
          colorScheme="blue"
          icon={GiNightSleep}
        />
        <LogMode
          mode={TaskModeEnum.PAUSED}
          tasks={items.pauses}
          colorScheme="red"
          icon={VscDebugPause}
        />
      </Box>
    </Box>
  );
}

// TODO: rewrite logging to include long breaks
