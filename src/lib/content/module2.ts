import { TopicContent } from './types';

export const module2Content: Record<string, TopicContent> = {
  'top_re_intro': {
    hasContent: true,
    overview: 'Regular Expressions (RE) provide a declarative, algebraic way to describe languages. While Finite Automata define the procedural steps to recognize a language, Regular Expressions specify what the language looks like conceptually.',
    formal: 'A Regular Expression over an alphabet Σ is defined recursively:\n1. ∅ is an RE denoting the empty language {}.\n2. ε is an RE denoting the language {ε}.\n3. For each a ∈ Σ, a is an RE denoting the language {a}.\n4. If R and S are REs, then the union (R + S), concatenation (RS), and Kleene star (R*) are also REs.',
    intuition: 'Think of a Regular Expression as a search pattern. Instead of building a machine to parse a string character by character, you write a mathematical formula that describes the entire set of valid strings simultaneously.',
    coreProperties: [
      'The languages described by Regular Expressions are exactly the Regular Languages.',
      'Regular Expressions use only three fundamental operators: Union (+), Concatenation, and Kleene Star (*).'
    ],
    workedExamples: [
      {
        problem: 'What is the difference between the regular expressions ∅ and ε?',
        solution: '∅ denotes the empty set (a language containing no strings). ε denotes a language containing exactly one string, which is the empty string of length zero.',
        explanation: 'In terms of operators, ∅ acts as an annihilator for concatenation (R∅ = ∅) and an identity for union (R + ∅ = R). ε acts as an identity for concatenation (Rε = R).'
      }
    ]
  },

  'top_re_identities': {
    hasContent: true,
    overview: 'Just as arithmetic has algebraic identities (like x+y = y+x), Regular Expressions have algebraic identities that allow us to simplify and manipulate expressions.',
    formal: 'Key Identities for Regular Expressions:\n1. Identity for Union: R + ∅ = R\n2. Identity for Concatenation: Rε = εR = R\n3. Annihilator for Concatenation: R∅ = ∅R = ∅\n4. Idempotent Law: R + R = R\n5. Commutative Law for Union: R + S = S + R\n6. Associative Laws: (R+S)+T = R+(S+T) and (RS)T = R(ST)\n7. Distributive Laws: R(S+T) = RS + RT and (S+T)R = SR + TR\n8. Star Laws: ∅* = ε, ε* = ε, R* = ε + RR*, R* = (R*)*, (R+S)* = (R*S*)*',
    intuition: 'These identities function exactly like factoring and expanding polynomials in high school algebra. For example, distributing concatenation over union is identical to distributing multiplication over addition: a(b+c) = ab + ac.',
    workedExamples: [
      {
        problem: 'Simplify the regular expression: a(ε + a*b) + ∅',
        solution: 'a + aa*b',
        explanation: 'By the Identity for Union, adding ∅ changes nothing, so we have a(ε + a*b). Distributing the concatenation gives aε + a(a*b). Since aε = a, we obtain a + aa*b.'
      }
    ]
  },

  'top_fa_and_re': {
    hasContent: true,
    overview: 'Kleene\'s Theorem states that Finite Automata and Regular Expressions define the exact same class of languages: Regular Languages.',
    formal: 'Theorem (Kleene): A language L is regular if and only if there exists a Regular Expression R such that L = L(R). Because L is regular iff it is accepted by a DFA, DFAs and REs are exactly equivalent in expressive power.',
    intuition: 'DFAs represent the implementation (the hardware/code). REs represent the specification (the user requirement). Kleene’s Theorem guarantees that every specification can be compiled into hardware, and every piece of hardware can be summarized by a specification.',
    coreProperties: [
      'Every RE can be converted into an equivalent NFA with ε-transitions (Thompson’s Construction).',
      'Every DFA can be converted into an equivalent RE (State Elimination or Arden’s Theorem).',
      'These conversion algorithms constitute the formal proof of Kleene’s Theorem.'
    ]
  },

  'top_dfa_to_re': {
    hasContent: true,
    overview: 'Converting a DFA to a Regular Expression requires extracting the path expressions from the start state to the final states. The two standard methods are Arden\'s Theorem and State Elimination.',
    formal: '1. Arden\'s Theorem: If R, Q, and P are regular expressions and P does not contain ε, the equation R = Q + RP has a unique solution R = QP*.\n2. State Elimination Algorithm: \n- Add a new start state with an ε-transition to the old start state, and a new final state with ε-transitions from all old final states.\n- Rip out intermediate states one by one.\n- When removing state q, for every incoming path from p and outgoing path to r, add a direct transition p → r labeled: (edge p→q)(loop q→q)*(edge q→r).',
    intuition: 'State elimination is like bypassing a town on a road trip. If you eliminate the town, you must build a new highway that directly connects the incoming roads to the outgoing roads, while accounting for any loops within the town.',
    workedExamples: [
      {
        problem: 'Using Arden\'s Theorem, solve the state equations: q0 = a q0 + b q1, and q1 = ε.',
        solution: 'Substitute q1 into the first equation: q0 = a q0 + b(ε) = a q0 + b. Rearranging to match R = Q + PR gives q0 = b + a q0. By Arden\'s Theorem (R = Q + PR => R = P*Q), the solution is q0 = a*b.',
        explanation: 'Note that right-linear equations (R = Q + RP) yield QP*, while left-linear equations (R = Q + PR) yield P*Q. Since q0 = b + a q0 is of the form R = Q + PR, the solution is P*Q.'
      }
    ]
  },

  'top_re_to_fa': {
    hasContent: true,
    overview: 'Converting a Regular Expression into an Automaton demonstrates that any pattern described by an RE can be executed by a machine. The standard algorithm is Thompson\'s Construction.',
    formal: 'Thompson\'s Construction builds an ε-NFA recursively from the RE structure:\n1. Base cases: ∅, ε, and symbol \'a\' each have a simple 2-state automaton.\n2. Union (R+S): Create a new start state branching via ε to the machines for R and S, converging via ε to a new final state.\n3. Concatenation (RS): Merge the final state of the R machine with the start state of the S machine.\n4. Star (R*): Add a new start and final state. Add ε-transitions for looping back (old final to old start), and for skipping the automaton entirely (new start to new final).',
    intuition: 'Thompson\'s algorithm works like snapping together modular blocks. It takes tiny automata for individual letters and combines them using standardized ε-transition structures for OR, AND THEN, and LOOP operations.',
    coreProperties: [
      'The resulting automaton is always an ε-NFA.',
      'It has exactly one start state and exactly one final state.',
      'The size of the resulting NFA is strictly proportional to the length of the Regular Expression.'
    ]
  },

  'top_re_apps': {
    hasContent: true,
    overview: 'Regular Expressions are not just theoretical constructs; they are heavily utilized in practical computer science applications, particularly in text processing and compiler design.',
    formal: 'Key Applications of Regular Expressions:\n1. Lexical Analysis: Compilers use REs to define tokens (identifiers, keywords, numbers) in programming languages.\n2. Text Search and Editing: Tools like grep, sed, and awk use RE-based engines to search and manipulate text.\n3. Input Validation: Verifying that strings such as email addresses or phone numbers conform to required formats.\n4. Network Security: Intrusion detection systems use RE signatures to identify malicious payload patterns.',
    intuition: 'Whenever a program needs to identify a pattern rather than an exact string (e.g., "Find all words that start with A and end with Z"), Regular Expressions provide the industry-standard syntax to execute that search efficiently.'
  },

  'top_rg_def': {
    hasContent: true,
    overview: 'A Regular Grammar is a formal grammar that is strictly constrained to generate exactly the Regular Languages. It represents the generative counterpart to the recognizable Finite Automata.',
    formal: 'A Regular Grammar is defined by a 4-tuple G = (V, T, P, S):\n1. V: A finite set of variables (non-terminals).\n2. T: A finite set of terminals.\n3. P: A set of production rules.\n4. S ∈ V: The start variable.\nIn a Right-Linear Regular Grammar, all productions are strictly of the form:\nA → aB or A → a or A → ε, where A, B ∈ V and a ∈ T.\nIn a Left-Linear Regular Grammar, productions are strictly:\nA → Ba or A → a or A → ε.',
    intuition: 'A grammar is like a set of replacement rules for generating strings. A grammar is "regular" if it builds the string uniformly in one direction (always appending to the right, or always prepending to the left), without ever inserting variables into the middle of the string.',
    coreProperties: [
      'Right-linear grammars and left-linear grammars both independently generate exactly the Regular Languages.',
      'A grammar that mixes right-linear rules (A → aB) and left-linear rules (A → Ba) is linear, but NOT necessarily regular.'
    ]
  },

  'top_rg_and_fa': {
    hasContent: true,
    overview: 'Regular Grammars and Finite Automata are completely equivalent. Every Right-Linear Grammar naturally corresponds to an NFA, and vice versa.',
    formal: 'Theorem: A language L is generated by a Regular Grammar if and only if L is accepted by a Finite Automaton.\nSince FAs accept exactly the Regular Languages, Regular Grammars generate exactly the Regular Languages.',
    intuition: 'Think of variables in a Right-Linear grammar as states in an FA. The production rule A → aB means "If you are in state A and generate symbol a, transition to state B". The rule A → a means "Generate symbol a and transition to an accept state".',
    workedExamples: [
      {
        problem: 'Why must a regular grammar be strictly right-linear or strictly left-linear, but never mixed?',
        solution: 'Mixing left and right linear rules allows the grammar to generate patterns like a^n b^n (e.g., S → aA, A → Sb | ε), which is a Context-Free Language, not a Regular Language.',
        explanation: 'By forcing generation to happen exclusively at one end of the string, the grammar simulates the strictly finite memory (states) of a Finite Automaton processing left-to-right.'
      }
    ]
  },

  'top_fa_to_rg': {
    hasContent: true,
    overview: 'Converting a Finite Automaton into a Regular Grammar involves creating a production rule for every transition in the automaton.',
    formal: 'Algorithm for FA to Right-Linear Grammar:\nGiven a DFA or NFA M = (Q, Σ, δ, q0, F), construct G = (V, T, P, S) where:\n1. V = Q (Variables are the states).\n2. T = Σ (Terminals are the alphabet symbols).\n3. S = q0 (Start variable is the start state).\n4. For every transition δ(A, a) = B, add the production A → aB to P.\n5. For every final state A ∈ F, add the production A → ε to P (or equivalently, if δ(A, a) = B and B ∈ F, add A → a).',
    intuition: 'The conversion is a direct syntactic translation. A transition arrow from node A to node B labeled "x" becomes the rule A → xB. Reaching a double circle (final state) simply means the grammar is allowed to stop generating.',
    workedExamples: [
      {
        problem: 'Convert the DFA with transitions δ(q0, 0) = q1 and δ(q1, 1) = q1 (where q1 is final) into a grammar.',
        solution: 'V = {q0, q1}, T = {0, 1}, S = q0.\nProductions:\nq0 → 0 q1\nq1 → 1 q1\nq1 → ε',
        explanation: 'The transition from q0 to q1 on 0 becomes q0 → 0q1. The loop on q1 becomes q1 → 1q1. Since q1 is a final state, we add the termination rule q1 → ε.'
      }
    ]
  },

  'top_rg_to_fa': {
    hasContent: true,
    overview: 'Converting a Right-Linear Grammar into a Finite Automaton is the exact reverse of the FA to Grammar construction.',
    formal: 'Algorithm for Right-Linear Grammar to NFA:\nGiven G = (V, T, P, S), construct NFA M = (Q, Σ, δ, q0, F) where:\n1. Q = V ∪ {q_f} (States are the variables, plus one new special final state q_f).\n2. Σ = T.\n3. q0 = S.\n4. F = {q_f}.\n5. For every production A → aB, add a transition δ(A, a) = B.\n6. For every production A → a, add a transition δ(A, a) = q_f.\n7. For every production A → ε, add A to the set of final states F.',
    intuition: 'Every variable becomes a state. A production A → aB draws an arrow from A to B labeled "a". If a production just yields a terminal (A → a) without a following variable, it means the string generation halts there, so we transition to our designated final state.',
    workedExamples: [
      {
        problem: 'Construct an FA for the grammar: S → 0A, A → 1A | 1',
        solution: 'States: S, A, and a new final state F.\nTransitions:\nFrom S, on 0, go to A.\nFrom A, on 1, go to A.\nFrom A, on 1, go to F.',
        explanation: 'The rule A → 1 is a terminating rule, so it routes the machine to the special accept state F.'
      }
    ]
  },

  'top_pump_rl': {
    hasContent: true,
    overview: 'The Pumping Lemma for Regular Languages is a fundamental theorem used strictly to prove that a language is NOT regular.',
    formal: 'Formal Statement of the Pumping Lemma:\nIf L is a regular language, then there exists a pumping length p ≥ 1 such that every string s ∈ L of length |s| ≥ p can be written as s = xyz, satisfying the following three conditions:\n1. |y| > 0\n2. |xy| ≤ p\n3. For every integer i ≥ 0, xy^iz ∈ L.',
    intuition: 'Since a DFA has a finite number of states, any sufficiently long string must visit some state at least twice, creating a loop. The substring y represents the characters consumed during that loop. Since the machine is deterministic, traversing that loop zero times or multiple times will still end in the exact same accept state.',
    coreProperties: [
      'The lemma is a necessary condition for regularity, not a sufficient one. You cannot use it to prove a language IS regular.',
      'The proof structure is always a proof by contradiction.'
    ]
  },

  'top_pump_rl_apps': {
    hasContent: true,
    overview: 'Applying the Pumping Lemma involves a rigorous adversary game to demonstrate a contradiction.',
    intuition: 'Think of a pumping lemma proof as a legal trial where you act as the prosecutor trying to corner the adversary. You lay a trap by choosing a highly specific string (s). The adversary tries to escape by picking any loop (y) they can find. You then pump that loop to break the string, proving they lied when they claimed the language was regular.',
    formal: 'Structure of a Non-Regularity Proof:\n1. Assume for the sake of contradiction that L is regular.\n2. Let p be the pumping length guaranteed by the lemma.\n3. Select a specific string s ∈ L such that |s| ≥ p. The choice of s is strategic.\n4. State that according to the lemma, s can be decomposed into xyz where |y| > 0 and |xy| ≤ p.\n5. The prover does NOT choose the decomposition. The proof must hold for ALL valid decompositions.\n6. Choose a specific integer i ≥ 0.\n7. Show that for this i, the pumped string xy^iz is NOT in L, contradicting the lemma.\n8. Conclude that L is not regular.',
    workedExamples: [
      {
        problem: 'Prove L = {a^n b^n | n ≥ 0} is not regular.',
        solution: 'Assume L is regular with pumping length p. Choose s = a^p b^p. Since |s| = 2p ≥ p, the lemma applies. Any valid decomposition s = xyz must satisfy |xy| ≤ p. Thus, the substring y must consist entirely of "a"s. Let |y| = k > 0. Pump with i=2. The new string is xy^2z, which contains p+k "a"s and p "b"s. Since p+k ≠ p, xy^2z ∉ L. Contradiction. Therefore, L is not regular.',
        explanation: 'By strategically choosing the string s to begin with p identical characters, the condition |xy| ≤ p forces the loop y to be structurally homogeneous, making the contradiction easy to derive.'
      }
    ]
  },

  'top_closure_rl': {
    hasContent: true,
    overview: 'Closure properties establish that applying specific mathematical operations to regular languages will always produce a language that is also regular.',
    formal: 'Regular languages are closed under the following operations:\n1. Union (L1 ∪ L2)\n2. Intersection (L1 ∩ L2)\n3. Complement (Σ* - L)\n4. Concatenation (L1L2)\n5. Kleene Star (L*)\n6. Reversal (L^R)\n7. Set Difference (L1 - L2)\n8. Homomorphism and Inverse Homomorphism.',
    intuition: 'If you take one or more valid Regular Languages and combine them using these specific operations, the result will always remain a Regular Language. You can never accidentally generate a non-regular language (like a^n b^n) using these exact closed operations.',
    workedExamples: [
      {
        problem: 'How is closure under Complement formally proven?',
        solution: 'Let L be a regular language. By definition, there exists a DFA M that accepts L. Construct a new DFA M\' by taking M and swapping its accept and non-accept states. Because M is deterministic and complete, M\' will accept a string if and only if M rejects it. Thus, L(M\') is exactly the complement of L. Since a DFA exists for the complement, the complement is regular.',
        explanation: 'This proof relies heavily on the fact that DFAs are deterministic and complete (they process every character to a definitive accept/reject state).'
      }
    ]
  }
};
