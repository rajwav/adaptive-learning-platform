import { TopicContent } from '@/lib/content/types';

export const batch2Deadlocks: Record<string, TopicContent> = {
  os_m2_18: {
    hasContent: true,
    overview: 'A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
    formal: 'A set of blocked processes each holding a resource and waiting to acquire a resource held by another process in the set.',
    intuition: 'Imagine a traffic jam at a 4-way intersection where every car has advanced into the intersection. No car can move until another moves, but no one can move.',
    textbookReference: "Galvin Section 7.1",
    learningObjectives: [
      'Define what a deadlock is in an operating system context.',
      'Explain the system model of request, use, and release sequence.',
      'Bridge the concepts of process synchronization to deadlocks.'
    ],
    coreProperties: ['System Model: Request, Use, Release', 'Blocked State'],
    keyPoints: [
      'Processes must request a resource, use it, and then release it.',
      'Under normal operation, a process may request as many resources as it needs, up to the total available in the system.',
      'Deadlocks most commonly arise in multi-programming environments when multiple processes compete for a finite number of resources.'
    ],
    prerequisites: ['os_m2_1'],
    commonMistakes: [
      {
        mistake: 'Confusing deadlock with starvation.',
        fix: 'Deadlock means processes are permanently blocked waiting for each other. Starvation means a process is waiting indefinitely because other processes keep getting the resource, but the system is not entirely blocked.'
      }
    ]
  },
  os_m2_19: {
    hasContent: true,
    overview: 'Concrete scenarios illustrating how deadlocks can occur in real systems, such as two processes trying to acquire the same two resources in reverse order.',
    formal: 'Demonstrations of deadlock scenarios in a multiprogramming system, illustrating the interaction between processes and resources that leads to a circular wait state.',
    intuition: 'Two friends need both a pen and paper to write. One grabs the pen, the other grabs the paper. Neither will let go until they get the other item. Both are stuck.',
    textbookReference: "Galvin Section 7.1",
    learningObjectives: [
      'Identify real-world examples of deadlocks.',
      'Trace the sequence of events that leads to a deadlock.'
    ],
    coreProperties: ['Reverse Order Acquisition', 'Resource Contention'],
    keyPoints: [
      'If Process 1 holds Resource A and requests Resource B, while Process 2 holds Resource B and requests Resource A, deadlock occurs.',
      'Examples can involve printers, tape drives, or memory segments.'
    ],
    prerequisites: [],
    commonMistakes: [
      {
        mistake: 'Thinking deadlocks only happen with identical resources.',
        fix: 'Deadlocks frequently involve different types of resources, like a printer and a disk drive being requested by two different processes.'
      }
    ]
  },
  os_m2_20: {
    hasContent: true,
    overview: 'Resources are entities required by processes to execute, which can be preemptable or non-preemptable.',
    formal: 'System components (hardware or software) that processes must request and acquire to proceed with execution, categorized by preemptability and reusability.',
    intuition: 'Resources are like tools in a workshop. Some tools can be taken away from you (like a hammer), and others cannot be taken away without ruining your work (like a customized mold).',
    textbookReference: "Galvin Section 7.1",
    learningObjectives: [
      'Distinguish between preemptable and non-preemptable resources.',
      'Understand the lifecycle of resource usage by a process.'
    ],
    coreProperties: ['Preemptable', 'Non-preemptable', 'Reusable', 'Consumable'],
    keyPoints: [
      'CPU time and memory are often preemptable resources.',
      'Printers and tape drives are typically non-preemptable resources.',
      'Deadlocks usually involve non-preemptable resources.'
    ],
    prerequisites: [],
    commonMistakes: [
      {
        mistake: 'Assuming all resources can be safely taken away from a process.',
        fix: 'Non-preemptable resources, if taken away, will cause the process to fail or produce incorrect results.'
      }
    ]
  },
  os_m2_21: {
    hasContent: true,
    overview: 'Resources are partitioned into types, and each type may have multiple identical instances available for allocation.',
    formal: 'The classification of resources into classes R1, R2, ..., Rm, where each class Ri has Wi identical instances.',
    intuition: 'A resource type is like "printers", and instances are the specific 3 identical printers in the office.',
    textbookReference: "Galvin Section 7.1",
    learningObjectives: [
      'Define resource types and instances.',
      'Explain how instances affect resource allocation and deadlock possibilities.'
    ],
    coreProperties: ['Resource Classes', 'Multiple Instances', 'Interchangeability'],
    keyPoints: [
      'A process requests a resource of a specific type, and any instance of that type will satisfy the request.',
      'If a system has multiple instances of a resource, a cycle in a wait-for graph does not strictly guarantee a deadlock.'
    ],
    prerequisites: [],
    commonMistakes: [
      {
        mistake: 'Treating distinct resource types as interchangeable instances.',
        fix: 'A laser printer and an inkjet printer might be different resource types if a process specifically needs one or the other, rather than just instances of a generic "printer" type.'
      }
    ]
  },
  os_m2_22: {
    hasContent: true,
    overview: 'Deadlocks can be characterized by four necessary conditions that must hold simultaneously.',
    formal: 'The formal definition of the state of a system in which deadlocks can occur, defined by a specific set of simultaneous conditions.',
    intuition: 'Like a perfect storm, a deadlock only happens if all the ingredients (conditions) are present at the exact same time.',
    textbookReference: "Galvin Section 7.2.1",
    learningObjectives: [
      'Identify the four necessary conditions for deadlock.',
      'Understand that all four conditions must be present simultaneously.'
    ],
    coreProperties: ['Simultaneous Occurrence', 'Necessary Conditions'],
    keyPoints: [
      'Deadlock can arise if four conditions hold simultaneously in a system.',
      'These conditions are necessary, but not always sufficient for a deadlock to occur.'
    ],
    prerequisites: ['os_m2_18'],
    commonMistakes: [
      {
        mistake: 'Believing that any one condition is enough to cause a deadlock.',
        fix: 'All four conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) must hold simultaneously for a deadlock to exist.'
      }
    ]
  },
  os_m2_23: {
    hasContent: true,
    overview: 'The four necessary conditions for a deadlock are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
    formal: '1) Mutual exclusion: at least one resource is non-sharable. 2) Hold and wait: a process holds one resource while waiting for another. 3) No preemption: resources cannot be forcibly removed. 4) Circular wait: a closed chain of processes exists where each waits for a resource held by the next.',
    intuition: '1) Only one person can use the pen. 2) I have the pen but I am waiting for the paper. 3) You cannot snatch the pen from my hand. 4) I wait for you, you wait for Bob, Bob waits for me.',
    textbookReference: "Galvin Section 7.2.1",
    learningObjectives: [
      'Define each of the four necessary conditions clearly.',
      'Explain why the absence of any single condition prevents deadlock.'
    ],
    coreProperties: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait'],
    keyPoints: [
      'ALL FOUR must hold simultaneously.',
      'Mutual Exclusion implies at least one resource must be held in a non-sharable mode.',
      'Circular wait implies the hold-and-wait condition, but they are defined separately.'
    ],
    prerequisites: ['os_m2_22'],
    commonMistakes: [
      {
        mistake: 'Confusing Hold and Wait with Circular Wait.',
        fix: 'Hold and Wait just means a process is holding a resource and waiting for another. Circular Wait is a specific global topology of hold-and-wait relationships forming a cycle.'
      }
    ]
  },
  os_m2_24: {
    hasContent: true,
    overview: 'A directed graph used to visually represent the state of resource allocation and requests in a system.',
    formal: 'A directed graph consisting of a set of vertices V (processes P and resources R) and a set of edges E (request edges P -> R and assignment edges R -> P).',
    intuition: 'A map showing who has what (arrows from resources to people) and who wants what (arrows from people to resources).',
    textbookReference: "Galvin Section 7.2.2",
    learningObjectives: [
      'Construct a resource-allocation graph given a system state.',
      'Use the graph to detect deadlocks.'
    ],
    coreProperties: ['Vertices (Processes/Resources)', 'Edges (Request/Assignment)', 'Cycle Detection'],
    keyPoints: [
      'Vertices: processes (circles) and resources (rectangles).',
      'Edges: request edge (Pi → Rj), assignment edge (Rj → Pi).',
      'Cycle with single instances = deadlock.',
      'Cycle with multiple instances = may or may not be deadlock.'
    ],
    prerequisites: ['os_m2_23'],
    commonMistakes: [
      {
        mistake: 'Assuming a cycle always means a deadlock.',
        fix: 'A cycle only guarantees a deadlock if every resource type in the cycle has exactly one instance. With multiple instances, a cycle is a necessary but not sufficient condition.'
      }
    ],
    labIntegrationPrompt: 'Implement a cycle detection algorithm for a Resource Allocation Graph. Check if it handles multiple instances correctly.'
  },
  os_m2_25: {
    hasContent: true,
    overview: 'The primary strategies for dealing with deadlocks: Prevention, Avoidance, Detection & Recovery, and Ignorance.',
    formal: 'Categorization of system-level strategies to handle deadlocks: ensuring the system never enters a deadlock state, allowing deadlocks and then recovering, or ignoring the problem altogether.',
    intuition: 'You can prevent diseases by getting vaccinated (Prevention/Avoidance), cure them when you get sick (Detection/Recovery), or just hope you don\'t get sick (Ostrich Algorithm).',
    textbookReference: "Galvin Section 7.3",
    learningObjectives: [
      'List the three main approaches to handling deadlocks.',
      'Explain the "Ostrich approach" and why it is commonly used.'
    ],
    coreProperties: ['Prevention', 'Avoidance', 'Detection', 'Recovery', 'Ostrich Algorithm'],
    keyPoints: [
      'Prevention ensures at least one of the four necessary conditions cannot hold.',
      'Avoidance requires OS to have additional information about how resources will be requested.',
      'The Ostrich approach (ignoring the problem) is used by most OSes, including UNIX and Windows, because deadlocks are rare and handling them is expensive.'
    ],
    prerequisites: ['os_m2_24'],
    commonMistakes: [
      {
        mistake: 'Thinking modern operating systems (like Windows/Linux) use complex deadlock avoidance algorithms.',
        fix: 'Most modern general-purpose OSes use the Ostrich approach and rely on users to manually kill frozen applications.'
      }
    ]
  },
  os_m2_26: {
    hasContent: true,
    overview: 'Methods to ensure that at least one of the four necessary conditions for deadlock cannot occur.',
    formal: 'A set of methods for restraining how requests can be made, ensuring that at least one of the necessary conditions for deadlock (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) is structurally impossible.',
    intuition: 'Changing the rules of the game so that a stalemate is mathematically impossible to reach.',
    textbookReference: "Galvin Section 7.4",
    learningObjectives: [
      'Explain how to negate each of the four necessary conditions.',
      'Discuss the practical limitations of deadlock prevention techniques.'
    ],
    coreProperties: ['Structural Restraints', 'Resource Ordering', 'Preemption Enforcement'],
    keyPoints: [
      'Mutual Exclusion: make resources shareable (impractical for most, e.g., printers).',
      'Hold and Wait: request all resources at once OR release all before requesting new ones.',
      'No Preemption: forcibly take resources (can cause data loss).',
      'Circular Wait: impose total ordering on resource types and require requests to be made in increasing order.'
    ],
    prerequisites: ['os_m2_25'],
    commonMistakes: [
      {
        mistake: 'Thinking deadlock prevention is highly efficient.',
        fix: 'Prevention often leads to low device utilization and reduced system throughput due to strict rules (like requesting all resources at startup).'
      }
    ]
  },
  os_m2_27: {
    hasContent: true,
    overview: 'A dynamic approach where the OS uses prior knowledge of processes\' maximum resource needs to only grant safe requests.',
    formal: 'A technique that requires the operating system be given in advance additional information concerning which resources a process will request and use during its lifetime, allowing the system to dynamically avoid unsafe states.',
    intuition: 'Like a bank manager who knows exactly how much credit every customer might ask for, and only approves loans if they know they can always satisfy everyone\'s maximum needs eventually.',
    textbookReference: "Galvin Section 7.5",
    learningObjectives: [
      'Understand the concept of a safe state.',
      'Explain the requirement for a priori knowledge in deadlock avoidance.'
    ],
    coreProperties: ['A Priori Knowledge', 'Safe State', 'Dynamic Allocation'],
    keyPoints: [
      'Requires a priori knowledge of maximum resource needs.',
      'If a system is in a safe state, there are no deadlocks. An unsafe state implies the possibility of deadlock.',
      'Avoidance ensures that a system will never enter an unsafe state.'
    ],
    prerequisites: ['os_m2_25'],
    commonMistakes: [
      {
        mistake: 'Equating an unsafe state with a deadlock.',
        fix: 'An unsafe state is not a deadlock; it just means the system cannot guarantee that a deadlock will not occur. A deadlock is a subset of unsafe states.'
      }
    ],
    labIntegrationPrompt: 'Implement Banker\'s Algorithm to determine if a given system state is safe, given maximum needs and current allocation.'
  },
  os_m2_31: {
    hasContent: true,
    overview: 'An approach where the system allows deadlocks to occur, but periodically runs an algorithm to detect them.',
    formal: 'The process of examining the state of the system to determine whether a deadlock has occurred, typically involving an algorithm that searches for cycles in resource allocation or wait-for graphs.',
    intuition: 'Instead of preventing car crashes, you just let traffic flow normally and use a helicopter to occasionally check if a massive traffic jam has occurred.',
    textbookReference: "Galvin Section 7.6",
    learningObjectives: [
      'Explain when and why a system would use deadlock detection.',
      'Understand the detection algorithm for systems with multiple instances of each resource type.'
    ],
    coreProperties: ['Periodic Checking', 'Cycle Detection', 'Overhead'],
    keyPoints: [
      'Detection algorithm is similar to the safety algorithm but for detecting actual deadlock.',
      'Requires decisions on when to invoke: every request? periodically? when CPU utilization drops?',
      'Invoking the algorithm too often causes significant performance overhead.'
    ],
    prerequisites: ['os_m2_25'],
    commonMistakes: [
      {
        mistake: 'Running deadlock detection on every resource request in a large system.',
        fix: 'Detection algorithms are computationally expensive (O(m * n^2)). Running them on every request would bring the system to a halt.'
      }
    ]
  },
  os_m2_32: {
    hasContent: true,
    overview: 'A simplified version of the Resource-Allocation Graph used for deadlock detection in systems where all resources have only a single instance.',
    formal: 'A directed graph obtained by collapsing the resource nodes from a resource-allocation graph, where an edge Pi -> Pj exists if process Pi is waiting for a resource held by process Pj.',
    intuition: 'Cutting out the middleman (resources) to directly show which person is waiting for which other person.',
    textbookReference: "Galvin Section 7.6",
    learningObjectives: [
      'Derive a wait-for graph from a resource-allocation graph.',
      'Use a wait-for graph to detect deadlocks in single-instance resource systems.'
    ],
    coreProperties: ['Process Vertices Only', 'Wait-for Edges', 'Single Instance Resources'],
    keyPoints: [
      'Derived from RAG by removing resource nodes.',
      'Pi → Pj means Pi is waiting for a resource held by Pj.',
      'A cycle in a wait-for graph implies a deadlock (single-instance only).'
    ],
    prerequisites: ['os_m2_31'],
    commonMistakes: [
      {
        mistake: 'Using a wait-for graph for systems with multiple instances of a resource type.',
        fix: 'Wait-for graphs are only valid for deadlock detection if every resource type has exactly one instance.'
      }
    ]
  },
  os_m2_33: {
    hasContent: true,
    overview: 'The methods used to break a deadlock once it has been detected, usually involving terminating processes or preempting resources.',
    formal: 'Strategies implemented by the operating system to clear a deadlocked state, primarily through process termination or resource preemption, returning the system to a normal operational state.',
    intuition: 'If cars are completely gridlocked, a tow truck must come and forcibly remove one or more cars to clear the intersection.',
    textbookReference: "Galvin Section 7.7",
    learningObjectives: [
      'Evaluate the different strategies for recovering from a deadlock.',
      'Understand the issues of selecting a victim, rollback, and starvation.'
    ],
    coreProperties: ['Process Termination', 'Resource Preemption', 'Rollback', 'Starvation Avoidance'],
    keyPoints: [
      'Process termination: abort all deadlocked processes OR abort one at a time until the deadlock cycle is eliminated.',
      'Resource preemption involves selecting a victim (minimizing cost), rollback (returning process to a safe state), and starvation (ensuring the same process isn\'t always picked).'
    ],
    prerequisites: ['os_m2_31'],
    commonMistakes: [
      {
        mistake: 'Ignoring the starvation problem during resource preemption.',
        fix: 'If the system always picks the same process as a victim based on cost, that process may never complete. A common fix is to include the number of rollbacks in the cost factor.'
      }
    ]
  }
};
