// External imports
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Box, Heading } from '@chakra-ui/react';

// App imports
import outputInterval, { timestampToOutput } from './Session.utils';
import StateDisplay from './StateDisplay';
import SessionButtons from './SessionButtons';
import { SettingsContext } from '../../store/SettingsContext';
import { TaskAction, TaskModeEnum } from '../../types/types';

export default function Session({ mode, dispatchMode, initialSecondsPassed } : {
  mode: TaskModeEnum,
  dispatchMode: (arg0: TaskAction) => void;
  initialSecondsPassed: number;
}) {
  const [secondsPassed, setSecondsPassed] = useState(initialSecondsPassed);
  const intervalRef = useRef();
  const settingsCtx = useContext(SettingsContext);

  useEffect(() => {
    document.title = `(${timestampToOutput(secondsPassed)}) Pomodoro Timer`;
  }, [secondsPassed]);

  return (
    <Box pb={10} textAlign="center">
      <Box pb={5}>
        <StateDisplay mode={mode} />
        <Heading>
          <p>{outputInterval(secondsPassed)}</p>
        </Heading>
      </Box>
      <SessionButtons mode={mode} dispatch={dispatchMode} secondsPassed={secondsPassed} />
    </Box>
  );
}
