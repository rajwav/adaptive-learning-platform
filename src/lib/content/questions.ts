import { Question } from '@/types';

export const MODULE_1_QUESTIONS: Question[] = [
  {
    id: "q_mod1_1",
    topicId: "top_intro_fa",
    text: "Define a Finite Automaton conceptually without using the 5-tuple.",
    correctAnswer: "A theoretical model of computation with a finite amount of memory (states), which reads an input sequence symbol by symbol and transitions between states to accept or reject the input.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_2",
    topicId: "top_intro_fa",
    text: "What is the primary limitation of Finite Automata compared to Turing Machines?",
    correctAnswer: "They have no auxiliary memory (like a tape or stack) other than their current state, so they cannot recognize context-free languages (e.g., matching arbitrary numbers of parentheses).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_3",
    topicId: "top_intro_fa",
    text: "Identify the alphabet, states, and transitions for a simple turnstile FA.",
    correctAnswer: "Alphabet: {coin, push}. States: {Locked, Unlocked}. Transitions: (Locked, coin)->Unlocked, (Unlocked, push)->Locked, (Locked, push)->Locked, (Unlocked, coin)->Unlocked.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_4",
    topicId: "top_intro_fa",
    text: "If an FA has 3 states and reads an input string of length 5, how many state transitions occur?",
    correctAnswer: "Exactly 5 transitions occur, processing one symbol at a time.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_5",
    topicId: "top_intro_fa",
    text: "Can a Finite Automaton process an infinite string?",
    correctAnswer: "An FA processes finite strings to determine acceptance, though it can be conceptualized as running continuously on an input stream (like transducers).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_6",
    topicId: "top_intro_fa",
    text: "Design challenge: How many states minimum are required for an FA to accept strings of length exactly 2 over Σ={0,1}?",
    correctAnswer: "4 states: q0 (length 0), q1 (length 1), q2 (length 2, final), and q_dead (length > 2).",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_7",
    topicId: "top_intro_fa",
    text: "What language does an FA with only one state (which is final) and looping transitions for all symbols in Σ accept?",
    correctAnswer: "Σ* (the set of all possible strings over the alphabet, including the empty string ε).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_8",
    topicId: "top_intro_fa",
    text: "What language does an FA with a start state that is not final, and all transitions leading to a dead state accept?",
    correctAnswer: "The empty language, ∅. It accepts no strings.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_9",
    topicId: "top_intro_fa",
    text: "A student claims a Finite Automaton can verify if a string has the same number of 0s and 1s. Is this correct?",
    correctAnswer: "Incorrect. That requires counting to an arbitrary bound, which is impossible with finite memory. (Pumping Lemma can prove this).",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_10",
    topicId: "top_intro_fa",
    text: "Exam: Consider an FA with states {A,B,C}, start state A, final state C. Transitions: A-0->B, B-1->C, C-0->C, C-1->C (all other inputs to dead state). Does it accept '0110'?",
    correctAnswer: "Yes. Trace: A (read 0) -> B (read 1) -> C (read 1) -> C (read 0) -> C. Since C is final, the string is accepted.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_11",
    topicId: "top_dfa_formal",
    text: "List the 5 components of the formal DFA tuple (Q, Σ, δ, q0, F).",
    correctAnswer: "Q: finite set of states. Σ: finite input alphabet. δ: transition function. q0: start state (q0 ∈ Q). F: set of final/accept states (F ⊆ Q).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_12",
    topicId: "top_dfa_formal",
    text: "Explain the domain and codomain of the DFA transition function δ.",
    correctAnswer: "The domain is Q × Σ (a state and a symbol). The codomain is Q (a single next state). δ: Q × Σ → Q.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_13",
    topicId: "top_dfa_formal",
    text: "What mathematical property of δ ensures the machine is 'deterministic'?",
    correctAnswer: "δ is a total function. For every state q in Q and every symbol a in Σ, there is exactly one defined next state δ(q, a).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_14",
    topicId: "top_dfa_formal",
    text: "Define the extended transition function δ*(q, w).",
    correctAnswer: "δ*(q, ε) = q. For string wa (where a is a symbol), δ*(q, wa) = δ(δ*(q, w), a). It maps a state and a string to a resulting state.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_15",
    topicId: "top_dfa_formal",
    text: "What is δ*(q, a) where 'a' is a single symbol?",
    correctAnswer: "δ*(q, a) = δ(q, a). Processing a single character string is identical to the standard transition function.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_16",
    topicId: "top_dfa_formal",
    text: "Constructing a formal DFA: For a DFA over Σ={0,1}, if Q has 4 states, exactly how many mappings must exist in δ?",
    correctAnswer: "8 mappings. 4 states × 2 symbols = 8.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_17",
    topicId: "top_dfa_formal",
    text: "A student defines F = {q1, q2} and Q = {q0, q1}. Is this a valid formal DFA?",
    correctAnswer: "No, F must be a subset of Q. q2 is not in Q, so the definition is invalid.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_18",
    topicId: "top_dfa_formal",
    text: "What is the formal definition of the language L(M) accepted by DFA M?",
    correctAnswer: "L(M) = { w ∈ Σ* | δ*(q0, w) ∈ F }. The set of all strings that lead from the start state to a final state.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_19",
    topicId: "top_dfa_formal",
    text: "Exam: Let Q={q0,q1}, Σ={a}, q0=start, F={q1}, δ(q0,a)=q1, δ(q1,a)=q0. Calculate δ*(q0, 'aaa'). Is it accepted?",
    correctAnswer: "δ*(q0, 'a') = q1; δ*(q1, 'a') = q0; δ*(q0, 'a') = q1. The final state is q1. Since q1 ∈ F, 'aaa' is accepted.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_20",
    topicId: "top_dfa_formal",
    text: "Can F = ∅ in a valid formal DFA?",
    correctAnswer: "Yes, F can be the empty set. The DFA simply accepts no strings (language is ∅).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_21",
    topicId: "top_dfa_notations",
    text: "How is a single transition mapping written mathematically?",
    correctAnswer: "δ(q, a) = p, meaning from state q reading symbol a, transition to state p.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_22",
    topicId: "top_dfa_notations",
    text: "What notation is used for the set of all possible finite strings over an alphabet Σ?",
    correctAnswer: "Σ* (Sigma star).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_23",
    topicId: "top_dfa_notations",
    text: "What does the symbol ε (or λ) denote in automata theory?",
    correctAnswer: "The empty string, a string of length 0.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_24",
    topicId: "top_dfa_notations",
    text: "What does |w| denote for a string w?",
    correctAnswer: "The length of the string (the number of symbols in it).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_25",
    topicId: "top_dfa_notations",
    text: "Translate this notation into English: ∀w ∈ Σ*, δ*(q0, w) ∉ F",
    correctAnswer: "For all strings w over the alphabet, the state reached from q0 after processing w is not a final state. (The DFA accepts nothing).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_26",
    topicId: "top_dfa_notations",
    text: "Evaluate this property: δ*(q, uv) = δ*(δ*(q, u), v). What does it mean?",
    correctAnswer: "Processing string u followed by string v is exactly equivalent to processing u to reach an intermediate state, then processing v from that state.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_27",
    topicId: "top_dfa_notations",
    text: "What is Σ^+?",
    correctAnswer: "Σ* - {ε}. The set of all strings over Σ excluding the empty string (strings of length >= 1).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_28",
    topicId: "top_dfa_notations",
    text: "How do you formally write that a state q is NOT an accepting state?",
    correctAnswer: "q ∉ F",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_29",
    topicId: "top_dfa_notations",
    text: "Write the notation for the power set (set of all subsets) of Q.",
    correctAnswer: "P(Q) or 2^Q.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_30",
    topicId: "top_dfa_notations",
    text: "Exam: If Σ = {0,1}, write out the set of all strings of length 2.",
    correctAnswer: "{00, 01, 10, 11}.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_31",
    topicId: "top_dfa_diagram",
    text: "In a transition diagram, what does an incoming arrow with no source node indicate?",
    correctAnswer: "It indicates the start state (initial state) of the automaton.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_32",
    topicId: "top_dfa_diagram",
    text: "How are final (accepting) states drawn in a transition diagram?",
    correctAnswer: "As nodes with double circles.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_33",
    topicId: "top_dfa_diagram",
    text: "If a node A has an arrow to node B labeled '0,1', what does this shorthand represent?",
    correctAnswer: "It represents two distinct transitions: δ(A, 0) = B and δ(A, 1) = B.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_34",
    topicId: "top_dfa_diagram",
    text: "What is a 'dead state' or 'trap state' in a DFA diagram?",
    correctAnswer: "A non-accepting state with transitions back to itself for every symbol in the alphabet, making it impossible to leave.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_35",
    topicId: "top_dfa_diagram",
    text: "If a state q in a DFA diagram has no outgoing edge for symbol '1', what is wrong?",
    correctAnswer: "It violates the definition of a DFA, which requires a transition for every symbol from every state. (It might be an NFA).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_36",
    topicId: "top_dfa_diagram",
    text: "Trace a string: Diagram has A(start)-0->B, B-1->C(final). All other inputs go to dead state D. Trace '010'.",
    correctAnswer: "A -(0)-> B -(1)-> C -(0)-> D. Ends in D. Rejected.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_37",
    topicId: "top_dfa_diagram",
    text: "Construct a conceptual diagram for 'strings of length exactly 1' over {0,1}.",
    correctAnswer: "q0(start) -0,1-> q1(final). q1 -0,1-> q2(dead). q2 -0,1-> q2.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_38",
    topicId: "top_dfa_diagram",
    text: "Exam: Draw/describe the diagram for a DFA accepting strings ending in '0' over Σ={0,1}.",
    correctAnswer: "States: q0(start), q1(final). Transitions: δ(q0,1)=q0, δ(q0,0)=q1, δ(q1,0)=q1, δ(q1,1)=q0.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_39",
    topicId: "top_dfa_diagram",
    text: "What happens if the start state is also a final state in a diagram?",
    correctAnswer: "The DFA accepts the empty string ε.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_40",
    topicId: "top_dfa_diagram",
    text: "A diagram has 3 states and Σ={a,b}. How many directed edges (or labels) must be drawn?",
    correctAnswer: "6 edges (or labels), since 3 states × 2 symbols = 6 transitions.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_41",
    topicId: "top_dfa_table",
    text: "In a DFA transition table, what do the rows and columns typically represent?",
    correctAnswer: "Rows represent the states (Q) and columns represent the input symbols (Σ).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_42",
    topicId: "top_dfa_table",
    text: "How is the start state usually marked in a transition table?",
    correctAnswer: "With an arrow (->) to the left of the state name.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_43",
    topicId: "top_dfa_table",
    text: "How are final states usually marked in a transition table?",
    correctAnswer: "With an asterisk (*) to the left of the state name.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_44",
    topicId: "top_dfa_table",
    text: "What goes in the intersection of row q and column a?",
    correctAnswer: "The resulting next state, δ(q, a).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_45",
    topicId: "top_dfa_table",
    text: "If a DFA table has a blank cell, what does this imply?",
    correctAnswer: "It is an invalid DFA table. DFAs must be fully defined (total function).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_46",
    topicId: "top_dfa_table",
    text: "Can a cell in a DFA table contain multiple states, e.g., {q1, q2}?",
    correctAnswer: "No, a DFA transition must result in exactly one state. That would be an NFA table.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_47",
    topicId: "top_dfa_table",
    text: "Table trace: ->A (on 0->B, on 1->A), *B (on 0->A, on 1->B). Trace '001'.",
    correctAnswer: "Start A. A(0)->B. B(0)->A. A(1)->A. Final state is A. A is not final, so rejected.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_48",
    topicId: "top_dfa_table",
    text: "Convert Table to Diagram: Row ->q0 (0:q1, 1:q0). What edges connect q0 and q1?",
    correctAnswer: "q0 has a self-loop on 1. q0 has a directed edge to q1 on 0.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_49",
    topicId: "top_dfa_table",
    text: "If row q3 contains q3 in every column and q3 is not marked with an asterisk, what is q3?",
    correctAnswer: "A dead state (or trap state).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_50",
    topicId: "top_dfa_table",
    text: "Exam: Construct a transition table for a DFA accepting strings with an odd number of 1s over Σ={0,1}.",
    correctAnswer: "States: E(Even, start), O(Odd, final). Table: ->E (0:E, 1:O); *O (0:O, 1:E).",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_51",
    topicId: "top_dfa_lang",
    text: "What is a Regular Language?",
    correctAnswer: "A language is regular if and only if there exists a DFA that accepts it.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_52",
    topicId: "top_dfa_lang",
    text: "If a DFA M has no final states (F = ∅), what is L(M)?",
    correctAnswer: "L(M) = ∅ (the empty language).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_53",
    topicId: "top_dfa_lang",
    text: "If a DFA M has every state as a final state (F = Q), what is L(M)?",
    correctAnswer: "L(M) = Σ* (the language of all possible strings).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_54",
    topicId: "top_dfa_lang",
    text: "Is the language { a^n b^n | n >= 0 } regular?",
    correctAnswer: "No. A DFA cannot 'count' the number of a's to ensure an equal number of b's (requires unbounded memory).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_55",
    topicId: "top_dfa_lang",
    text: "Are regular languages closed under union?",
    correctAnswer: "Yes. If L1 and L2 are regular, L1 ∪ L2 is regular.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_56",
    topicId: "top_dfa_lang",
    text: "Construct a DFA for L = { w | w starts with 'a' } over {a,b}. What are the states?",
    correctAnswer: "q0 (start), qA (accept, sink on 'a','b'), qDead (reject sink).",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_57",
    topicId: "top_dfa_lang",
    text: "Is the complement of a regular language always regular?",
    correctAnswer: "Yes. You can swap the final and non-final states of the DFA to accept the complement language.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_58",
    topicId: "top_dfa_lang",
    text: "Given DFA M for L. Describe how to construct a DFA for the complement of L.",
    correctAnswer: "Keep Q, Σ, q0, and δ the same. Change the set of final states to F' = Q - F.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_59",
    topicId: "top_dfa_lang",
    text: "Are finite languages regular?",
    correctAnswer: "Yes, every finite language is regular (it can be represented by a DFA tree without cycles).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_60",
    topicId: "top_dfa_lang",
    text: "Exam: Design the states for a DFA accepting strings of length modulo 3 equal to 0.",
    correctAnswer: "States: q0, q1, q2. q0 is start and final. Transitions: q0->q1, q1->q2, q2->q0 for any symbol.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_61",
    topicId: "top_nfa",
    text: "Define an NFA mathematically. How does δ differ from a DFA?",
    correctAnswer: "In an NFA, δ: Q × Σ → P(Q). The transition function maps to a set of states (the power set of Q) rather than a single state.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_62",
    topicId: "top_nfa",
    text: "When does an NFA accept an input string w?",
    correctAnswer: "An NFA accepts w if there exists AT LEAST ONE sequence of valid transitions that ends in a final state.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_63",
    topicId: "top_nfa",
    text: "If an NFA is in state q and reads symbol a, but δ(q, a) = ∅, what happens to that computation path?",
    correctAnswer: "That specific computational path 'dies' (rejects). Other parallel paths may continue.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_64",
    topicId: "top_nfa",
    text: "Does an NFA have more computational power (recognize more languages) than a DFA?",
    correctAnswer: "No, NFAs and DFAs both recognize exactly the Regular Languages.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_65",
    topicId: "top_nfa",
    text: "If an NFA can be in 3 different states simultaneously, how many computational branches exist?",
    correctAnswer: "3 branches are being explored in parallel.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_66",
    topicId: "top_nfa",
    text: "In an NFA transition diagram, what does it mean if two arrows labeled '0' leave the same state?",
    correctAnswer: "It is nondeterministic. Upon reading '0', the machine branches and follows both paths simultaneously.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_67",
    topicId: "top_nfa",
    text: "Why are NFAs useful if DFAs can compute the same languages?",
    correctAnswer: "NFAs are often exponentially smaller and conceptually much easier to construct for operations like Union and Concatenation.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_68",
    topicId: "top_nfa",
    text: "Trace NFA: ->q0(0:q0, 0:q1), q1(1:q2*). Trace string '01'.",
    correctAnswer: "Path 1: q0(0)->q0(1)->die. Path 2: q0(0)->q1(1)->q2(accept). Since path 2 accepts, the NFA accepts '01'.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_69",
    topicId: "top_nfa",
    text: "What is the length of the string accepted by ->q0(0:q1), q1(1:q2), q2(0:q3*)?",
    correctAnswer: "Length 3 (the string '010').",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_70",
    topicId: "top_nfa",
    text: "Exam: Construct an NFA for strings ending in '11' over {0,1}. How many states minimum?",
    correctAnswer: "3 states. ->q0(0,1:q0; 1:q1), q1(1:q2*).",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_71",
    topicId: "top_nfa_dfa",
    text: "What is the name of the algorithm used to convert an NFA into an equivalent DFA?",
    correctAnswer: "The Subset Construction (or Powerset Construction) algorithm.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_72",
    topicId: "top_nfa_dfa",
    text: "If an NFA has N states, what is the maximum number of states in the equivalent DFA?",
    correctAnswer: "2^N states (the size of the power set of Q).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_73",
    topicId: "top_nfa_dfa",
    text: "In Subset Construction, what represents a single state in the new DFA?",
    correctAnswer: "A set of states from the original NFA.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_74",
    topicId: "top_nfa_dfa",
    text: "What is the start state of the constructed DFA (assuming no ε-transitions)?",
    correctAnswer: "The subset containing only the NFA's start state: {q0}.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_75",
    topicId: "top_nfa_dfa",
    text: "How do you determine if a subset state in the new DFA is a final state?",
    correctAnswer: "It is a final state if the subset contains AT LEAST ONE state that was a final state in the NFA.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_76",
    topicId: "top_nfa_dfa",
    text: "Calculate transition: In NFA, δ(A,0)={A,B} and δ(B,0)={C}. What is δ_DFA({A,B}, 0)?",
    correctAnswer: "{A, B, C}",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_77",
    topicId: "top_nfa_dfa",
    text: "In Subset Construction, how do we handle a transition to the empty set ∅ in the NFA?",
    correctAnswer: "It becomes a transition to the empty subset ∅ in the DFA. ∅ acts as a dead state where δ_DFA(∅, a) = ∅. Note: mathematically this is ∅, not {∅}.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_78",
    topicId: "top_nfa_dfa",
    text: "Why do we use 'lazy evaluation' when computing DFA states from an NFA?",
    correctAnswer: "To only compute subsets that are actually reachable from the start state, avoiding the computation of all 2^N subsets.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_79",
    topicId: "top_nfa_dfa",
    text: "Is the DFA generated by the Subset Construction guaranteed to be minimal?",
    correctAnswer: "No, it often contains redundant or equivalent states and must be minimized afterward.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_80",
    topicId: "top_nfa_dfa",
    text: "Exam: NFA ->q0(0:q0, q1), q1(1:q2*). Compute the DFA state sequence for '01'.",
    correctAnswer: "Start {q0}. Read 0: {q0, q1}. Read 1: δ(q0,1) U δ(q1,1) = ∅ U {q2} = {q2}. Final state is {q2}, which contains q2, so accept.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_81",
    topicId: "top_fa_equiv",
    text: "When are two finite automata considered mathematically equivalent?",
    correctAnswer: "When they accept exactly the same language. L(M1) = L(M2).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_82",
    topicId: "top_fa_equiv",
    text: "Can an NFA and a DFA be equivalent?",
    correctAnswer: "Yes, if they accept the same language.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_83",
    topicId: "top_fa_equiv",
    text: "What is a distinguishing string for two states p and q?",
    correctAnswer: "A string w such that processing w from p leads to an accept state, but processing w from q leads to a reject state (or vice versa).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_84",
    topicId: "top_fa_equiv",
    text: "How can you check if two DFAs M1 and M2 are equivalent using minimization?",
    correctAnswer: "Minimize both M1 and M2. If the resulting minimal DFAs are structurally identical (isomorphic), M1 and M2 are equivalent.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_85",
    topicId: "top_fa_equiv",
    text: "Describe the cross-product (symmetric difference) construction method to test equivalence of M1 and M2.",
    correctAnswer: "Construct a DFA for L = (L(M1) ∩ ¬L(M2)) ∪ (¬L(M1) ∩ L(M2)). If L is empty (no final state is reachable from start), they are equivalent.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_86",
    topicId: "top_fa_equiv",
    text: "In the cross-product machine M1 × M2, what is a state?",
    correctAnswer: "A pair of states (q1, q2) where q1 is from M1 and q2 is from M2.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_87",
    topicId: "top_fa_equiv",
    text: "In the symmetric difference machine M1 × M2, when is state (q1, q2) a final state?",
    correctAnswer: "When exactly ONE of q1 or q2 is a final state in its respective machine (XOR logic).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_88",
    topicId: "top_fa_equiv",
    text: "Find a distinguishing string: M1 accepts 'starts with 0'. M2 accepts 'starts with 0 and length >= 2'.",
    correctAnswer: "The string '0' is accepted by M1 but rejected by M2, so it distinguishes them.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_89",
    topicId: "top_fa_equiv",
    text: "Are two automata with different numbers of states definitely not equivalent?",
    correctAnswer: "No, one or both might not be minimized.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_90",
    topicId: "top_fa_equiv",
    text: "Exam: Two DFAs M1 and M2 have 2 states each. To prove equivalence via product machine, what is the max number of reachable states to check?",
    correctAnswer: "2 × 2 = 4 states. A BFS from the start state takes at most 4 steps.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_91",
    topicId: "top_eps_nfa",
    text: "What is an ε-transition (epsilon-transition)?",
    correctAnswer: "A transition that allows the automaton to change state without reading any input symbol.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_92",
    topicId: "top_eps_nfa",
    text: "Define ε-closure(q) mathematically.",
    correctAnswer: "The set of all states reachable from state q by following zero or more ε-transitions.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_93",
    topicId: "top_eps_nfa",
    text: "Is state 'q' always included in its own ε-closure(q)?",
    correctAnswer: "Yes, taking zero ε-transitions leaves you in state q, so q ∈ ε-closure(q).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_94",
    topicId: "top_eps_nfa",
    text: "Calculate ε-closure: A -ε-> B -ε-> C. What is ε-closure(A)?",
    correctAnswer: "{A, B, C}. (ε-closures are transitive).",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_95",
    topicId: "top_eps_nfa",
    text: "Do ε-NFAs accept a larger class of languages than DFAs?",
    correctAnswer: "No, they accept exactly the Regular Languages, equivalent to DFAs and standard NFAs.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_96",
    topicId: "top_eps_nfa",
    text: "How does the extended transition function δ*(q, a) work in an ε-NFA for a single symbol 'a'?",
    correctAnswer: "It calculates the ε-closure of q, follows transitions for 'a' from all those states, and then takes the ε-closure of all resulting states.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_97",
    topicId: "top_eps_nfa",
    text: "If the start state A has an ε-transition to final state B, does the machine accept the empty string ε?",
    correctAnswer: "Yes, because the machine can reach final state B without consuming any input.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_98",
    topicId: "top_eps_nfa",
    text: "Why are ε-transitions useful when constructing automata from Regular Expressions?",
    correctAnswer: "They make it trivial to join automata (e.g., connecting the end of one automaton to the start of another for concatenation).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_99",
    topicId: "top_eps_nfa",
    text: "Can an ε-NFA have a loop (cycle) of ε-transitions?",
    correctAnswer: "Yes. The machine can traverse the loop without consuming input. The ε-closure simply includes all states in the loop.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_100",
    topicId: "top_eps_nfa",
    text: "Exam: Given states 1,2,3. 1-ε->2, 2-a->3, 3-ε->1. Compute δ*(1, 'a').",
    correctAnswer: "ε-closure(1)={1,2}. Read 'a' from {1,2} gives {3}. ε-closure({3})={1,2,3}. Result is {1,2,3}.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_101",
    topicId: "top_eps_elim",
    text: "What is the primary goal of ε-elimination?",
    correctAnswer: "To convert an ε-NFA into a standard NFA without ε-transitions that accepts the same language.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_102",
    topicId: "top_eps_elim",
    text: "During ε-elimination, do we change the set of states Q?",
    correctAnswer: "No, the set of states Q remains exactly the same.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_103",
    topicId: "top_eps_elim",
    text: "What is the formula to compute the new transition function δ'(q, a) without ε-transitions?",
    correctAnswer: "δ'(q, a) = ε-closure( δ( ε-closure(q), a ) ).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_104",
    topicId: "top_eps_elim",
    text: "How must the final states F' be updated during ε-elimination?",
    correctAnswer: "F' = F ∪ {q0} if ε-closure(q0) contains any state in F. Otherwise F' = F.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_105",
    topicId: "top_eps_elim",
    text: "Why might the start state become a final state during this process?",
    correctAnswer: "Because if the original machine could reach a final state on ε (meaning it accepts the empty string), the new machine must explicitly make the start state final to accept ε.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_106",
    topicId: "top_eps_elim",
    text: "Calculate new edge: A -ε-> B -0-> C -ε-> D. What new direct transition is added for symbol '0'?",
    correctAnswer: "A transition A -0-> D (as well as A-0->C, B-0->D, B-0->C depending on the full closures).",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_107",
    topicId: "top_eps_elim",
    text: "What happens to the original ε-transitions in the final output automaton?",
    correctAnswer: "They are completely discarded.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_108",
    topicId: "top_eps_elim",
    text: "Is the automaton resulting from ε-elimination always a DFA?",
    correctAnswer: "No, it is an NFA. It may still contain multiple transitions for the same symbol or lack transitions.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_109",
    topicId: "top_eps_elim",
    text: "Can ε-elimination result in unreachable states?",
    correctAnswer: "Yes, states that were only reachable via ε-transitions may become completely disconnected.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_110",
    topicId: "top_eps_elim",
    text: "Exam: Convert ->A(-ε->B), B(-1->C*). Compute δ'(A, 1) and F'.",
    correctAnswer: "ε-closure(A)={A,B}. δ({A,B}, 1) = {C}. ε-closure(C)={C}. So δ'(A,1)={C}. F'={C} (since ε-closure(A) doesn't contain C).",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_111",
    topicId: "top_min",
    text: "What is the purpose of DFA Minimization?",
    correctAnswer: "To find an equivalent DFA with the mathematically minimum possible number of states.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_112",
    topicId: "top_min",
    text: "What is the mandatory first step before applying the Table-Filling (Myhill-Nerode) algorithm?",
    correctAnswer: "Remove all unreachable states from the DFA using BFS or DFS from the start state.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_113",
    topicId: "top_min",
    text: "In the Table-Filling algorithm, what is the base case for marking pairs of states as distinguishable?",
    correctAnswer: "Mark every pair (p, q) where one is a final state and the other is a non-final state.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_114",
    topicId: "top_min",
    text: "Describe the iterative step in the Table-Filling algorithm.",
    correctAnswer: "For every unmarked pair (p, q) and every symbol 'a', check if the pair (δ(p, a), δ(q, a)) is already marked. If yes, mark (p, q).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_115",
    topicId: "top_min",
    text: "When does the Table-Filling algorithm terminate?",
    correctAnswer: "When an entire pass through the table results in no new pairs being marked.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_116",
    topicId: "top_min",
    text: "At the end of the algorithm, what do the UNMARKED pairs represent?",
    correctAnswer: "They represent equivalent states that can be merged into a single state.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_117",
    topicId: "top_min",
    text: "What theorem proves that the minimal DFA for a regular language is unique up to state renaming?",
    correctAnswer: "The Myhill-Nerode Theorem.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_118",
    topicId: "top_min",
    text: "Can you directly minimize an NFA using the Table-Filling algorithm?",
    correctAnswer: "No. The algorithm strictly requires the deterministic properties of a DFA. NFAs must be converted to DFAs first.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_119",
    topicId: "top_min",
    text: "If A is equivalent to B, and B is equivalent to C, are A and C equivalent?",
    correctAnswer: "Yes, state equivalence is an equivalence relation (transitive, symmetric, reflexive).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_120",
    topicId: "top_min",
    text: "Exam: Q={1(start), 2(final), 3(final)}. 1-a->2, 1-b->3. 2-a,b->2. 3-a,b->3. Minimize it.",
    correctAnswer: "Initial marking: (1,2) and (1,3) marked. Iteration for (2,3): δ(2,a)=2, δ(3,a)=3, (2,3) unmarked. δ(2,b)=2, δ(3,b)=3, (2,3) unmarked. So 2 and 3 are equivalent. Minimized states: {1}, {2,3}.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_121",
    topicId: "top_fa_output",
    text: "How does a Finite Automaton with Output (Transducer) differ from a regular DFA?",
    correctAnswer: "A transducer maps an input string to an output string, rather than just accepting or rejecting the input.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_122",
    topicId: "top_fa_output",
    text: "Do transducers have final (accept) states?",
    correctAnswer: "No, their purpose is not to accept/reject strings, so final states are omitted.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_123",
    topicId: "top_fa_output",
    text: "What is the output alphabet typically denoted by?",
    correctAnswer: "Δ (Delta).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_124",
    topicId: "top_fa_output",
    text: "What are the two standard theoretical models for Finite Automata with Output?",
    correctAnswer: "Moore machines and Mealy machines.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_125",
    topicId: "top_fa_output",
    text: "Is the output of a transducer deterministic?",
    correctAnswer: "Yes, for any given input string from the start state, a transducer produces exactly one well-defined output string.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_126",
    topicId: "top_fa_output",
    text: "What symbol denotes the output function?",
    correctAnswer: "λ (Lambda).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_127",
    topicId: "top_fa_output",
    text: "Can a transducer process an infinitely long input stream?",
    correctAnswer: "Yes, it acts as a stream processor, generating an output symbol for each transition.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_128",
    topicId: "top_fa_output",
    text: "Can a Finite Automaton with Output recognize context-free grammar logic?",
    correctAnswer: "No, it is still bound by finite memory (regular languages).",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_129",
    topicId: "top_fa_output",
    text: "Give a real-world example of a transducer.",
    correctAnswer: "A lexical analyzer outputting tokens, or a digital logic circuit computing a running sum (modulo).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_130",
    topicId: "top_fa_output",
    text: "Exam: Design a transducer conceptually that flips every bit in a binary string (1's complement).",
    correctAnswer: "1 state q0. On reading 0, output 1, stay in q0. On reading 1, output 0, stay in q0.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_131",
    topicId: "top_moore",
    text: "In a Moore Machine, what determines the output symbol?",
    correctAnswer: "The output depends ONLY on the current state.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_132",
    topicId: "top_moore",
    text: "What is the domain and codomain of the Moore output function λ?",
    correctAnswer: "λ: Q → Δ. It maps a state to an output symbol.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_133",
    topicId: "top_moore",
    text: "If a Moore machine processes an input string of length N, what is the length of the output string?",
    correctAnswer: "N + 1.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_134",
    topicId: "top_moore",
    text: "Why is the Moore output string length N + 1?",
    correctAnswer: "Because it emits the output associated with the start state before any input is processed.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_135",
    topicId: "top_moore",
    text: "How is a Moore machine's output drawn on a state transition diagram?",
    correctAnswer: "Inside the state node, usually formatted as 'StateName / OutputSymbol'.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_136",
    topicId: "top_moore",
    text: "In a Moore transition table, how is the output represented?",
    correctAnswer: "As an additional column specifying the output for each state row.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_137",
    topicId: "top_moore",
    text: "If state q2 has output '1', does it matter if we reached q2 via symbol 'a' or 'b'?",
    correctAnswer: "No, the output is strictly tied to the state q2, regardless of the transition used to get there.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_138",
    topicId: "top_moore",
    text: "Can a Moore machine react instantly to an input symbol without a state transition?",
    correctAnswer: "No, the output only updates after the state transition resolves.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_139",
    topicId: "top_moore",
    text: "Trace Moore: Start q0/0. q0-1->q1. q1/1. q1-1->q1. Trace '11'.",
    correctAnswer: "Start in q0 -> output '0'. Read 1, go to q1 -> output '1'. Read 1, go to q1 -> output '1'. Total output: '011'.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_140",
    topicId: "top_moore",
    text: "Exam: Design a Moore machine that outputs 'Y' if the previous two inputs were '11', else 'N'. Minimum states?",
    correctAnswer: "3 states. Start/0-ones/'N', 1-one/'N', 2-ones/'Y'.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_141",
    topicId: "top_mealy",
    text: "In a Mealy Machine, what determines the output symbol?",
    correctAnswer: "The output depends on BOTH the current state AND the current input symbol.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_142",
    topicId: "top_mealy",
    text: "What is the domain and codomain of the Mealy output function λ?",
    correctAnswer: "λ: Q × Σ → Δ. It maps a (State, Input) pair to an output symbol.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_143",
    topicId: "top_mealy",
    text: "If a Mealy machine processes an input string of length N, what is the length of the output string?",
    correctAnswer: "Exactly N.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_144",
    topicId: "top_mealy",
    text: "How is a Mealy machine's output drawn on a state transition diagram?",
    correctAnswer: "On the transition arrows, usually formatted as 'InputSymbol / OutputSymbol'.",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_145",
    topicId: "top_mealy",
    text: "Can two different transitions entering the same state have different outputs?",
    correctAnswer: "Yes, because the output is associated with the transition edge, not the destination state.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_146",
    topicId: "top_mealy",
    text: "In a Mealy transition table, how is the output represented?",
    correctAnswer: "Inside the columns for the input symbols, alongside the next state (e.g., NextState / Output).",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_147",
    topicId: "top_mealy",
    text: "Does a Mealy machine output a symbol before the first input is read?",
    correctAnswer: "No, an input symbol is required to traverse an edge and trigger an output.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_148",
    topicId: "top_mealy",
    text: "Which machine typically requires fewer states to model a given logic: Moore or Mealy?",
    correctAnswer: "Mealy machines often require fewer states.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_149",
    topicId: "top_mealy",
    text: "Trace Mealy: Start q0. q0 -1/A-> q1. q1 -1/B-> q1. Trace '11'.",
    correctAnswer: "Read 1 from q0 -> output A, go to q1. Read 1 from q1 -> output B, go to q1. Total output: 'AB'.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_150",
    topicId: "top_mealy",
    text: "Exam: Design a Mealy machine that outputs '1' if the current input is the same as the previous input, else '0'.",
    correctAnswer: "3 states. Start (no previous). State 'saw0'. State 'saw1'. From 'saw0' on 0: output 1->saw0, on 1: output 0->saw1. etc.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
  {
    id: "q_mod1_151",
    topicId: "top_moore_mealy",
    text: "Are Moore and Mealy machines equivalent in computational power?",
    correctAnswer: "Yes. For any Moore machine, there is an equivalent Mealy machine, and vice versa (ignoring the length N vs N+1 output offset).",
    difficulty: 1,
    answerMode: "SELF_EVALUATION",
    type: "Recall"
  },
  {
    id: "q_mod1_152",
    topicId: "top_moore_mealy",
    text: "Describe the conversion rule from Moore to Mealy.",
    correctAnswer: "Take the output associated with a state and copy it onto all incoming transition edges pointing to that state.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_153",
    topicId: "top_moore_mealy",
    text: "When converting Moore to Mealy, does the number of states change?",
    correctAnswer: "No, the resulting Mealy machine has the exact same number of states.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_154",
    topicId: "top_moore_mealy",
    text: "Describe the core conversion rule from Mealy to Moore.",
    correctAnswer: "Split a state if incoming transitions to that state produce different outputs. Create a separate state for each unique output.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_155",
    topicId: "top_moore_mealy",
    text: "If state Q in a Mealy machine has incoming edges outputting 'A' and 'B', what happens in the Moore conversion?",
    correctAnswer: "Q is split into two states: Q_A (which outputs A) and Q_B (which outputs B).",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_156",
    topicId: "top_moore_mealy",
    text: "What happens to the outgoing transitions of a state that gets split?",
    correctAnswer: "Both of the new split states inherit exact copies of all original outgoing transitions.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_157",
    topicId: "top_moore_mealy",
    text: "When converting Mealy to Moore, does the number of states change?",
    correctAnswer: "Yes, it typically increases due to state splitting.",
    difficulty: 2,
    answerMode: "SELF_EVALUATION",
    type: "Understanding"
  },
  {
    id: "q_mod1_158",
    topicId: "top_moore_mealy",
    text: "How do you handle the extra start-state output when converting Mealy to Moore?",
    correctAnswer: "You assign an arbitrary/default output to the start state, noting that the first symbol of the Moore machine's output is extraneous.",
    difficulty: 3,
    answerMode: "SELF_EVALUATION",
    type: "Application"
  },
  {
    id: "q_mod1_159",
    topicId: "top_moore_mealy",
    text: "If a Mealy machine has N states and output alphabet Δ, what is the maximum number of states in the equivalent Moore machine?",
    correctAnswer: "N × |Δ|.",
    difficulty: 4,
    answerMode: "SELF_EVALUATION",
    type: "Problem Solving"
  },
  {
    id: "q_mod1_160",
    topicId: "top_moore_mealy",
    text: "Exam: Convert Mealy ->q0(0/Y->q1). q1(1/N->q1, 0/Y->q0) to Moore. How many states?",
    correctAnswer: "q0 receives Y. q1 receives Y and N. q1 must split into q1_Y and q1_N. Total states = 3.",
    difficulty: 5,
    answerMode: "SELF_EVALUATION",
    type: "Exam"
  },
];
