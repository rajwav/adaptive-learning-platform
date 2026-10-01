const fs = require('fs');

const data = {
  'top_intro_fa': [
    { text: "Define a Finite Automaton conceptually without using the 5-tuple.", answer: "A theoretical model of computation with a finite amount of memory (states), which reads an input sequence symbol by symbol and transitions between states to accept or reject the input.", diff: 1, type: "Recall" },
    { text: "What is the primary limitation of Finite Automata compared to Turing Machines?", answer: "They have no auxiliary memory (like a tape or stack) other than their current state, so they cannot recognize context-free languages (e.g., matching arbitrary numbers of parentheses).", diff: 2, type: "Understanding" },
    { text: "Identify the alphabet, states, and transitions for a simple turnstile FA.", answer: "Alphabet: {coin, push}. States: {Locked, Unlocked}. Transitions: (Locked, coin)->Unlocked, (Unlocked, push)->Locked, (Locked, push)->Locked, (Unlocked, coin)->Unlocked.", diff: 3, type: "Application" },
    { text: "If an FA has 3 states and reads an input string of length 5, how many state transitions occur?", answer: "Exactly 5 transitions occur, processing one symbol at a time.", diff: 2, type: "Understanding" },
    { text: "Can a Finite Automaton process an infinite string?", answer: "An FA processes finite strings to determine acceptance, though it can be conceptualized as running continuously on an input stream (like transducers).", diff: 2, type: "Recall" },
    { text: "Design challenge: How many states minimum are required for an FA to accept strings of length exactly 2 over Σ={0,1}?", answer: "4 states: q0 (length 0), q1 (length 1), q2 (length 2, final), and q_dead (length > 2).", diff: 4, type: "Problem Solving" },
    { text: "What language does an FA with only one state (which is final) and looping transitions for all symbols in Σ accept?", answer: "Σ* (the set of all possible strings over the alphabet, including the empty string ε).", diff: 3, type: "Application" },
    { text: "What language does an FA with a start state that is not final, and all transitions leading to a dead state accept?", answer: "The empty language, ∅. It accepts no strings.", diff: 3, type: "Application" },
    { text: "A student claims a Finite Automaton can verify if a string has the same number of 0s and 1s. Is this correct?", answer: "Incorrect. That requires counting to an arbitrary bound, which is impossible with finite memory. (Pumping Lemma can prove this).", diff: 4, type: "Problem Solving" },
    { text: "Exam: Consider an FA with states {A,B,C}, start state A, final state C. Transitions: A-0->B, B-1->C, C-0->C, C-1->C (all other inputs to dead state). Does it accept '0110'?", answer: "Yes. Trace: A (read 0) -> B (read 1) -> C (read 1) -> C (read 0) -> C. Since C is final, the string is accepted.", diff: 5, type: "Exam" }
  ],
  'top_dfa_formal': [
    { text: "List the 5 components of the formal DFA tuple (Q, Σ, δ, q0, F).", answer: "Q: finite set of states. Σ: finite input alphabet. δ: transition function. q0: start state (q0 ∈ Q). F: set of final/accept states (F ⊆ Q).", diff: 1, type: "Recall" },
    { text: "Explain the domain and codomain of the DFA transition function δ.", answer: "The domain is Q × Σ (a state and a symbol). The codomain is Q (a single next state). δ: Q × Σ → Q.", diff: 2, type: "Understanding" },
    { text: "What mathematical property of δ ensures the machine is 'deterministic'?", answer: "δ is a total function. For every state q in Q and every symbol a in Σ, there is exactly one defined next state δ(q, a).", diff: 3, type: "Understanding" },
    { text: "Define the extended transition function δ*(q, w).", answer: "δ*(q, ε) = q. For string wa (where a is a symbol), δ*(q, wa) = δ(δ*(q, w), a). It maps a state and a string to a resulting state.", diff: 2, type: "Recall" },
    { text: "What is δ*(q, a) where 'a' is a single symbol?", answer: "δ*(q, a) = δ(q, a). Processing a single character string is identical to the standard transition function.", diff: 2, type: "Application" },
    { text: "Constructing a formal DFA: For a DFA over Σ={0,1}, if Q has 4 states, exactly how many mappings must exist in δ?", answer: "8 mappings. 4 states × 2 symbols = 8.", diff: 4, type: "Problem Solving" },
    { text: "A student defines F = {q1, q2} and Q = {q0, q1}. Is this a valid formal DFA?", answer: "No, F must be a subset of Q. q2 is not in Q, so the definition is invalid.", diff: 3, type: "Application" },
    { text: "What is the formal definition of the language L(M) accepted by DFA M?", answer: "L(M) = { w ∈ Σ* | δ*(q0, w) ∈ F }. The set of all strings that lead from the start state to a final state.", diff: 3, type: "Understanding" },
    { text: "Exam: Let Q={q0,q1}, Σ={a}, q0=start, F={q1}, δ(q0,a)=q1, δ(q1,a)=q0. Calculate δ*(q0, 'aaa'). Is it accepted?", answer: "δ*(q0, 'a') = q1; δ*(q1, 'a') = q0; δ*(q0, 'a') = q1. The final state is q1. Since q1 ∈ F, 'aaa' is accepted.", diff: 5, type: "Exam" },
    { text: "Can F = ∅ in a valid formal DFA?", answer: "Yes, F can be the empty set. The DFA simply accepts no strings (language is ∅).", diff: 2, type: "Recall" }
  ],
  'top_dfa_notations': [
    { text: "How is a single transition mapping written mathematically?", answer: "δ(q, a) = p, meaning from state q reading symbol a, transition to state p.", diff: 1, type: "Recall" },
    { text: "What notation is used for the set of all possible finite strings over an alphabet Σ?", answer: "Σ* (Sigma star).", diff: 1, type: "Recall" },
    { text: "What does the symbol ε (or λ) denote in automata theory?", answer: "The empty string, a string of length 0.", diff: 1, type: "Recall" },
    { text: "What does |w| denote for a string w?", answer: "The length of the string (the number of symbols in it).", diff: 1, type: "Recall" },
    { text: "Translate this notation into English: ∀w ∈ Σ*, δ*(q0, w) ∉ F", answer: "For all strings w over the alphabet, the state reached from q0 after processing w is not a final state. (The DFA accepts nothing).", diff: 3, type: "Application" },
    { text: "Evaluate this property: δ*(q, uv) = δ*(δ*(q, u), v). What does it mean?", answer: "Processing string u followed by string v is exactly equivalent to processing u to reach an intermediate state, then processing v from that state.", diff: 4, type: "Understanding" },
    { text: "What is Σ^+?", answer: "Σ* - {ε}. The set of all strings over Σ excluding the empty string (strings of length >= 1).", diff: 2, type: "Recall" },
    { text: "How do you formally write that a state q is NOT an accepting state?", answer: "q ∉ F", diff: 2, type: "Understanding" },
    { text: "Write the notation for the power set (set of all subsets) of Q.", answer: "P(Q) or 2^Q.", diff: 1, type: "Recall" },
    { text: "Exam: If Σ = {0,1}, write out the set of all strings of length 2.", answer: "{00, 01, 10, 11}.", diff: 3, type: "Exam" }
  ],
  'top_dfa_diagram': [
    { text: "In a transition diagram, what does an incoming arrow with no source node indicate?", answer: "It indicates the start state (initial state) of the automaton.", diff: 1, type: "Recall" },
    { text: "How are final (accepting) states drawn in a transition diagram?", answer: "As nodes with double circles.", diff: 1, type: "Recall" },
    { text: "If a node A has an arrow to node B labeled '0,1', what does this shorthand represent?", answer: "It represents two distinct transitions: δ(A, 0) = B and δ(A, 1) = B.", diff: 2, type: "Understanding" },
    { text: "What is a 'dead state' or 'trap state' in a DFA diagram?", answer: "A non-accepting state with transitions back to itself for every symbol in the alphabet, making it impossible to leave.", diff: 2, type: "Understanding" },
    { text: "If a state q in a DFA diagram has no outgoing edge for symbol '1', what is wrong?", answer: "It violates the definition of a DFA, which requires a transition for every symbol from every state. (It might be an NFA).", diff: 3, type: "Application" },
    { text: "Trace a string: Diagram has A(start)-0->B, B-1->C(final). All other inputs go to dead state D. Trace '010'.", answer: "A -(0)-> B -(1)-> C -(0)-> D. Ends in D. Rejected.", diff: 4, type: "Problem Solving" },
    { text: "Construct a conceptual diagram for 'strings of length exactly 1' over {0,1}.", answer: "q0(start) -0,1-> q1(final). q1 -0,1-> q2(dead). q2 -0,1-> q2.", diff: 4, type: "Problem Solving" },
    { text: "Exam: Draw/describe the diagram for a DFA accepting strings ending in '0' over Σ={0,1}.", answer: "States: q0(start), q1(final). Transitions: δ(q0,1)=q0, δ(q0,0)=q1, δ(q1,0)=q1, δ(q1,1)=q0.", diff: 5, type: "Exam" },
    { text: "What happens if the start state is also a final state in a diagram?", answer: "The DFA accepts the empty string ε.", diff: 2, type: "Application" },
    { text: "A diagram has 3 states and Σ={a,b}. How many directed edges (or labels) must be drawn?", answer: "6 edges (or labels), since 3 states × 2 symbols = 6 transitions.", diff: 3, type: "Application" }
  ],
  'top_dfa_table': [
    { text: "In a DFA transition table, what do the rows and columns typically represent?", answer: "Rows represent the states (Q) and columns represent the input symbols (Σ).", diff: 1, type: "Recall" },
    { text: "How is the start state usually marked in a transition table?", answer: "With an arrow (->) to the left of the state name.", diff: 1, type: "Recall" },
    { text: "How are final states usually marked in a transition table?", answer: "With an asterisk (*) to the left of the state name.", diff: 1, type: "Recall" },
    { text: "What goes in the intersection of row q and column a?", answer: "The resulting next state, δ(q, a).", diff: 1, type: "Recall" },
    { text: "If a DFA table has a blank cell, what does this imply?", answer: "It is an invalid DFA table. DFAs must be fully defined (total function).", diff: 2, type: "Understanding" },
    { text: "Can a cell in a DFA table contain multiple states, e.g., {q1, q2}?", answer: "No, a DFA transition must result in exactly one state. That would be an NFA table.", diff: 2, type: "Understanding" },
    { text: "Table trace: ->A (on 0->B, on 1->A), *B (on 0->A, on 1->B). Trace '001'.", answer: "Start A. A(0)->B. B(0)->A. A(1)->A. Final state is A. A is not final, so rejected.", diff: 4, type: "Problem Solving" },
    { text: "Convert Table to Diagram: Row ->q0 (0:q1, 1:q0). What edges connect q0 and q1?", answer: "q0 has a self-loop on 1. q0 has a directed edge to q1 on 0.", diff: 3, type: "Application" },
    { text: "If row q3 contains q3 in every column and q3 is not marked with an asterisk, what is q3?", answer: "A dead state (or trap state).", diff: 3, type: "Application" },
    { text: "Exam: Construct a transition table for a DFA accepting strings with an odd number of 1s over Σ={0,1}.", answer: "States: E(Even, start), O(Odd, final). Table: ->E (0:E, 1:O); *O (0:O, 1:E).", diff: 5, type: "Exam" }
  ],
  'top_dfa_lang': [
    { text: "What is a Regular Language?", answer: "A language is regular if and only if there exists a DFA that accepts it.", diff: 1, type: "Recall" },
    { text: "If a DFA M has no final states (F = ∅), what is L(M)?", answer: "L(M) = ∅ (the empty language).", diff: 2, type: "Understanding" },
    { text: "If a DFA M has every state as a final state (F = Q), what is L(M)?", answer: "L(M) = Σ* (the language of all possible strings).", diff: 2, type: "Understanding" },
    { text: "Is the language { a^n b^n | n >= 0 } regular?", answer: "No. A DFA cannot 'count' the number of a's to ensure an equal number of b's (requires unbounded memory).", diff: 3, type: "Application" },
    { text: "Are regular languages closed under union?", answer: "Yes. If L1 and L2 are regular, L1 ∪ L2 is regular.", diff: 2, type: "Recall" },
    { text: "Construct a DFA for L = { w | w starts with 'a' } over {a,b}. What are the states?", answer: "q0 (start), qA (accept, sink on 'a','b'), qDead (reject sink).", diff: 4, type: "Problem Solving" },
    { text: "Is the complement of a regular language always regular?", answer: "Yes. You can swap the final and non-final states of the DFA to accept the complement language.", diff: 3, type: "Understanding" },
    { text: "Given DFA M for L. Describe how to construct a DFA for the complement of L.", answer: "Keep Q, Σ, q0, and δ the same. Change the set of final states to F' = Q - F.", diff: 4, type: "Problem Solving" },
    { text: "Are finite languages regular?", answer: "Yes, every finite language is regular (it can be represented by a DFA tree without cycles).", diff: 3, type: "Understanding" },
    { text: "Exam: Design the states for a DFA accepting strings of length modulo 3 equal to 0.", answer: "States: q0, q1, q2. q0 is start and final. Transitions: q0->q1, q1->q2, q2->q0 for any symbol.", diff: 5, type: "Exam" }
  ],
  'top_nfa': [
    { text: "Define an NFA mathematically. How does δ differ from a DFA?", answer: "In an NFA, δ: Q × Σ → P(Q). The transition function maps to a set of states (the power set of Q) rather than a single state.", diff: 2, type: "Recall" },
    { text: "When does an NFA accept an input string w?", answer: "An NFA accepts w if there exists AT LEAST ONE sequence of valid transitions that ends in a final state.", diff: 2, type: "Understanding" },
    { text: "If an NFA is in state q and reads symbol a, but δ(q, a) = ∅, what happens to that computation path?", answer: "That specific computational path 'dies' (rejects). Other parallel paths may continue.", diff: 3, type: "Understanding" },
    { text: "Does an NFA have more computational power (recognize more languages) than a DFA?", answer: "No, NFAs and DFAs both recognize exactly the Regular Languages.", diff: 2, type: "Recall" },
    { text: "If an NFA can be in 3 different states simultaneously, how many computational branches exist?", answer: "3 branches are being explored in parallel.", diff: 2, type: "Application" },
    { text: "In an NFA transition diagram, what does it mean if two arrows labeled '0' leave the same state?", answer: "It is nondeterministic. Upon reading '0', the machine branches and follows both paths simultaneously.", diff: 2, type: "Understanding" },
    { text: "Why are NFAs useful if DFAs can compute the same languages?", answer: "NFAs are often exponentially smaller and conceptually much easier to construct for operations like Union and Concatenation.", diff: 3, type: "Understanding" },
    { text: "Trace NFA: ->q0(0:q0, 0:q1), q1(1:q2*). Trace string '01'.", answer: "Path 1: q0(0)->q0(1)->die. Path 2: q0(0)->q1(1)->q2(accept). Since path 2 accepts, the NFA accepts '01'.", diff: 4, type: "Problem Solving" },
    { text: "What is the length of the string accepted by ->q0(0:q1), q1(1:q2), q2(0:q3*)?", answer: "Length 3 (the string '010').", diff: 3, type: "Application" },
    { text: "Exam: Construct an NFA for strings ending in '11' over {0,1}. How many states minimum?", answer: "3 states. ->q0(0,1:q0; 1:q1), q1(1:q2*).", diff: 5, type: "Exam" }
  ],
  'top_nfa_dfa': [
    { text: "What is the name of the algorithm used to convert an NFA into an equivalent DFA?", answer: "The Subset Construction (or Powerset Construction) algorithm.", diff: 1, type: "Recall" },
    { text: "If an NFA has N states, what is the maximum number of states in the equivalent DFA?", answer: "2^N states (the size of the power set of Q).", diff: 2, type: "Recall" },
    { text: "In Subset Construction, what represents a single state in the new DFA?", answer: "A set of states from the original NFA.", diff: 2, type: "Understanding" },
    { text: "What is the start state of the constructed DFA (assuming no ε-transitions)?", answer: "The subset containing only the NFA's start state: {q0}.", diff: 2, type: "Application" },
    { text: "How do you determine if a subset state in the new DFA is a final state?", answer: "It is a final state if the subset contains AT LEAST ONE state that was a final state in the NFA.", diff: 3, type: "Understanding" },
    { text: "Calculate transition: In NFA, δ(A,0)={A,B} and δ(B,0)={C}. What is δ_DFA({A,B}, 0)?", answer: "{A, B, C}", diff: 4, type: "Problem Solving" },
    { text: "In Subset Construction, how do we handle a transition to the empty set ∅ in the NFA?", answer: "It becomes a transition to the subset {∅} in the DFA. {∅} acts as a dead state where δ_DFA({∅}, a) = {∅}.", diff: 4, type: "Problem Solving" },
    { text: "Why do we use 'lazy evaluation' when computing DFA states from an NFA?", answer: "To only compute subsets that are actually reachable from the start state, avoiding the computation of all 2^N subsets.", diff: 3, type: "Understanding" },
    { text: "Is the DFA generated by the Subset Construction guaranteed to be minimal?", answer: "No, it often contains redundant or equivalent states and must be minimized afterward.", diff: 3, type: "Application" },
    { text: "Exam: NFA ->q0(0:q0, q1), q1(1:q2*). Compute the DFA state sequence for '01'.", answer: "Start {q0}. Read 0: {q0, q1}. Read 1: δ(q0,1) U δ(q1,1) = ∅ U {q2} = {q2}. Final state is {q2}, which contains q2, so accept.", diff: 5, type: "Exam" }
  ],
  'top_fa_equiv': [
    { text: "When are two finite automata considered mathematically equivalent?", answer: "When they accept exactly the same language. L(M1) = L(M2).", diff: 1, type: "Recall" },
    { text: "Can an NFA and a DFA be equivalent?", answer: "Yes, if they accept the same language.", diff: 1, type: "Understanding" },
    { text: "What is a distinguishing string for two states p and q?", answer: "A string w such that processing w from p leads to an accept state, but processing w from q leads to a reject state (or vice versa).", diff: 2, type: "Understanding" },
    { text: "How can you check if two DFAs M1 and M2 are equivalent using minimization?", answer: "Minimize both M1 and M2. If the resulting minimal DFAs are structurally identical (isomorphic), M1 and M2 are equivalent.", diff: 3, type: "Application" },
    { text: "Describe the cross-product (symmetric difference) construction method to test equivalence of M1 and M2.", answer: "Construct a DFA for L = (L(M1) ∩ ¬L(M2)) ∪ (¬L(M1) ∩ L(M2)). If L is empty (no final state is reachable from start), they are equivalent.", diff: 4, type: "Problem Solving" },
    { text: "In the cross-product machine M1 × M2, what is a state?", answer: "A pair of states (q1, q2) where q1 is from M1 and q2 is from M2.", diff: 2, type: "Recall" },
    { text: "In the symmetric difference machine M1 × M2, when is state (q1, q2) a final state?", answer: "When exactly ONE of q1 or q2 is a final state in its respective machine (XOR logic).", diff: 3, type: "Understanding" },
    { text: "Find a distinguishing string: M1 accepts 'starts with 0'. M2 accepts 'starts with 0 and length >= 2'.", answer: "The string '0' is accepted by M1 but rejected by M2, so it distinguishes them.", diff: 4, type: "Problem Solving" },
    { text: "Are two automata with different numbers of states definitely not equivalent?", answer: "No, one or both might not be minimized.", diff: 2, type: "Application" },
    { text: "Exam: Two DFAs M1 and M2 have 2 states each. To prove equivalence via product machine, what is the max number of reachable states to check?", answer: "2 × 2 = 4 states. A BFS from the start state takes at most 4 steps.", diff: 5, type: "Exam" }
  ],
  'top_eps_nfa': [
    { text: "What is an ε-transition (epsilon-transition)?", answer: "A transition that allows the automaton to change state without reading any input symbol.", diff: 1, type: "Recall" },
    { text: "Define ε-closure(q) mathematically.", answer: "The set of all states reachable from state q by following zero or more ε-transitions.", diff: 2, type: "Recall" },
    { text: "Is state 'q' always included in its own ε-closure(q)?", answer: "Yes, taking zero ε-transitions leaves you in state q, so q ∈ ε-closure(q).", diff: 2, type: "Understanding" },
    { text: "Calculate ε-closure: A -ε-> B -ε-> C. What is ε-closure(A)?", answer: "{A, B, C}. (ε-closures are transitive).", diff: 4, type: "Problem Solving" },
    { text: "Do ε-NFAs accept a larger class of languages than DFAs?", answer: "No, they accept exactly the Regular Languages, equivalent to DFAs and standard NFAs.", diff: 2, type: "Understanding" },
    { text: "How does the extended transition function δ*(q, a) work in an ε-NFA for a single symbol 'a'?", answer: "It calculates the ε-closure of q, follows transitions for 'a' from all those states, and then takes the ε-closure of all resulting states.", diff: 3, type: "Understanding" },
    { text: "If the start state A has an ε-transition to final state B, does the machine accept the empty string ε?", answer: "Yes, because the machine can reach final state B without consuming any input.", diff: 3, type: "Application" },
    { text: "Why are ε-transitions useful when constructing automata from Regular Expressions?", answer: "They make it trivial to join automata (e.g., connecting the end of one automaton to the start of another for concatenation).", diff: 3, type: "Application" },
    { text: "Can an ε-NFA have a loop (cycle) of ε-transitions?", answer: "Yes. The machine can traverse the loop without consuming input. The ε-closure simply includes all states in the loop.", diff: 3, type: "Understanding" },
    { text: "Exam: Given states 1,2,3. 1-ε->2, 2-a->3, 3-ε->1. Compute δ*(1, 'a').", answer: "ε-closure(1)={1,2}. Read 'a' from {1,2} gives {3}. ε-closure({3})={1,2,3}. Result is {1,2,3}.", diff: 5, type: "Exam" }
  ],
  'top_eps_elim': [
    { text: "What is the primary goal of ε-elimination?", answer: "To convert an ε-NFA into a standard NFA without ε-transitions that accepts the same language.", diff: 1, type: "Recall" },
    { text: "During ε-elimination, do we change the set of states Q?", answer: "No, the set of states Q remains exactly the same.", diff: 2, type: "Recall" },
    { text: "What is the formula to compute the new transition function δ'(q, a) without ε-transitions?", answer: "δ'(q, a) = ε-closure( δ( ε-closure(q), a ) ).", diff: 3, type: "Understanding" },
    { text: "How must the final states F' be updated during ε-elimination?", answer: "F' = F ∪ {q0} if ε-closure(q0) contains any state in F. Otherwise F' = F.", diff: 3, type: "Understanding" },
    { text: "Why might the start state become a final state during this process?", answer: "Because if the original machine could reach a final state on ε (meaning it accepts the empty string), the new machine must explicitly make the start state final to accept ε.", diff: 4, type: "Application" },
    { text: "Calculate new edge: A -ε-> B -0-> C -ε-> D. What new direct transition is added for symbol '0'?", answer: "A transition A -0-> D (as well as A-0->C, B-0->D, B-0->C depending on the full closures).", diff: 4, type: "Problem Solving" },
    { text: "What happens to the original ε-transitions in the final output automaton?", answer: "They are completely discarded.", diff: 2, type: "Recall" },
    { text: "Is the automaton resulting from ε-elimination always a DFA?", answer: "No, it is an NFA. It may still contain multiple transitions for the same symbol or lack transitions.", diff: 2, type: "Understanding" },
    { text: "Can ε-elimination result in unreachable states?", answer: "Yes, states that were only reachable via ε-transitions may become completely disconnected.", diff: 3, type: "Application" },
    { text: "Exam: Convert ->A(-ε->B), B(-1->C*). Compute δ'(A, 1) and F'.", answer: "ε-closure(A)={A,B}. δ({A,B}, 1) = {C}. ε-closure(C)={C}. So δ'(A,1)={C}. F'={C} (since ε-closure(A) doesn't contain C).", diff: 5, type: "Exam" }
  ],
  'top_min': [
    { text: "What is the purpose of DFA Minimization?", answer: "To find an equivalent DFA with the mathematically minimum possible number of states.", diff: 1, type: "Recall" },
    { text: "What is the mandatory first step before applying the Table-Filling (Myhill-Nerode) algorithm?", answer: "Remove all unreachable states from the DFA using BFS or DFS from the start state.", diff: 2, type: "Understanding" },
    { text: "In the Table-Filling algorithm, what is the base case for marking pairs of states as distinguishable?", answer: "Mark every pair (p, q) where one is a final state and the other is a non-final state.", diff: 2, type: "Recall" },
    { text: "Describe the iterative step in the Table-Filling algorithm.", answer: "For every unmarked pair (p, q) and every symbol 'a', check if the pair (δ(p, a), δ(q, a)) is already marked. If yes, mark (p, q).", diff: 3, type: "Application" },
    { text: "When does the Table-Filling algorithm terminate?", answer: "When an entire pass through the table results in no new pairs being marked.", diff: 2, type: "Understanding" },
    { text: "At the end of the algorithm, what do the UNMARKED pairs represent?", answer: "They represent equivalent states that can be merged into a single state.", diff: 3, type: "Application" },
    { text: "What theorem proves that the minimal DFA for a regular language is unique up to state renaming?", answer: "The Myhill-Nerode Theorem.", diff: 1, type: "Recall" },
    { text: "Can you directly minimize an NFA using the Table-Filling algorithm?", answer: "No. The algorithm strictly requires the deterministic properties of a DFA. NFAs must be converted to DFAs first.", diff: 2, type: "Understanding" },
    { text: "If A is equivalent to B, and B is equivalent to C, are A and C equivalent?", answer: "Yes, state equivalence is an equivalence relation (transitive, symmetric, reflexive).", diff: 3, type: "Application" },
    { text: "Exam: Q={1(start), 2(final), 3(final)}. 1-a->2, 1-b->3. 2-a,b->2. 3-a,b->3. Minimize it.", answer: "Initial marking: (1,2) and (1,3) marked. Iteration for (2,3): δ(2,a)=2, δ(3,a)=3, (2,3) unmarked. δ(2,b)=2, δ(3,b)=3, (2,3) unmarked. So 2 and 3 are equivalent. Minimized states: {1}, {2,3}.", diff: 5, type: "Exam" }
  ],
  'top_fa_output': [
    { text: "How does a Finite Automaton with Output (Transducer) differ from a regular DFA?", answer: "A transducer maps an input string to an output string, rather than just accepting or rejecting the input.", diff: 1, type: "Recall" },
    { text: "Do transducers have final (accept) states?", answer: "No, their purpose is not to accept/reject strings, so final states are omitted.", diff: 2, type: "Understanding" },
    { text: "What is the output alphabet typically denoted by?", answer: "Δ (Delta).", diff: 1, type: "Recall" },
    { text: "What are the two standard theoretical models for Finite Automata with Output?", answer: "Moore machines and Mealy machines.", diff: 1, type: "Recall" },
    { text: "Is the output of a transducer deterministic?", answer: "Yes, for any given input string from the start state, a transducer produces exactly one well-defined output string.", diff: 2, type: "Understanding" },
    { text: "What symbol denotes the output function?", answer: "λ (Lambda).", diff: 2, type: "Recall" },
    { text: "Can a transducer process an infinitely long input stream?", answer: "Yes, it acts as a stream processor, generating an output symbol for each transition.", diff: 3, type: "Application" },
    { text: "Can a Finite Automaton with Output recognize context-free grammar logic?", answer: "No, it is still bound by finite memory (regular languages).", diff: 3, type: "Understanding" },
    { text: "Give a real-world example of a transducer.", answer: "A lexical analyzer outputting tokens, or a digital logic circuit computing a running sum (modulo).", diff: 2, type: "Application" },
    { text: "Exam: Design a transducer conceptually that flips every bit in a binary string (1's complement).", answer: "1 state q0. On reading 0, output 1, stay in q0. On reading 1, output 0, stay in q0.", diff: 4, type: "Problem Solving" }
  ],
  'top_moore': [
    { text: "In a Moore Machine, what determines the output symbol?", answer: "The output depends ONLY on the current state.", diff: 1, type: "Recall" },
    { text: "What is the domain and codomain of the Moore output function λ?", answer: "λ: Q → Δ. It maps a state to an output symbol.", diff: 2, type: "Recall" },
    { text: "If a Moore machine processes an input string of length N, what is the length of the output string?", answer: "N + 1.", diff: 2, type: "Understanding" },
    { text: "Why is the Moore output string length N + 1?", answer: "Because it emits the output associated with the start state before any input is processed.", diff: 3, type: "Understanding" },
    { text: "How is a Moore machine's output drawn on a state transition diagram?", answer: "Inside the state node, usually formatted as 'StateName / OutputSymbol'.", diff: 1, type: "Recall" },
    { text: "In a Moore transition table, how is the output represented?", answer: "As an additional column specifying the output for each state row.", diff: 2, type: "Recall" },
    { text: "If state q2 has output '1', does it matter if we reached q2 via symbol 'a' or 'b'?", answer: "No, the output is strictly tied to the state q2, regardless of the transition used to get there.", diff: 3, type: "Application" },
    { text: "Can a Moore machine react instantly to an input symbol without a state transition?", answer: "No, the output only updates after the state transition resolves.", diff: 3, type: "Understanding" },
    { text: "Trace Moore: Start q0/0. q0-1->q1. q1/1. q1-1->q1. Trace '11'.", answer: "Start in q0 -> output '0'. Read 1, go to q1 -> output '1'. Read 1, go to q1 -> output '1'. Total output: '011'.", diff: 4, type: "Problem Solving" },
    { text: "Exam: Design a Moore machine that outputs 'Y' if the previous two inputs were '11', else 'N'. Minimum states?", answer: "3 states. Start/0-ones/'N', 1-one/'N', 2-ones/'Y'.", diff: 5, type: "Exam" }
  ],
  'top_mealy': [
    { text: "In a Mealy Machine, what determines the output symbol?", answer: "The output depends on BOTH the current state AND the current input symbol.", diff: 1, type: "Recall" },
    { text: "What is the domain and codomain of the Mealy output function λ?", answer: "λ: Q × Σ → Δ. It maps a (State, Input) pair to an output symbol.", diff: 2, type: "Recall" },
    { text: "If a Mealy machine processes an input string of length N, what is the length of the output string?", answer: "Exactly N.", diff: 2, type: "Understanding" },
    { text: "How is a Mealy machine's output drawn on a state transition diagram?", answer: "On the transition arrows, usually formatted as 'InputSymbol / OutputSymbol'.", diff: 1, type: "Recall" },
    { text: "Can two different transitions entering the same state have different outputs?", answer: "Yes, because the output is associated with the transition edge, not the destination state.", diff: 3, type: "Application" },
    { text: "In a Mealy transition table, how is the output represented?", answer: "Inside the columns for the input symbols, alongside the next state (e.g., NextState / Output).", diff: 2, type: "Recall" },
    { text: "Does a Mealy machine output a symbol before the first input is read?", answer: "No, an input symbol is required to traverse an edge and trigger an output.", diff: 2, type: "Understanding" },
    { text: "Which machine typically requires fewer states to model a given logic: Moore or Mealy?", answer: "Mealy machines often require fewer states.", diff: 3, type: "Understanding" },
    { text: "Trace Mealy: Start q0. q0 -1/A-> q1. q1 -1/B-> q1. Trace '11'.", answer: "Read 1 from q0 -> output A, go to q1. Read 1 from q1 -> output B, go to q1. Total output: 'AB'.", diff: 4, type: "Problem Solving" },
    { text: "Exam: Design a Mealy machine that outputs '1' if the current input is the same as the previous input, else '0'.", answer: "3 states. Start (no previous). State 'saw0'. State 'saw1'. From 'saw0' on 0: output 1->saw0, on 1: output 0->saw1. etc.", diff: 5, type: "Exam" }
  ],
  'top_moore_mealy': [
    { text: "Are Moore and Mealy machines equivalent in computational power?", answer: "Yes. For any Moore machine, there is an equivalent Mealy machine, and vice versa (ignoring the length N vs N+1 output offset).", diff: 1, type: "Recall" },
    { text: "Describe the conversion rule from Moore to Mealy.", answer: "Take the output associated with a state and copy it onto all incoming transition edges pointing to that state.", diff: 2, type: "Understanding" },
    { text: "When converting Moore to Mealy, does the number of states change?", answer: "No, the resulting Mealy machine has the exact same number of states.", diff: 2, type: "Understanding" },
    { text: "Describe the core conversion rule from Mealy to Moore.", answer: "Split a state if incoming transitions to that state produce different outputs. Create a separate state for each unique output.", diff: 3, type: "Understanding" },
    { text: "If state Q in a Mealy machine has incoming edges outputting 'A' and 'B', what happens in the Moore conversion?", answer: "Q is split into two states: Q_A (which outputs A) and Q_B (which outputs B).", diff: 4, type: "Problem Solving" },
    { text: "What happens to the outgoing transitions of a state that gets split?", answer: "Both of the new split states inherit exact copies of all original outgoing transitions.", diff: 3, type: "Application" },
    { text: "When converting Mealy to Moore, does the number of states change?", answer: "Yes, it typically increases due to state splitting.", diff: 2, type: "Understanding" },
    { text: "How do you handle the extra start-state output when converting Mealy to Moore?", answer: "You assign an arbitrary/default output to the start state, noting that the first symbol of the Moore machine's output is extraneous.", diff: 3, type: "Application" },
    { text: "If a Mealy machine has N states and output alphabet Δ, what is the maximum number of states in the equivalent Moore machine?", answer: "N × |Δ|.", diff: 4, type: "Problem Solving" },
    { text: "Exam: Convert Mealy ->q0(0/Y->q1). q1(1/N->q1, 0/Y->q0) to Moore. How many states?", answer: "q0 receives Y. q1 receives Y and N. q1 must split into q1_Y and q1_N. Total states = 3.", diff: 5, type: "Exam" }
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
    difficulty: ${q.diff},
    type: "${q.type}"
  },\n`;
    qId++;
  }
}

out += `];\n`;
fs.writeFileSync('src/lib/content/questions.ts', out);
