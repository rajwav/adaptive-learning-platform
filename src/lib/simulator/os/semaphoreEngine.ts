export type SemaphoreType = 'COUNTING' | 'BINARY';

export interface SemaphoreState {
  type: SemaphoreType;
  value: number; // Counting: integer. Binary: 0 or 1.
  readyQueue: string[];
  executing: string[]; // For simulation visibility
  blockedQueue: string[];
}

export interface SemaphoreResult {
  newState: SemaphoreState;
  message: string;
}

export function runWait(state: SemaphoreState): SemaphoreResult {
  if (state.readyQueue.length === 0) {
    return { newState: state, message: 'No processes in ready queue.' };
  }

  const process = state.readyQueue[0];
  const newReady = state.readyQueue.slice(1);
  let newVal = state.value;

  if (state.type === 'COUNTING') {
    // Standard Dijkstra negative-value model
    newVal = newVal - 1;
    if (newVal < 0) {
      return {
        newState: { ...state, value: newVal, readyQueue: newReady, blockedQueue: [...state.blockedQueue, process] },
        message: `wait(S): S decremented to ${newVal}. Process ${process} added to blocked queue.`
      };
    } else {
      return {
        newState: { ...state, value: newVal, readyQueue: newReady, executing: [...state.executing, process] },
        message: `wait(S): S decremented to ${newVal}. Process ${process} enters critical section.`
      };
    }
  } else {
    // BINARY model (Lock: 0 or 1)
    if (newVal === 0) {
      return {
        newState: { ...state, readyQueue: newReady, blockedQueue: [...state.blockedQueue, process] },
        message: `wait(S): S is 0. Process ${process} added to blocked queue.`
      };
    } else {
      newVal = 0; // Acquire lock
      return {
        newState: { ...state, value: newVal, readyQueue: newReady, executing: [...state.executing, process] },
        message: `wait(S): S is 1. Acquired lock (S=0). Process ${process} enters critical section.`
      };
    }
  }
}

export function runSignal(state: SemaphoreState, caller?: string): SemaphoreResult {
  let newExecuting = [...state.executing];

  if (caller && newExecuting.includes(caller)) {
    newExecuting = newExecuting.filter(p => p !== caller);
  } else if (!caller && newExecuting.length > 0) {
    // If no caller specified, assume the first executing process is signaling to leave
    newExecuting = newExecuting.slice(1);
  }

  if (state.type === 'COUNTING') {
    const newVal = state.value + 1;
    if (newVal <= 0) {
      // Unblock one process
      const unblocked = state.blockedQueue[0];
      const newBlocked = state.blockedQueue.slice(1);
      return {
        newState: { ...state, value: newVal, executing: [...newExecuting, unblocked], blockedQueue: newBlocked },
        message: `signal(S): S incremented to ${newVal}. Process ${unblocked} unblocked and enters critical section.`
      };
    } else {
      return {
        newState: { ...state, value: newVal, executing: newExecuting },
        message: `signal(S): S incremented to ${newVal}. No processes were blocked.`
      };
    }
  } else {
    // BINARY
    if (state.blockedQueue.length > 0) {
      const unblocked = state.blockedQueue[0];
      const newBlocked = state.blockedQueue.slice(1);
      return {
        // Value remains 0 because the lock is immediately transferred to the unblocked process
        newState: { ...state, value: 0, executing: [...newExecuting, unblocked], blockedQueue: newBlocked },
        message: `signal(S): Lock transferred. Process ${unblocked} unblocked.`
      };
    } else {
      // Release lock
      return {
        newState: { ...state, value: 1, executing: newExecuting },
        message: `signal(S): Lock released (S=1).`
      };
    }
  }
}
