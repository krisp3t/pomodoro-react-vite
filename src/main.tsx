// Library imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// App imports
import { SettingsProvider } from './store/SettingsContext';
import App from './App';
import './index.css';
import defaultTheme from './theme/theme';

const theme = extendTheme(defaultTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
