import React, {
  createContext, Dispatch, useReducer,
} from 'react';

const USER_PREFERENCES_KEY = 'userPreferences';
const DEFAULT_SETTINGS : State = {
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

interface State {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  ignoreShorter: number;
  isStatistics: boolean;
  isLog: boolean;
  isNotifications: boolean;
  audioVolume: number;
}
enum NumActionType {
  SET_POMODORO_DURATION = 'SET_POMODORO_DURATION',
  SET_SHORT_BREAK_DURATION = 'SET_SHORT_BREAK_DURATION',
  SET_LONG_BREAK_DURATION = 'SET_LONG_BREAK_DURATION',
  SET_IGNORE_SHORTER = 'SET_IGNORE_SHORTER',
  SET_AUDIO_VOLUME = 'SET_AUDIO_VOLUME',
}
enum BoolActionType {
  SET_IS_STATISTICS = 'SET_IS_STATISTICS',
  SET_IS_LOG = 'SET_IS_LOG',
  SET_IS_NOTIFICATIONS = 'SET_IS_NOTIFICATIONS',
}
interface NumAction {
  type: NumActionType;
  payload: number;
}
interface BoolAction {
  type: BoolActionType;
  payload: boolean;
}
type Action = NumAction | BoolAction;

// TODO: check type guards
function isNumAction(action: Action): action is NumAction {
  return Object.values(NumActionType).includes(action.type as NumActionType) && typeof action.payload === 'number';
}
function isBoolAction(action: Action): action is BoolAction {
  return Object.values(BoolActionType).includes(action.type as BoolActionType) && typeof action.payload === 'boolean';
}

function settingsReducer(state: State, action: Action) {
  if (isNumAction(action)) {
    if (action.payload <= 0) {
      throw new RangeError(`Expected positive number for ${action} setting change, got ${action.payload}.`);
    }
    switch (action.type) {
      case NumActionType.SET_POMODORO_DURATION:
        return { ...state, pomodoroDuration: action.payload };
      case NumActionType.SET_SHORT_BREAK_DURATION:
        return { ...state, shortBreakDuration: action.payload };
      case NumActionType.SET_LONG_BREAK_DURATION:
        return { ...state, longBreakDuration: action.payload };
      case NumActionType.SET_IGNORE_SHORTER:
        return { ...state, ignoreShorter: action.payload };
      case NumActionType.SET_AUDIO_VOLUME:
        return { ...state, audioVolume: action.payload };
      default:
        throw new Error(`Invalid action type: ${JSON.stringify(action)}.`);
    }
  } else if (isBoolAction(action)) {
    switch (action.type) {
      case BoolActionType.SET_IS_STATISTICS:
        return { ...state, isStatistics: action.payload };
      case BoolActionType.SET_IS_LOG:
        return { ...state, isLog: action.payload };
      case BoolActionType.SET_IS_NOTIFICATIONS:
        return { ...state, isNotifications: action.payload };
      default:
        throw new Error(`Invalid action: ${JSON.stringify(action)}.`);
    }
  } else {
    throw new Error(`Invalid action: ${JSON.stringify(action)}.`);
  }
}

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const userPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
  const savedSettings = userPreferences ? JSON.parse(userPreferences) as State : null;
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
