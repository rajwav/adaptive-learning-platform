module.exports = {
  "os_m1_1": {
    "overview": "An Operating System (OS) is software that manages computer hardware and software resources.",
    "formal": "The OS is a resource allocator and control program. It manages resources (CPU time, memory space, I/O devices) and resolves conflicting requests for efficient and fair resource use.",
    "intuition": "Think of an OS as a government. It performs no useful function by itself, but provides an environment where other programs can do useful work.",
    "coreProperties": [
      "Resource Allocation",
      "Control Program",
      "Hardware Abstraction",
      "Execution Environment"
    ],
    "hasContent": true
  },
  "os_m1_2": {
    "overview": "Early OS architecture where similar jobs are grouped and processed together automatically.",
    "formal": "A Batch System runs jobs sequentially without user interaction. The resident monitor reads a batch of jobs and executes them one after another to maximize CPU utilization.",
    "intuition": "Like a washing machine: you load all the clothes at once, press start, and wait for the entire cycle to finish. You don't interact with it while it's running.",
    "coreProperties": [
      "No user interaction",
      "Resident monitor transfers control automatically",
      "High CPU idle time during I/O"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming batch systems are entirely obsolete.",
        "fix": "Modern enterprise systems still use batch processing for payroll, rendering, and report generation at night."
      }
    ],
    "hasContent": true
  },
  "os_m1_3": {
    "overview": "Increases CPU utilization by organizing jobs so that the CPU always has one to execute.",
    "formal": "Multiprogramming keeps several jobs in memory simultaneously. If the active job has to wait (e.g., for I/O), the OS switches the CPU to another job, preventing the CPU from idling.",
    "intuition": "Like a chef cooking multiple dishes at once. While the soup is boiling (I/O), the chef chops vegetables (CPU) instead of just standing and watching the pot.",
    "coreProperties": [
      "Maximizes CPU utilization",
      "Requires memory management",
      "Job scheduling is introduced"
    ],
    "hasContent": true
  },
  "os_m1_4": {
    "overview": "A logical extension of multiprogramming where CPU time is interleaved rapidly among multiple users.",
    "formal": "Time-sharing (multitasking) uses CPU scheduling and multiprogramming to provide each user with a small portion of a time-shared computer. Response time should be short (typically < 1 second).",
    "intuition": "Like a chess master playing 10 simultaneous games. They spend a few seconds at each board, but from each opponent's perspective, they are playing a continuous game.",
    "coreProperties": [
      "Interactive environment",
      "Time slices / Quantums",
      "Rapid context switching",
      "Requires robust protection and file systems"
    ],
    "hasContent": true
  },
  "os_m1_5": {
    "overview": "Operating systems designed for single-user desktop or laptop environments.",
    "formal": "PC operating systems are optimized for user convenience and responsiveness rather than maximizing CPU or resource utilization. They emphasize GUI, I/O performance, and user experience.",
    "intuition": "Designed for one person. It's okay if the CPU sits idle for 5 minutes while you read an article—the goal is to respond instantly when you finally click a link.",
    "coreProperties": [
      "Single user",
      "Focus on usability over utilization",
      "Interactive I/O handling"
    ],
    "hasContent": true
  },
  "os_m1_6": {
    "overview": "Systems with more than one processor in close communication, sharing the computer bus, clock, memory, and peripheral devices.",
    "formal": "Tightly coupled multiprocessor systems that offer increased throughput, economy of scale, and increased reliability (graceful degradation or fault tolerance).",
    "intuition": "Like having multiple chefs in the same kitchen sharing the same fridge and stove, working together to finish orders faster.",
    "coreProperties": [
      "Symmetric Multiprocessing (SMP)",
      "Asymmetric Multiprocessing",
      "Shared Memory"
    ],
    "hasContent": true
  },
  "os_m1_7": {
    "overview": "A collection of physically separate, possibly heterogeneous computer systems that are networked to provide users with access to various resources.",
    "formal": "Loosely coupled systems where each processor has its own local memory. Processors communicate through a network (LAN/WAN) to share resources, perform computation, and provide high availability.",
    "intuition": "Like multiple independent restaurants in a franchise. They operate on their own but coordinate over the phone to share ingredients or handle overflow.",
    "coreProperties": [
      "No shared memory (message passing)",
      "Resource sharing",
      "High availability and fault tolerance"
    ],
    "hasContent": true
  },
  "os_m1_8": {
    "overview": "Systems used when rigid time requirements have been placed on the operation of a processor or the flow of data.",
    "formal": "An OS where processing must occur within strict timing constraints. A real-time system fails if it does not return the correct result within the specified deadline.",
    "intuition": "Like an airbag deployment system. If it deploys 1 second too late, it's completely useless, even if the math was correct.",
    "coreProperties": [
      "Hard real-time (absolute deadlines)",
      "Soft real-time (priority degradation)",
      "Minimal latency"
    ],
    "hasContent": true
  },
  "os_m1_9": {
    "overview": "The fundamental modules that make up a modern operating system.",
    "formal": "Core OS components include Process Management, Memory Management, File Management, I/O System Management, Secondary-Storage Management, Networking, Protection, and Command-Interpreter systems.",
    "intuition": "The departments of a company: HR (processes), Warehousing (memory), Filing (storage), and Security (protection).",
    "coreProperties": [
      "Modular architecture",
      "Layered approach",
      "Microkernel vs Monolithic"
    ],
    "hasContent": true
  },
  "os_m1_10": {
    "overview": "The mechanism for controlling the access of programs, processes, or users to the resources defined by a computer system.",
    "formal": "Protection ensures that only authorized processes can access resources, and only in authorized ways. It provides a mechanism for the enforcement of the policies governing resource use.",
    "intuition": "Like keycards in an office building. The system tracks who you are and which rooms (files/memory) you are allowed to enter.",
    "coreProperties": [
      "Access control",
      "Authentication",
      "Privilege separation"
    ],
    "hasContent": true
  },
  "os_m1_11": {
    "overview": "Services provided by the OS for the convenience of the programmer and user.",
    "formal": "OS services include Program Execution, I/O Operations, File-System Manipulation, Communications, Error Detection, Resource Allocation, Accounting, and Protection.",
    "intuition": "Like hotel amenities. Room service, housekeeping, and front desk are provided so you don't have to cook, clean, or unlock the front door yourself.",
    "coreProperties": [
      "User-centric services",
      "System-centric services"
    ],
    "hasContent": true
  },
  "os_m1_12": {
    "overview": "The programming interface to the services provided by the OS.",
    "formal": "System calls provide an interface between a running program and the OS. They are typically written in C/C++ and trigger a software interrupt (trap) to switch from user mode to kernel mode.",
    "intuition": "The official form you must fill out to ask the government (OS) to do something restricted, like reading a file from the hard drive.",
    "coreProperties": [
      "Mode switch (User to Kernel)",
      "API (POSIX, Win32)",
      "Parameters passed via registers or stack"
    ],
    "hasContent": true
  },
  "os_m1_13": {
    "overview": "A process is a program in execution.",
    "formal": "A process is the unit of work in a modern time-sharing system. It includes the program code (text section), current activity (program counter/registers), stack (temporary data), data section (global variables), and heap (dynamic memory).",
    "intuition": "A recipe is a program. Baking the cake is a process. You can use one recipe to bake 3 cakes concurrently (3 different processes running the same program).",
    "coreProperties": [
      "Active entity",
      "Requires CPU and memory",
      "Has a lifecycle"
    ],
    "hasContent": true
  },
  "os_m1_14": {
    "overview": "As a process executes, it changes state.",
    "formal": "Standard states: New (being created), Ready (waiting to be assigned to a processor), Running (instructions are being executed), Waiting/Blocked (waiting for an event like I/O), Terminated (finished execution).",
    "intuition": "Like a job applicant: Applied (New), Interviewing (Running), Waiting for background check (Blocked), Available to hire (Ready), Hired/Rejected (Terminated).",
    "coreProperties": [
      "New",
      "Ready",
      "Running",
      "Waiting",
      "Terminated"
    ],
    "hasContent": true
  },
  "os_m1_15": {
    "overview": "The OS is responsible for managing the lifecycle and scheduling of processes.",
    "formal": "OS duties include creating/deleting processes, suspending/resuming processes, providing mechanisms for synchronization, communication, and deadlock handling.",
    "intuition": "The project manager that hires workers (create), assigns them desks (memory), tells them when to work (schedule), and fires them (terminate).",
    "coreProperties": [
      "Creation via fork()",
      "Termination via exit()",
      "Scheduling"
    ],
    "hasContent": true
  },
  "os_m1_16": {
    "overview": "The Process Control Block (PCB) represents a process in the OS.",
    "formal": "PCB contains the process state, program counter, CPU registers, CPU-scheduling information, memory-management info, accounting info, and I/O status. Context switching saves the state of the old process into its PCB and loads the state of the new process.",
    "intuition": "A PCB is like a saved game file. When you switch games (context switch), you save your progress in the current game so you can resume exactly where you left off later.",
    "coreProperties": [
      "State preservation",
      "High overhead cost",
      "Driven by hardware interrupts"
    ],
    "hasContent": true
  },
  "os_m1_17": {
    "overview": "An interrupt is a hardware or software signal that demands immediate CPU attention.",
    "formal": "Hardware interrupts stop the CPU, save its state, and transfer execution to an Interrupt Service Routine (ISR). Software interrupts (traps/exceptions) occur due to errors (div-by-zero) or system calls.",
    "intuition": "You're reading a book (CPU running). The phone rings (interrupt). You put a bookmark in (save state), answer the phone (ISR), and then resume reading.",
    "coreProperties": [
      "Asynchronous hardware signals",
      "Synchronous software traps",
      "Interrupt Vector Table"
    ],
    "hasContent": true
  },
  "os_m1_18": {
    "overview": "Mechanisms for processes to communicate and synchronize their actions.",
    "formal": "IPC is handled either through Shared Memory (processes map the same region of memory) or Message Passing (OS handles send/receive messages). Required for cooperating processes.",
    "intuition": "Shared Memory is like a whiteboard everyone can write on. Message Passing is like sending emails to each other.",
    "coreProperties": [
      "Shared Memory",
      "Message Passing",
      "Pipes",
      "Sockets"
    ],
    "hasContent": true
  },
  "os_m1_19": {
    "overview": "A thread is a basic unit of CPU utilization.",
    "formal": "A thread comprises a thread ID, a program counter, a register set, and a stack. It shares with other threads belonging to the same process its code section, data section, and OS resources (like open files).",
    "intuition": "If a process is a factory, threads are the workers inside it. They share the same tools and building (code/data), but each worker has their own task (stack/PC).",
    "coreProperties": [
      "Lightweight process",
      "Shared data and heap",
      "Private stack and registers"
    ],
    "hasContent": true
  },
  "os_m1_20": {
    "overview": "Threads, like processes, have a lifecycle.",
    "formal": "Thread states mirror process states: New, Ready, Running, Blocked, Terminated. However, if a user-level thread blocks for I/O, the entire process might block if the OS isn't thread-aware.",
    "intuition": "The states of an individual worker within the factory. They can be working, waiting for parts, or taking a break.",
    "coreProperties": [
      "New",
      "Ready",
      "Running",
      "Blocked",
      "Terminated"
    ],
    "hasContent": true
  },
  "os_m1_21": {
    "overview": "Operations required to manage the lifecycle of threads.",
    "formal": "Thread Creation (spawning a new execution path), Thread Joining (waiting for a thread to terminate), Thread Yielding (voluntarily giving up the CPU), and Thread Cancellation (terminating a thread before it finishes).",
    "intuition": "Assigning a worker a task (create), waiting for them to finish (join), or pulling them off the floor (cancel).",
    "coreProperties": [
      "pthread_create",
      "pthread_join",
      "Cancellation points"
    ],
    "hasContent": true
  },
  "os_m1_22": {
    "overview": "How user-level threads map to kernel-level threads.",
    "formal": "Many-to-One (many user threads to one kernel thread - block one blocks all), One-to-One (each user thread maps to a kernel thread - high overhead), Many-to-Many (multiplexes many user threads to a smaller/equal number of kernel threads).",
    "intuition": "Like airline ticketing: Many-to-One is one agent for many passengers (bottleneck). One-to-One is one agent per passenger (expensive). Many-to-Many is a pool of agents serving a pool of passengers (efficient).",
    "coreProperties": [
      "Many-to-One",
      "One-to-One",
      "Many-to-Many"
    ],
    "hasContent": true
  },
  "os_m1_23": {
    "overview": "The basis of multiprogrammed operating systems.",
    "formal": "CPU scheduling selects a process from the ready queue and allocates the CPU to it. The goal is to maximize CPU utilization by switching to a new process whenever the current process must wait for I/O.",
    "intuition": "The manager deciding which employee gets to use the single expensive piece of equipment next.",
    "coreProperties": [
      "Maximizes utilization",
      "Driven by the Short-Term Scheduler"
    ],
    "hasContent": true
  },
  "os_m1_24": {
    "overview": "The OS uses different schedulers for different time horizons.",
    "formal": "Long-term (Job Scheduler): Selects processes from the pool and loads them into memory (controls degree of multiprogramming). Short-term (CPU Scheduler): Selects which process should execute next. Medium-term: Swaps processes out of memory to disk to relieve thrashing.",
    "intuition": "Long-term = admissions office deciding who gets into the university. Short-term = professor deciding who speaks next in class. Medium-term = sending a student to study abroad for a semester to free up dorm space.",
    "coreProperties": [
      "Long-term",
      "Medium-term",
      "Short-term"
    ],
    "hasContent": true
  },
  "os_m1_25": {
    "overview": "How the OS handles processes holding the CPU.",
    "formal": "Non-preemptive (Cooperative): Once the CPU is given to a process, it holds it until it terminates or switches to the waiting state. Preemptive: The OS can interrupt a running process and give the CPU to another process.",
    "intuition": "Non-preemptive: You get the mic and can talk until you finish. Preemptive: The host can cut your mic after 5 minutes and pass it to someone else.",
    "coreProperties": [
      "Preemptive allows time-sharing",
      "Non-preemptive lacks timer interrupts",
      "Preemption requires complex state saving"
    ],
    "hasContent": true
  },
  "os_m1_26": {
    "overview": "The goals a scheduling algorithm attempts to achieve.",
    "formal": "Maximize CPU utilization, maximize throughput, minimize turnaround time, minimize waiting time, and minimize response time. Trade-offs exist (e.g., minimizing response time might increase context switches, lowering throughput).",
    "intuition": "Balancing the need to serve many customers quickly vs the overhead of constantly switching between them.",
    "coreProperties": [
      "Utilization",
      "Throughput",
      "Turnaround Time",
      "Waiting Time",
      "Response Time"
    ],
    "hasContent": true
  },
  "os_m1_27": {
    "overview": "Metrics used to compare CPU scheduling algorithms.",
    "formal": "CPU Utilization (% of time CPU is busy), Throughput (processes completed per time unit), Turnaround Time (submission to completion), Waiting Time (time spent in ready queue), Response Time (submission to first output).",
    "intuition": "The scorecard for evaluating a manager's performance.",
    "coreProperties": [
      "Higher is better: Utilization, Throughput",
      "Lower is better: TAT, WT, RT"
    ],
    "revisionSummary": "Formulas: TAT = CT - AT, WT = TAT - BT, RT = First CPU Start - AT",
    "hasContent": true
  },
  "os_m1_28": {
    "overview": "Assigning importance to processes.",
    "formal": "Priority can be internal (memory requirements, file limits) or external (user importance, financial priority). Static priorities don't change, while dynamic priorities adjust (e.g., aging to prevent starvation).",
    "intuition": "VIP passes at an amusement park. VIPs jump the queue.",
    "coreProperties": [
      "Internal vs External",
      "Static vs Dynamic",
      "Aging prevents Starvation"
    ],
    "hasContent": true
  },
  "os_m1_29": {
    "hasContent": true,
    "overview": "First-Come, First-Served (FCFS) is the simplest CPU scheduling algorithm. Processes are assigned the CPU in the order they request it.",
    "formal": "FCFS is a non-preemptive scheduling algorithm managed with a FIFO queue. When a process enters the ready queue, its PCB is linked to the tail.",
    "intuition": "It's exactly like a checkout line at a grocery store.",
    "coreProperties": [
      "Non-preemptive",
      "FIFO Queue Implementation",
      "Susceptible to Convoy Effect"
    ],
    "workedExamples": [
      {
        "problem": "Calculate Turnaround Time (TAT) and Waiting Time (WT) for FCFS given processes: P1(AT:0, BT:24), P2(AT:1, BT:3), P3(AT:2, BT:3)",
        "solution": "1. Gantt Chart: | P1 (0-24) | P2 (24-27) | P3 (27-30) |\n2. Completion Time (CT): P1=24, P2=27, P3=30\n3. TAT (CT - AT):\n   P1 = 24 - 0 = 24\n   P2 = 27 - 1 = 26\n   P3 = 30 - 2 = 28\n   Avg TAT = 26\n4. WT (TAT - BT):\n   P1 = 24 - 24 = 0\n   P2 = 26 - 3 = 23\n   P3 = 28 - 3 = 25\n   Avg WT = 16",
        "explanation": "Notice how P2 and P3 have very short burst times but suffer massive waiting times because the CPU is tied up by the long P1 process. This is the Convoy Effect."
      }
    ]
  },
  "os_m1_30": {
    "hasContent": true,
    "overview": "Shortest-Job-First (SJF) schedules the process with the smallest next CPU burst time.",
    "formal": "SJF associates with each process the length of its next CPU burst. When the CPU is available, it is assigned to the process that has the smallest next CPU burst.",
    "intuition": "Express lane at the grocery store.",
    "coreProperties": [
      "Optimal for minimum average waiting time",
      "Can cause starvation"
    ],
    "workedExamples": [
      {
        "problem": "Calculate TAT and WT for Non-Preemptive SJF given: P1(AT:0, BT:6), P2(AT:2, BT:2), P3(AT:4, BT:1), P4(AT:5, BT:3)",
        "solution": "1. t=0, only P1 is available. It runs to completion (t=6).\n2. At t=6, P2, P3, P4 are ready. Burst times: P2(2), P3(1), P4(3). P3 is shortest.\n3. Gantt Chart: | P1 (0-6) | P3 (6-7) | P2 (7-9) | P4 (9-12) |\n4. CT: P1=6, P2=9, P3=7, P4=12\n5. TAT (CT - AT): P1=6, P2=7, P3=3, P4=7\n6. WT (TAT - BT): P1=0, P2=5, P3=2, P4=4",
        "explanation": "Even though P2 arrived before P3, P1 finishes at t=6. At t=6 both P2 and P3 are available, so SJF compares their burst times. P3 (1) < P2 (2)."
      }
    ]
  },
  "os_m1_31": {
  "hasContent": true,
  "overview": "Shortest Remaining Time First (SRTF) is the preemptive version of SJF.",
  "formal": "In SRTF, if a new process arrives with a CPU burst length less than the remaining time of the currently executing process, the current process is preempted.",
  "intuition": "Preempts currently running jobs for even shorter ones.",
  "coreProperties": [
    "Preemptive algorithm",
    "Lower average WT than non-preemptive SJF",
    "Starvation for long processes"
  ],
  "workedExamples": [
    {
      "problem": "Calculate TAT and WT for SRTF given: P1(AT:0, BT:8), P2(AT:1, BT:4), P3(AT:2, BT:9), P4(AT:3, BT:5)",
      "solution": "1. t=0: P1 runs. Remaining: P1(8)\n2. t=1: P2 arrives(4). P1 remaining is 7. P2 < P1, so P1 preempted.\n3. t=2: P3 arrives(9). P2 remaining is 3. P2 runs.\n4. t=3: P4 arrives(5). P2 remaining is 2. P2 runs.\n5. t=5: P2 finishes. Ready: P1(7), P3(9), P4(5). P4 runs.\n6. t=10: P4 finishes. Ready: P1(7), P3(9). P1 runs.\n7. t=17: P1 finishes. P3 runs until 26.\nGantt: | P1(0-1) | P2(1-5) | P4(5-10) | P1(10-17) | P3(17-26) |\nCT: P1=17, P2=5, P3=26, P4=10",
      "explanation": "At every arrival tick, the scheduler re-evaluates all ready processes."
    }
  ]
},
  "os_m1_32": {
    "hasContent": true,
    "overview": "Priority Scheduling assigns the CPU to the process with the highest priority.",
    "formal": "A priority number is associated with each process. The CPU is allocated to the process with the highest priority. Equal-priority processes use FCFS.",
    "intuition": "Like a hospital emergency room: treated by how critical the condition is.",
    "coreProperties": [
      "Preemptive or Non-preemptive",
      "Starvation for low-priority",
      "Aging solves starvation"
    ],
    "workedExamples": [
      {
        "problem": "Calculate TAT and WT for Non-Preemptive Priority given: P1(AT:0, BT:10, Pri:3), P2(AT:0, BT:1, Pri:1), P3(AT:0, BT:2, Pri:4), P4(AT:0, BT:1, Pri:5), P5(AT:0, BT:5, Pri:2). (Lower number = higher priority)",
        "solution": "1. All arrive at t=0.\n2. Priorities: P2(1), P5(2), P1(3), P3(4), P4(5).\n3. Gantt: | P2 (0-1) | P5 (1-6) | P1 (6-16) | P3 (16-18) | P4 (18-19) |\n4. CT: P1=16, P2=1, P3=18, P4=19, P5=6\n5. TAT (CT - AT): P1=16, P2=1, P3=18, P4=19, P5=6\n6. WT (TAT - BT): P1=6, P2=0, P3=16, P4=18, P5=1",
        "explanation": "Notice P2 finishes immediately because of its top priority."
      }
    ]
  },
  "os_m1_33": {
    "hasContent": true,
    "overview": "Round Robin (RR) scheduling is designed especially for time-sharing systems.",
    "formal": "A small unit of time, called a time quantum or time slice, is defined. The CPU scheduler goes around the ready queue, allocating the CPU to each process for a time interval of up to 1 time quantum.",
    "intuition": "Think of a fair teacher giving each student exactly 5 minutes of help before moving to the next student in a circle.",
    "coreProperties": [
      "Preemptive",
      "Fair (no starvation)",
      "Performance depends on quantum size"
    ],
    "workedExamples": [
      {
        "problem": "Calculate for RR with Time Quantum = 4. P1(AT:0, BT:24), P2(AT:0, BT:3), P3(AT:0, BT:3)",
        "solution": "1. Queue: P1, P2, P3\n2. t=0-4: P1 runs (remaining 20). Re-enters queue.\n3. t=4-7: P2 runs to completion.\n4. t=7-10: P3 runs to completion.\n5. t=10-30: P1 runs its remaining bursts (4 chunks of 4).\nGantt: | P1(0-4) | P2(4-7) | P3(7-10) | P1(10-14) | P1(14-18) | P1(18-22) | P1(22-26) | P1(26-30) |\nCT: P1=30, P2=7, P3=10",
        "explanation": "P1 is forced to yield the CPU after 4 ms, allowing P2 and P3 to finish early."
      }
    ]
  },
  "os_m1_34": {
    "overview": "Partitions the ready queue into several separate queues.",
    "formal": "Processes are permanently assigned to one queue based on properties (e.g., foreground vs background). Each queue has its own scheduling algorithm. There must be scheduling between the queues (usually strict preemptive priority).",
    "intuition": "VIP lane and Economy lane at the airport. VIP uses Round Robin, Economy uses FCFS. Economy only moves when VIP lane is empty.",
    "coreProperties": [
      "Multiple queues",
      "No process migration",
      "Foreground vs Background"
    ],
    "hasContent": true
  },
  "os_m1_35": {
    "overview": "Similar to Multilevel Queue, but allows processes to move between queues.",
    "formal": "If a process uses too much CPU time, it is moved to a lower-priority queue (leaves I/O bound and interactive processes in higher queues). If a process waits too long, it is moved to a higher-priority queue (aging).",
    "intuition": "If a VIP takes too long talking to the agent, they get kicked to the Economy line. If an Economy passenger waits hours, they get bumped up to VIP.",
    "coreProperties": [
      "Prevents starvation via aging",
      "Most complex scheduling algorithm",
      "Self-adjusting based on process behavior"
    ],
    "hasContent": true
  },
  "os_m1_36": {
    "overview": "Process execution consists of an alternating cycle of CPU execution and I/O wait.",
    "formal": "Processes alternate between CPU bursts (computations) and I/O bursts. I/O-bound programs have many short CPU bursts. CPU-bound programs have a few very long CPU bursts.",
    "intuition": "You calculate numbers for a minute (CPU burst), then ask the user for input and wait (I/O burst), then calculate again.",
    "coreProperties": [
      "CPU Burst",
      "I/O Burst",
      "Dictates scheduling algorithm efficiency"
    ],
    "hasContent": true
  },
  "os_m1_37": {
    "overview": "The components that decide who runs, and actually perform the switch.",
    "formal": "The CPU Scheduler selects a process from the ready queue. The Dispatcher gives control of the CPU to the process selected by the scheduler (involves context switching, switching to user mode, and jumping to the correct memory location).",
    "intuition": "The Scheduler is the judge deciding who fights next. The Dispatcher is the referee who physically brings them to the ring and rings the bell.",
    "coreProperties": [
      "Scheduler = decision maker",
      "Dispatcher = execution mechanism",
      "Dispatch latency"
    ],
    "hasContent": true
  },
  "os_m1_38": {
    "overview": "The time spent switching between processes.",
    "formal": "During a context switch, the CPU does no useful computational work. The state of the current process is saved to its PCB, and the state of the new process is loaded. Heavy usage of preemption (small time quantums) increases this overhead.",
    "intuition": "The time it takes to put away your math homework and take out your history homework. If you switch every 2 minutes, you spend all your time swapping books.",
    "coreProperties": [
      "Pure overhead",
      "Hardware dependent",
      "Affects throughput"
    ],
    "hasContent": true
  },
  "os_m1_39": {
    "overview": "Scheduling resources based on active demand.",
    "formal": "Often used in memory (Demand Paging) but in scheduling, it refers to systems where CPU time is allocated strictly based on active, explicit requests or real-time event triggers rather than a static polling loop.",
    "intuition": "Instead of asking every worker 'do you need help?' every 5 minutes, you wait for them to press a 'Help' button.",
    "coreProperties": [
      "Event-driven",
      "Efficient for sparse workloads"
    ],
    "hasContent": true
  },
  "os_m1_40": {
    "overview": "Scheduling for systems with strict timing constraints.",
    "formal": "Hard real-time systems require a process to be completed within a guaranteed time. Soft real-time systems require that critical processes receive priority over less fortunate ones. Uses algorithms like Rate Monotonic or Earliest Deadline First (EDF).",
    "intuition": "Scheduling trains on a single track. Missing a deadline by 1 second causes a collision.",
    "coreProperties": [
      "Rate Monotonic (Static Priority)",
      "EDF (Dynamic Priority)",
      "Deterministic latency required"
    ],
    "hasContent": true
  },
  "os_m1_41": {
    "overview": "How threads are scheduled onto the CPU.",
    "formal": "Process-Contention Scope (PCS): Thread library schedules user threads onto available LWP (kernel threads). System-Contention Scope (SCS): The kernel schedules kernel threads onto CPUs. In 1:1 models (like Linux/Windows), only SCS exists.",
    "intuition": "PCS is a department manager dividing tasks among their team. SCS is the CEO deciding which department gets funding.",
    "coreProperties": [
      "PCS (Local)",
      "SCS (Global)",
      "Pthread scheduling parameters"
    ],
    "hasContent": true
  },
  "os_m1_42": {
    "overview": "Scheduling when multiple CPUs are available.",
    "formal": "Asymmetric Multiprocessing: Only one processor accesses system data structures (reduces need for data sharing). Symmetric Multiprocessing (SMP): Each processor is self-scheduling, examining a common ready queue or private queues.",
    "intuition": "Load balancing multiple checkout lanes. You can either have one big line feeding all cashiers (common queue) or separate lines for each cashier (private queues).",
    "coreProperties": [
      "SMP is standard",
      "Processor Affinity (Cache warmth)",
      "Load Balancing (Push/Pull migration)"
    ],
    "hasContent": true
  },
  "os_m2_1": {
    "overview": "Concurrent access to shared data may result in data inconsistency.",
    "formal": "Maintaining data consistency requires mechanisms to ensure the orderly execution of cooperating processes. The classic example is the bounded-buffer problem where concurrent producer and consumer access can corrupt the counter.",
    "intuition": "Two people trying to update the same shared bank account at the exact same millisecond. Without coordination, one deposit gets overwritten.",
    "coreProperties": [
      "Data inconsistency",
      "Race conditions",
      "Requires coordination mechanisms"
    ],
    "hasContent": true
  },
  "os_m2_2": {
    "overview": "The three criteria a solution to the critical-section problem must satisfy.",
    "formal": "1. Mutual Exclusion: Only one process in the CS. 2. Progress: If no process is in the CS and some wish to enter, the selection cannot be postponed indefinitely. 3. Bounded Waiting: A bound exists on how many times others can enter after a process has made a request to enter.",
    "intuition": "1. Only one in the bathroom. 2. The bathroom can't remain empty if people are in line. 3. No one can cut the line forever (fairness).",
    "coreProperties": [
      "Mutual Exclusion",
      "Progress (No deadlock)",
      "Bounded Waiting (No starvation)"
    ],
    "hasContent": true
  },
  "os_m2_3": {
    "overview": "Designing a protocol that processes can use to cooperate safely.",
    "formal": "A critical section is a segment of code where the process accesses shared variables, updates tables, or writes to files. The system must ensure that when one process is in its critical section, no other process is in its critical section.",
    "intuition": "A single-stall public restroom. The critical section is inside the restroom. You must lock the door (entry section) so no one else enters.",
    "coreProperties": [
      "Entry section",
      "Critical section",
      "Exit section",
      "Remainder section"
    ],
    "hasContent": true
  },
  "os_m2_4": {
    "overview": "The three criteria a solution to the critical-section problem must satisfy.",
    "formal": "1. Mutual Exclusion: Only one process in the CS. 2. Progress: If no process is in the CS and some wish to enter, the selection cannot be postponed indefinitely. 3. Bounded Waiting: A bound exists on how many times others can enter after a process has made a request to enter.",
    "intuition": "1. Only one in the bathroom. 2. The bathroom can't remain empty if people are in line. 3. No one can cut the line forever (fairness).",
    "coreProperties": [
      "Mutual Exclusion",
      "Progress (No deadlock)",
      "Bounded Waiting (No starvation)"
    ],
    "hasContent": true
  },
  "os_m2_5": {
    "overview": "Algorithmic approaches to synchronization without hardware assistance.",
    "formal": "Historical algorithms (like Dekker's) that rely purely on shared variables (flags, turns) to enforce mutual exclusion. They assume atomic load and store operations but often fail on modern superscalar processors due to instruction reordering.",
    "intuition": "Using a physical 'Do Not Disturb' sign and a notebook to agree on whose turn it is.",
    "coreProperties": [
      "No hardware support required",
      "Vulnerable to instruction reordering",
      "Often restricted to 2 processes"
    ],
    "hasContent": true
  },
  "os_m2_6": {
  "hasContent": true,
  "overview": "Peterson's Solution is a classic software-based solution to the critical-section problem for two processes.",
  "formal": "It uses two shared variables: 'turn' (whose turn is it to enter) and 'flag' (boolean array indicating readiness to enter). A process sets its flag to true, sets turn to the OTHER process, and waits while (flag[other] && turn == other).",
  "intuition": "Using a physical 'Do Not Disturb' sign and a notebook to politely agree on whose turn it is.",
  "coreProperties": [
    "Software solution",
    "Restricted to 2 processes",
    "Guarantees Mutual Exclusion, Progress, and Bounded Waiting",
    "Fails on modern architectures due to reordering"
  ]
},
  "os_m2_7": {
    "overview": "Hardware instructions designed to make synchronization easier and safer.",
    "formal": "Modern architectures provide special atomic hardware instructions—like Test-and-Set or Compare-and-Swap—that allow us to test and modify the content of a word or swap two words atomically (uninterruptibly).",
    "intuition": "A mechanical lock that can both be checked and turned in a single physical motion that cannot be interrupted.",
    "coreProperties": [
      "Atomic instructions",
      "Foundation for modern locks",
      "Solves multiprocessor sync issues"
    ],
    "hasContent": true
  },
  "os_m2_8": {
    "overview": "An atomic hardware instruction used for synchronization.",
    "formal": "A boolean function that reads a variable and sets it to true, returning the original value, all as one uninterruptible atomic operation. Used to implement simple spinlocks.",
    "intuition": "Reaching out, checking if a light switch is off, and turning it on in a single split-second movement. If it was already on, you know someone else is in the room.",
    "coreProperties": [
      "Hardware instruction",
      "Atomic execution",
      "Used for spinlocks"
    ],
    "hasContent": true
  },
  "os_m2_9": {
    "overview": "A powerful atomic instruction that conditionally updates a variable.",
    "formal": "It takes three operands (address, expected_value, new_value). It updates the address with new_value ONLY if the current value matches expected_value, returning the original value atomically.",
    "intuition": "'I will only change the price tag to $10 if it currently says $5.' If someone else changed it to $7 while you weren't looking, your operation fails safely.",
    "coreProperties": [
      "Atomic",
      "CAS instruction",
      "Foundation of lock-free data structures"
    ],
    "hasContent": true
  },
  "os_m2_10": {
    "overview": "The simplest software tool used to solve the critical-section problem.",
    "formal": "A mutex (mutual exclusion) lock protects critical regions. A process must acquire the lock before entering the critical section and release it when exiting. Often implemented using a boolean variable and spinlocks.",
    "intuition": "A literal physical key to a room. You take the key (acquire), go inside, do your work, leave, and put the key back (release).",
    "coreProperties": [
      "acquire() and release()",
      "Can cause busy waiting (Spinlocks)",
      "Simplest synchronization tool"
    ],
    "hasContent": true
  },
  "os_m2_11": {
    "overview": "A semaphore with an integer value that can range only between 0 and 1.",
    "formal": "Binary semaphores behave exactly like mutex locks. They are used to ensure mutual exclusion. If initialized to 1, the first wait() succeeds, and subsequent wait()s block until signal().",
    "intuition": "A simple occupied/vacant sign on a bathroom door.",
    "coreProperties": [
      "Values: 0 or 1",
      "Equivalent to Mutex",
      "Solves Mutual Exclusion"
    ],
    "hasContent": true
  },
  "os_m2_12": {
    "overview": "The two atomic operations that define a Semaphore.",
    "formal": "wait(S) or P(S): Decrements the semaphore value. If S <= 0, it blocks until S > 0. signal(S) or V(S): Increments the semaphore value, waking up a waiting process if one exists.",
    "intuition": "Wait() is taking a ticket from a dispenser. If it's empty, you wait. Signal() is the clerk putting a new ticket into the dispenser.",
    "coreProperties": [
      "Atomic operations",
      "Historically P() and V()",
      "No other way to access a semaphore"
    ],
    "hasContent": true
  },
  "os_m2_13": {
    "overview": "A semaphore with an integer value that can range only between 0 and 1.",
    "formal": "Binary semaphores behave exactly like mutex locks. They are used to ensure mutual exclusion. If initialized to 1, the first wait() succeeds, and subsequent wait()s block until signal().",
    "intuition": "A simple occupied/vacant sign on a bathroom door.",
    "coreProperties": [
      "Values: 0 or 1",
      "Equivalent to Mutex",
      "Solves Mutual Exclusion"
    ],
    "hasContent": true
  },
  "os_m2_14": {
    "overview": "A semaphore whose value can range over an unrestricted domain.",
    "formal": "Used to control access to a given resource consisting of a finite number of instances. The semaphore is initialized to the number of available resources.",
    "intuition": "A parking lot with 50 spaces. The sign says '50'. Every car entering decrements the sign. At 0, the gate won't open until a car leaves (increments the sign).",
    "coreProperties": [
      "Tracks resource counts",
      "Solves bounded buffer problems"
    ],
    "hasContent": true
  },
  "os_m2_15": {
    "overview": "A classic synchronization problem illustrating deadlock and starvation.",
    "formal": "Five philosophers sit at a table with five chopsticks. A philosopher needs two chopsticks (left and right) to eat. If everyone picks up their left chopstick simultaneously, a deadlock occurs.",
    "intuition": "Everyone has half of what they need to eat, but no one is willing to put their half down to let someone else finish.",
    "coreProperties": [
      "Demonstrates Deadlock",
      "Demonstrates Starvation",
      "Solved via asymmetric locking or a monitor"
    ],
    "hasContent": true
  },
  "os_m2_16": {
    "overview": "A classic synchronization problem involving a barber, a chair, and a waiting room.",
    "formal": "The barber sleeps if there are no customers. A customer wakes the barber. If the barber is busy, the customer waits if there are empty chairs, or leaves if the room is full.",
    "intuition": "Managing a queue with finite space where the worker (barber) and consumers (customers) must safely signal each other to avoid waking up an already awake barber or sleeping when a customer is waiting.",
    "coreProperties": [
      "Producer-Consumer variant",
      "Uses semaphores for waiting room count"
    ],
    "hasContent": true
  },
  "os_m2_17": {
    "overview": "Standard problems used to test newly proposed synchronization schemes.",
    "formal": "Includes the Bounded-Buffer (Producer-Consumer) Problem, Readers-Writers Problem, and Dining-Philosophers Problem. They represent real-world OS design challenges like networking buffers or database read/write locks.",
    "intuition": "The standard 'stress tests' in computer science for proving that your locking mechanism doesn't cause crashes, deadlocks, or starvation.",
    "coreProperties": [
      "Bounded-Buffer",
      "Readers-Writers",
      "Dining-Philosophers"
    ],
    "hasContent": true
  },
  "os_m2_18": {
    "overview": "A situation where a set of processes are permanently blocked.",
    "formal": "A deadlock occurs when a set of blocked processes each hold a resource and wait to acquire a resource held by another process in the set, creating a circular wait.",
    "intuition": "Four cars arrive at a 4-way stop at the exact same time. The rules say yield to the right. Everyone yields to the right in a circle, so nobody ever moves.",
    "coreProperties": [
      "Permanent blocking",
      "Requires cyclical dependency"
    ],
    "hasContent": true
  },
  "os_m2_19": {
    "overview": "Real-world and systemic examples of deadlock.",
    "formal": "Systemic: P1 holds Printer and wants Scanner. P2 holds Scanner and wants Printer. Database: Transaction A locks Row 1, wants Row 2. Transaction B locks Row 2, wants Row 1.",
    "intuition": "You have the key to the vault, but you need the passcode. Your partner has the passcode, but they need the key. Neither will give up what they have.",
    "coreProperties": [
      "Resource contention",
      "Database locking",
      "Message passing deadlocks"
    ],
    "hasContent": true
  },
  "os_m2_20": {
    "overview": "Resources are the entities that processes request, use, and release.",
    "formal": "A process must request a resource before using it and must release it after. Resources can be preemptable (CPU, memory) or non-preemptable (Printers, mutex locks). Deadlocks usually involve non-preemptable resources.",
    "intuition": "Books in a library. You check them out (request), read them (use), and return them (release).",
    "coreProperties": [
      "Request -> Use -> Release",
      "Preemptable vs Non-preemptable"
    ],
    "hasContent": true
  },
  "os_m2_21": {
    "overview": "Resources are partitioned into types, each with a number of identical instances.",
    "formal": "If a system has two identical printers, 'Printer' is the resource type, and there are 2 instances. Requesting an instance of a type can be satisfied by ANY available instance of that type.",
    "intuition": "You don't care WHICH of the 5 identical coffee machines you use, you just need ONE coffee machine.",
    "coreProperties": [
      "Resource Types (R1, R2...)",
      "Instances (W1, W2...)"
    ],
    "hasContent": true
  },
  "os_m2_22": {
    "overview": "The formal framework for describing deadlocks.",
    "formal": "Deadlock can be characterized theoretically by the four necessary conditions, and visually modeled using a Resource-Allocation Graph.",
    "intuition": "The theoretical checklist an OS uses to prove mathematically whether a system is stuck forever.",
    "coreProperties": [
      "Coffman Conditions",
      "Graph modeling"
    ],
    "hasContent": true
  },
  "os_m2_23": {
    "overview": "Deadlock can arise ONLY if four conditions hold simultaneously.",
    "formal": "1. Mutual exclusion (non-sharable resource). 2. Hold and wait (process holding a resource waits for another). 3. No preemption (resources cannot be forcibly taken). 4. Circular wait (P0 waits for P1, P1 waits for P2... Pn waits for P0).",
    "intuition": "If you can break even ONE of these rules (e.g., allow stealing resources, or allow sharing), a deadlock is physically impossible.",
    "coreProperties": [
      "Mutual Exclusion",
      "Hold & Wait",
      "No Preemption",
      "Circular Wait"
    ],
    "hasContent": true
  },
  "os_m2_24": {
    "overview": "A directed graph used to precisely describe deadlocks.",
    "formal": "Consists of Process nodes (Circles) and Resource nodes (Squares). Request edge: Process -> Resource. Assignment edge: Resource -> Process. A cycle in the graph indicates a deadlock IF each resource type has exactly one instance.",
    "intuition": "A map of arrows. If you can follow the arrows in a circle, you have a traffic jam (deadlock).",
    "coreProperties": [
      "P = Process set",
      "R = Resource set",
      "Cycles indicate potential deadlock"
    ],
    "hasContent": true
  },
  "os_m2_25": {
    "overview": "The three standard strategies an OS uses to deal with deadlocks.",
    "formal": "1. Ignore the problem (Ostrich algorithm - used by Linux/Windows). 2. Use protocols to prevent or avoid deadlocks. 3. Allow deadlocks to occur, detect them, and recover.",
    "intuition": "1. Pretend it never happens and reboot if it does. 2. Build a rigid system so it can't happen. 3. Install an alarm system to fix it when it happens.",
    "coreProperties": [
      "Prevention",
      "Avoidance",
      "Detection/Recovery",
      "Ostrich Algorithm"
    ],
    "hasContent": true
  },
  "os_m2_26": {
    "overview": "Provides a set of methods to ensure that at least one of the necessary conditions cannot hold.",
    "formal": "Constrains how requests can be made. Break Hold & Wait: require processes to request all resources at start. Break No Preemption: preempt resources if requested is unavailable. Break Circular Wait: impose a total ordering of all resource types.",
    "intuition": "Creating physical laws so a traffic jam can't exist (e.g., making all streets one-way strictly north-to-south).",
    "coreProperties": [
      "Breaks 1 of 4 conditions",
      "Often leads to low device utilization",
      "Imposes strict structural rules"
    ],
    "hasContent": true
  },
  "os_m2_27": {
    "overview": "Requires that the OS be given additional information in advance concerning which resources a process will request.",
    "formal": "The system dynamically examines the resource-allocation state to ensure there can never be a circular-wait condition. It requires the 'Max' claim of each process a priori. Uses the Safe State and Banker's Algorithm.",
    "intuition": "A bank checking your credit limit and their vault cash before approving a loan, ensuring they never go bankrupt.",
    "coreProperties": [
      "Requires a priori information",
      "Safe State checking",
      "Banker's Algorithm"
    ],
    "hasContent": true
  },
  "os_m2_28": {
    "overview": "A state where the system can allocate resources to each process in some order without deadlocking.",
    "formal": "A state is safe if there exists a Safe Sequence <P1, P2, ... Pn> of all processes such that for each Pi, the resources Pi can still request can be satisfied by currently available resources plus the resources held by all previously finished Pj.",
    "intuition": "You have just enough cash in the vault to pay off Customer 1, who will then deposit a huge check, giving you enough cash to pay Customer 2, and so on.",
    "coreProperties": [
      "Safe Sequence exists",
      "Safe State -> NO Deadlock",
      "Unsafe State -> Potential Deadlock"
    ],
    "hasContent": true
  },
  "os_m2_29": {
    "hasContent": true,
    "overview": "Banker's Algorithm is a resource allocation and deadlock avoidance algorithm.",
    "formal": "When a new process enters the system, it must declare the maximum number of instances of each resource type it may need. When a user requests a set of resources, the system determines if allocation leaves the system in a safe state.",
    "intuition": "A bank won't loan out money unless it can guarantee that eventually, everyone will pay back their loans. It needs a 'safe sequence'.",
    "coreProperties": [
      "Deadlock Avoidance",
      "Requires Max resources in advance",
      "Less restrictive than Deadlock Prevention"
    ],
    "workedExamples": [
      {
        "problem": "Find if system is safe. Available=[3,3,2]. Max: P0=[7,5,3], P1=[3,2,2], P2=[9,0,2], P3=[2,2,2], P4=[4,3,3]. Allocation: P0=[0,1,0], P1=[2,0,0], P2=[3,0,2], P3=[2,1,1], P4=[0,0,2].",
        "solution": "1. Calculate Need Matrix (Max - Allocation):\nP0 = [7,4,3]\nP1 = [1,2,2]\nP2 = [6,0,0]\nP3 = [0,1,1]\nP4 = [4,3,1]\n\n2. Check Safety (Work = [3,3,2]):\n- P1 Need [1,2,2] <= Work [3,3,2]. Execute P1. Work += P1_Alloc => [5,3,2]\n- P3 Need [0,1,1] <= Work [5,3,2]. Execute P3. Work += P3_Alloc => [7,4,3]\n- P4 Need [4,3,1] <= Work [7,4,3]. Execute P4. Work += P4_Alloc => [7,4,5]\n- P0 Need [7,4,3] <= Work [7,4,5]. Execute P0. Work += P0_Alloc => [7,5,5]\n- P2 Need [6,0,0] <= Work [7,5,5]. Execute P2. Work += P2_Alloc => [10,5,7]\n\nSafe Sequence: <P1, P3, P4, P0, P2>",
        "explanation": "Because a safe sequence exists, the system is in a safe state and deadlock is avoided."
      }
    ]
  },
  "os_m2_30": {
    "overview": "The second half of Banker's Algorithm that actually processes requests.",
    "formal": "When Pi requests resources, check if Request <= Need, then check if Request <= Available. If so, pretend to allocate (Available -= Request, Allocation += Request, Need -= Request) and run the Safety Algorithm. If safe, grant; else, Pi must wait.",
    "intuition": "The bank teller doing the math on scratch paper before officially handing you the cash.",
    "coreProperties": [
      "Modifies state hypothetically",
      "Calls Safety Algorithm"
    ],
    "hasContent": true
  },
  "os_m2_31": {
    "overview": "If a system does not employ avoidance or prevention, it must detect deadlocks.",
    "formal": "The OS runs an algorithm periodically to examine the state of the system and determine whether a deadlock has occurred. For single instances, it uses a Wait-For Graph cycle detection. For multiple instances, it uses an algorithm similar to Banker's.",
    "intuition": "A helicopter flying over the city looking for traffic gridlocks.",
    "coreProperties": [
      "O(V+E) for single instance",
      "O(m x n^2) for multiple instances",
      "High runtime overhead"
    ],
    "hasContent": true
  },
  "os_m2_32": {
    "overview": "A simplified Resource-Allocation Graph for single-instance resource systems.",
    "formal": "Created by removing the resource nodes and collapsing the edges. An edge from Pi to Pj exists if Pi is waiting for a resource held by Pj. A cycle in the wait-for graph is necessary and sufficient for a deadlock.",
    "intuition": "Just mapping who is waiting for whom. If Bob waits for Alice, Alice waits for Charlie, and Charlie waits for Bob, you have a circle of waiting.",
    "coreProperties": [
      "Single-instance resources only",
      "Cycle detection algorithm used"
    ],
    "hasContent": true
  },
  "os_m2_33": {
    "overview": "The process of breaking a deadlock once detected.",
    "formal": "Process Termination: Abort all deadlocked processes (expensive), or abort one at a time until the deadlock cycle is eliminated. Resource Preemption: Successively preempt some resources from processes and give them to others until the deadlock is broken (requires rolling back the preempted process).",
    "intuition": "Sending a tow truck to forcibly remove a car from the traffic jam, or making a car reverse out of the intersection.",
    "coreProperties": [
      "Process Abortion",
      "Resource Preemption",
      "Rollback",
      "Victim Selection"
    ],
    "hasContent": true
  }
};
