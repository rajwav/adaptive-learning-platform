import { Question } from '@/types';

export const osQuestions: Question[] = [
  {
    "id": "os_q1",
    "topicId": "os_m1_1",
    "text": "Which of the following describes an operating system's role as a resource manager?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Providing a user interface",
      "Allocating CPU, memory, and I/O devices fairly among competing programs",
      "Compiling high-level code into machine instructions",
      "Designing algorithms for user applications"
    ],
    "correctAnswer": "Allocating CPU, memory, and I/O devices fairly among competing programs",
    "explanation": "An OS acts as a resource manager by deciding between conflicting requests for efficient and fair resource use."
  },
  {
    "id": "os_q2",
    "topicId": "os_m1_3",
    "text": "What is the primary objective of a multiprogramming operating system?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "To minimize the memory used by the OS",
      "To maximize CPU utilization by organizing jobs so CPU always has one to execute",
      "To provide a graphical user interface",
      "To allow multiple users to connect via terminals simultaneously"
    ],
    "correctAnswer": "To maximize CPU utilization by organizing jobs so CPU always has one to execute",
    "explanation": "Multiprogramming keeps multiple jobs in memory and switches among them to ensure the CPU is never idle."
  },
  {
    "id": "os_q3",
    "topicId": "os_m1_8",
    "text": "Which system is characterized by strict time constraints where processing must be done within a defined time limit?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "Time-sharing system",
      "Batch system",
      "Real-time system",
      "Distributed system"
    ],
    "correctAnswer": "Real-time system",
    "explanation": "Real-time systems are used when rigid time requirements have been placed on the operation of a processor."
  },
  {
    "id": "os_q4",
    "topicId": "os_m1_12",
    "text": "What is a system call?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "A hardware interrupt",
      "An interface for user programs to request services from the kernel",
      "A command-line interface function",
      "A network protocol"
    ],
    "correctAnswer": "An interface for user programs to request services from the kernel",
    "explanation": "System calls provide the programming interface to the services provided by the operating system."
  },
  {
    "id": "os_q5",
    "topicId": "os_m1_10",
    "text": "Which mode bit indicates the system is executing in user mode?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "0",
      "1",
      "2",
      "-1"
    ],
    "correctAnswer": "1",
    "explanation": "Dual-mode operation uses a mode bit: 0 for kernel mode and 1 for user mode."
  },
  {
    "id": "os_q6",
    "topicId": "os_m1_14",
    "text": "A process in the 'ready' state is waiting for what?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "I/O completion",
      "Memory allocation",
      "To be assigned to a processor",
      "User input"
    ],
    "correctAnswer": "To be assigned to a processor",
    "explanation": "A ready process has all required resources except the CPU, which it waits to be assigned by the scheduler."
  },
  {
    "id": "os_q7",
    "topicId": "os_m1_16",
    "text": "Which of the following is NOT part of a Process Control Block (PCB)?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Program Counter",
      "CPU Registers",
      "Page table base register",
      "Process execution time limit"
    ],
    "correctAnswer": "Process execution time limit",
    "explanation": "Explicit 'execution time limit' isn't a standard architectural PCB component unlike PC and registers."
  },
  {
    "id": "os_q8",
    "topicId": "os_m1_15",
    "text": "When a process creates a new process using the fork() system call, what is the return value in the child process?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "The PID of the parent",
      "The PID of the child",
      "0",
      "-1"
    ],
    "correctAnswer": "0",
    "explanation": "fork() returns 0 to the newly created child process, and returns the child's PID to the parent process."
  },
  {
    "id": "os_q9",
    "topicId": "os_m1_14",
    "text": "When a process finishes execution, it enters which state before its PCB is removed?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "Ready",
      "Waiting",
      "Terminated",
      "Suspended"
    ],
    "correctAnswer": "Terminated",
    "explanation": "A process enters the terminated (or zombie) state after execution finishes, awaiting the parent process to read its exit status."
  },
  {
    "id": "os_q10",
    "topicId": "os_m1_36",
    "text": "An I/O-bound process typically has:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Many short CPU bursts",
      "Few long CPU bursts",
      "No CPU bursts",
      "Only one large CPU burst"
    ],
    "correctAnswer": "Many short CPU bursts",
    "explanation": "I/O-bound processes compute for a very short time before requesting I/O again."
  },
  {
    "id": "os_q11",
    "topicId": "os_m1_19",
    "text": "Which of the following resources is typically shared among threads of the same process?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Registers",
      "Stack",
      "Program Counter",
      "Heap memory"
    ],
    "correctAnswer": "Heap memory",
    "explanation": "Threads share the process's data section, code section, and heap memory."
  },
  {
    "id": "os_q12",
    "topicId": "os_m1_19",
    "text": "What is a major advantage of user-level threads over kernel-level threads?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 3,
    "options": [
      "They can run on multiple processors simultaneously",
      "Thread switching does not require OS kernel intervention",
      "If one user-level thread blocks, others can continue executing",
      "They are managed by hardware interrupts"
    ],
    "correctAnswer": "Thread switching does not require OS kernel intervention",
    "explanation": "User-level threads are managed entirely by user-space libraries."
  },
  {
    "id": "os_q13",
    "topicId": "os_m1_22",
    "text": "Which multithreading model maps many user-level threads to one kernel thread?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "One-to-One",
      "Many-to-One",
      "Many-to-Many",
      "Two-level"
    ],
    "correctAnswer": "Many-to-One",
    "explanation": "The Many-to-One model maps multiple user threads to a single kernel thread."
  },
  {
    "id": "os_q14",
    "topicId": "os_m1_22",
    "text": "In the One-to-One multithreading model:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Thread management overhead is minimized",
      "A single blocking system call blocks all threads",
      "Each user thread is mapped to a unique kernel thread",
      "It cannot run in parallel on a multiprocessor"
    ],
    "correctAnswer": "Each user thread is mapped to a unique kernel thread",
    "explanation": "One-to-One maps each user thread to a kernel thread, allowing true parallelism."
  },
  {
    "id": "os_q15",
    "topicId": "os_m1_27",
    "text": "How is Turnaround Time (TAT) defined for a process?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Time from submission to the first response",
      "Time spent waiting in the ready queue",
      "Time from submission to completion",
      "Time taken to execute on the CPU"
    ],
    "correctAnswer": "Time from submission to completion",
    "explanation": "Turnaround Time (TAT) = Completion Time - Arrival Time."
  },
  {
    "id": "os_q16",
    "topicId": "os_m1_27",
    "text": "Which scheduling criterion is most important for interactive systems?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Throughput",
      "Turnaround Time",
      "Response Time",
      "CPU Utilization"
    ],
    "correctAnswer": "Response Time",
    "explanation": "In interactive systems, users expect quick feedback."
  },
  {
    "id": "os_q17",
    "topicId": "os_m1_27",
    "text": "Waiting time is mathematically defined as:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Completion Time - Arrival Time",
      "Turnaround Time - Burst Time",
      "Response Time - Burst Time",
      "Completion Time - Burst Time"
    ],
    "correctAnswer": "Turnaround Time - Burst Time",
    "explanation": "Waiting time is the total time spent in the ready queue, which is TAT - BT."
  },
  {
    "id": "os_q18",
    "topicId": "os_m1_29",
    "text": "Three processes arrive at t=0: P1(Burst=6), P2(Burst=2), P3(Burst=8). Under FCFS scheduling, what is the average waiting time? Assume order P1, P2, P3.",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 3,
    "options": [
      "4.67",
      "5.33",
      "6",
      "10"
    ],
    "correctAnswer": "4.67",
    "explanation": "Wait times: P1=0, P2=6, P3=8. Average = (0+6+8)/3 = 4.67."
  },
  {
    "id": "os_q19",
    "topicId": "os_m1_29",
    "text": "Given processes arriving at different times: P1(AT=0, BT=4), P2(AT=1, BT=3), P3(AT=2, BT=1). Under FCFS, what is the Completion Time of P3?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 2,
    "correctAnswer": "8",
    "explanation": "P1 runs 0-4. P2 runs 4-7. P3 runs 7-8. Completion Time of P3 is 8."
  },
  {
    "id": "os_q20",
    "topicId": "os_m1_29",
    "text": "What is the Convoy Effect in FCFS scheduling?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "When multiple processes deadlock on a resource",
      "When short processes wait a long time for a single long CPU-bound process to finish",
      "When processes continuously switch context",
      "When threads block each other in a convoy"
    ],
    "correctAnswer": "When short processes wait a long time for a single long CPU-bound process to finish",
    "explanation": "The Convoy Effect occurs when a long process holds the CPU, forcing short processes to wait."
  },
  {
    "id": "os_q21",
    "topicId": "os_m1_30",
    "text": "P1(AT=0, BT=7), P2(AT=2, BT=4), P3(AT=4, BT=1), P4(AT=5, BT=4). Under non-preemptive SJF, what is the average waiting time?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 4,
    "options": [
      "3.0",
      "4.0",
      "4.5",
      "5.0"
    ],
    "correctAnswer": "4.0",
    "explanation": "CT: P1=7, P2=12, P3=8, P4=16. TAT: P1=7, P2=10, P3=4, P4=11. WT = TAT - BT: P1=0, P2=6, P3=3, P4=7. Sum=16. Avg=4.0."
  },
  {
    "id": "os_q22",
    "topicId": "os_m1_30",
    "text": "Processes: P1(AT=0,BT=3), P2(AT=1,BT=5), P3(AT=2,BT=2), P4(AT=3,BT=4). Non-preemptive SJF. What is Completion Time of P2?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 3,
    "correctAnswer": "14",
    "explanation": "P1 runs 0-3. At 3, Ready: P2(5), P3(2), P4(4). Select P3 (3-5). Then P4 (5-9). Then P2 (9-14). CT of P2 is 14."
  },
  {
    "id": "os_q23",
    "topicId": "os_m1_30",
    "text": "Which of the following is a major difficulty with SJF scheduling in practical OS environments?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "It causes the convoy effect",
      "It is impossible to implement preemptively",
      "It is difficult to accurately predict the length of the next CPU burst",
      "It maximizes average waiting time"
    ],
    "correctAnswer": "It is difficult to accurately predict the length of the next CPU burst",
    "explanation": "The OS does not generally know the exact length of the next CPU burst."
  },
  {
    "id": "os_q24",
    "topicId": "os_m1_31",
    "text": "P1(AT=0, BT=8), P2(AT=1, BT=4), P3(AT=2, BT=9), P4(AT=3, BT=5). Under SRTF (preemptive SJF), what is the waiting time of P1?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 4,
    "options": [
      "0",
      "9",
      "17",
      "18"
    ],
    "correctAnswer": "9",
    "explanation": "0-1: P1. 1-5: P2. 5-10: P4. 10-17: P1 finishes. P1 TAT = 17 - 0 = 17. WT = 17 - 8 = 9."
  },
  {
    "id": "os_q25",
    "topicId": "os_m1_31",
    "text": "P1(AT=0, BT=6), P2(AT=2, BT=2). SRTF scheduling. What is the completion time of P1?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 3,
    "correctAnswer": "8",
    "explanation": "0-2: P1(4). At 2, P2(2) preempts P1(4). 2-4: P2 finishes. 4-8: P1 finishes. CT of P1 = 8."
  },
  {
    "id": "os_q26",
    "topicId": "os_m1_31",
    "text": "SRTF scheduling is optimal in terms of which metric?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Maximum throughput",
      "Minimum context switches",
      "Minimum average waiting time",
      "Maximum CPU utilization"
    ],
    "correctAnswer": "Minimum average waiting time",
    "explanation": "SRTF provides the minimum average waiting time by always running the shortest remaining job."
  },
  {
    "id": "os_q27",
    "topicId": "os_m1_32",
    "text": "P1(AT=0, BT=4, Pri=2), P2(AT=1, BT=3, Pri=1). Lower number = higher priority. Preemptive priority scheduling. What is CT of P1?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 3,
    "correctAnswer": "7",
    "explanation": "0-1: P1(3). At 1, P2(Pri 1) preempts P1(Pri 2). P2 runs 1-4. Then P1 runs 4-7. CT of P1 is 7."
  },
  {
    "id": "os_q28",
    "topicId": "os_m1_32",
    "text": "What technique is commonly used to prevent starvation in priority scheduling algorithms?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Context switching",
      "Aging",
      "Multithreading",
      "Time slicing"
    ],
    "correctAnswer": "Aging",
    "explanation": "Aging gradually increases the priority of processes that wait in the system for a long time."
  },
  {
    "id": "os_q29",
    "topicId": "os_m1_32",
    "text": "P1(BT=10, Pri=3), P2(BT=1, Pri=1), P3(BT=2, Pri=4), P4(BT=1, Pri=5), P5(BT=5, Pri=2). Lower number = higher priority. All arrive at t=0. Non-preemptive. What is average waiting time?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 3,
    "options": [
      "8.2",
      "4.1",
      "10.0",
      "16.4"
    ],
    "correctAnswer": "8.2",
    "explanation": "Order: P2(1), P5(5), P1(10), P3(2), P4(1). WT: P2=0, P5=1, P1=6, P3=16, P4=18. Sum=41. Avg=41/5 = 8.2."
  },
  {
    "id": "os_q30",
    "topicId": "os_m1_33",
    "text": "P1(AT=0, BT=4), P2(AT=0, BT=3), P3(AT=0, BT=5). Time Quantum = 2. Round Robin. What is Completion Time of P2?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 3,
    "correctAnswer": "9",
    "explanation": "Order: P1(0-2), P2(2-4), P3(4-6), P1(6-8, done), P2(8-9, done). CT of P2 is 9."
  },
  {
    "id": "os_q31",
    "topicId": "os_m1_33",
    "text": "P1(AT=0, BT=3), P2(AT=0, BT=3). Quantum=2. Total context switches (excluding initial dispatch and final termination)?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 2,
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": "3",
    "explanation": "P1(0-2), switch to P2, P2(2-4), switch to P1, P1(4-5), switch to P2, P2(5-6). Total 3 switches between the processes."
  },
  {
    "id": "os_q32",
    "topicId": "os_m1_33",
    "text": "If the time quantum in Round Robin scheduling is extremely large, the scheduling algorithm behaves essentially like:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "SRTF",
      "SJF",
      "FCFS",
      "Priority Scheduling"
    ],
    "correctAnswer": "FCFS",
    "explanation": "With an infinitely large time quantum, a process will never be preempted due to a time slice expiring."
  },
  {
    "id": "os_q33",
    "topicId": "os_m1_37",
    "text": "Which component is responsible for giving control of the CPU to the process selected by the short-term scheduler?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "Long-term scheduler",
      "Interrupt handler",
      "Dispatcher",
      "Medium-term scheduler"
    ],
    "correctAnswer": "Dispatcher",
    "explanation": "The dispatcher gives control of the CPU to the process selected by the scheduler."
  },
  {
    "id": "os_q34",
    "topicId": "os_m1_38",
    "text": "During a context switch, the OS must save the state of the old process. Where is this state stored?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "In the CPU registers",
      "In the Process Control Block (PCB)",
      "In the Page Table",
      "In the secondary storage"
    ],
    "correctAnswer": "In the Process Control Block (PCB)",
    "explanation": "The OS saves the state into the PCB of the process being swapped out."
  },
  {
    "id": "os_q35",
    "topicId": "os_m2_4",
    "text": "Which of the following is NOT a requirement for a solution to the critical-section problem?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Mutual Exclusion",
      "Progress",
      "Bounded Waiting",
      "Deadlock Freedom"
    ],
    "correctAnswer": "Deadlock Freedom",
    "explanation": "The three formal requirements are Mutual Exclusion, Progress, and Bounded Waiting."
  },
  {
    "id": "os_q36",
    "topicId": "os_m2_4",
    "text": "What does the 'Bounded Waiting' requirement ensure?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Only one process can enter its critical section at a time",
      "A process will not be delayed indefinitely from entering its critical section",
      "Processes executing outside their critical sections cannot block others",
      "The critical section executes in a finite number of instructions"
    ],
    "correctAnswer": "A process will not be delayed indefinitely from entering its critical section",
    "explanation": "Bounded waiting prevents starvation."
  },
  {
    "id": "os_q37",
    "topicId": "os_m2_6",
    "text": "Peterson's solution is restricted to how many processes?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "Two",
      "Three",
      "N-processes",
      "Any even number"
    ],
    "correctAnswer": "Two",
    "explanation": "Peterson's solution is specifically designed for two processes."
  },
  {
    "id": "os_q38",
    "topicId": "os_m2_6",
    "text": "In Peterson's solution, if flag[0] = flag[1] = true, how is the tie broken?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 3,
    "options": [
      "The process with the lower PID enters",
      "The 'turn' variable dictates which process must wait",
      "Both enter safely",
      "The OS scheduler decides arbitrarily"
    ],
    "correctAnswer": "The 'turn' variable dictates which process must wait",
    "explanation": "The 'turn' variable breaks the tie."
  },
  {
    "id": "os_q39",
    "topicId": "os_m2_9",
    "text": "The Compare-and-Swap instruction achieves synchronization by:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Disabling interrupts temporarily",
      "Executing read and modify memory operations atomically",
      "Using a semaphore",
      "Yielding the CPU to other threads"
    ],
    "correctAnswer": "Executing read and modify memory operations atomically",
    "explanation": "Hardware instructions like Compare-and-Swap execute atomically."
  },
  {
    "id": "os_q40",
    "topicId": "os_m2_10",
    "text": "What is a major drawback of using a simple spinlock for synchronization?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "It causes deadlocks",
      "It violates mutual exclusion",
      "It wastes CPU cycles",
      "It requires kernel intervention"
    ],
    "correctAnswer": "It wastes CPU cycles",
    "explanation": "A spinlock causes a process to busy wait, wasting CPU cycles."
  },
  {
    "id": "os_q41",
    "topicId": "os_m2_10",
    "text": "A mutex lock differs from a counting semaphore in that:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "A mutex can only take values 0 and 1, indicating locked or unlocked",
      "A mutex can be accessed by multiple processes simultaneously",
      "A mutex does not use atomic operations",
      "A mutex requires a hardware timer"
    ],
    "correctAnswer": "A mutex can only take values 0 and 1, indicating locked or unlocked",
    "explanation": "A mutex is essentially a binary semaphore."
  },
  {
    "id": "os_q42",
    "topicId": "os_m2_14",
    "text": "A counting semaphore is initialized to 3. Then, 5 wait() operations and 2 signal() operations are executed. What is the final value of the semaphore?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 2,
    "correctAnswer": "0",
    "explanation": "Wait decrements, signal increments. 3 - 5 + 2 = 0."
  },
  {
    "id": "os_q43",
    "topicId": "os_m2_14",
    "text": "A counting semaphore is initialized to 7. After some operations, its value is -3. What does this mean?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 3,
    "options": [
      "3 processes are in the critical section",
      "3 processes are waiting in the semaphore's queue",
      "The system is in a deadlock",
      "An error occurred, semaphore values cannot be negative"
    ],
    "correctAnswer": "3 processes are waiting in the semaphore's queue",
    "explanation": "A value of -N indicates that N processes are blocked waiting on that semaphore."
  },
  {
    "id": "os_q44",
    "topicId": "os_m2_13",
    "text": "If a semaphore is used for mutual exclusion, it should be initialized to:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "0",
      "1",
      "N (number of processes)",
      "-1"
    ],
    "correctAnswer": "1",
    "explanation": "For mutual exclusion, a binary semaphore is initialized to 1."
  },
  {
    "id": "os_q45",
    "topicId": "os_m2_15",
    "text": "In the Dining Philosophers problem, what happens if all philosophers pick up their left chopstick simultaneously?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Starvation",
      "Deadlock",
      "Mutual Exclusion is violated",
      "Safe execution"
    ],
    "correctAnswer": "Deadlock",
    "explanation": "If all philosophers pick up their left chopstick, they will all wait indefinitely for the right chopstick (circular wait)."
  },
  {
    "id": "os_q46",
    "topicId": "os_m2_15",
    "text": "Which of the following is NOT a valid solution to prevent deadlock in the Dining Philosophers problem?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 3,
    "options": [
      "Allowing at most N-1 philosophers to sit at the table",
      "Forcing philosophers to pick up both chopsticks atomically",
      "Having odd philosophers pick left then right, and even pick right then left",
      "Requiring philosophers to wait a random time before picking up the left chopstick"
    ],
    "correctAnswer": "Requiring philosophers to wait a random time before picking up the left chopstick",
    "explanation": "A random wait might reduce livelock probability but does not structurally guarantee deadlock prevention."
  },
  {
    "id": "os_q47",
    "topicId": "os_m2_17",
    "text": "In the Bounded-Buffer problem, the 'empty' semaphore is initialized to N and 'full' is initialized to 0. What does the producer wait on before producing?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "full",
      "empty",
      "mutex",
      "empty and then mutex"
    ],
    "correctAnswer": "empty and then mutex",
    "explanation": "The producer must wait(empty) to ensure space, then wait(mutex) to access the buffer safely."
  },
  {
    "id": "os_q48",
    "topicId": "os_m2_1",
    "text": "A race condition occurs when:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Two processes deadlock",
      "Multiple threads read a shared variable",
      "Multiple processes manipulate shared data concurrently and the outcome depends on execution order",
      "A process runs endlessly in a loop"
    ],
    "correctAnswer": "Multiple processes manipulate shared data concurrently and the outcome depends on execution order",
    "explanation": "Race conditions happen when final state depends on exact interleaving of instructions."
  },
  {
    "id": "os_q49",
    "topicId": "os_m2_12",
    "text": "In Semaphores, the wait() operation is also known as:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "V()",
      "P()",
      "Up()",
      "Post()"
    ],
    "correctAnswer": "P()",
    "explanation": "Dijkstra named wait() as P() and signal() as V()."
  },
  {
    "id": "os_q50",
    "topicId": "os_m2_23",
    "text": "Which of the following is NOT one of the four necessary conditions for deadlock?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 1,
    "options": [
      "Mutual Exclusion",
      "Hold and Wait",
      "No Preemption",
      "Circular Preemption"
    ],
    "correctAnswer": "Circular Preemption",
    "explanation": "The fourth condition is 'Circular Wait', not 'Circular Preemption'."
  },
  {
    "id": "os_q51",
    "topicId": "os_m2_23",
    "text": "If the 'No Preemption' condition is violated, what happens?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Deadlock is guaranteed",
      "Deadlock cannot occur",
      "Processes execute faster",
      "Mutual exclusion is enforced"
    ],
    "correctAnswer": "Deadlock cannot occur",
    "explanation": "Violating any of the four necessary conditions ensures that deadlock cannot occur."
  },
  {
    "id": "os_q52",
    "topicId": "os_m2_24",
    "text": "In a Resource Allocation Graph (RAG), a directed edge from a resource node to a process node represents:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "A request edge",
      "An assignment edge",
      "A claim edge",
      "A wait edge"
    ],
    "correctAnswer": "An assignment edge",
    "explanation": "An edge from Resource to Process indicates that an instance has been allocated to the process."
  },
  {
    "id": "os_q53",
    "topicId": "os_m2_24",
    "text": "If a RAG contains a cycle, and each resource type has only ONE instance, then:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 3,
    "options": [
      "A deadlock is possible, but not certain",
      "A deadlock definitely exists",
      "The system is in a safe state",
      "Starvation is occurring"
    ],
    "correctAnswer": "A deadlock definitely exists",
    "explanation": "If each resource has exactly one instance, a cycle is a necessary AND sufficient condition for deadlock."
  },
  {
    "id": "os_q54",
    "topicId": "os_m2_25",
    "text": "Deadlock Prevention differs from Deadlock Avoidance in that:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Prevention statically negates one of the four conditions, Avoidance dynamically checks resource requests",
      "Prevention uses Banker's algorithm",
      "Avoidance requires restarting the system",
      "They are identical concepts"
    ],
    "correctAnswer": "Prevention statically negates one of the four conditions, Avoidance dynamically checks resource requests",
    "explanation": "Prevention designs the system so a condition cannot hold. Avoidance dynamically evaluates requests."
  },
  {
    "id": "os_q55",
    "topicId": "os_m2_26",
    "text": "Ordering all resource types and requiring processes to request resources in increasing order prevents deadlock by negating which condition?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Mutual Exclusion",
      "Hold and Wait",
      "No Preemption",
      "Circular Wait"
    ],
    "correctAnswer": "Circular Wait",
    "explanation": "Imposing a total ordering of resource types guarantees that a circular wait cannot exist."
  },
  {
    "id": "os_q56",
    "topicId": "os_m2_27",
    "text": "Deadlock Avoidance algorithms like Banker's Algorithm require what advance information?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "The maximum number of resources of each type a process may need",
      "The exact order of process execution",
      "The exact execution time of each process",
      "The number of context switches"
    ],
    "correctAnswer": "The maximum number of resources of each type a process may need",
    "explanation": "Banker's algorithm requires the a priori declaration of the maximum resource needs."
  },
  {
    "id": "os_q57",
    "topicId": "os_m2_28",
    "text": "Consider a system with 12 instances of a resource. P1 holds 5, needs 10. P2 holds 2, needs 4. P3 holds 2, needs 9. Is this a safe state?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 4,
    "options": [
      "Yes, safe sequence P1, P2, P3",
      "Yes, safe sequence P2, P1, P3",
      "Yes, safe sequence P3, P2, P1",
      "No, it is an unsafe state"
    ],
    "correctAnswer": "Yes, safe sequence P2, P1, P3",
    "explanation": "Available = 3. Need: P1=5, P2=2, P3=7. P2 can finish (Avail becomes 5). Then P1 can finish (Avail becomes 10). Then P3 can finish."
  },
  {
    "id": "os_q58",
    "topicId": "os_m2_28",
    "text": "System has 3 processes (P0, P1, P2) and 3 resources. Available=[3, 3, 2]. Need matrix: P0=[1, 2, 2], P1=[0, 1, 1], P2=[4, 3, 1]. Which process CANNOT be satisfied first?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Problem Solving",
    "difficulty": 3,
    "options": [
      "P0",
      "P1",
      "P2",
      "Both P0 and P1"
    ],
    "correctAnswer": "P2",
    "explanation": "P2's need [4,3,1] is greater than Available [3,3,2], so it cannot be satisfied immediately."
  },
  {
    "id": "os_q59",
    "topicId": "os_m2_29",
    "text": "Banker's Algorithm: Max=[7,5,3], Allocation=[0,1,0]. Available=[3,3,2]. If this process requests [0,2,0], what is the first check Banker's performs?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 3,
    "options": [
      "If Request <= Allocation",
      "If Request <= Need",
      "If Request <= Available",
      "If Request <= Max"
    ],
    "correctAnswer": "If Request <= Need",
    "explanation": "The algorithm first checks if Request <= Need."
  },
  {
    "id": "os_q60",
    "topicId": "os_m2_29",
    "text": "Banker's Algorithm: Max=[6, 4, 3] and Allocation=[2, 2, 1]. What is the sum of the elements in the Need matrix for this process?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 2,
    "correctAnswer": "8",
    "explanation": "Need = Max - Alloc = [4, 2, 2]. Sum = 4+2+2 = 8."
  },
  {
    "id": "os_q61",
    "topicId": "os_m2_28",
    "text": "System has 10 tape drives. P1 max 4, holds 2. P2 max 6, holds 4. P3 max 8, holds 2. What is the current Available instances?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 2,
    "correctAnswer": "2",
    "explanation": "Allocated = 2+4+2 = 8. Available = Total - Allocated = 10 - 8 = 2."
  },
  {
    "id": "os_q62",
    "topicId": "os_m2_31",
    "text": "Deadlock detection differs from avoidance in that:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "It is done offline",
      "It requires restarting the computer",
      "It allows the system to enter a deadlocked state, then recovers",
      "It is mathematically proven"
    ],
    "correctAnswer": "It allows the system to enter a deadlocked state, then recovers",
    "explanation": "Detection algorithms periodically check if a deadlock has occurred and invoke recovery."
  },
  {
    "id": "os_q63",
    "topicId": "os_m2_33",
    "text": "Which of the following is a common method for recovering from deadlock?",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Recall",
    "difficulty": 2,
    "options": [
      "Increasing RAM",
      "Aborting one or more deadlocked processes",
      "Changing the scheduling algorithm to FCFS",
      "Upgrading the processor"
    ],
    "correctAnswer": "Aborting one or more deadlocked processes",
    "explanation": "Recovery typically involves aborting processes or preempting resources."
  },
  {
    "id": "os_q64",
    "topicId": "os_m2_26",
    "text": "The 'Hold and Wait' deadlock condition can be prevented by:",
    "answerMode": "MULTIPLE_CHOICE",
    "type": "Understanding",
    "difficulty": 2,
    "options": [
      "Requiring a process to request all its resources before it begins execution",
      "Numbering all resources",
      "Using a time quantum",
      "Allowing preemption"
    ],
    "correctAnswer": "Requiring a process to request all its resources before it begins execution",
    "explanation": "By making a process get all resources at once, it never 'holds' some while 'waiting' for others."
  },
  {
    "id": "os_q65",
    "topicId": "os_m2_20",
    "text": "System with 3 processes. Each needs 2 instances of Resource R. What is the minimum total instances of R to guarantee NO deadlock?",
    "answerMode": "NUMERIC",
    "type": "Problem Solving",
    "difficulty": 3,
    "correctAnswer": "4",
    "explanation": "Max need per process = 2. Deadlock possible if each gets 1 (total 3). One more breaks it: 4."
  }
];
