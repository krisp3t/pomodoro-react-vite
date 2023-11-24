import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

import App from './App.tsx'
import './index.css'

const theme = extendTheme(theme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <SettingsProvider>
    <App />
            </SettingsProvider>
        </ChakraProvider>
  </React.StrictMode>,
)
