import { CompletedTasks, TaskModeEnum } from '../types/types';

export const initialTasks: CompletedTasks = {
  work: [],
  breaks: [],
  pauses: [],
};

export const initialTask = {
  id: 0,
  type: TaskModeEnum.INITIAL,
  start: 0,
  length: 0,
  end: 0,
  previous: null,
};
