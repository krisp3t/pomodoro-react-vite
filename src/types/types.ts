export enum TaskModeEnum {
  WORKING = 'WORKING',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
  PAUSED = 'PAUSED',
  INITIAL = 'INITIAL',
}

export type Task = {
  type: TaskModeEnum;
  originalStart: number;
  currentStart: number;
  length: number;
  end: number | null;
  previous: Task | null;
};

export enum TaskActionEnum {
  START = 'START',
  PAUSE = 'PAUSE',
  RESET = 'RESET',
  SKIP = 'SKIP',
}

export interface TaskAction {
  type: TaskActionEnum;
  payload: number;
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
