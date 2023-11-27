import {
  Box, Text, Badge, Icon,
} from '@chakra-ui/react';
import { IoMdClock } from 'react-icons/io';
import { BsHourglassSplit } from 'react-icons/bs';
import { useContext } from 'react';
import outputInterval, { formatHours, formatMinutes } from '../Session/Session.utils';
import type { Task as TaskType } from '../../types/types';

import { SettingsContext } from '../../store/SettingsContext';
import { TaskModeEnum } from '../../types/types';

export default function Task({ colorScheme, task }: { colorScheme: string, task: TaskType }) {
  const originalStart = new Date(task.originalStart);
  const end = task.end ? new Date(task.end) : 0;
  const settingsCtx = useContext(SettingsContext);

  return (
    <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
      <Badge
        display="flex"
        alignItems="center"
        textTransform="none"
        borderWidth="1px"
        borderRadius="lg"
        colorScheme={colorScheme}
      >
        <Icon as={IoMdClock} display="inline" mr={1} />
        <Text>
          {formatHours(originalStart)}
          :
          {formatMinutes(originalStart)}
          {' '}
          -
          {' '}
          {formatHours(end)}
          :
          {formatMinutes(end)}
        </Text>
      </Badge>
      <Badge
        display="flex"
        alignItems="center"
        borderWidth="1px"
        borderRadius="lg"
        colorScheme={colorScheme}
      >
        <Icon as={BsHourglassSplit} display="inline" mr={1} />
        {outputInterval(task.length)}
      </Badge>
    </Box>
  );
}
