import {
  transitionProcess,
  isValidTransition,
  ProcessState,
  StateTransitionEvent,
} from '../../../src/lib/simulator/os/processStateEngine';

describe('Process State Machine Engine', () => {
  describe('Valid canonical transitions', () => {
    test('NEW -> READY via ADMIT', () => {
      const res = transitionProcess('NEW', 'ADMIT');
      expect(res.valid).toBe(true);
      expect(res.toState).toBe('READY');
      expect(isValidTransition('NEW', 'READY')).toBe(true);
    });

    test('READY -> RUNNING via DISPATCH', () => {
      const res = transitionProcess('READY', 'DISPATCH');
      expect(res.valid).toBe(true);
      expect(res.toState).toBe('RUNNING');
      expect(isValidTransition('READY', 'RUNNING')).toBe(true);
    });

    test('RUNNING -> READY via INTERRUPT', () => {
      const res = transitionProcess('RUNNING', 'INTERRUPT');
      expect(res.valid).toBe(true);
      expect(res.toState).toBe('READY');
      expect(isValidTransition('RUNNING', 'READY')).toBe(true);
    });

    test('RUNNING -> WAITING via IO_WAIT', () => {
      const res = transitionProcess('RUNNING', 'IO_WAIT');
      expect(res.valid).toBe(true);
      expect(res.toState).toBe('WAITING');
      expect(isValidTransition('RUNNING', 'WAITING')).toBe(true);
    });

    test('WAITING -> READY via IO_COMPLETION', () => {
      const res = transitionProcess('WAITING', 'IO_COMPLETION');
      expect(res.valid).toBe(true);
      expect(res.toState).toBe('READY');
      expect(isValidTransition('WAITING', 'READY')).toBe(true);
    });

    test('RUNNING -> TERMINATED via EXIT', () => {
      const res = transitionProcess('RUNNING', 'EXIT');
      expect(res.valid).toBe(true);
      expect(res.toState).toBe('TERMINATED');
      expect(isValidTransition('RUNNING', 'TERMINATED')).toBe(true);
    });
  });

  describe('Invalid state transitions', () => {
    test('Cannot move directly from NEW to RUNNING or WAITING', () => {
      expect(transitionProcess('NEW', 'DISPATCH').valid).toBe(false);
      expect(transitionProcess('NEW', 'IO_WAIT').valid).toBe(false);
      expect(isValidTransition('NEW', 'RUNNING')).toBe(false);
      expect(isValidTransition('NEW', 'WAITING')).toBe(false);
    });

    test('Cannot move directly from WAITING to RUNNING (must pass through READY)', () => {
      expect(transitionProcess('WAITING', 'DISPATCH').valid).toBe(false);
      expect(isValidTransition('WAITING', 'RUNNING')).toBe(false);
    });

    test('Cannot exit directly from READY or WAITING (must be RUNNING)', () => {
      expect(transitionProcess('READY', 'EXIT').valid).toBe(false);
      expect(transitionProcess('WAITING', 'EXIT').valid).toBe(false);
      expect(isValidTransition('READY', 'TERMINATED')).toBe(false);
      expect(isValidTransition('WAITING', 'TERMINATED')).toBe(false);
    });

    test('TERMINATED state has no valid outgoing transitions', () => {
      const allEvents: StateTransitionEvent[] = ['ADMIT', 'DISPATCH', 'INTERRUPT', 'IO_WAIT', 'IO_COMPLETION', 'EXIT'];
      allEvents.forEach((event) => {
        expect(transitionProcess('TERMINATED', event).valid).toBe(false);
      });
      const allStates: ProcessState[] = ['NEW', 'READY', 'RUNNING', 'WAITING', 'TERMINATED'];
      allStates.forEach((state) => {
        expect(isValidTransition('TERMINATED', state)).toBe(false);
      });
    });
  });

  describe('Complete process lifecycle simulations', () => {
    test('Standard compute-bound execution: NEW -> READY -> RUNNING -> TERMINATED', () => {
      let state: ProcessState = 'NEW';

      const step1 = transitionProcess(state, 'ADMIT');
      expect(step1.valid).toBe(true);
      state = step1.toState;
      expect(state).toBe('READY');

      const step2 = transitionProcess(state, 'DISPATCH');
      expect(step2.valid).toBe(true);
      state = step2.toState;
      expect(state).toBe('RUNNING');

      const step3 = transitionProcess(state, 'EXIT');
      expect(step3.valid).toBe(true);
      state = step3.toState;
      expect(state).toBe('TERMINATED');
    });

    test('I/O bound execution with preemption: NEW -> READY -> RUNNING -> WAITING -> READY -> RUNNING -> READY -> RUNNING -> TERMINATED', () => {
      let state: ProcessState = 'NEW';

      state = transitionProcess(state, 'ADMIT').toState;
      expect(state).toBe('READY');

      state = transitionProcess(state, 'DISPATCH').toState;
      expect(state).toBe('RUNNING');

      state = transitionProcess(state, 'IO_WAIT').toState;
      expect(state).toBe('WAITING');

      state = transitionProcess(state, 'IO_COMPLETION').toState;
      expect(state).toBe('READY');

      state = transitionProcess(state, 'DISPATCH').toState;
      expect(state).toBe('RUNNING');

      state = transitionProcess(state, 'INTERRUPT').toState;
      expect(state).toBe('READY');

      state = transitionProcess(state, 'DISPATCH').toState;
      expect(state).toBe('RUNNING');

      state = transitionProcess(state, 'EXIT').toState;
      expect(state).toBe('TERMINATED');
    });
  });
});
