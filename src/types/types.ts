export enum TaskEnum {
  WORKING = 'WORKING',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
  PAUSED = 'PAUSED',
  INITIAL = 'INITIAL',
}

export type Task = {
  id: string;
  type: TaskEnum;
  start: number;
  sessionLength: number;
  end: number;
};

export enum TaskActionEnum {
  START = 'START',
  PAUSE = 'PAUSE',
  CLEAR = 'CLEAR',
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
