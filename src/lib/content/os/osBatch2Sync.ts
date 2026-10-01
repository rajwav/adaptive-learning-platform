import { TopicContent } from '@/lib/content/types';

export const batch2Sync: Record<string, TopicContent> = {
  os_m2_1: {
    hasContent: true,
    overview: "An introduction to the need for synchronizing concurrent processes to ensure data consistency.",
    formal: "Process synchronization is the coordination of concurrent processes to ensure that their execution sequences do not lead to data inconsistency when they share logical or physical resources.",
    intuition: "Think of two people trying to update a shared bank account balance at the same time. If they don't coordinate, one person's update might overwrite the other's.",
    textbookReference: "Galvin Section 6.1",
    learningObjectives: [
      "Understand why concurrent access to shared data may result in data inconsistency.",
      "Explain the concept of race conditions."
    ],
    coreProperties: ["Concurrency", "Shared Data", "Race Conditions"],
    keyPoints: [
      "Concurrent execution can lead to interleaved instruction execution.",
      "A race condition occurs when several processes access and manipulate the same data concurrently and the outcome depends on the particular order."
    ],
    prerequisites: ["os_m1_18", "os_m1_19"],
    commonMistakes: [
      {
        mistake: "Assuming instruction interleaving always preserves logic.",
        fix: "Recognize that high-level language statements compile into multiple machine instructions that can be context-switched in the middle."
      }
    ],
    detailedExplanation: "Background context on process execution interleaving and how race conditions form when modifying shared variables like counters."
  },
  os_m2_2: {
    hasContent: true,
    overview: "A core property ensuring that only one process can access a shared resource at any given time.",
    formal: "Mutual exclusion is the requirement that if process Pi is executing in its critical section, then no other processes can be executing in their critical sections.",
    intuition: "Like a fitting room in a store—only one person can use it at a time. The door locks from the inside to ensure privacy.",
    textbookReference: "Galvin Section 6.2",
    learningObjectives: [
      "Define mutual exclusion in the context of concurrent processes.",
      "Identify scenarios where mutual exclusion is necessary."
    ],
    coreProperties: ["Safety", "Exclusivity"],
    keyPoints: [
      "Mutual exclusion prevents race conditions.",
      "It is the first and most critical requirement for any synchronization solution."
    ],
    prerequisites: ["os_m2_1"],
    commonMistakes: [
      {
        mistake: "Confusing mutual exclusion with progress.",
        fix: "Mutual exclusion only guarantees safety (no overlap). Progress ensures a decision is eventually made on who enters."
      }
    ]
  },
  os_m2_3: {
    hasContent: true,
    overview: "The formal problem of designing a protocol that processes can use to cooperate without race conditions.",
    formal: "The critical section problem is to design a protocol to ensure that when one process is executing in its critical section, no other process is allowed to execute in its critical section.",
    intuition: "A critical section is like an intersection with a 4-way stop. The protocol is the set of rules deciding who goes next safely.",
    textbookReference: "Galvin Section 6.2",
    learningObjectives: [
      "Identify the distinct sections of a process's code (entry, critical, exit, remainder).",
      "Understand the structural framework for solving synchronization problems."
    ],
    coreProperties: ["Entry Section", "Critical Section", "Exit Section", "Remainder Section"],
    keyPoints: [
      "Each process must request permission to enter its critical section in the entry section.",
      "The critical section may be followed by an exit section, and then a remainder section."
    ],
    prerequisites: ["os_m2_2"],
    commonMistakes: [
      {
        mistake: "Assuming the entire program is a critical section.",
        fix: "Only the specific code segment manipulating shared data is the critical section."
      }
    ],
    detailedExplanation: "Processes follow this structure:\n\n```c\ndo {\n  // entry section\n  // critical section\n  // exit section\n  // remainder section\n} while (true);\n```"
  },
  os_m2_4: {
    hasContent: true,
    overview: "The three essential criteria that any valid solution to the critical-section problem must satisfy.",
    formal: "A valid solution must satisfy: 1. Mutual Exclusion (no simultaneous execution), 2. Progress (no deadlock in selection), 3. Bounded Waiting (no starvation).",
    intuition: "Mutual exclusion: one at a time. Progress: someone gets to go if someone wants to. Bounded waiting: nobody waits forever in line.",
    textbookReference: "Galvin Section 6.2",
    learningObjectives: [
      "Define progress and bounded waiting.",
      "Evaluate synchronization algorithms against the three criteria."
    ],
    coreProperties: ["Mutual Exclusion", "Progress", "Bounded Waiting"],
    keyPoints: [
      "Progress requires that only processes wanting to enter can participate in the decision.",
      "Bounded waiting implies a limit exists on the number of times others can enter before a waiting process."
    ],
    prerequisites: ["os_m2_3"],
    commonMistakes: [
      {
        mistake: "Equating bounded waiting with an exact timing guarantee.",
        fix: "Bounded waiting only guarantees a bound on the number of turns, not a time limit in seconds."
      }
    ]
  },
  os_m2_5: {
    hasContent: true,
    overview: "Algorithmic approaches to the critical section problem that rely purely on shared variables and software logic.",
    formal: "Software solutions use algorithmic logic built upon basic load and store instructions of shared memory to achieve synchronization without special hardware support.",
    intuition: "Using flags and signs to communicate intentions, much like leaving a 'Do Not Disturb' sign on a door.",
    textbookReference: "Galvin Section 6.3",
    learningObjectives: [
      "Understand the historical context of software-only synchronization.",
      "Recognize the limitations of software solutions on modern architectures."
    ],
    coreProperties: ["Algorithmic", "Memory Sharing"],
    keyPoints: [
      "Classic software solutions assume basic machine instructions are atomic.",
      "They can be complex and error-prone to scale beyond two processes."
    ],
    prerequisites: ["os_m2_4"],
    commonMistakes: [
      {
        mistake: "Assuming software solutions are sufficient for modern multithreaded apps.",
        fix: "Modern architectures reorder memory accesses, rendering pure software solutions like Peterson's broken without memory barriers."
      }
    ]
  },
  os_m2_6: {
    hasContent: true,
    overview: "A classic software-based solution to the critical-section problem for two processes.",
    formal: "Peterson's solution is a concurrent programming algorithm for mutual exclusion that allows two processes to share a single-use resource without conflict, using only shared memory for communication.",
    intuition: "Two polite people at a door: each raises their hand (flag) and says 'after you' (turn). One eventually goes.",
    textbookReference: "Galvin Section 6.3",
    learningObjectives: [
      "Trace the execution of Peterson's solution.",
      "Prove how it satisfies mutual exclusion, progress, and bounded waiting."
    ],
    coreProperties: ["flag[] array", "turn variable", "Two-process limit"],
    keyPoints: [
      "Uses a boolean flag array to indicate interest.",
      "Uses a turn variable to resolve simultaneous interest.",
      "Fails on modern out-of-order CPUs without memory barriers."
    ],
    prerequisites: ["os_m2_5"],
    commonMistakes: [
      {
        mistake: "Thinking turn alone is sufficient.",
        fix: "Turn ensures progress when both want in, but flag is needed so a process can enter if the other isn't interested."
      }
    ],
    detailedExplanation: "Pseudocode for Process i (where j is the other process):\n\n```c\nflag[i] = true;\nturn = j;\nwhile (flag[j] && turn == j) {\n  // busy wait\n}\n// Critical Section\nflag[i] = false;\n// Remainder Section\n```"
  },
  os_m2_7: {
    hasContent: true,
    overview: "Synchronization solutions utilizing special hardware instructions provided by the CPU architecture.",
    formal: "Hardware synchronization solutions rely on special atomic hardware instructions (like memory barriers or hardware atomic read-modify-write instructions) to implement mutual exclusion effectively.",
    intuition: "Using a physical, unbreakable padlock provided by the building manager rather than trusting a sign on the door.",
    textbookReference: "Galvin Section 6.4",
    learningObjectives: [
      "Understand the concept of atomicity at the hardware level.",
      "Explain how hardware instructions solve the issues of software solutions."
    ],
    coreProperties: ["Atomicity", "Hardware Support"],
    keyPoints: [
      "An atomic instruction executes as a single, uninterruptible unit.",
      "Hardware instructions simplify synchronization algorithms considerably."
    ],
    prerequisites: ["os_m2_4"],
    commonMistakes: [
      {
        mistake: "Confusing atomicity with speed.",
        fix: "Atomic instructions might be slow due to bus locking, but they guarantee uninterruptibility."
      }
    ]
  },
  os_m2_8: {
    hasContent: true,
    overview: "A hardware instruction that reads a value and sets it to true atomically.",
    formal: "The test_and_set instruction is an atomic operation that reads the old value of a boolean variable and sets it to true.",
    intuition: "Like checking if a bathroom is locked and locking it in one swift, unbreakable motion.",
    textbookReference: "Galvin Section 6.4",
    learningObjectives: [
      "Describe the semantics of the test-and-set instruction.",
      "Implement mutual exclusion using test-and-set."
    ],
    coreProperties: ["Atomic", "Read-Modify-Write", "Boolean Target"],
    keyPoints: [
      "Returns the original value of the target while updating it.",
      "Used to implement simple spinlocks."
    ],
    prerequisites: [],
    commonMistakes: [
      {
        mistake: "Implementing a naive test-and-set lock and expecting bounded waiting.",
        fix: "A simple loop on test_and_set provides mutual exclusion but NOT bounded waiting (processes can starve)."
      }
    ],
    detailedExplanation: "Atomic operation pseudocode:\n\n```c\nboolean test_and_set(boolean *target) {\n  boolean rv = *target;\n  *target = true;\n  return rv;\n}\n```\n\nMutual exclusion lock:\n\n```c\nwhile (test_and_set(&lock)) {\n  // do nothing\n}\n// critical section\nlock = false;\n```"
  },
  os_m2_9: {
    hasContent: true,
    overview: "A hardware instruction that conditionally updates a value if it matches an expected value.",
    formal: "The compare_and_swap instruction atomically compares the current value of a variable with an expected value, and if they match, modifies it to a new value.",
    intuition: "Handing a teller a $10 bill for exchange only if the teller hasn't changed since you looked at them.",
    textbookReference: "Galvin Section 6.4",
    learningObjectives: [
      "Describe the semantics of compare-and-swap.",
      "Understand its use in lock-free synchronization."
    ],
    coreProperties: ["Atomic", "Conditional Update"],
    keyPoints: [
      "Returns the original value so the caller can tell if the swap succeeded.",
      "Foundation for many lock-free data structures."
    ],
    prerequisites: [],
    commonMistakes: [
      {
        mistake: "Assuming compare-and-swap solves the ABA problem.",
        fix: "CAS is susceptible to ABA where a value changes from A to B and back to A, tricking CAS into succeeding inappropriately."
      }
    ],
    detailedExplanation: "Pseudocode:\n\n```c\nint compare_and_swap(int *value, int expected, int new_value) {\n  int temp = *value;\n  if (*value == expected)\n    *value = new_value;\n  return temp;\n}\n```"
  },
  os_m2_10: {
    hasContent: true,
    overview: "A high-level software tool used to protect critical sections, built typically using hardware atomic instructions.",
    formal: "A mutex (mutual exclusion) lock is a synchronization primitive that grants exclusive access to a shared resource to only one process at a time via acquire() and release() operations.",
    intuition: "A literal key to a room. You acquire it, enter, and release it when done.",
    textbookReference: "Galvin Section 6.5",
    learningObjectives: [
      "Understand how mutex locks provide mutual exclusion.",
      "Differentiate between spinlocks and blocking locks."
    ],
    coreProperties: ["acquire()", "release()", "Ownership"],
    keyPoints: [
      "The acquire() operation blocks until the lock is available.",
      "A spinlock implementation uses busy waiting, wasting CPU cycles if held long.",
      "Conceptually acts as a binary semaphore with an ownership constraint."
    ],
    prerequisites: ["os_m2_7"],
    commonMistakes: [
      {
        mistake: "Failing to release the lock on all execution paths (e.g., exceptions).",
        fix: "Always ensure release() is called, even if the critical section throws an error."
      }
    ],
    detailedExplanation: "Mutex relies on boolean state. `acquire()` waits and sets to true, `release()` sets to false. A process holding a mutex must be the one to release it."
  },
  os_m2_11: {
    hasContent: true,
    overview: "A robust synchronization tool that uses an integer value to control access to shared resources.",
    formal: "A semaphore S is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait() and signal().",
    intuition: "A bowl of tokens. You take a token to proceed (wait), and return a token when done (signal).",
    textbookReference: "Galvin Section 6.5",
    learningObjectives: [
      "Define the wait and signal operations.",
      "Understand the difference between a busy-waiting semaphore and a blocking semaphore."
    ],
    coreProperties: ["Integer Variable", "wait() / P", "signal() / V"],
    keyPoints: [
      "Dijkstra introduced the P (proberen/wait) and V (verhogen/signal) terminology.",
      "To avoid busy waiting, semaphores are often implemented with a waiting queue."
    ],
    prerequisites: ["os_m2_10"],
    commonMistakes: [
      {
        mistake: "Modifying the semaphore integer directly.",
        fix: "Semaphore values must only be changed via atomic wait() and signal() operations."
      }
    ],
    detailedExplanation: "wait(S): if S <= 0 block, else S--.\nsignal(S): S++, wake up a blocked process if any.",
    labIntegrationPrompt: "Experiment with Semaphore logic in the Semaphore Playground."
  },
  os_m2_12: {
    hasContent: true,
    overview: "The fundamental atomic operations used to manipulate semaphores.",
    formal: "wait() (or P) decrements the semaphore and blocks if the result is negative; signal() (or V) increments the semaphore and wakes a blocked process.",
    intuition: "Wait is 'take a ticket'. Signal is 'give back a ticket'.",
    textbookReference: "Galvin Section 6.5",
    learningObjectives: [
      "Trace the internal logic of wait and signal operations.",
      "Explain why these operations must be atomic."
    ],
    coreProperties: ["Atomic", "Blocking", "Wakeup"],
    keyPoints: [
      "If wait and signal are not atomic, race conditions can corrupt the semaphore value itself."
    ],
    prerequisites: ["os_m2_11"],
    commonMistakes: [
      {
        mistake: "Thinking a signal operation always unblocks a process.",
        fix: "It only unblocks a process if there is one waiting; otherwise, it just increments the value."
      }
    ]
  },
  os_m2_13: {
    hasContent: true,
    overview: "Semaphores whose value can only be 0 or 1, essentially functioning similarly to mutex locks.",
    formal: "A binary semaphore is a semaphore constrained to values 0 and 1, used primarily to enforce mutual exclusion.",
    intuition: "A simple light switch that can only be ON or OFF.",
    textbookReference: "Galvin Section 6.5.1",
    learningObjectives: [
      "Compare binary semaphores with mutex locks.",
      "Implement mutual exclusion using binary semaphores."
    ],
    coreProperties: ["Values 0 or 1", "Mutual Exclusion"],
    keyPoints: [
      "Often used interchangeably with mutexes on systems that do not provide separate mutex primitives.",
      "Unlike a mutex, a binary semaphore does not strictly require the acquiring thread to be the releasing thread (though it's bad practice)."
    ],
    prerequisites: ["os_m2_12"],
    commonMistakes: [
      {
        mistake: "Incrementing a binary semaphore past 1.",
        fix: "Binary semaphores should never exceed 1. Excessive signals might cause errors or be ignored depending on implementation."
      }
    ],
    labIntegrationPrompt: "Simulate a binary semaphore acting as a mutex in the Semaphore Playground."
  },
  os_m2_14: {
    hasContent: true,
    overview: "Semaphores whose integer value can range over an unrestricted domain, used to control access to a pool of identical resources.",
    formal: "A counting semaphore is initialized to the number of available resources. The wait() operation decrements it, and signal() increments it.",
    intuition: "A parking lot with 50 spaces. The sign says 50, decrements as cars enter, and increments as they leave.",
    textbookReference: "Galvin Section 6.5.1",
    learningObjectives: [
      "Apply counting semaphores to resource allocation problems.",
      "Understand how negative semaphore values indicate the number of waiting processes in some implementations."
    ],
    coreProperties: ["Unrestricted Integer", "Resource Management"],
    keyPoints: [
      "Ideal for controlling access to a given number of instances of a resource.",
      "If the value is zero, all resources are in use."
    ],
    prerequisites: ["os_m2_12"],
    commonMistakes: [
      {
        mistake: "Using a counting semaphore for strict mutual exclusion of a single data structure.",
        fix: "Counting semaphores allow concurrent access up to the limit; they don't protect data modified by multiple admitted threads."
      }
    ],
    labIntegrationPrompt: "Set up a resource pool using a counting semaphore in the Semaphore Playground."
  },
  os_m2_15: {
    hasContent: true,
    overview: "A classic synchronization problem illustrating the challenges of deadlock and starvation when multiple processes compete for limited resources.",
    formal: "The Dining Philosophers problem involves 5 philosophers sitting at a table with 5 chopsticks. A philosopher needs two chopsticks to eat, creating a complex resource allocation challenge.",
    intuition: "A group dinner where you must grab both the fork on your left and your right to eat. If everyone grabs the left one simultaneously, nobody eats.",
    textbookReference: "Galvin Section 6.6.3",
    learningObjectives: [
      "Identify the conditions leading to deadlock in the naive solution.",
      "Propose deadlock-free solutions to the problem."
    ],
    coreProperties: ["Deadlock Risk", "Resource Contention"],
    keyPoints: [
      "Naive semaphore per chopstick leads to deadlock if all philosophers get hungry at once.",
      "Solutions include: picking up both only if available, limiting table to 4 philosophers, or asymmetric picking (odds pick left first, evens right)."
    ],
    prerequisites: ["os_m2_17"],
    commonMistakes: [
      {
        mistake: "Assuming deadlock freedom guarantees starvation freedom.",
        fix: "A solution might avoid deadlock but still allow a specific philosopher to starve if neighbors conspire."
      }
    ],
    detailedExplanation: "To prevent deadlock:\n- Limit-4: allow at most 4 philosophers to sit simultaneously.\n- Asymmetric: Odd philosophers pick left then right; even pick right then left.\n- Pickup-both: Require philosophers to pick up both chopsticks in a critical section."
  },
  os_m2_16: {
    hasContent: true,
    overview: "A synchronization problem involving a barber, a barber chair, and waiting room chairs.",
    formal: "The Sleeping Barber problem models a barber who sleeps when there are no customers and customers who leave if no waiting chairs are available.",
    intuition: "A small barbershop: if it's full, you leave. If it's empty, you wake the barber.",
    textbookReference: "Not found in verified Galvin source — VSSUT supplement",
    learningObjectives: [
      "Coordinate multiple entity types (barber, customer) using semaphores.",
      "Handle state transitions securely (sleeping to working)."
    ],
    coreProperties: ["Coordination", "Capacity Limits"],
    keyPoints: [
      "Requires semaphores to track customers, the barber, and a mutex for mutual exclusion over the chair count.",
      "This is a VSSUT supplemental topic."
    ],
    prerequisites: ["os_m2_17"],
    commonMistakes: [
      {
        mistake: "Updating the waiting chair count without mutex protection.",
        fix: "Customers and the barber might modify the waiting count concurrently, requiring strict mutex protection."
      }
    ],
    detailedExplanation: "Uses three semaphores: `customers` (counting), `barber` (binary), and `mutex` (binary for shared data)."
  },
  os_m2_17: {
    hasContent: true,
    overview: "A collection of standard problems used to test and demonstrate synchronization primitives.",
    formal: "Classic problems include Bounded-Buffer (Producer-Consumer), Readers-Writers, and Dining Philosophers, representing common concurrency patterns in OS design.",
    intuition: "These are the 'benchmark tests' for any new lock or semaphore design.",
    textbookReference: "Galvin Section 6.6",
    learningObjectives: [
      "Understand the Bounded-Buffer problem.",
      "Understand the Readers-Writers problem."
    ],
    coreProperties: ["Producer-Consumer", "Readers-Writers"],
    keyPoints: [
      "Bounded-buffer uses counting semaphores for full and empty slots.",
      "Readers-Writers focuses on allowing multiple readers but exclusive access for writers."
    ],
    prerequisites: ["os_m2_14"],
    commonMistakes: [
      {
        mistake: "Treating Readers-Writers as a standard mutual exclusion problem.",
        fix: "Readers-Writers requires shared read locks, which is more complex than simple binary exclusion."
      }
    ]
  }
};
