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
};
