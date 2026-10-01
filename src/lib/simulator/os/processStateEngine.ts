export type ProcessState = 'NEW' | 'READY' | 'RUNNING' | 'WAITING' | 'TERMINATED';

export type StateTransitionEvent =
  | 'ADMIT'
  | 'DISPATCH'
  | 'INTERRUPT'
  | 'IO_WAIT'
  | 'IO_COMPLETION'
  | 'EXIT';

export interface TransitionResult {
  valid: boolean;
  fromState: ProcessState;
  toState: ProcessState;
  event: StateTransitionEvent;
  message: string;
}

export const VALID_TRANSITIONS: Record<ProcessState, Partial<Record<StateTransitionEvent, ProcessState>>> = {
  NEW: {
    ADMIT: 'READY',
  },
  READY: {
    DISPATCH: 'RUNNING',
  },
  RUNNING: {
    INTERRUPT: 'READY',
    IO_WAIT: 'WAITING',
    EXIT: 'TERMINATED',
  },
  WAITING: {
    IO_COMPLETION: 'READY',
  },
  TERMINATED: {},
};

const TRANSITION_MESSAGES: Record<StateTransitionEvent, string> = {
  ADMIT: 'admit: The process is placed in the ready queue.',
  DISPATCH: 'dispatch: The scheduler selects the process for CPU execution.',
  INTERRUPT: 'interrupt: A timer interrupt preempts the process.',
  IO_WAIT: 'I/O request: The process asks for an external resource.',
  IO_COMPLETION: 'I/O completion: The resource is available, the process is ready to run again.',
  EXIT: 'exit: The process finishes execution.',
};

export function isValidTransition(from: ProcessState, to: ProcessState): boolean {
  const allowed = VALID_TRANSITIONS[from];
  if (!allowed) return false;
  return Object.values(allowed).includes(to);
}

export function transitionProcess(currentState: ProcessState, event: StateTransitionEvent): TransitionResult {
  const allowed = VALID_TRANSITIONS[currentState];
  const targetState = allowed ? allowed[event] : undefined;

  if (!targetState) {
    return {
      valid: false,
      fromState: currentState,
      toState: currentState,
      event,
      message: `Invalid transition: cannot trigger ${event} from state ${currentState}.`,
    };
  }

  return {
    valid: true,
    fromState: currentState,
    toState: targetState,
    event,
    message: TRANSITION_MESSAGES[event],
  };
}
