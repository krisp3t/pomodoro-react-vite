import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon,
} from '@chakra-ui/react';

import { IconType } from 'react-icons';
import Task from './Task';
import type { Task as TaskType } from '../../types/types';

export default function LogMode({
  mode, tasks, colorScheme, icon,
}: {
  mode: string,
  tasks: TaskType[],
  colorScheme: string,
  icon: IconType,
}) {
  const content = tasks.map((t: TaskType) => (
    <Task
      key={t.originalStart}
      task={t}
      colorScheme={colorScheme}
    />
  )).reverse();

  return (
    <Accordion allowToggle defaultIndex={0} w="100%">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Icon as={icon} display="inline" mr={2} />
            <Box flex="1" textAlign="left" fontWeight={500}>
              {mode.charAt(0) + mode.replace('_', ' ').substring(1).toLowerCase()}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {content}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
