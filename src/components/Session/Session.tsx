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
import { TaskAction, Task, CompleteTaskAction } from '../../types/types';

export default function Session({
  task, dispatchTask, dispatchComplete,
} : {
  task: Task,
  dispatchTask: (arg0: TaskAction) => void;
  dispatchComplete: (arg0: CompleteTaskAction) => void;
}) {
  const [secondsPassed, setSecondsPassed] = useState(task.length);
  const intervalRef = useRef(null);
  const settingsCtx = useContext(SettingsContext);

  useEffect(() => {
    document.title = `(${timestampToOutput(secondsPassed)}) Pomodoro Timer`;
  }, [secondsPassed]);

  useEffect(() => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSecondsPassed((prev) => prev + 1);
      }, 1000);
    }
  }, [task]);

  return (
    <Box pb={10} textAlign="center">
      <Box pb={5}>
        <StateDisplay mode={task.type} />
        <Heading>
          <p>{outputInterval(secondsPassed)}</p>
        </Heading>
      </Box>
      <SessionButtons task={task} dispatchTask={dispatchTask} dispatchComplete={dispatchComplete} secondsPassed={secondsPassed} />
    </Box>
  );
}
