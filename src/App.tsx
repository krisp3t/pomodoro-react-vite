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
  CompletedTasks, TaskAction, TaskActionEnum, TaskEnum,
} from './types/types';

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

const initialTasks : CompletedTasks = {
  work: [],
  breaks: [],
  pauses: [],
};

export default function App() {
  const settingsCtx = useContext(SettingsContext);
  const [completedTasks, dispatchCompletedTasks] = useReducer(reducer, initialTasks);
  const [mode, setMode] = useState(TaskEnum.INITIAL);
  const [previousSecondsPassed, setPreviousSecondsPassed] = useState(0);
  const [previousMode, setPreviousMode] = useState(TaskEnum.INITIAL);

  function reducer(state: CompletedTasks, action: TaskAction) {
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
        setPreviousMode(mode);
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
