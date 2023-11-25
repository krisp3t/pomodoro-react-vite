import React, { useContext } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { VscDebugPause, VscDebugRestart, VscDebugStart } from 'react-icons/vsc';
import { RiSkipForwardLine } from 'react-icons/ri';

import { SESSION_MODES } from './Session';
import settingsContext from '../../store/SettingsContext.tsx';

export default function SessionButtons(props) {
  const settingsCtx = useContext(settingsContext);

  return (
    <ButtonGroup spacing="6">
      <Button
        colorScheme="green"
        leftIcon={<VscDebugStart />}
        shadow="md"
        isDisabled={[SESSION_MODES.working.status, SESSION_MODES.breaking.status].includes(props.mode.status)}
        onClick={() => props.dispatch({ type: 'START', settingsCtx })}
      >
        Start
      </Button>
      <Button
        colorScheme="red"
        leftIcon={<VscDebugPause />}
        shadow="md"
        isDisabled={[SESSION_MODES.paused.status, SESSION_MODES.initial.status].includes(props.mode.status)}
        onClick={() => props.dispatch({ type: 'PAUSE', settingsCtx })}
      >
        Pause
      </Button>
      <Button
        colorScheme="gray"
        leftIcon={<VscDebugRestart />}
        shadow="md"
        onClick={() => props.dispatch({ type: 'RESET', settingsCtx })}
      >
        Reset
      </Button>
      <Button
        colorScheme="blue"
        leftIcon={<RiSkipForwardLine />}
        shadow="md"
        display={props.mode.status === SESSION_MODES.breaking.status ? 'flex' : 'none'}
        onClick={() => props.dispatch({ type: 'SKIP', settingsCtx })}
      >
        Skip
      </Button>
    </ButtonGroup>
  );
}
