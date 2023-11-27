export const SESSION_MODES = {
  working: {
    status: 'WORKING',
    originalStart: 0,
    currentStart: 0,
    accumulated: 0,
    sessionLength: 0,
  },
  breaking: {
    status: 'RESTING',
  },
  shortBreak: {
    status: 'RESTING',
    length: 'SHORT_BREAK',
    originalStart: 0,
    currentStart: 0,
    accumulated: 0,
    sessionLength: 0,
  },
  longBreak: {
    status: 'RESTING',
    length: 'LONG_BREAK',
    originalStart: 0,
    currentStart: 0,
    accumulated: 0,
    sessionLength: 0,
  },
  paused: {
    status: 'PAUSED',
    originalStart: 0,
    previousState: null,
  },
  initial: {
    status: 'INITIAL',
  },
};
