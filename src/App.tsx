// Library imports
import { useContext, useReducer, useState } from 'react';
import { Container, Divider, VStack } from '@chakra-ui/react';

// App imports
import Navbar from './components/Navbar/Navbar';
import Session from './components/Session/Session';
import Stats from './components/Stats/Stats';
import Log from './components/Log/Log';
import tomatoLogo from './assets/tomato.png';
import alarmSound from './assets/alarm.mp3';

// Context imports
import { SettingsContext } from './store/SettingsContext';
import {
  CompletedTasks, TaskAction, TaskActionEnum, TaskModeEnum,
} from './types/types';
import { initialTasks, initialTask } from './default/defaultSession';

function getNotification(type: 'break' | 'work') {
  const text = type === 'break' ? 'Work session completed! Good work, now take a break 😉🔥' : 'Break is over - back to grinding! 💪';
  return new Notification('Pomodoro Timer', {
    body: text,
    icon: tomatoLogo,
  });
}

const alarm = new Audio(alarmSound);
function startAlarm(volume: number) {
  alarm.volume = volume;
  alarm.play();
}

function modeReducer(state: TaskModeEnum, action: TaskAction) {
  const { type, payload } = action;
  if (!payload) {
    if (type === TaskActionEnum.CLEAR) {
      return TaskModeEnum.INITIAL;
    }
    return state;
  }
  switch (type) {
    case TaskActionEnum.START:
      return state;
    case TaskActionEnum.PAUSE:
      return state;
    case TaskActionEnum.RESET:
      return state;
    case TaskActionEnum.SKIP:
      return state;
    case TaskActionEnum.COMPLETE:
      return state;
    case TaskActionEnum.CLEAR:
      return TaskModeEnum.INITIAL;
    default:
      return state;
  }
}

function completedTasksReducer(state: CompletedTasks, action: TaskAction) {
  const { type, payload } = action;
  if (!payload) {
    if (type === TaskActionEnum.CLEAR) {
      return { work: [], breaks: [], pauses: [] };
    }
    return state;
  }
  switch (type) {
    case TaskActionEnum.START:
      return state;
    case TaskActionEnum.PAUSE:
      return state;
    case TaskActionEnum.RESET:
      return state;
    case TaskActionEnum.SKIP:
      return state;
    case TaskActionEnum.COMPLETE:
      return state;
    case TaskActionEnum.CLEAR:
      return { work: [], breaks: [], pauses: [] };
    default:
      return state;
  }
}

export default function App() {
  const settingsCtx = useContext(SettingsContext);
  const [completedTasks, dispatchCompletedTasks] = useReducer(completedTasksReducer, initialTasks);
  const [mode, dispatchMode] = useReducer(modeReducer, initialTask);
  const [previousSecondsPassed, setPreviousSecondsPassed] = useState(0);

  return (
    <>
      <Navbar />
      <Container maxW="container.lg" centerContent p={6}>
        <VStack w="100%">
          <Session mode={mode} dispatchMode={dispatchCompletedTasks} initialSecondsPassed={0} />
          <Divider borderColor="gray.200" />
          {settingsCtx.isStatistics && (
          <>
            <Stats tasks={completedTasks} />
            <Divider borderColor="gray.200" />
          </>
          )}
          {settingsCtx.isLog
              && (
              <Log
                items={completedTasks}
                clear={() => dispatchCompletedTasks({ type: TaskActionEnum.CLEAR, payload: null })}
              />
              )}
        </VStack>
      </Container>
    </>
  );
}
