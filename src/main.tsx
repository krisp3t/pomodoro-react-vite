import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import defaultTheme from './theme/theme';

import SettingsProvider from './store/settingsContext';
import App from './App';
import './index.css';

const theme = extendTheme(defaultTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
