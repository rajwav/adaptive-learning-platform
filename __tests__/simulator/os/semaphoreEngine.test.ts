import { runWait, runSignal, SemaphoreState } from '../../../src/lib/simulator/os/semaphoreEngine';

describe('Semaphore Engine', () => {
  const getCountingState = (): SemaphoreState => ({
    type: 'COUNTING', value: 1, readyQueue: ['P1', 'P2', 'P3'], executing: [], blockedQueue: []
  });

  const getBinaryState = (): SemaphoreState => ({
    type: 'BINARY', value: 1, readyQueue: ['P1', 'P2', 'P3'], executing: [], blockedQueue: []
  });

  test('Counting Wait when S > 0', () => {
    const s = getCountingState();
    const res = runWait(s);
    expect(res.newState.value).toBe(0);
    expect(res.newState.executing).toContain('P1');
    expect(res.newState.blockedQueue.length).toBe(0);
  });

  test('Counting Wait when S <= 0', () => {
    const s = getCountingState();
    s.value = 0; // Already acquired
    const res = runWait(s);
    expect(res.newState.value).toBe(-1); // Decrements below zero
    expect(res.newState.executing.length).toBe(0);
    expect(res.newState.blockedQueue).toContain('P1'); // Blocked
  });

  test('Counting Signal waking blocked process', () => {
    const s = getCountingState();
    s.value = -1;
    s.executing = ['P1'];
    s.blockedQueue = ['P2'];
    // P1 signals
    const res = runSignal(s, 'P1');
    expect(res.newState.value).toBe(0);
    expect(res.newState.executing).toContain('P2'); // P2 unblocked
    expect(res.newState.executing).not.toContain('P1'); // P1 left
    expect(res.newState.blockedQueue.length).toBe(0);
  });

  test('Binary Wait', () => {
    const s = getBinaryState();
    // 1 -> 0
    let res = runWait(s);
    expect(res.newState.value).toBe(0);
    expect(res.newState.executing).toContain('P1');

    // 0 -> blocks, value stays 0
    res = runWait(res.newState);
    expect(res.newState.value).toBe(0);
    expect(res.newState.executing).toContain('P1');
    expect(res.newState.blockedQueue).toContain('P2');
  });

  test('Binary Signal', () => {
    const s = getBinaryState();
    s.value = 0;
    s.executing = ['P1'];
    s.blockedQueue = ['P2', 'P3'];
    // P1 signals. Lock transfers directly to P2. Value stays 0.
    const res = runSignal(s, 'P1');
    expect(res.newState.value).toBe(0);
    expect(res.newState.executing).toContain('P2');
    expect(res.newState.blockedQueue).toEqual(['P3']);
  });
});
