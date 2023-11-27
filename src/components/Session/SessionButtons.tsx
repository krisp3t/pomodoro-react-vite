import { Button, ButtonGroup } from '@chakra-ui/react';
import { VscDebugPause, VscDebugRestart, VscDebugStart } from 'react-icons/vsc';
import { RiSkipForwardLine } from 'react-icons/ri';

import {
  TaskActionEnum, TaskModeEnum, TaskAction, Task, CompleteTaskAction, CompleteActionEnum,
} from '../../types/types';

export default function SessionButtons({
  task, dispatchTask, dispatchComplete, secondsPassed,
} : {
  task: Task,
  dispatchTask: (arg0: TaskAction) => void;
  dispatchComplete: (arg0: CompleteTaskAction) => void;
  secondsPassed: number;
}) {
  return (
    <ButtonGroup spacing="6">
      <Button
        colorScheme="green"
        leftIcon={<VscDebugStart />}
        shadow="md"
        isDisabled={[TaskModeEnum.WORKING, TaskModeEnum.SHORT_BREAK, TaskModeEnum.LONG_BREAK].includes(task.type)}
        onClick={() => {
          dispatchComplete({ type: CompleteActionEnum.ADD, payload: task });
          dispatchTask({ type: TaskActionEnum.START, payload: secondsPassed });
        }}
      >
        Start
      </Button>
      <Button
        colorScheme="red"
        leftIcon={<VscDebugPause />}
        shadow="md"
        isDisabled={[TaskModeEnum.INITIAL, TaskModeEnum.PAUSED].includes(task.type)}
        onClick={() => dispatchTask({ type: TaskActionEnum.PAUSE, payload: secondsPassed })}
      >
        Pause
      </Button>
      <Button
        colorScheme="gray"
        leftIcon={<VscDebugRestart />}
        shadow="md"
        onClick={() => dispatchTask({ type: TaskActionEnum.RESET, payload: null })}
      >
        Reset
      </Button>
      <Button
        colorScheme="blue"
        leftIcon={<RiSkipForwardLine />}
        shadow="md"
        display={task.type === TaskModeEnum.LONG_BREAK || task.type === TaskModeEnum.SHORT_BREAK ? 'flex' : 'none'}
        onClick={() => dispatchTask({ type: TaskActionEnum.SKIP, payload: null })}
      >
        Skip
      </Button>
    </ButtonGroup>
  );
}
