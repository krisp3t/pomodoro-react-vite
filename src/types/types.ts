export enum TaskModeEnum {
  WORKING = 'WORKING',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
  PAUSED = 'PAUSED',
  INITIAL = 'INITIAL',
}

export type Task = {
  type: TaskModeEnum;
  originalStart: number; // Timestamp when originally started
  currentStart: number; // Timestamp when last resumed
  length: number; // Accumulated length before all pauses
  end: number | null; // Timestamp when completed
  previous: Task | null; // Task before pausing so we can restore it
};

export enum TaskActionEnum {
  START = 'START',
  PAUSE = 'PAUSE',
  RESET = 'RESET',
  SKIP = 'SKIP',
}

export interface TaskAction {
  type: TaskActionEnum;
  payload: number | null;
}

export interface SettingsState {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  ignoreShorter: number;
  isStatistics: boolean;
  isLog: boolean;
  isNotifications: boolean;
  audioVolume: number;
}

export interface CompletedTasks {
  work: Task[];
  breaks: Task[];
  pauses: Task[];
}

export enum CompleteActionEnum {
  ADD = 'ADD',
  CLEAR = 'CLEAR',
}
export interface CompleteTaskAction {
  type: CompleteActionEnum,
  payload: Task | null
}
