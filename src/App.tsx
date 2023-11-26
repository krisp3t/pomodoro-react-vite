// Library imports
import { useContext, useReducer } from 'react';
import { Container, Divider, VStack } from '@chakra-ui/react';

// App imports
import Navbar from './components/Navbar/Navbar';
import Session from './components/Session/Session';
import Stats from './components/Stats/Stats';
import Log from './components/Log/Log';

// Context imports
import { SettingsContext } from './store/SettingsContext';
import { SessionType, Task } from './types/types';

interface CompletedTasks {
  work: Task[];
  breaks: Task[];
  pauses: Task[];
}
interface Action {
  type: SessionType;
  payload: Task | null;
}
function reducer(state: CompletedTasks, action: Action) {
  const { type, payload } = action;
  if (!payload) {
    if (type === SessionType.CLEAR) {
      return { work: [], breaks: [], pauses: [] };
    }
    return state;
  }
  switch (type) {
    case SessionType.WORKING:
      return { ...state, work: [...state.work, payload] };
    case SessionType.LONG_BREAK:
    case SessionType.SHORT_BREAK:
      return { ...state, breaks: [...state.breaks, payload] };
    case SessionType.PAUSED:
      return { ...state, pauses: [...state.pauses, payload] };
    default:
      return state;
  }
}

export default function App() {
  const settingsCtx = useContext(SettingsContext);
  const [completedTasks, dispatchCompletedTasks] = useReducer(reducer, {
    work: [],
    breaks: [],
    pauses: [],
  });

  return (
    <>
      <Navbar />
      <Container maxW="container.lg" centerContent p={6}>
        <VStack w="100%">
          <Session addItem={dispatchCompletedTasks} />
          <Divider borderColor="gray.200" />
          {settingsCtx.isStatistics && (
          <>
            <Stats actions={completedTasks} />
            <Divider borderColor="gray.200" />
          </>
          )}
          {settingsCtx.isLog
              && (
              <Log
                items={completedTasks}
                clear={() => dispatchCompletedTasks({ type: SessionType.CLEAR, payload: null })}
              />
              )}
        </VStack>
      </Container>
    </>
  );
}
