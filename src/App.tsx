// Library imports
import { useContext, useReducer } from 'react';
import { Container, Divider, VStack } from '@chakra-ui/react';

// App imports
import Navbar from './components/Navbar/Navbar';
import Session from './components/Session/Session';
import Stats from './components/Stats/Stats';
import { SettingsContext } from './store/SettingsContext';
import SessionType from './components/Session/SessionType.ts';

export default function App() {
  const settingsCtx = useContext(SettingsContext);
  const [completedTasks, dispatchCompletedTasks] = useReducer(reducer, {
    work: [],
    breaks: [],
    pauses: [],
  });

  interface CompletedTasks {
    work: SessionType[];
    breaks: SessionType[];
    pauses: SessionType[];
  }
  interface Action {
    type: SessionType;
    payload: SessionType;
  }
  function reducer(state: SessionType, action) {

  }

  return (
    <>
      <Navbar />
      <Container maxW="container.lg" centerContent p={6}>
        <VStack w="100%">
          <Session addItem={dispatchCompleted} />
          <Divider borderColor="gray.200" />
          {settingsCtx.isStatistics && (
          <>
            <Stats actions={completed} />
            <Divider borderColor="gray.200" />
          </>
          )}
          {settingsCtx.isLog
              && <Log items={completed} clear={() => dispatchCompleted({ status: 'CLEAR' })} />}
        </VStack>
      </Container>
    </>
  );
}
