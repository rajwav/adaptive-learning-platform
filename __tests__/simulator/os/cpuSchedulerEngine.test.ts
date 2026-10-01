import { runScheduler, SchedulerProcess } from '../../../src/lib/simulator/os/cpuSchedulerEngine';

describe('CPU Scheduler Engine', () => {
  const defaultProcs: SchedulerProcess[] = [
    { id: 'P1', arrivalTime: 0, burstTime: 6, priority: 3, remainingTime: 6, startTime: -1, completionTime: -1 },
    { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1, remainingTime: 4, startTime: -1, completionTime: -1 },
    { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4, remainingTime: 2, startTime: -1, completionTime: -1 },
  ];

  test('FCFS Scheduling (Basic)', () => {
    const res = runScheduler(defaultProcs, 'FCFS');
    expect(res.gantt.length).toBe(3);
    expect(res.gantt[0].processId).toBe('P1');
    expect(res.gantt[1].processId).toBe('P2');
    expect(res.gantt[2].processId).toBe('P3');

    // Metrics P1: AT=0 BT=6 CT=6 TAT=6 WT=0 RT=0
    // Metrics P2: AT=1 BT=4 CT=10 TAT=9 WT=5 RT=5
    // Metrics P3: AT=2 BT=2 CT=12 TAT=10 WT=8 RT=8
    const p1 = res.processes.find(p=>p.id==='P1')!;
    const p2 = res.processes.find(p=>p.id==='P2')!;
    const p3 = res.processes.find(p=>p.id==='P3')!;
    expect(p1.completionTime).toBe(6); expect(p2.completionTime).toBe(10); expect(p3.completionTime).toBe(12);

    expect(res.avgTAT).toBeCloseTo((6 + 9 + 10) / 3);
    expect(res.avgWT).toBeCloseTo((0 + 5 + 8) / 3);
    expect(res.avgRT).toBeCloseTo((0 + 5 + 8) / 3);
    expect(res.contextSwitches).toBe(2); // P1->P2, P2->P3
  });

  test('SJF Scheduling (Non-Preemptive)', () => {
    const res = runScheduler(defaultProcs, 'SJF');
    expect(res.gantt.map(g => g.processId)).toEqual(['P1', 'P3', 'P2']);

    const p2 = res.processes.find(p=>p.id==='P2')!;
    const p3 = res.processes.find(p=>p.id==='P3')!;
    expect(p3.completionTime).toBe(8); // P1(6), then P3(2) -> 8
    expect(p2.completionTime).toBe(12); // P2(4) -> 12

    // Context switches: P1 -> P3 -> P2 = 2
    expect(res.contextSwitches).toBe(2);
  });

  test('SRTF Scheduling (Preemptive)', () => {
    const res = runScheduler(defaultProcs, 'SRTF');
    // P1 (0-1), P2 arrives (rem 4 vs 5) -> preempt!
    // P2 (1-2), P3 arrives (rem 2 vs 3) -> preempt!
    // P3 (2-4), finishes.
    // P2 resumes (4-7), finishes.
    // P1 resumes (7-12), finishes.
    const expectedGantt = [
      { processId: 'P1', start: 0, end: 1 },
      { processId: 'P2', start: 1, end: 2 },
      { processId: 'P3', start: 2, end: 4 },
      { processId: 'P2', start: 4, end: 7 },
      { processId: 'P1', start: 7, end: 12 }
    ];
    // Check Gantt structure exactly
    expect(res.gantt).toEqual(expectedGantt);
    expect(res.contextSwitches).toBe(4); // P1->P2, P2->P3, P3->P2, P2->P1
  });

  test('Priority (Non-Preemptive)', () => {
    const res = runScheduler(defaultProcs, 'PRIORITY_NON');
    // P1 starts at 0, runs to 6.
    // At t=6, P2 (priority 1) and P3 (priority 4) are ready. (lower number = higher priority)
    // P2 runs 6-10.
    // P3 runs 10-12.
    const expectedGantt = [
      { processId: 'P1', start: 0, end: 6 },
      { processId: 'P2', start: 6, end: 10 },
      { processId: 'P3', start: 10, end: 12 }
    ];
    expect(res.gantt).toEqual(expectedGantt);
    expect(res.contextSwitches).toBe(2);
  });

  test('Priority (Preemptive)', () => {
    const procs: SchedulerProcess[] = [
      { id: 'P1', arrivalTime: 0, burstTime: 6, priority: 3, remainingTime: 6, startTime: -1, completionTime: -1 },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1, remainingTime: 4, startTime: -1, completionTime: -1 },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4, remainingTime: 2, startTime: -1, completionTime: -1 },
    ];
    const res = runScheduler(procs, 'PRIORITY_PRE');
    // t=0: P1 (pr 3) starts
    // t=1: P2 (pr 1) arrives. 1 < 3. P2 preempts P1.
    // t=2: P3 (pr 4) arrives. 4 > 1. P2 continues.
    // P2 finishes at t=5.
    // at t=5, P1 (pr 3) and P3 (pr 4) are ready. P1 runs.
    // P1 finishes at t=10.
    // P3 runs t=10 to t=12.
    const expectedGantt = [
      { processId: 'P1', start: 0, end: 1 },
      { processId: 'P2', start: 1, end: 5 },
      { processId: 'P1', start: 5, end: 10 },
      { processId: 'P3', start: 10, end: 12 }
    ];
    expect(res.gantt).toEqual(expectedGantt);
    expect(res.contextSwitches).toBe(3); // P1->P2, P2->P1, P1->P3
  });

  test('Round Robin Scheduling', () => {
    const res = runScheduler(defaultProcs, 'RR', 2);
    const expectedGantt = [
      { processId: 'P1', start: 0, end: 2 },
      { processId: 'P2', start: 2, end: 4 },
      { processId: 'P3', start: 4, end: 6 },
      { processId: 'P1', start: 6, end: 8 },
      { processId: 'P2', start: 8, end: 10 },
      { processId: 'P1', start: 10, end: 12 }
    ];
    expect(res.gantt).toEqual(expectedGantt);
    expect(res.contextSwitches).toBe(5);
  });

  test('Tie-breaking: Arrival Time then ID', () => {
    const tieProcs: SchedulerProcess[] = [
      { id: 'P2', arrivalTime: 0, burstTime: 2, priority: 1, remainingTime: 2, startTime: -1, completionTime: -1 },
      { id: 'P1', arrivalTime: 0, burstTime: 2, priority: 1, remainingTime: 2, startTime: -1, completionTime: -1 }
    ];
    // Both arrive at 0, same burst, same priority.
    // ID tie-break should pick P1 before P2.
    const res = runScheduler(tieProcs, 'FCFS');
    expect(res.gantt[0].processId).toBe('P1');
    expect(res.gantt[1].processId).toBe('P2');
  });

  test('Context Switch Semantics: Idle gaps', () => {
    const gapProcs: SchedulerProcess[] = [
      { id: 'P1', arrivalTime: 1, burstTime: 2, priority: 1, remainingTime: 2, startTime: -1, completionTime: -1 },
      { id: 'P2', arrivalTime: 5, burstTime: 2, priority: 1, remainingTime: 2, startTime: -1, completionTime: -1 }
    ];
    const res = runScheduler(gapProcs, 'FCFS');
    // 0-1: IDLE, 1-3: P1, 3-5: IDLE, 5-7: P2
    // IDLE->P1 is NOT a context switch (first dispatch).
    // P1->IDLE->P2 IS a context switch (P1 state saved, eventually P2 loaded).
    expect(res.gantt[0].processId).toBe('IDLE');
    expect(res.gantt[1].processId).toBe('P1');
    expect(res.gantt[2].processId).toBe('IDLE');
    expect(res.gantt[3].processId).toBe('P2');
    expect(res.contextSwitches).toBe(1); // Only P1 -> P2 counts
  });
});
