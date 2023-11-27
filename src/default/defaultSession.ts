import { CompletedTasks, TaskModeEnum } from '../types/types';

export const initialTasks: CompletedTasks = {
  work: [],
  breaks: [],
  pauses: [],
};

export const initialTask = {
  type: TaskModeEnum.INITIAL,
  originalStart: Date.now(),
  currentStart: Date.now(),
  length: 0,
  end: 0,
  previous: null,
};
