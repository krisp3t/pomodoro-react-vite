import { Button, ButtonGroup } from '@chakra-ui/react';
import { VscDebugPause, VscDebugRestart, VscDebugStart } from 'react-icons/vsc';
import { RiSkipForwardLine } from 'react-icons/ri';

import { TaskActionEnum, TaskModeEnum, TaskAction } from '../../types/types';

export default function SessionButtons({ mode, dispatch, secondsPassed } : {
  mode: TaskModeEnum,
  dispatch: (arg0: TaskAction) => void;
  secondsPassed: number;
}) {
  return (
    <ButtonGroup spacing="6">
      <Button
        colorScheme="green"
        leftIcon={<VscDebugStart />}
        shadow="md"
        isDisabled={[TaskModeEnum.WORKING, TaskModeEnum.SHORT_BREAK, TaskModeEnum.LONG_BREAK].includes(mode)}
        onClick={() => dispatch({ type: TaskActionEnum.START, payload: secondsPassed })}
      >
        Start
      </Button>
      <Button
        colorScheme="red"
        leftIcon={<VscDebugPause />}
        shadow="md"
        isDisabled={[TaskModeEnum.INITIAL, TaskModeEnum.PAUSED].includes(mode)}
        onClick={() => dispatch({ type: TaskActionEnum.PAUSE, payload: secondsPassed })}
      >
        Pause
      </Button>
      <Button
        colorScheme="gray"
        leftIcon={<VscDebugRestart />}
        shadow="md"
        onClick={() => dispatch({ type: TaskActionEnum.RESET, payload: null })}
      >
        Reset
      </Button>
      <Button
        colorScheme="blue"
        leftIcon={<RiSkipForwardLine />}
        shadow="md"
        display={mode === TaskModeEnum.LONG_BREAK || mode === TaskModeEnum.SHORT_BREAK ? 'flex' : 'none'}
        onClick={() => dispatch({ type: TaskActionEnum.SKIP, payload: null })}
      >
        Skip
      </Button>
    </ButtonGroup>
  );
}
