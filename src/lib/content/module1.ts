import { TopicContent } from './types';

export const module1Content: Record<string, TopicContent> = {
  'top_intro_fa': {
    hasContent: true,
    overview: 'Finite Automata (FA) are mathematical models of computation with a finite amount of memory. They are abstract machines that read a string of symbols and decide whether to accept or reject it.',
    formal: 'A Finite Automaton is a theoretical model of computation consisting of states, transitions, an input alphabet, a start state, and final states.',
    intuition: 'Think of a finite automaton as a machine with a very limited memory. It only knows what state it is currently in. As it reads each symbol from a tape, it blindly follows rules to change its state. It has no hard drive, no RAM—just a finite number of "moods" (states).',
    coreProperties: [
      'Input Alphabet (Σ): The set of symbols the machine can read.',
      'States (Q): The finite set of possible conditions the machine can be in.',
      'Initial State: Where the machine starts reading.',
      'Final States: The states that signify "Accept".',
      'Memoryless past: The machine only knows its current state, not how it got there.'
    ],
    workedExamples: [
      {
        problem: 'Why do we need Finite Automata?',
        solution: 'Finite Automata are used in lexical analysis (compilers), string matching (grep/regex), text processing, and modeling digital logic circuits.',
        explanation: 'They represent the simplest class of computation (Regular Languages), allowing highly efficient, linear-time processing of strings without unbounded memory.'
      }
    ],
    recognitionClues: [
      'Questions asking for the basic definition of an automaton.',
      'Questions comparing different types of automata (e.g., FA vs PDA vs TM).'
    ],
    revisionSummary: 'Finite Automata are abstract machines with finite memory used for pattern matching and lexical analysis. They have an input alphabet, states, transitions, and accept/reject strings.'
  },

  'top_dfa_formal': {
    hasContent: true,
    overview: 'A Deterministic Finite Automaton (DFA) is an FA where every state has exactly one outgoing transition for each symbol in the alphabet.',
    formal: 'A DFA is formally defined as a 5-tuple M = (Q, Σ, δ, q0, F):\n1. Q: A finite set of states.\n2. Σ: A finite set of input symbols (alphabet).\n3. δ: Q × Σ → Q, the transition function.\n4. q0 ∈ Q: The start state.\n5. F ⊆ Q: The set of accept states.',
    notation: 'δ(q, a) = p means transitioning from state q to state p upon reading symbol a.\nWe also define the extended transition function δ*(q, w) for strings w, recursively:\n- δ*(q, ε) = q\n- δ*(q, wa) = δ(δ*(q, w), a)',
    intuition: 'The "Deterministic" part means absolute certainty. If you are in state Q_1 and you see symbol "A", there is exactly ONE rule telling you what to do. There is never a choice, and there is never a missing rule.',
    coreProperties: [
      'Complete Transition Function: Every state MUST have exactly one rule for every symbol in Σ.',
      'No Ambiguity: No guessing or multiple paths are allowed.',
      'No ε-transitions: A DFA cannot change state without consuming an input symbol.'
    ],
    workedExamples: [
      {
        problem: 'Define the 5-tuple for a DFA that accepts only strings containing an even number of 0s over Σ = {0,1}.',
        solution: 'M = (Q, Σ, δ, q0, F)\nQ = {q0, q1}\nΣ = {0, 1}\nq0 = q0 (Even 0s)\nF = {q0}\nδ:\nδ(q0, 0) = q1\nδ(q0, 1) = q0\nδ(q1, 0) = q0\nδ(q1, 1) = q1'
      }
    ],
    commonMistakes: [
      { mistake: 'Defining incomplete δ', fix: 'Always ensure your δ covers Q × Σ entirely. If a transition is "invalid" conceptually, it must explicitly map to a dead state.' }
    ],
    revisionSummary: 'DFA is a 5-tuple (Q, Σ, δ, q0, F) where δ is total and deterministic mapping Q × Σ → Q.'
  },

  'top_dfa_diagram': {
    hasContent: true,
    overview: 'DFAs are visually represented using State Transition Diagrams (directed graphs) and State Transition Tables (matrices).',
    formal: 'Transition Diagram: A directed graph where nodes = states, edges = transitions labeled with symbols, start state = node with incoming unlabelled arrow, final states = double circles.\nTransition Table: Rows = states (→ indicates start, * indicates final), Columns = symbols, Cells = next state.',
    intuition: 'A diagram is like a roadmap showing cities (states) and highways (transitions). A table is like a lookup dictionary. You use the diagram to build intuition, and the table for programming a computer.',
    workedExamples: [
      {
        problem: 'Convert a simple diagram to a table.',
        solution: 'Assume States {A,B}, Σ={0,1}, Start=A, Final={B}.\nA on 0 -> A, A on 1 -> B\nB on 0,1 -> B\n\nTable:\n      0   1\n-> A  A   B\n*  B  B   B',
        explanation: 'Always label the initial state with an arrow (->) and the final state with an asterisk (*).'
      }
    ],
    commonMistakes: [
      { mistake: 'Forgetting Dead States in Diagrams', fix: 'If you draw a diagram and a state lacks an outgoing edge for a symbol, you must add a "Trap/Dead" state and route the missing edges there.' }
    ],
    recognitionClues: [
      'Questions asking to draw the state diagram for a specific language.',
      'Questions asking to convert a given table to a diagram.'
    ],
    revisionSummary: 'State diagrams (graphs) and transition tables (matrices) are equivalent visual and tabular representations of the δ function.'
  },

  'top_dfa_lang': {
    hasContent: true,
    overview: 'The Language of a DFA, denoted L(M), is the exact set of all strings that the machine accepts.',
    formal: 'For a DFA M, a string w is accepted if and only if δ*(q0, w) ∈ F.\nThe language of M is L(M) = { w ∈ Σ* | δ*(q0, w) ∈ F }.\nLanguages accepted by DFAs are called Regular Languages.',
    intuition: 'If you run a string through the machine character by character, and you end up standing inside a double-circle (accept state) when the string runs out, the string belongs to the language.',
    workedExamples: [
      {
        problem: 'Design a DFA for the language L = { w ∈ {0,1}* | w ends with "10" }',
        solution: 'States:\n- q0: Start\n- q1: Ends in "1"\n- q2: Ends in "10" (Accept)\n\nTransitions:\nδ(q0, 0)=q0, δ(q0, 1)=q1\nδ(q1, 0)=q2, δ(q1, 1)=q1\nδ(q2, 0)=q0, δ(q2, 1)=q1',
        explanation: 'In state q2 (we have "10"), if we read 0, we lose the pattern and go to q0. If we read 1, we now have a string ending in "1", so we go to q1.'
      }
    ],
    recognitionClues: [
      '"Construct a DFA that accepts..."',
      '"Find the language accepted by this transition diagram..."'
    ],
    revisionSummary: 'L(M) is the set of all strings that drive the DFA from its start state into a final state.'
  },

  'top_nfa': {
    hasContent: true,
    overview: 'A Nondeterministic Finite Automaton (NFA) allows multiple transitions for the same symbol from a state, or zero transitions (missing edges).',
    formal: 'N = (Q, Σ, δ, q0, F)\nDifference from DFA: δ: Q × Σ → P(Q). The output is a subset of states, not a single state.\n(Note: This definition excludes ε-transitions, which are covered separately in ε-NFA).',
    intuition: 'An NFA is a parallel processor. When faced with multiple choices for a symbol, it magically takes all of them simultaneously. A string is accepted if AT LEAST ONE of these parallel computation paths ends in an accept state.',
    coreProperties: [
      'Missing edges mean the path "dies" (rejects) if that symbol is read.',
      'Multiple edges for the same symbol branch the computation.',
      'An NFA accepts a string w if δ*(q0, w) ∩ F ≠ ∅.'
    ],
    workedExamples: [
      {
        problem: 'Design an NFA for strings over {0,1} ending in "01".',
        solution: 'States: q0, q1, q2(Accept)\nδ(q0, 0) = {q0, q1}\nδ(q0, 1) = {q0}\nδ(q1, 1) = {q2}\nAll other transitions = ∅',
        explanation: 'The machine stays in q0. Whenever it sees a 0, it branches into q1 while remaining in q0. If the next symbol is 1, the q1 branch goes to q2 (accept).'
      }
    ],
    commonMistakes: [
      { mistake: 'Thinking NFAs accept if ANY path ends in an accept state at ANY time.', fix: 'The path must end in an accept state EXACTLY when the string finishes.' }
    ],
    revisionSummary: 'NFAs introduce nondeterminism. δ outputs sets of states. Acceptance means at least one path reaches a final state when input ends.'
  },

  'top_nfa_dfa': {
    hasContent: true,
    overview: 'Subset/Powerset Construction proves that DFAs and NFAs have equivalent expressive power. Every NFA can be converted to a DFA.',
    formal: 'Given NFA N=(Q_N, Σ, δ_N, q0_N, F_N). Equivalent DFA D=(Q_D, Σ, δ_D, q0_D, F_D):\n- Q_D = P(Q_N) (Power set of NFA states)\n- q0_D = {q0_N}\n- δ_D(R, a) = ∪_{q∈R} δ_N(q, a)\n- F_D = { R ∈ Q_D | R ∩ F_N ≠ ∅ }',
    intuition: 'Since an NFA branches into multiple states, we create a DFA whose states represent "the set of states the NFA is currently in." A subset is accepting if it contains at least one NFA accept state.',
    workedExamples: [
      {
        problem: 'Convert NFA to DFA: δ(A,0)={A,B}, δ(A,1)={A}. Final={B}.',
        solution: 'Start state = {A}.\nδ_D({A}, 0) = {A,B}\nδ_D({A}, 1) = {A}\n\nNew state {A,B}:\nδ_D({A,B}, 0) = δ_N(A,0) ∪ δ_N(B,0) = {A,B} ∪ ∅ = {A,B}\nδ_D({A,B}, 1) = δ_N(A,1) ∪ δ_N(B,1) = {A} ∪ ∅ = {A}\n\nDFA States: {A} (start), {A,B} (final, since B∈F).\nTransitions are deterministic.'
      }
    ],
    commonMistakes: [
      { mistake: 'Converting every possible subset (2^Q)', fix: 'Only convert reachable subsets (lazy evaluation). Starting from {q0}, only add subsets that are actually produced by transitions.' }
    ],
    recognitionClues: [
      '"Find the equivalent DFA for the following NFA..."'
    ],
    revisionSummary: 'Subset construction converts NFA to DFA. DFA states are subsets of NFA states. Lazy evaluation prevents building all 2^Q states.'
  },

  'top_fa_equiv': {
    hasContent: true,
    overview: 'Two Finite Automata are equivalent if they accept exactly the same language. L(M1) = L(M2).',
    formal: 'To check if M1 and M2 are equivalent, one method is to construct the product automaton for the symmetric difference language: L = (L(M1) ∩ ~L(M2)) ∪ (~L(M1) ∩ L(M2)). If the product automaton accepts any string, they are not equivalent.',
    intuition: 'Alternatively, minimize both DFAs using the Table-Filling method. If the minimized DFAs are isomorphic (have the same structure up to renaming states), they are equivalent.',
    workedExamples: [
      {
        problem: 'How to check equivalence practically on an exam?',
        solution: '1. Ensure both are DFAs.\n2. Minimize both DFAs.\n3. Compare the minimized diagrams. If they are identical in shape and final states, they are equivalent.',
        explanation: 'The Myhill-Nerode theorem guarantees a UNIQUE minimum DFA for any regular language.'
      }
    ],
    revisionSummary: 'Equivalent FAs accept the same language. Checked practically by minimizing both DFAs and comparing their structure.'
  },

  'top_eps_nfa': {
    hasContent: true,
    overview: 'An ε-NFA is an NFA that allows ε-transitions: transitions that consume no input symbol.',
    formal: 'N = (Q, Σ, δ, q0, F) where δ: Q × (Σ ∪ {ε}) → P(Q).\nWe define ε-closure(q) as the set of all states reachable from q using zero or more ε-transitions.',
    intuition: 'ε-transitions are like free teleporters. If there is an ε-edge from A to B, the moment you are in A, you are simultaneously also in B, without reading any input.',
    coreProperties: [
      'q ∈ ε-closure(q) trivially.',
      'If p ∈ ε-closure(q) and r ∈ ε-closure(p), then r ∈ ε-closure(q) (transitivity).'
    ],
    workedExamples: [
      {
        problem: 'Given A --ε--> B --ε--> C. Find ε-closures.',
        solution: 'ε-closure(A) = {A, B, C}\nε-closure(B) = {B, C}\nε-closure(C) = {C}'
      }
    ],
    recognitionClues: [
      '"Compute the ε-closure of..."'
    ],
    revisionSummary: 'ε-NFAs allow state changes without consuming input. The ε-closure of a state is the set of all states reachable solely via ε-transitions.'
  },

  'top_eps_elim': {
    hasContent: true,
    overview: 'Any ε-NFA can be converted into an equivalent NFA without ε-transitions.',
    formal: 'Given ε-NFA N. Construct NFA N\':\n1. States Q and Alphabet Σ remain the same.\n2. Start state q0 remains the same.\n3. Final states F\' = F ∪ {q0} if ε-closure(q0) ∩ F ≠ ∅, else F.\n4. δ\'(q, a) = ε-closure( δ( ε-closure(q), a ) ).',
    intuition: 'To remove the ε teleporters, we hardcode their effects into the standard transitions. If you can take an ε to A, read "0" to go to B, and take an ε to C, we replace that whole sequence with a direct "0" edge from your start point to C.',
    workedExamples: [
      {
        problem: 'How to calculate δ\'(q, a) step-by-step?',
        solution: 'Step 1: Find ε-closure(q). Say it is {q, r}.\nStep 2: Apply symbol `a` to all states in that closure: δ(q, a) ∪ δ(r, a). Say this results in {s}.\nStep 3: Find ε-closure({s}). That is your final answer for δ\'(q, a).'
      }
    ],
    commonMistakes: [
      { mistake: 'Forgetting to update final states', fix: 'If the ε-closure of a non-final state contains a final state, the non-final state often must become a final state in the new machine (especially the start state if it can ε-reach a final state).' }
    ],
    revisionSummary: 'Eliminating ε-transitions involves computing δ\'(q, a) = ε-closure(δ(ε-closure(q), a)) and potentially making the start state final.'
  },

  'top_min': {
    hasContent: true,
    overview: 'DFA Minimization creates the smallest possible DFA that accepts a given language.',
    formal: 'Myhill-Nerode Theorem states there is a unique minimum state DFA. We use the Table-Filling method:\n1. Remove unreachable states.\n2. Mark pairs (p,q) where p∈F and q∉F.\n3. Repeat: Mark (p,q) if (δ(p,a), δ(q,a)) is marked for any a∈Σ.\n4. Unmarked pairs are equivalent and merged.',
    intuition: 'If two states always behave the exact same way for all future strings (both lead to accept, or both lead to reject), they are redundant. We merge them.',
    workedExamples: [
      {
        problem: 'If δ(A,0)=B, δ(C,0)=D. And (B,D) is already marked distinguishable. What happens to (A,C)?',
        solution: 'Since applying 0 to A and C leads to states B and D which are distinguishable, A and C must also be distinguishable. We mark (A,C).'
      }
    ],
    commonMistakes: [
      { mistake: 'Skipping the removal of unreachable states', fix: 'Unreachable states will break the equivalence classes or just leave useless states in your "minimized" DFA.' }
    ],
    recognitionClues: [
      '"Minimize the following DFA...", "Use the Table-Filling method..."'
    ],
    revisionSummary: 'Minimization merges equivalent states using the Table-Filling method after removing unreachable states.'
  },

  'top_fa_output': {
    hasContent: true,
    overview: 'Unlike standard FAs (Acceptors) which output only YES/NO, Finite Automata with Output act as transducers. They map an input string to an output string.',
    formal: 'There are no final states in transducers. Instead, they have an output alphabet (Δ) and an output function (λ).',
    intuition: 'Think of a digital logic circuit (like an adder or a flip-flop machine). As you feed it binary inputs, it immediately spits out binary outputs. It never "accepts" or "rejects"; it just translates.',
    coreProperties: [
      'No Accept/Final states (F = ∅).',
      'They transform an input string over Σ* into an output string over Δ*.'
    ],
    revisionSummary: 'Transducers (FA with Output) generate strings instead of accepting them. The two types are Moore and Mealy machines.'
  },

  'top_moore': {
    hasContent: true,
    overview: 'A Moore Machine is an FA with output where the output depends ONLY on the current state.',
    formal: 'Moore Machine M = (Q, Σ, Δ, δ, λ, q0)\n- Δ: Output alphabet\n- λ: Q → Δ (Output function maps State to Output)',
    intuition: 'In a Moore machine, the output is stamped directly on the state. As soon as you enter a state, you output its character. You don\'t care what arrow you took to get there.',
    coreProperties: [
      'Output is associated with states.',
      'Length of output string is |w| + 1 (because the start state outputs immediately before reading any input).'
    ],
    workedExamples: [
      {
        problem: 'Design a Moore machine to output 1 if a string ends in "ab", else 0.',
        solution: 'States: q0(start), qA(saw "a"), qAB(saw "ab").\nOutputs: λ(q0)=0, λ(qA)=0, λ(qAB)=1.\nTransitions: δ(qA, b) = qAB, etc.'
      }
    ],
    commonMistakes: [
      { mistake: 'Wrong output length', fix: 'Remember Moore machine outputs a character for the initial state before any input is read. Input length N -> Output length N+1.' }
    ],
    revisionSummary: 'Moore machines output based on states (λ: Q → Δ). Output length is |w| + 1.'
  },

  'top_mealy': {
    hasContent: true,
    overview: 'A Mealy Machine is an FA with output where the output depends on BOTH the current state and the current input symbol.',
    formal: 'Mealy Machine M = (Q, Σ, Δ, δ, λ, q0)\n- λ: Q × Σ → Δ (Output function maps State + Input to Output)',
    intuition: 'In a Mealy machine, the output is stamped on the transition arrows. You only get an output when you take a step.',
    coreProperties: [
      'Output is associated with transitions.',
      'Length of output string is exactly |w|.'
    ],
    workedExamples: [
      {
        problem: 'Design a Mealy machine to output the 1s complement of a binary string.',
        solution: 'State: q0.\nTransitions: δ(q0, 0)=q0 with output 1. δ(q0, 1)=q0 with output 0.'
      }
    ],
    revisionSummary: 'Mealy machines output based on transitions (λ: Q × Σ → Δ). Output length is |w|.'
  },

  'top_moore_mealy': {
    hasContent: true,
    overview: 'Moore and Mealy machines are equivalent in power (they compute the same functions, ignoring the length offset). We can convert between them.',
    formal: 'Moore to Mealy: Output of the incoming edge becomes the output of the target state. λ_Mealy(q, a) = λ_Moore(δ(q, a)).\nMealy to Moore: A state q might have incoming edges with different outputs. Split q into multiple states (q_o1, q_o2) corresponding to each output.',
    intuition: 'Moore to Mealy is easy: just pull the output off the circle (state) and stick it onto all arrows pointing into that circle. Mealy to Moore is harder: if arrows with different outputs point into the same state, that state must be split into clones so each clone has a single consistent output.',
    workedExamples: [
      {
        problem: 'Mealy to Moore state splitting.',
        solution: 'If State A has incoming transition 0/x and 1/y. Split A into A_x (output x) and A_y (output y). Update all transitions pointing to A to point to A_x or A_y depending on their output. Both clones keep the same outgoing transitions as the original A.',
        explanation: 'State splitting ensures the core Moore property: every state has exactly one output.'
      }
    ],
    commonMistakes: [
      { mistake: 'Forgetting start state offset', fix: 'When converting Mealy to Moore, the resulting Moore machine will output an extra symbol at the start. Usually, we assign an arbitrary output to the start state and ignore it.' }
    ],
    recognitionClues: [
      '"Convert the given Moore machine into an equivalent Mealy machine."'
    ],
    revisionSummary: 'Moore -> Mealy: Push state outputs to incoming edges. Mealy -> Moore: Split states based on incoming transition outputs.'
  }
};

module1Content['top_dfa_notations'] = {
  ...module1Content['top_dfa_formal'],
  overview: 'Simple Notations for Deterministic Finite Automata.',
  formal: 'A DFA is typically denoted using state notation, initial-state arrows, and final-state double circles. The extended transition function allows for processing entire strings.'
};

module1Content['top_dfa_table'] = {
  ...module1Content['top_dfa_diagram'],
  overview: 'State Transition Tables provide a matrix representation of a DFA, ideal for programmatic implementation.',
  formal: 'Rows represent states, and columns represent the input alphabet. Cells indicate the resulting state for a given input symbol.'
};
