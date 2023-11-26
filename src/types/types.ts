export enum SessionType {
  WORKING = 'WORKING',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
  PAUSED = 'PAUSED',
  CLEAR = 'CLEAR',
}

export type Task = {
  id: string;
  name: string;
  pomodoroCount: number;
  isComplete: boolean;
  taskLength: number;
};

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
