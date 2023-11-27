export enum TaskModeEnum {
  WORKING = 'WORKING',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
  PAUSED = 'PAUSED',
  INITIAL = 'INITIAL',
}

export type Task = {
  id: number;
  type: TaskModeEnum;
  start: number;
  length: number;
  end: number;
  previous: Task | null;
};

export enum TaskActionEnum {
  START = 'START',
  PAUSE = 'PAUSE',
  CLEAR = 'CLEAR',
  RESET = 'RESET',
  SKIP = 'SKIP',
  COMPLETE = 'COMPLETE',
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

export type State = {
  task
};
