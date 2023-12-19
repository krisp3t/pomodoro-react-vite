// Library imports
import {
  useContext, useEffect, useReducer,
} from 'react';
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
  CompleteActionEnum,
  CompletedTasks,
  CompleteTaskAction,
  Task,
  TaskAction,
  TaskActionEnum,
  TaskModeEnum,
} from './types/types';
import { initialTask, initialTasks } from './default/defaultSession';

function getNotificationOptions(type: 'break' | 'work') : { title: string, options: object } {
  const text = type === 'break' ? 'Work session completed! Good work, now take a break 😉🔥' : 'Break is over - back to grinding! 💪';
  return {
    title: 'Pomodoro Timer',
    options: {
      body: text,
      icon: tomatoLogo,
    },
  };
}

const alarm = new Audio(alarmSound);
function startAlarm(volume: number) {
  alarm.volume = volume;
  alarm.play();
}

function modeReducer(state: Task, action: TaskAction) {
  const { type, payload } = action;
  const newTask : Task = {
    type: TaskModeEnum.INITIAL,
    originalStart: Date.now(),
    currentStart: Date.now(),
    length: 0,
    end: null,
    previous: null,
  };
  switch (type) {
    case TaskActionEnum.START:
      switch (state.type) {
        // Initial -> working
        case TaskModeEnum.INITIAL:
          return {
            ...newTask,
            type: TaskModeEnum.WORKING,
          };
        // Working -> break
        case TaskModeEnum.WORKING:
          return {
            ...newTask,
            type: TaskModeEnum.SHORT_BREAK,
          };
        // Break -> working
        case TaskModeEnum.SHORT_BREAK:
        case TaskModeEnum.LONG_BREAK:
          return {
            ...newTask,
            type: TaskModeEnum.WORKING,
          };
        // Paused -> working, break
        case TaskModeEnum.PAUSED:
          return {
            ...state.previous,
            currentStart: Date.now(),
          };
        default:
          throw new Error(`Unhandled action type: ${type}`);
      }
    // Working, break -> paused
    case TaskActionEnum.PAUSE:
      if (state.type === TaskModeEnum.PAUSED) return state;
      return {
        ...newTask,
        type: TaskModeEnum.PAUSED,
        previous: { ...state, length: payload },
      };
    case TaskActionEnum.RESET:
      return initialTask;
    case TaskActionEnum.SKIP:
      return {
        ...newTask,
        type: TaskModeEnum.WORKING,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function completeTasksReducer(state: CompletedTasks, action: CompleteTaskAction) {
  const { type, payload } = action;

  if (type === CompleteActionEnum.CLEAR) return initialTasks;
  if (!payload) throw new Error('Payload must be defined');
  if (type !== CompleteActionEnum.ADD) throw new Error(`Unhandled action type: ${type}`);

  console.log('payload', payload);
  switch (payload.type) {
    // Working -> break
    case TaskModeEnum.INITIAL:
      return state;
    case TaskModeEnum.WORKING:
      return { ...state, work: [...state.work, payload] };
    // Break -> working
    case TaskModeEnum.SHORT_BREAK:
    case TaskModeEnum.LONG_BREAK:
      return { ...state, breaks: [...state.breaks, payload] };
    case TaskModeEnum.PAUSED:
      return { ...state, pauses: [...state.pauses, payload] };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

export default function App() {
  const settingsCtx = useContext(SettingsContext);
  const initialCompletedTasks = localStorage.getItem('completedTasks') ? JSON.parse(localStorage.getItem('completedTasks') ?? '') : initialTasks;
  const [completedTasks, dispatchComplete] = useReducer(
    completeTasksReducer,
    initialCompletedTasks,
  );
  const [task, dispatchTask] = useReducer(modeReducer, initialTask);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  return (
    <>
      <Navbar />
      <Container maxW="container.lg" centerContent p={6}>
        <VStack w="100%">
          <Session
            task={task}
            dispatchTask={dispatchTask}
            dispatchComplete={dispatchComplete}
            getNotificationOptions={getNotificationOptions}
            startAlarm={startAlarm}
          />
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
                clear={() => dispatchComplete({ type: CompleteActionEnum.CLEAR, payload: null })}
              />
              )}
        </VStack>
      </Container>
    </>
  );
}
