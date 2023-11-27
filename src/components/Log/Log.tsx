import { Box, Button } from '@chakra-ui/react';
import { VscClearAll, VscCheck, VscDebugPause } from 'react-icons/vsc';
import { GiNightSleep } from 'react-icons/gi';

import LogMode from './LogMode';
import { CompletedTasks } from '../../types/types';
import { SESSION_MODES } from '../../default/defaultSession';

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
          mode={SESSION_MODES.working.status}
          tasks={items.work}
          colorScheme="green"
          icon={VscCheck}
        />
        <LogMode
          mode={SESSION_MODES.breaking.status}
          tasks={items.breaks}
          colorScheme="blue"
          icon={GiNightSleep}
        />
        <LogMode
          mode={SESSION_MODES.paused.status}
          tasks={items.pauses}
          colorScheme="red"
          icon={VscDebugPause}
        />
      </Box>
    </Box>
  );
}
