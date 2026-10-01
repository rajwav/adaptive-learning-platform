export type SchedulingAlgorithm = 'FCFS' | 'SJF' | 'SRTF' | 'PRIORITY_NON' | 'PRIORITY_PRE' | 'RR';

export interface SchedulerProcess {
  id: string; // e.g. "P1"
  arrivalTime: number;
  burstTime: number;
  priority?: number; // Lower number = higher priority
  remainingTime: number;
  startTime: number;
  completionTime: number;
}

export interface GanttBlock {
  processId: string | 'IDLE';
  start: number;
  end: number;
}

export interface TraceEvent {
  time: number;
  runningProcess: string | 'IDLE';
  readyQueue: string[];
  event: string;
  isCompletion: boolean;
  isArrival: boolean;
  isPreemption: boolean;
}

export interface SchedulerResult {
  gantt: GanttBlock[];
  processes: SchedulerProcess[];
  avgWT: number;
  avgTAT: number;
  avgRT: number;
  contextSwitches: number;
  trace: TraceEvent[];
}

export function runScheduler(
  processes: SchedulerProcess[],
  algo: SchedulingAlgorithm,
  quantum: number = 2
): SchedulerResult {
  const procs = processes.map(p => ({
    ...p,
    remainingTime: Math.max(0, p.burstTime),
    startTime: -1,
    completionTime: -1,
  }));

  const trace: TraceEvent[] = [];
  const gantt: GanttBlock[] = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;

  let contextSwitches = 0;
  let currentProcessId: string | 'IDLE' | null = null;
  let lastRealProcess: string | null = null; // Tracks the last actual process to run (ignores IDLE)

  const queue: SchedulerProcess[] = [];

  /**
   * CONTEXT SWITCH SEMANTICS:
   * A context switch is counted when the CPU transitions from executing Process A to Process B.
   * - P1 -> P2 = 1 switch
   * - P1 -> P1 = 0 switches
   * - P1 -> IDLE -> P2 = 1 switch (saving P1, loading P2)
   * - IDLE -> P1 (at start of simulation) = 0 switches
   * Preemptions (P1 -> P2) count as 1 switch.
   * RR quantum expirations leading to the same process (P1 -> P1) count as 0 switches.
   */
  const addToGantt = (pid: string | 'IDLE', time: number) => {
    if (gantt.length > 0 && gantt[gantt.length - 1].processId === pid) {
      gantt[gantt.length - 1].end = time;
    } else {
      gantt.push({ processId: pid, start: currentTime, end: time });
      if (pid !== 'IDLE') {
        if (lastRealProcess !== null && lastRealProcess !== pid) {
          contextSwitches++;
        }
        lastRealProcess = pid;
      }
    }
    currentProcessId = pid;
  };

  const getReadyQueueSnapshot = (arrived: SchedulerProcess[]) => arrived.map(p => p.id);

  if (algo === 'FCFS' || algo === 'SJF' || algo === 'PRIORITY_NON') {
    while (completedCount < n) {
      const arrived = procs.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);

      if (arrived.length === 0) {
        addToGantt('IDLE', currentTime + 1);
        trace.push({
          time: currentTime, runningProcess: 'IDLE', readyQueue: [], event: `CPU is IDLE.`,
          isCompletion: false, isArrival: false, isPreemption: false
        });
        currentTime++;
        continue;
      }

      arrived.sort((a, b) => {
        if (algo === 'FCFS') {
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        }
        if (algo === 'SJF') {
          if (a.remainingTime !== b.remainingTime) return a.remainingTime - b.remainingTime;
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        }
        if (algo === 'PRIORITY_NON') {
          const pA = a.priority ?? 0; const pB = b.priority ?? 0;
          if (pA !== pB) return pA - pB;
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        }
        return 0;
      });

      const selected = arrived[0];
      if (selected.startTime === -1) selected.startTime = currentTime;

      trace.push({
        time: currentTime, runningProcess: selected.id,
        readyQueue: getReadyQueueSnapshot(arrived.filter(p => p.id !== selected.id)),
        event: `${selected.id} dispatched. Running to completion.`,
        isCompletion: false, isArrival: false, isPreemption: false
      });

      addToGantt(selected.id, currentTime + selected.remainingTime);
      currentTime += selected.remainingTime;
      selected.remainingTime = 0;
      selected.completionTime = currentTime;
      completedCount++;

      trace.push({
        time: currentTime, runningProcess: selected.id,
        readyQueue: getReadyQueueSnapshot(procs.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0)),
        event: `${selected.id} completed.`,
        isCompletion: true, isArrival: false, isPreemption: false
      });
    }
  }
  else if (algo === 'SRTF' || algo === 'PRIORITY_PRE') {
    while (completedCount < n) {
      const arrived = procs.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);

      if (arrived.length === 0) {
        addToGantt('IDLE', currentTime + 1);
        trace.push({
          time: currentTime, runningProcess: 'IDLE', readyQueue: [], event: `CPU is IDLE.`,
          isCompletion: false, isArrival: false, isPreemption: false
        });
        currentTime++;
        continue;
      }

      arrived.sort((a, b) => {
        if (algo === 'SRTF') {
          if (a.remainingTime !== b.remainingTime) return a.remainingTime - b.remainingTime;
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id); // Tie-break: lowest ID
        }
        if (algo === 'PRIORITY_PRE') {
          const pA = a.priority ?? 0; const pB = b.priority ?? 0;
          if (pA !== pB) return pA - pB;
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id); // Tie-break: lowest ID
        }
        return 0;
      });

      const selected = arrived[0];

      let isPreempt = false;
      if (currentProcessId !== selected.id && currentProcessId !== 'IDLE' && currentProcessId !== null) {
        isPreempt = true;
      }

      if (selected.startTime === -1) selected.startTime = currentTime;

      if (currentProcessId !== selected.id) {
        trace.push({
          time: currentTime, runningProcess: selected.id,
          readyQueue: getReadyQueueSnapshot(arrived.filter(p => p.id !== selected.id)),
          event: isPreempt ? `${currentProcessId} preempted by ${selected.id}.` : `${selected.id} dispatched.`,
          isCompletion: false, isArrival: false, isPreemption: isPreempt
        });
      }

      addToGantt(selected.id, currentTime + 1);
      selected.remainingTime--;
      currentTime++;

      if (selected.remainingTime === 0) {
        selected.completionTime = currentTime;
        completedCount++;
        trace.push({
          time: currentTime, runningProcess: selected.id,
          readyQueue: getReadyQueueSnapshot(procs.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0)),
          event: `${selected.id} completed.`,
          isCompletion: true, isArrival: false, isPreemption: false
        });
      }
    }
  }
  else if (algo === 'RR') {
    const arrivedSet = new Set<string>();

    while (completedCount < n) {
      const newArrivals = procs.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0 && !arrivedSet.has(p.id));
      newArrivals.sort((a, b) => {
        if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
        return a.id.localeCompare(b.id);
      });

      for (const p of newArrivals) {
        queue.push(p);
        arrivedSet.add(p.id);
        trace.push({
          time: currentTime, runningProcess: currentProcessId || 'IDLE',
          readyQueue: getReadyQueueSnapshot(queue), event: `${p.id} arrived and joined ready queue.`,
          isCompletion: false, isArrival: true, isPreemption: false
        });
      }

      if (queue.length === 0) {
        addToGantt('IDLE', currentTime + 1);
        currentTime++;
        continue;
      }

      const selected = queue.shift()!;
      if (selected.startTime === -1) selected.startTime = currentTime;

      const runTime = Math.min(selected.remainingTime, quantum);

      trace.push({
        time: currentTime, runningProcess: selected.id,
        readyQueue: getReadyQueueSnapshot(queue),
        event: `${selected.id} dispatched for ${runTime}ms (quantum=${quantum}).`,
        isCompletion: false, isArrival: false, isPreemption: false
      });

      addToGantt(selected.id, currentTime + runTime);
      selected.remainingTime -= runTime;

      for (let t = currentTime + 1; t <= currentTime + runTime; t++) {
        const newlyArrived = procs.filter(p => p.arrivalTime === t && p.remainingTime > 0 && !arrivedSet.has(p.id));
        newlyArrived.sort((a, b) => a.id.localeCompare(b.id));
        for (const p of newlyArrived) {
          queue.push(p);
          arrivedSet.add(p.id);
          trace.push({
            time: t, runningProcess: selected.id,
            readyQueue: getReadyQueueSnapshot(queue), event: `${p.id} arrived and joined ready queue.`,
            isCompletion: false, isArrival: true, isPreemption: false
          });
        }
      }
      currentTime += runTime;

      if (selected.remainingTime > 0) {
        queue.push(selected);
        trace.push({
          time: currentTime, runningProcess: selected.id,
          readyQueue: getReadyQueueSnapshot(queue), event: `${selected.id} quantum expired. Returned to ready queue.`,
          isCompletion: false, isArrival: false, isPreemption: true
        });
      } else {
        selected.completionTime = currentTime;
        completedCount++;
        trace.push({
          time: currentTime, runningProcess: selected.id,
          readyQueue: getReadyQueueSnapshot(queue), event: `${selected.id} completed.`,
          isCompletion: true, isArrival: false, isPreemption: false
        });
      }
    }
  }

  let totalWT = 0; let totalTAT = 0; let totalRT = 0;
  for (const p of procs) {
    const tat = p.completionTime - p.arrivalTime;
    const wt = tat - p.burstTime;
    const rt = p.startTime - p.arrivalTime;
    totalTAT += tat; totalWT += wt; totalRT += rt;
  }

  return {
    gantt, processes: procs,
    avgWT: parseFloat((totalWT / n).toFixed(2)),
    avgTAT: parseFloat((totalTAT / n).toFixed(2)),
    avgRT: parseFloat((totalRT / n).toFixed(2)),
    contextSwitches, trace
  };
}
