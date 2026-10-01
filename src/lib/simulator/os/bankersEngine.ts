export interface BankersState {
  numProcesses: number;
  numResources: number;
  available: number[];
  max: number[][];
  allocation: number[][];
  need: number[][];
}

export interface SafetyStep {
  stepIndex: number;
  work: number[];
  finish: boolean[];
  selectedProcess: number | null;
  isSafe: boolean;
  message: string;
}

export interface SafetyResult {
  isSafe: boolean;
  safeSequence: number[];
  trace: SafetyStep[];
}

export function calculateNeed(max: number[][], allocation: number[][]): number[][] {
  const need: number[][] = [];
  for (let i = 0; i < max.length; i++) {
    const row = [];
    for (let j = 0; j < max[i].length; j++) {
      row.push(max[i][j] - allocation[i][j]);
    }
    need.push(row);
  }
  return need;
}

export function runSafetyAlgorithm(state: BankersState): SafetyResult {
  const { numProcesses, numResources, available, max, allocation } = state;
  const need = calculateNeed(max, allocation);

  const work = [...available];
  const finish = new Array(numProcesses).fill(false);
  const safeSequence: number[] = [];
  const trace: SafetyStep[] = [];

  let stepIndex = 0;
  trace.push({
    stepIndex: stepIndex++,
    work: [...work],
    finish: [...finish],
    selectedProcess: null,
    isSafe: false,
    message: "Initial state. Work = Available."
  });

  let count = 0;
  while (count < numProcesses) {
    let found = false;
    for (let p = 0; p < numProcesses; p++) {
      if (!finish[p]) {
        let canSatisfy = true;
        for (let j = 0; j < numResources; j++) {
          if (need[p][j] > work[j]) {
            canSatisfy = false;
            break;
          }
        }
        if (canSatisfy) {
          for (let j = 0; j < numResources; j++) {
            work[j] += allocation[p][j];
          }
          finish[p] = true;
          safeSequence.push(p);
          found = true;
          count++;

          trace.push({
            stepIndex: stepIndex++,
            work: [...work],
            finish: [...finish],
            selectedProcess: p,
            isSafe: count === numProcesses,
            message: `Process P${p} can run. Need <= Work. Work updated to [${work.join(', ')}].`
          });
          break; // Start searching from beginning again (standard Banker's)
        }
      }
    }
    if (!found) {
      break; // Unsafe state
    }
  }

  if (count < numProcesses) {
    trace.push({
      stepIndex: stepIndex++,
      work: [...work],
      finish: [...finish],
      selectedProcess: null,
      isSafe: false,
      message: "Unsafe state. No process can be satisfied with current Work."
    });
    return { isSafe: false, safeSequence: [], trace };
  }

  trace.push({
    stepIndex: stepIndex++,
    work: [...work],
    finish: [...finish],
    selectedProcess: null,
    isSafe: true,
    message: `System is in a Safe State. Safe Sequence: ${safeSequence.map(s => 'P'+s).join(' -> ')}`
  });

  return { isSafe: true, safeSequence, trace };
}

export interface RequestResult {
  granted: boolean;
  message: string;
  newState?: BankersState;
  safetyResult?: SafetyResult;
}

export function handleResourceRequest(state: BankersState, processId: number, request: number[]): RequestResult {
  const { numResources, available, max, allocation, need } = state;

  // 1. Check Request <= Need
  for (let j = 0; j < numResources; j++) {
    if (request[j] > need[processId][j]) {
      return { granted: false, message: `Error: Process P${processId} exceeded its maximum claim.` };
    }
  }

  // 2. Check Request <= Available
  for (let j = 0; j < numResources; j++) {
    if (request[j] > available[j]) {
      return { granted: false, message: `Wait: Resources not available for P${processId}.` };
    }
  }

  // 3. Pretend to allocate
  const newAvailable = [...available];
  const newAllocation = allocation.map(row => [...row]);
  const newNeed = need.map(row => [...row]);

  for (let j = 0; j < numResources; j++) {
    newAvailable[j] -= request[j];
    newAllocation[processId][j] += request[j];
    newNeed[processId][j] -= request[j];
  }

  const newState: BankersState = {
    ...state,
    available: newAvailable,
    allocation: newAllocation,
    need: newNeed,
    max: max // max doesn't change
  };

  // 4. Check Safety
  const safety = runSafetyAlgorithm(newState);

  if (safety.isSafe) {
    return { granted: true, message: "Request granted. System remains safe.", newState, safetyResult: safety };
  } else {
    return { granted: false, message: "Request denied. Allocation would lead to an unsafe state.", safetyResult: safety };
  }
}
