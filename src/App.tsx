import { useState } from 'react';

import { Container, Divider, VStack } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Session from './components/Session/Session.tsx';
import Stats from './components/Stats/Stats.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Container maxW="container.lg" centerContent p={6}>
        <p>test</p>
      </Container>
    </>
  );
}

export default App;
