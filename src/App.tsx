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
  CompletedTasks, TaskEnum, Task, TaskAction, TaskActionEnum,
} from './types/types';

function reducer(state: CompletedTasks, action: TaskAction) {
  const { type, payload } = action;
  if (!payload) {
    if (type === TaskEnum.CLEAR) {
      return { work: [], breaks: [], pauses: [] };
    }
    return state;
  }
  switch (type) {
    case TaskEnum.WORKING:
      return { ...state, work: [...state.work, payload] };
    case TaskEnum.LONG_BREAK:
    case TaskEnum.SHORT_BREAK:
      return { ...state, breaks: [...state.breaks, payload] };
    case TaskEnum.PAUSED:
      return { ...state, pauses: [...state.pauses, payload] };
    default:
      return state;
  }
}

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

export default function App() {
  const settingsCtx = useContext(SettingsContext);
  const [completedTasks, dispatchCompletedTasks] = useReducer(reducer, {
    work: [],
    breaks: [],
    pauses: [],
  });
  const [mode, setMode] = useState(TaskEnum.INITIAL);

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
