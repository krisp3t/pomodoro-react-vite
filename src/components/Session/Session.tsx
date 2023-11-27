// External imports
import {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { Box, Heading } from '@chakra-ui/react';

// App imports
import outputInterval, { timestampToOutput } from './Session.utils';
import StateDisplay from './StateDisplay';
import SessionButtons from './SessionButtons';
import { SettingsContext } from '../../store/SettingsContext';
import {
  CompleteActionEnum,
  CompleteTaskAction,
  Task,
  TaskAction,
  TaskActionEnum,
  TaskModeEnum,
} from '../../types/types';

export default function Session({
  task, dispatchTask, dispatchComplete,
} : {
  task: Task,
  dispatchTask: (arg0: TaskAction) => void;
  dispatchComplete: (arg0: CompleteTaskAction) => void;
}) {
  const [msPassed, setMsPassed] = useState(task.length);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settingsCtx = useContext(SettingsContext);

  useEffect(() => {
    document.title = `(${timestampToOutput(msPassed)}) Pomodoro Timer`;
  }, [msPassed]);

  useEffect(() => {
    if (task.type === TaskModeEnum.INITIAL) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      // setMsPassed(0);
      return;
    }
    if (intervalRef.current) {
      // setMsPassed(task.length);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = setInterval(() => {
      setMsPassed(task.length + (Date.now() - task.currentStart));
    }, 1000);

    return () => { clearInterval(intervalRef.current); };
  }, [task]);

  // Complete the task:
  // Working -> break
  // Long break -> working
  // Short break -> working
  if ((msPassed > settingsCtx.pomodoroDuration && task.type === TaskModeEnum.WORKING)
    || (msPassed > settingsCtx.longBreakDuration && task.type === TaskModeEnum.LONG_BREAK)
      || (msPassed > settingsCtx.shortBreakDuration && task.type === TaskModeEnum.SHORT_BREAK)) {
    dispatchComplete({ type: CompleteActionEnum.ADD, payload: task });
    dispatchTask({ type: TaskActionEnum.START, payload: msPassed });
  }

  return (
    <Box pb={10} textAlign="center">
      <Box pb={5}>
        <StateDisplay mode={task.type} />
        <Heading>
          <p>{outputInterval(msPassed)}</p>
        </Heading>
      </Box>
      <SessionButtons task={task} dispatchTask={dispatchTask} dispatchComplete={dispatchComplete} secondsPassed={msPassed} />
    </Box>
  );
}
