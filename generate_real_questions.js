const fs = require('fs');

const data = {
  'top_intro_fa': [
    { text: "What is the primary function of a Finite Automaton?", answer: "To process strings of symbols and decide whether to accept or reject them using a finite amount of memory.", diff: 1 },
    { text: "Why are Finite Automata used in lexical analysis?", answer: "Because they can efficiently match patterns and tokenize input streams in linear time.", diff: 2 },
    { text: "What happens if a Finite Automaton reads the entire input string but is not in an accepting state?", answer: "The input string is rejected.", diff: 1 },
    { text: "Does a Finite Automaton have unbounded external memory?", answer: "No, it only has a finite set of states (internal memory).", diff: 1 },
    { text: "Which component dictates how the machine moves from one state to another?", answer: "The transition mechanism/function based on the current state and input symbol.", diff: 1 },
    { text: "Can a Finite Automaton have multiple initial states?", answer: "In standard definitions (like DFA), there is exactly one initial state.", diff: 2 },
    { text: "What is the input alphabet (Σ)?", answer: "The finite, non-empty set of symbols that the automaton is allowed to read.", diff: 1 },
    { text: "What type of language is exactly the set of languages accepted by Finite Automata?", answer: "Regular Languages.", diff: 2 },
    { text: "Describe a basic example of an FA in the real world.", answer: "A vending machine, an elevator controller, or a turnstile.", diff: 2 },
    { text: "If an FA has no final states, what language does it accept?", answer: "The empty language (∅), because it can never accept any string.", diff: 3 }
  ],
  'top_dfa_formal': [
    { text: "What are the components of the 5-tuple (Q, Σ, δ, q0, F) defining a DFA?", answer: "Q: finite states, Σ: alphabet, δ: transition function, q0: start state, F: final states.", diff: 1 },
    { text: "What is the domain and codomain of the transition function δ in a DFA?", answer: "Domain: Q × Σ. Codomain: Q.", diff: 2 },
    { text: "What does it mean for δ to be a 'total' function in a DFA?", answer: "It means there is exactly one defined transition for every state and every symbol in the alphabet.", diff: 2 },
    { text: "Define the extended transition function δ*.", answer: "δ*(q, w) returns the state reached by processing the entire string w starting from state q.", diff: 3 },
    { text: "What is δ*(q, ε)?", answer: "It equals q. Reading the empty string leaves the machine in the same state.", diff: 2 },
    { text: "In the 5-tuple, can the set of final states F be empty?", answer: "Yes, F can be the empty set (F ⊆ Q).", diff: 2 },
    { text: "How is q0 related to Q?", answer: "q0 must be an element of Q (q0 ∈ Q).", diff: 1 },
    { text: "Why is a DFA called 'Deterministic'?", answer: "Because for every state and input symbol, there is exactly one next state. No choices or guessing.", diff: 2 },
    { text: "Is a DFA allowed to have ε-transitions?", answer: "No, a DFA cannot change state without consuming an input symbol.", diff: 1 },
    { text: "Constructing a formal DFA: How many transitions exist in a DFA with |Q|=4 and |Σ|=2?", answer: "Exactly 4 × 2 = 8 transitions.", diff: 3 }
  ],
  'top_dfa_notations': [
    { text: "How is a transition written in functional notation?", answer: "δ(q, a) = p", diff: 1 },
    { text: "How is an initial state represented in text?", answer: "Often with a right-pointing arrow, e.g., ->q0", diff: 1 },
    { text: "How are final states represented in text?", answer: "Often with an asterisk, e.g., *qF", diff: 1 },
    { text: "If δ(q0, 0) = q1 and δ(q1, 1) = q2, evaluate δ*(q0, '01').", answer: "q2", diff: 2 },
    { text: "What notation is used to represent the set of all strings over Σ?", answer: "Σ* (Sigma star or Kleene star on the alphabet).", diff: 2 },
    { text: "What is the notation for the empty string?", answer: "ε (epsilon) or λ (lambda).", diff: 1 },
    { text: "Write the notation expressing that a string w is accepted by DFA M.", answer: "δ*(q0, w) ∈ F", diff: 2 },
    { text: "If a state q is not in F, what is the notation?", answer: "q ∉ F", diff: 1 },
    { text: "What does the notation Q × Σ mean?", answer: "The Cartesian product of the set of states and the alphabet (all possible combinations of a state and a symbol).", diff: 3 },
    { text: "How do you denote the power set of Q?", answer: "P(Q) or 2^Q.", diff: 2 }
  ],
  'top_dfa_diagram': [
    { text: "In a State Transition Diagram, what represents a state?", answer: "A circle (node).", diff: 1 },
    { text: "How is the start state indicated in a diagram?", answer: "By an incoming arrow not originating from any other state.", diff: 1 },
    { text: "How are final states indicated?", answer: "By double circles.", diff: 1 },
    { text: "What do the directed edges (arrows) represent?", answer: "Transitions between states, labeled with the input symbol.", diff: 1 },
    { text: "What is a dead state (or trap state)?", answer: "A non-accepting state from which no accepting state can ever be reached.", diff: 2 },
    { text: "Why are dead states required in DFA diagrams?", answer: "Because DFAs must have a transition for every symbol from every state. Invalid inputs must explicitly go to a dead state.", diff: 2 },
    { text: "If state A has an edge to B labeled '0,1', what does this mean?", answer: "It is shorthand for two transitions: δ(A,0)=B and δ(A,1)=B.", diff: 1 },
    { text: "Convert diagram logic: Start A, A on 0->B, B on 1->C (accept). What is the shortest accepted string?", answer: "The string '01'.", diff: 2 },
    { text: "Draw a DFA conceptually for 'ends in 0'. How many states?", answer: "2 states: start/not-ending-in-0, and ends-in-0 (final).", diff: 3 },
    { text: "What happens if a diagram is missing a transition for symbol 'a' from state 'q'?", answer: "It is not a valid DFA (it might be an NFA).", diff: 2 }
  ],
  'top_dfa_table': [
    { text: "In a State Transition Table, what do the rows and columns represent?", answer: "Rows represent states, columns represent alphabet symbols.", diff: 1 },
    { text: "How is the start state marked in a table?", answer: "With an arrow (->) next to the state name.", diff: 1 },
    { text: "How are final states marked in a table?", answer: "With an asterisk (*) next to the state name.", diff: 1 },
    { text: "What goes in the cell at row q, column a?", answer: "The next state, δ(q, a).", diff: 1 },
    { text: "Convert Table to Diagram: if cell (q0, 0) has q1, what is drawn?", answer: "A directed arrow from q0 to q1 labeled '0'.", diff: 2 },
    { text: "Why are tables useful compared to diagrams?", answer: "Tables are easier to implement in software using 2D arrays or hash maps.", diff: 2 },
    { text: "If a DFA has 5 states and an alphabet of 3 symbols, how many cells (excluding headers) are in the table?", answer: "15 cells (5 rows × 3 columns).", diff: 2 },
    { text: "Can a cell in a DFA transition table be empty?", answer: "No, a DFA transition function is total.", diff: 2 },
    { text: "Can a cell in a DFA transition table contain multiple states?", answer: "No, that would make it nondeterministic (an NFA table).", diff: 2 },
    { text: "What happens if row q1 and q2 are identical in every column and both are non-final?", answer: "They might be equivalent states, and the DFA might be minimizable.", diff: 3 }
  ],
  'top_dfa_lang': [
    { text: "What is the formal definition of the language accepted by a DFA M?", answer: "L(M) = { w ∈ Σ* | δ*(q0, w) ∈ F }.", diff: 2 },
    { text: "What is a Regular Language?", answer: "Any language that can be accepted by some DFA.", diff: 1 },
    { text: "If F = Q (all states are final), what language does the DFA accept?", answer: "Σ* (all possible strings).", diff: 2 },
    { text: "If F = ∅ (no final states), what language does the DFA accept?", answer: "∅ (the empty language).", diff: 2 },
    { text: "Does a DFA accepting {ε} have zero transitions?", answer: "No, it still must have transitions, but the start state is a final state, and any input moves to a dead state.", diff: 3 },
    { text: "Design logic: A DFA for strings starting with '1'. What happens on seeing '0' first?", answer: "It transitions to a dead state.", diff: 2 },
    { text: "Design logic: A DFA for an even number of 1s. How many states?", answer: "2 states (Even and Odd).", diff: 2 },
    { text: "If L1 and L2 are regular, is their intersection regular?", answer: "Yes, regular languages are closed under intersection.", diff: 3 },
    { text: "What string is accepted if the start state is not final, but there are no transitions leading to a final state?", answer: "None, the language is empty.", diff: 2 },
    { text: "How do you prove a language is accepted by a DFA?", answer: "By constructing a specific DFA and proving by induction that it reaches a final state iff the string is in the language.", diff: 4 }
  ],
  'top_nfa': [
    { text: "What does NFA stand for?", answer: "Nondeterministic Finite Automaton.", diff: 1 },
    { text: "How does the transition function δ of an NFA differ from a DFA?", answer: "δ outputs a set of states (P(Q)) rather than a single state.", diff: 2 },
    { text: "What happens in an NFA if a state has no transition for a given symbol?", answer: "The computation path simply 'dies' (rejects) without crashing the machine.", diff: 2 },
    { text: "When does an NFA accept a string?", answer: "When AT LEAST ONE computational path reaches a final state after consuming the entire string.", diff: 2 },
    { text: "Can an NFA be in multiple states at the same time?", answer: "Conceptually, yes. It explores multiple paths in parallel.", diff: 1 },
    { text: "Does an NFA have more computational power (can it recognize more languages) than a DFA?", answer: "No, they both recognize exactly the class of Regular Languages.", diff: 2 },
    { text: "In an NFA table, what is placed in a cell where multiple transitions exist?", answer: "A set of states, e.g., {q1, q2}.", diff: 2 },
    { text: "Why use an NFA if it has the same power as a DFA?", answer: "NFAs are often much easier to design and can have exponentially fewer states than their equivalent DFAs.", diff: 3 },
    { text: "If δ*(q0, w) = {q1, q2, q3} and F = {q3, q4}, is w accepted?", answer: "Yes, because the intersection of {q1, q2, q3} and F is {q3}, which is not empty.", diff: 3 },
    { text: "Is every DFA also technically an NFA?", answer: "Yes, a DFA is an NFA where every transition set has exactly one element.", diff: 3 }
  ],
  'top_nfa_dfa': [
    { text: "What is the name of the algorithm used to convert an NFA to a DFA?", answer: "Subset Construction (or Powerset Construction).", diff: 1 },
    { text: "If an NFA has N states, what is the maximum number of states in the equivalent DFA?", answer: "2^N states (the size of the power set).", diff: 2 },
    { text: "What represents a state in the constructed DFA?", answer: "A subset of states from the NFA.", diff: 2 },
    { text: "What is the start state of the new DFA?", answer: "The subset containing only the NFA's start state: {q0} (assuming no ε-transitions).", diff: 2 },
    { text: "How do you determine if a subset state in the DFA is a final state?", answer: "It is a final state if the subset contains AT LEAST ONE final state from the NFA.", diff: 2 },
    { text: "If δ_N(A, 0) = {A, B} and δ_N(B, 0) = {C}, what is δ_D({A, B}, 0)?", answer: "{A, B, C}", diff: 3 },
    { text: "Why do we use 'lazy evaluation' when computing the subset construction?", answer: "To avoid computing all 2^N states, many of which may be unreachable from the start state.", diff: 3 },
    { text: "If the NFA has a transition to the empty set ∅, what does it become in the DFA?", answer: "It becomes a transition to the empty set state {∅}, which acts as a dead/trap state.", diff: 3 },
    { text: "What is the transition from {∅} on any symbol?", answer: "{∅} (it loops to itself).", diff: 2 },
    { text: "Does the resulting DFA always need to be minimized?", answer: "Yes, the subset construction does not guarantee the resulting DFA is minimal.", diff: 3 }
  ],
  'top_fa_equiv': [
    { text: "When are two Finite Automata considered equivalent?", answer: "When they accept exactly the same language (L(M1) = L(M2)).", diff: 1 },
    { text: "Can an NFA and a DFA be equivalent?", answer: "Yes, if they accept the same language.", diff: 1 },
    { text: "What is a practical method to check if two DFAs are equivalent?", answer: "Minimize both DFAs and check if the resulting diagrams are identical (isomorphic).", diff: 2 },
    { text: "What is the symmetric difference method for checking equivalence?", answer: "Construct an automaton for L = (L1 ∩ ~L2) ∪ (~L1 ∩ L2). If L is empty, they are equivalent.", diff: 3 },
    { text: "How can you tell if the symmetric difference automaton accepts an empty language?", answer: "Check if there is any reachable path from the start state to a final state.", diff: 3 },
    { text: "What are 'distinguishing strings'?", answer: "A string w that is accepted by M1 but rejected by M2, proving they are not equivalent.", diff: 2 },
    { text: "If M1 has 3 states and M2 has 4 states, can they be equivalent?", answer: "Yes, the number of states does not determine the language (M2 might just be unminimized).", diff: 2 },
    { text: "What theorem guarantees that equivalent DFAs will minimize to the exact same structure?", answer: "The Myhill-Nerode theorem.", diff: 4 },
    { text: "If you want to prove L(M1) ⊆ L(M2), what product automaton do you build?", answer: "You build the automaton for L(M1) ∩ ~L(M2) and check if it is empty.", diff: 4 },
    { text: "Is checking equivalence of FAs a decidable problem?", answer: "Yes, algorithms like DFA minimization or BFS on the product automaton run in finite time.", diff: 3 }
  ],
  'top_eps_nfa': [
    { text: "What is an ε-transition?", answer: "A transition that allows the automaton to change states without consuming any input symbol.", diff: 1 },
    { text: "What does ε-closure(q) mean?", answer: "The set of all states reachable from state q by following zero or more ε-transitions.", diff: 2 },
    { text: "Is a state always in its own ε-closure?", answer: "Yes, q ∈ ε-closure(q) trivially (taking zero ε-transitions).", diff: 1 },
    { text: "If A --ε--> B and B --ε--> C, is C in ε-closure(A)?", answer: "Yes, ε-closures are transitive.", diff: 2 },
    { text: "Do ε-NFAs accept more languages than standard DFAs?", answer: "No, they still only accept Regular Languages.", diff: 2 },
    { text: "How does the extended transition function δ*(q, w) change in an ε-NFA?", answer: "It applies the ε-closure before and after reading every symbol in w.", diff: 3 },
    { text: "If a string runs out and the machine is in state A, and A --ε--> B where B is final, is the string accepted?", answer: "Yes, because the machine can take the ε-transition to B at the end of the string.", diff: 3 },
    { text: "Why do we use ε-NFAs?", answer: "They make it extremely easy to combine smaller automata (e.g., for Union, Concatenation, and Kleene Star operations).", diff: 3 },
    { text: "In an ε-NFA, what is δ(q, ε)?", answer: "The set of states reachable by taking EXACTLY ONE ε-transition from q (unlike ε-closure which is zero or more).", diff: 4 },
    { text: "Can an ε-NFA have cycles of ε-transitions?", answer: "Yes, the machine can freely loop through them without consuming input.", diff: 3 }
  ],
  'top_eps_elim': [
    { text: "What is the goal of eliminating ε-transitions?", answer: "To convert an ε-NFA into a standard NFA that accepts the same language.", diff: 1 },
    { text: "What is the formula for the new transition function δ'(q, a)?", answer: "δ'(q, a) = ε-closure(δ(ε-closure(q), a)).", diff: 3 },
    { text: "Do the set of states Q change during ε-elimination?", answer: "No, the states Q remain exactly the same.", diff: 2 },
    { text: "How are the final states updated?", answer: "F' = F ∪ {q0} if the ε-closure of the start state contains any final state. Otherwise, F' = F.", diff: 3 },
    { text: "Why might the start state become a final state?", answer: "If the start state can reach a final state without reading any input (via ε), the empty string is accepted.", diff: 3 },
    { text: "If A --ε--> B and B --0--> C, what new edge is added?", answer: "An edge from A to C labeled '0'.", diff: 3 },
    { text: "What happens to the original ε-transitions?", answer: "They are completely removed in the new NFA.", diff: 2 },
    { text: "Can ε-elimination result in unreachable states?", answer: "Yes, bypassing states with new edges often leaves the intermediate states unreachable.", diff: 3 },
    { text: "After removing ε-transitions, is the machine definitely a DFA?", answer: "No, it is an NFA. It may still have multiple edges for the same symbol or missing edges.", diff: 2 },
    { text: "If you have A --ε--> B --ε--> C, and C is final, what happens to A and B?", answer: "A and B must both be added to the set of final states.", diff: 4 }
  ],
  'top_min': [
    { text: "What is the purpose of DFA minimization?", answer: "To find an equivalent DFA with the absolute minimum number of states.", diff: 1 },
    { text: "What is the first mandatory step before applying the minimization algorithm?", answer: "Remove all unreachable states from the DFA.", diff: 2 },
    { text: "When are two states considered 'distinguishable'?", answer: "When there exists a string that leads one state to an accept state and the other to a reject state.", diff: 2 },
    { text: "What is the base case for marking distinguishable states in the Table-Filling Method?", answer: "Mark every pair (p, q) where p is a final state and q is a non-final state.", diff: 2 },
    { text: "In the iterative step, when do you mark a pair (p, q)?", answer: "If for some symbol a, the pair (δ(p, a), δ(q, a)) is already marked.", diff: 3 },
    { text: "When does the Table-Filling method stop?", answer: "When a full pass over the table yields no newly marked pairs.", diff: 2 },
    { text: "What do the UNMARKED pairs in the table represent?", answer: "Equivalent states that should be merged together.", diff: 2 },
    { text: "Whose theorem proves that the minimal DFA is unique?", answer: "The Myhill-Nerode Theorem.", diff: 1 },
    { text: "If states A, B, and C are all equivalent to each other, how many states do they become in the minimal DFA?", answer: "One combined state.", diff: 2 },
    { text: "Can you minimize an NFA using the Table-Filling method directly?", answer: "No, the algorithm only works on DFAs.", diff: 2 }
  ],
  'top_fa_output': [
    { text: "How does a Finite Automaton with Output differ from a standard FA?", answer: "It acts as a transducer (generating an output string) rather than an acceptor (YES/NO).", diff: 1 },
    { text: "Do Transducers have final (accept) states?", answer: "No, because their purpose is to transform input, not to accept or reject it.", diff: 2 },
    { text: "What is the output alphabet typically denoted as?", answer: "Δ (Delta).", diff: 1 },
    { text: "What are the two types of Finite Automata with Output?", answer: "Moore machines and Mealy machines.", diff: 1 },
    { text: "If you feed a binary string into a transducer, what do you get?", answer: "Another string of symbols from the output alphabet Δ.", diff: 1 },
    { text: "What is the output function denoted as?", answer: "λ (Lambda).", diff: 2 },
    { text: "Are FAs with output deterministic?", answer: "Yes, for every state and input symbol, the next state and output are uniquely determined.", diff: 2 },
    { text: "Can a transducer be used to compute the 1's complement of a binary number?", answer: "Yes.", diff: 2 },
    { text: "Can a transducer process an infinite stream?", answer: "Yes, it produces an output symbol continuously as it reads input.", diff: 3 },
    { text: "Are transducers more computationally powerful than Turing machines?", answer: "No, they still have finite memory and cannot recognize context-free languages.", diff: 3 }
  ],
  'top_moore': [
    { text: "In a Moore Machine, what does the output depend on?", answer: "The output depends ONLY on the current state.", diff: 1 },
    { text: "What is the domain and codomain of the Moore output function λ?", answer: "λ: Q → Δ (State to Output symbol).", diff: 2 },
    { text: "If the input string has length N, what is the length of the output string in a Moore machine?", answer: "N + 1.", diff: 2 },
    { text: "Why is the output length N + 1?", answer: "Because the machine immediately outputs the symbol associated with the start state before reading any input.", diff: 3 },
    { text: "How is output represented in a Moore state transition diagram?", answer: "Inside the state circle, typically written as 'StateName / Output'.", diff: 1 },
    { text: "If state q2 has output '1', and transitions into q2 happen on 'a' and 'b', what is output?", answer: "It outputs '1' regardless of whether 'a' or 'b' was read to get there.", diff: 2 },
    { text: "How is the transition table for a Moore machine structured?", answer: "Rows are states, columns are input symbols for next state, and there is one extra column for the State Output.", diff: 2 },
    { text: "Can a Moore machine react instantly to an input symbol without changing state?", answer: "No, the output only changes after the state transition occurs.", diff: 3 },
    { text: "Does a Moore machine have final states?", answer: "No.", diff: 1 },
    { text: "If a Moore machine needs to output '1' when it sees 'ab', how many states must it have at minimum?", answer: "Three states: Start (saw nothing), Saw 'a', Saw 'ab'.", diff: 3 }
  ],
  'top_mealy': [
    { text: "In a Mealy Machine, what does the output depend on?", answer: "The output depends on BOTH the current state and the current input symbol.", diff: 1 },
    { text: "What is the domain and codomain of the Mealy output function λ?", answer: "λ: Q × Σ → Δ (State and Input to Output).", diff: 2 },
    { text: "If the input string has length N, what is the length of the output string in a Mealy machine?", answer: "Exactly N.", diff: 2 },
    { text: "How is output represented in a Mealy state transition diagram?", answer: "On the transition arrows, typically written as 'Input / Output'.", diff: 1 },
    { text: "If you are in state A and read '0', when does the output occur?", answer: "The output is generated DURING the transition to the next state.", diff: 2 },
    { text: "Can different transitions entering the same state have different outputs?", answer: "Yes, because output is tied to the edge, not the destination state.", diff: 2 },
    { text: "How is the transition table for a Mealy machine structured?", answer: "For each input symbol column, there are two sub-columns: Next State and Output.", diff: 2 },
    { text: "Why are Mealy machines sometimes preferred over Moore machines?", answer: "They often require fewer states to accomplish the same task.", diff: 3 },
    { text: "Do Mealy machines output anything before the first input is read?", answer: "No, they require an input symbol to trigger a transition and output.", diff: 1 },
    { text: "If you need a transducer to simulate a logic gate reacting instantly to inputs, which is better?", answer: "Mealy machine.", diff: 3 }
  ],
  'top_moore_mealy': [
    { text: "Are Moore and Mealy machines equivalent in computational power?", answer: "Yes, they can compute the same functions (ignoring the length N vs N+1 offset).", diff: 1 },
    { text: "When converting Moore to Mealy, what is the basic rule?", answer: "Push the output of the state onto all incoming transition edges.", diff: 2 },
    { text: "Is the number of states preserved when converting Moore to Mealy?", answer: "Yes, the Mealy machine will have the exact same number of states.", diff: 2 },
    { text: "When converting Mealy to Moore, what is the basic rule?", answer: "Split a state if incoming transitions have different outputs.", diff: 3 },
    { text: "If state Q in a Mealy machine has incoming edges outputting '0' and '1', what happens?", answer: "Q is split into two states in the Moore machine: Q0 (output 0) and Q1 (output 1).", diff: 3 },
    { text: "When converting Mealy to Moore, what happens to outgoing transitions of a split state?", answer: "Both new states (Q0 and Q1) copy the exact same outgoing transitions as the original state Q.", diff: 4 },
    { text: "Is the number of states preserved when converting Mealy to Moore?", answer: "No, the Moore machine generally requires more states due to state splitting.", diff: 2 },
    { text: "How do you handle the extra start state output when converting Mealy to Moore?", answer: "Assign an arbitrary output to the start state, realizing the first output symbol is a dummy.", diff: 3 },
    { text: "If a Mealy machine has 3 states, what is the maximum possible states in the equivalent Moore machine?", answer: "3 × |Δ| (number of states times the size of the output alphabet).", diff: 4 },
    { text: "Which conversion is generally easier and produces a machine with equal states?", answer: "Moore to Mealy conversion.", diff: 2 }
  ]
};

let out = `import { Question } from '@/types';\n\nexport const MODULE_1_QUESTIONS: Question[] = [\n`;

let qId = 1;

for (const [topic, qs] of Object.entries(data)) {
  for (const q of qs) {
    out += `  {
    id: "q_mod1_${qId}",
    topicId: "${topic}",
    text: "${q.text.replace(/"/g, '\\"')}",
    correctAnswer: "${q.answer.replace(/"/g, '\\"')}",
    difficulty: ${q.diff}
  },\n`;
    qId++;
  }
}

out += `];\n`;
fs.writeFileSync('src/lib/content/questions.ts', out);
