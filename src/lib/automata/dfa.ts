export interface DFA {
  states: string[];
  alphabet: string[];
  startState: string;
  acceptStates: string[];
  transitions: Record<string, Record<string, string>>;
}

export interface DFAValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateDfa(dfa: DFA): DFAValidationResult {
  const errors: string[] = [];

  if (!dfa.states || dfa.states.length === 0) {
    errors.push('DFA must have at least one state.');
  }

  if (!dfa.startState || !dfa.states.includes(dfa.startState)) {
    errors.push('Start state is missing or not in the set of states.');
  }

  if (dfa.acceptStates) {
    for (const state of dfa.acceptStates) {
      if (!dfa.states.includes(state)) {
        errors.push(`Accept state '${state}' is not in the set of states.`);
      }
    }
  }

  if (!dfa.alphabet || dfa.alphabet.length === 0) {
    errors.push('Alphabet must not be empty.');
  }

  // Check completeness and validity of transitions
  if (dfa.transitions) {
    for (const state of dfa.states) {
      const stateTransitions = dfa.transitions[state] || {};
      for (const symbol of dfa.alphabet) {
        const nextState = stateTransitions[symbol];
        if (!nextState) {
          errors.push(`Missing transition for state '${state}' on symbol '${symbol}'.`);
        } else if (!dfa.states.includes(nextState)) {
          errors.push(`Transition from '${state}' on '${symbol}' points to invalid state '${nextState}'.`);
        }
      }
    }
  } else {
    errors.push('Transitions are missing.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateInputString(dfa: DFA, input: string): { isValid: boolean; invalidSymbol?: string } {
  for (const char of input) {
    if (!dfa.alphabet.includes(char)) {
      return { isValid: false, invalidSymbol: char };
    }
  }
  return { isValid: true };
}

export function stepDfa(dfa: DFA, currentState: string, symbol: string): string {
  if (!dfa.states.includes(currentState)) throw new Error(`Invalid state: ${currentState}`);
  if (!dfa.alphabet.includes(symbol)) throw new Error(`Invalid symbol: ${symbol}`);
  
  const nextState = dfa.transitions[currentState]?.[symbol];
  if (!nextState) throw new Error(`No transition defined for ${currentState} on ${symbol}`);
  
  return nextState;
}

export function simulateDfaFull(dfa: DFA, input: string): { accepted: boolean; finalState: string; trace: { step: number; state: string; symbol: string }[] } {
  let currentState = dfa.startState;
  const trace = [{ step: 0, state: currentState, symbol: '' }];
  
  for (let i = 0; i < input.length; i++) {
    const symbol = input[i];
    currentState = stepDfa(dfa, currentState, symbol);
    trace.push({ step: i + 1, state: currentState, symbol });
  }
  
  return {
    accepted: dfa.acceptStates.includes(currentState),
    finalState: currentState,
    trace
  };
}
