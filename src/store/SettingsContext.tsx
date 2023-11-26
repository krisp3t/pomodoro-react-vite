import React, { createContext, Dispatch, useReducer } from 'react';
import { SettingsState } from '../types/types.ts';

const USER_PREFERENCES_KEY = 'userPreferences';
const DEFAULT_SETTINGS : SettingsState = {
  pomodoroDuration: 1500000, // 25 min
  shortBreakDuration: 300000, // 5 min
  longBreakDuration: 1200000, // 20 min
  ignoreShorter: 60000, // 1 min
  isStatistics: true,
  isLog: true,
  isNotifications: true,
  audioVolume: 0.6,
};
export const SettingsContext = createContext(DEFAULT_SETTINGS);
export const SettingsDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action = {
  type: 'UPDATE',
  payload: SettingsState,
};

function settingsReducer(state: SettingsState, action: Action) {
  let newState;
  switch (action.type) {
    case 'UPDATE':
      newState = { ...state, ...action.payload };
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(newState));
      return newState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const userPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
  const savedSettings = userPreferences ? JSON.parse(userPreferences) as SettingsState : null;
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    savedSettings || DEFAULT_SETTINGS,
  );

  // TODO: Validate localStorage JSON

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatchSettings}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}
