import { runSafetyAlgorithm, handleResourceRequest, calculateNeed, BankersState } from '../../../src/lib/simulator/os/bankersEngine';

describe('Bankers Engine', () => {
  const getDefaultState = (): BankersState => ({
    numProcesses: 5,
    numResources: 3,
    available: [3, 3, 2],
    max: [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]],
    allocation: [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]],
    need: [[7, 4, 3], [1, 2, 2], [6, 0, 0], [0, 1, 1], [4, 3, 1]]
  });

  test('calculateNeed computes correct matrix', () => {
    const s = getDefaultState();
    const need = calculateNeed(s.max, s.allocation);
    expect(need).toEqual(s.need);
  });

  test('runSafetyAlgorithm identifies safe state and exact safe sequence', () => {
    const s = getDefaultState();
    const res = runSafetyAlgorithm(s);
    expect(res.isSafe).toBe(true);
    // Sequence depends on engine implementation. If engine restarts loop after finding process:
    // P1 finishes -> Work=[5,3,2]. P3 finishes -> Work=[7,4,3].
    // Then it restarts loop and finds P0 can finish -> Work=[7,5,3].
    // Then P2 finishes -> Work=[10,5,5].
    // Then P4 finishes -> Work=[10,5,7].
    expect(res.safeSequence).toEqual([1, 3, 0, 2, 4]);
  });

  test('runSafetyAlgorithm identifies unsafe state with no safe sequence', () => {
    const s = getDefaultState();
    s.available = [0, 0, 0];
    const res = runSafetyAlgorithm(s);
    expect(res.isSafe).toBe(false);
    expect(res.safeSequence).toEqual([]);
  });

  test('handleResourceRequest: request > available (Must wait)', () => {
    const s = getDefaultState();
    // P0 needs [7,4,3]. Request [4,4,3]. Available [3,3,2].
    // Request <= Need (True). Request <= Available (False).
    const res = handleResourceRequest(s, 0, [4, 4, 3]);
    expect(res.granted).toBe(false);
    expect(res.message).toContain('Resources not available');
  });

  test('handleResourceRequest: request > need (Error)', () => {
    const s = getDefaultState();
    // P1 needs [1,2,2], requests [2,0,0].
    const res = handleResourceRequest(s, 1, [2, 0, 0]);
    expect(res.granted).toBe(false);
    expect(res.message).toContain('exceeded its maximum claim');
  });

  test('handleResourceRequest: valid request that is SAFE', () => {
    const s = getDefaultState();
    const res = handleResourceRequest(s, 1, [1, 0, 2]);
    expect(res.granted).toBe(true);
    expect(res.newState!.available).toEqual([2, 3, 0]);
    expect(res.newState!.need[1]).toEqual([0, 2, 0]);
    expect(res.newState!.allocation[1]).toEqual([3, 0, 2]);
  });

  test('handleResourceRequest: valid request that becomes UNSAFE', () => {
    const s = getDefaultState();
    // P0 requests [3,3,2] (all available).
    const res = handleResourceRequest(s, 0, [3, 3, 2]);
    expect(res.granted).toBe(false);
    expect(res.message).toContain('unsafe state');
  });
});
