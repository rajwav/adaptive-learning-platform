import { batch2Extensions } from './osBatch2Extensions';
import { batch2Foundations } from './osBatch2Foundations';
import { batch2Sync } from './osBatch2Sync';
import { batch2Deadlocks } from './osBatch2Deadlocks';
import { TopicContent } from '@/lib/content/types';

export const osContent: Record<string, TopicContent> = {
  "os_m1_1": {
    "overview": "An Operating System (OS) is the most critical software that manages computer hardware and software resources, acting as an intermediary between the user and the hardware.",
    "formal": "The OS is a resource allocator and control program. As a resource allocator, it manages CPU time, memory space, file-storage space, and I/O devices, resolving conflicting requests for efficient and fair resource use. As a control program, it manages the execution of user programs to prevent errors and improper use of the computer.",
    "intuition": "Think of an OS as a government. It performs no useful function by itself, but provides an environment where other programs can do useful work.",
    "coreProperties": [
      "Resource Allocation",
      "Control Program",
      "Hardware Abstraction",
      "Execution Environment"
    ],
    "hasContent": true,
    "detailedExplanation": "A computer system consists of four components: Hardware, Operating System, Application Programs, and Users. The OS sits directly above the hardware. Its primary goals are:\n1. **Convenience:** Make the computer system convenient to use.\n2. **Efficiency:** Use the computer hardware in an efficient manner.\n3. **Ability to evolve:** Permit effective development, testing, and introduction of new system functions without interfering with service.",
    "keyPoints": [
      "Intermediary between user and hardware.",
      "Resource Allocator (CPU, Memory, I/O).",
      "Control Program (prevents errors/bad execution)."
    ],
    "examNotes": "A classic exam question asks for the dual role of the OS: Resource Allocator and Control Program. Make sure to define both.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_2": {
    "overview": "A Simple Batch System executes a series of jobs in batches without user interaction, minimizing setup time by grouping similar jobs.",
    "formal": "Early computers ran one job at a time. To speed up processing, operators batched together jobs with similar needs and ran them through the computer as a group. A resident monitor automatically transferred control from one job to the next.",
    "intuition": "Like a commercial laundry service. You don't wash one shirt at a time. You wait until you have a massive batch of whites, load them all, and run the cycle.",
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
    "hasContent": true,
    "detailedExplanation": "The major problem with simple batch systems is that the CPU is often idle because the speeds of the mechanical I/O devices are much slower than those of electronic devices (CPU). If a job needs to wait for a tape to rewind, the CPU just sits idle.\n\n**Key component:** The Resident Monitor. It was the precursor to modern operating systems. It stayed in memory and simply transferred control to the next job when the current one finished.",
    "keyPoints": [
      "No direct user interaction during execution.",
      "High CPU idle time during I/O operations.",
      "Led to the development of multiprogramming."
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m1_3": {
    "overview": "Multiprogramming increases CPU utilization by organizing jobs so that the CPU always has one to execute.",
    "formal": "Multiprogramming keeps several jobs in memory simultaneously. The OS picks and begins to execute one of the jobs in memory. If the active job has to wait (e.g., for I/O), the OS simply switches the CPU to another job, preventing the CPU from idling.",
    "intuition": "Like a chef cooking multiple dishes at once. While the soup is boiling (I/O), the chef chops vegetables (CPU) instead of just standing and watching the pot.",
    "coreProperties": [
      "Maximizes CPU utilization",
      "Requires memory management",
      "Job scheduling is introduced",
      "Degree of Multiprogramming",
      "Swapping"
    ],
    "hasContent": true,
    "detailedExplanation": "Multiprogramming is the first instance where the OS must make decisions. It requires:\n1. **Memory Management:** To keep multiple jobs in memory.\n2. **CPU Scheduling:** To choose which job runs next.\n\nThe 'Degree of Multiprogramming' refers to the number of processes currently residing in main memory. 'Swapping' is the mechanism of moving a process temporarily out of main memory into a backing store (disk) and bringing it back later, allowing the system to maintain an optimal degree of multiprogramming even when memory is limited.",
    "keyPoints": [
      "Primary Goal: Maximize CPU utilization.",
      "Introduces the need for CPU Scheduling and Memory Management.",
      "Degree of Multiprogramming = Number of processes in memory."
    ],
    "examNotes": "Be ready to contrast Batch Systems (CPU idles during I/O) with Multiprogramming (CPU switches to another job during I/O).",
    "sourceIndicator": "BOTH"
  },
  "os_m1_4": {
    "overview": "Time-Sharing (multitasking) is a logical extension of multiprogramming where CPU time is interleaved rapidly among multiple users.",
    "formal": "Time-sharing uses CPU scheduling and multiprogramming to provide each user with a small portion of a time-shared computer. Response time should be short (typically < 1 second).",
    "intuition": "Like a chess master playing 10 simultaneous games. They spend a few seconds at each board, but from each opponent's perspective, they are playing a continuous game.",
    "coreProperties": [
      "Interactive environment",
      "Time slices / Quantums",
      "Rapid context switching",
      "Requires robust protection and file systems"
    ],
    "hasContent": true,
    "detailedExplanation": "While multiprogramming maximizes CPU utilization, time-sharing minimizes response time. It creates the illusion that each user has their own dedicated computer. It requires an interactive computer system, which provides direct communication between the user and the system.\n\nTime-sharing introduces complex requirements:\n- Complex CPU scheduling (like Round Robin).\n- Memory management and virtual memory (because all active processes might not fit in main memory).\n- File system and disk management (to store user data securely).",
    "keyPoints": [
      "Primary Goal: Minimize Response Time.",
      "Creates the illusion of a dedicated machine for each user.",
      "Relies heavily on rapid context switching."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_5": {
    "overview": "Personal Computer Systems are dedicated to a single user, prioritizing user convenience and responsiveness over maximizing CPU utilization.",
    "formal": "As hardware costs decreased, it became feasible to dedicate a computer to a single user. The goals of PC operating systems shifted from maximizing CPU and peripheral utilization to maximizing user convenience and responsiveness.",
    "intuition": "Unlike a massive mainframe shared by 100 people, your laptop is yours alone. It's okay if its CPU sits idle 99% of the time, as long as it opens your browser instantly when you click.",
    "coreProperties": [
      "Single user",
      "Focus on usability over utilization",
      "Interactive I/O handling"
    ],
    "hasContent": true,
    "keyPoints": [
      "Single-user environment.",
      "Goal: Convenience and responsiveness.",
      "CPU utilization is no longer the primary concern."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_6": {
    "overview": "Parallel Systems (Multiprocessor Systems) have two or more processors in close communication, sharing the computer bus, clock, memory, and peripheral devices.",
    "formal": "Also known as tightly coupled systems, multiprocessor systems offer three main advantages: increased throughput, economy of scale (sharing peripherals and power), and increased reliability (fault tolerance).",
    "intuition": "Like having multiple chefs in the same kitchen sharing the same fridge and stove, working together to finish orders faster.",
    "coreProperties": [
      "Symmetric Multiprocessing (SMP)",
      "Asymmetric Multiprocessing",
      "Shared Memory"
    ],
    "hasContent": true,
    "workedExamples": [
      {
        "problem": "Exam Focus: Tightly Coupled vs Loosely Coupled Systems",
        "solution": "1. Tightly Coupled (Parallel): Processors share memory and a clock. Communication is highly efficient via shared memory. Used for high-performance computing.\n2. Loosely Coupled (Distributed): Processors have local memory and communicate via message passing over a network. Used for fault tolerance and resource sharing.",
        "explanation": "The key distinction is memory sharing (Tightly) vs message passing (Loosely)."
      }
    ],
    "detailedExplanation": "Parallel systems come in two main flavors:\n1. **Symmetric Multiprocessing (SMP):** Each processor runs an identical copy of the operating system, and they all share the memory. Most modern OSes support SMP.\n2. **Asymmetric Multiprocessing:** Each processor is assigned a specific task. A boss processor controls the system; the others either look to the boss for instruction or have predefined tasks.",
    "keyPoints": [
      "Tightly coupled: Shared memory and clock.",
      "Advantages: Throughput, Economy of scale, Reliability.",
      "SMP (Symmetric) vs Asymmetric."
    ],
    "examNotes": "VSSUT exams often ask for the difference between 'Tightly Coupled' (Parallel) and 'Loosely Coupled' (Distributed) systems. Tightly coupled systems share memory; loosely coupled systems do not.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_7": {
    "overview": "Distributed Systems are a collection of physically separate, possibly heterogeneous computer systems that are networked to provide users with access to various resources.",
    "formal": "Also known as loosely coupled systems. Processors do not share memory or a clock. Instead, each processor has its own local memory. They communicate with one another through various communication lines, such as high-speed buses or telephone lines.",
    "intuition": "Like multiple independent restaurants in a franchise. They operate on their own but coordinate over the phone to share ingredients or handle overflow.",
    "coreProperties": [
      "No shared memory (message passing)",
      "Resource sharing",
      "High availability and fault tolerance"
    ],
    "hasContent": true,
    "detailedExplanation": "Distributed systems depend heavily on networking functionality. They can be structured as client-server networks or peer-to-peer networks. The main advantages are resource sharing, computation speedup (load sharing), reliability (if one site fails, the rest continue), and communication.",
    "keyPoints": [
      "Loosely coupled: No shared memory, no shared clock.",
      "Communicate via network.",
      "Highly fault-tolerant and scalable."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_8": {
    "overview": "Real-Time Systems are used when rigid time requirements have been placed on the operation of a processor or the flow of data.",
    "formal": "A real-time system has well-defined, fixed time constraints. Processing must be done within the defined constraints, or the system will fail. They are divided into hard and soft real-time systems.",
    "intuition": "Like an airbag deployment system. If it deploys 1 second too late, it's completely useless, even if the math was correct.",
    "coreProperties": [
      "Hard real-time (absolute deadlines)",
      "Soft real-time (priority degradation)",
      "Minimal latency"
    ],
    "hasContent": true,
    "detailedExplanation": "**Hard real-time systems:** Guarantee that critical tasks complete on time. Secondary storage is limited or missing, and data is stored in short-term memory or ROM. Virtual memory is almost never found on hard real-time systems.\n\n**Soft real-time systems:** Critical real-time tasks get priority over other tasks and retain that priority until they complete. Less restrictive than hard real-time, but still requires careful priority scheduling.",
    "keyPoints": [
      "Strict timing constraints.",
      "Hard real-time: Missing a deadline is a catastrophic failure (e.g., pacemaker).",
      "Soft real-time: Missing a deadline degrades performance but isn't fatal (e.g., video streaming)."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_9": {
    "overview": "OS Structures and System Components dictate how the operating system is organized and partitioned into manageable pieces.",
    "formal": "Modern OSes are large and complex. They must be engineered carefully. Common structures include Monolithic (MS-DOS, original UNIX), Layered Approach, Microkernel (Mach, QNX), and Modular (modern Linux/Solaris).",
    "intuition": "The departments of a company: HR (processes), Warehousing (memory), Filing (storage), and Security (protection).",
    "coreProperties": [
      "Modular architecture",
      "Layered approach",
      "Microkernel vs Monolithic"
    ],
    "hasContent": true,
    "workedExamples": [
      {
        "problem": "Exam Comparison: Monolithic vs Microkernel Architecture",
        "solution": "1. Monolithic: Entire OS runs in kernel space. High performance (no message passing overhead). Disadvantage: A bug in any driver can crash the entire system.\n2. Microkernel: Only essential services (IPC, basic scheduling) run in kernel space. Other services (file system, drivers) run in user space. High stability and security, but lower performance due to message passing overhead.",
        "explanation": "Monolithic = Fast but fragile. Microkernel = Secure but slower."
      }
    ],
    "detailedExplanation": "- **Monolithic:** Everything (scheduling, file system, networking, device drivers) is packed into a single huge kernel space. Fast, but hard to maintain.\n- **Microkernel:** Moves as much from the kernel into user space as possible. Communication takes place between user modules using message passing. Highly secure and reliable, but suffers from performance overhead due to constant user-to-kernel space switching.\n- **Modules:** The kernel has a core components and links in additional services either at boot time or run time (Loadable Kernel Modules).",
    "keyPoints": [
      "Monolithic: Fast but difficult to maintain.",
      "Microkernel: Minimal kernel, uses message passing, highly reliable but high overhead.",
      "Modules: Best of both worlds, core kernel with dynamically loadable components."
    ],
    "examNotes": "VSSUT syllabus specifically asks for Monolithic vs Microkernel architecture. Memorize that Microkernel uses message passing and is safer because a crash in a user-level service doesn't crash the kernel.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_10": {
    "overview": "The Protection System ensures that the resources of the computer are accessed only in authorized ways by authorized processes.",
    "formal": "Protection is any mechanism for controlling the access of programs, processes, or users to the resources defined by a computer system. This requires a way to distinguish between at least two modes of operation: User Mode and Kernel Mode.",
    "intuition": "Like keycards in an office building. The system tracks who you are and which rooms (files/memory) you are allowed to enter.",
    "coreProperties": [
      "Access control",
      "Authentication",
      "Privilege separation"
    ],
    "hasContent": true,
    "detailedExplanation": "**Dual-Mode Operation:**\nHardware provides a mode bit (0 for kernel, 1 for user). When the system boots, it starts in kernel mode, loads the OS, and then switches to user mode to run user applications. Whenever a user application requests an OS service (via a system call), or an interrupt occurs, the hardware switches back to kernel mode.\n\nPrivileged instructions (like direct I/O access or modifying memory management registers) can ONLY be executed in kernel mode. If a user program tries to execute them, the hardware traps to the OS.",
    "keyPoints": [
      "Requires hardware support (Mode Bit).",
      "User Mode (1) vs Kernel Mode (0).",
      "Privileged instructions can only run in Kernel Mode."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_11": {
    "overview": "OS Services are the functions the operating system provides to programs and to the users of those programs.",
    "formal": "The OS provides an environment for the execution of programs. Services include User Interface, Program Execution, I/O Operations, File-System Manipulation, Communications, Error Detection, Resource Allocation, Accounting, and Protection/Security.",
    "intuition": "Like hotel amenities. Room service, housekeeping, and front desk are provided so you don't have to cook, clean, or unlock the front door yourself.",
    "coreProperties": [
      "User-centric services",
      "System-centric services"
    ],
    "hasContent": true,
    "keyPoints": [
      "Program execution (loading into memory).",
      "I/O operations (since users cannot directly access hardware).",
      "Communications (via shared memory or message passing)."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_12": {
    "overview": "System Calls provide the programmatic interface to the services made available by an operating system.",
    "formal": "A system call is a software interrupt (trap) directed to the operating system. It allows a user-level process to request services from the kernel, such as file I/O or process creation.",
    "intuition": "The official form you must fill out to ask the government (OS) to do something restricted, like reading a file from the hard drive.",
    "coreProperties": [
      "Mode switch (User to Kernel)",
      "API (POSIX, Win32)",
      "Parameters passed via registers or stack"
    ],
    "hasContent": true,
    "detailedExplanation": "When a system call is made, the execution traps to the OS kernel. The caller's state is saved, the OS performs the requested task in kernel mode, and then execution returns to the user process.\n\n**Parameter Passing Methods:**\n1. Pass parameters in registers.\n2. Store parameters in a block/table in memory, and pass the address of the block in a register.\n3. Push parameters onto the stack, and have the OS pop them off.",
    "keyPoints": [
      "The interface between user programs and the OS.",
      "Triggers a switch from user mode to kernel mode.",
      "Typically wrapped by an API (like POSIX or Windows API)."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_13": {
    "overview": "A process is a program in execution. It is the fundamental unit of work in a modern operating system.",
    "formal": "A process is more than the program code (the text section). It includes the current activity, represented by the value of the program counter and the contents of the processor's registers. It also includes the process stack (temporary data) and a data section (global variables).",
    "intuition": "A program is a passive entity (like a recipe on a piece of paper). A process is an active entity (like a chef actually cooking the recipe).",
    "coreProperties": [
      "Active entity",
      "Requires CPU and memory",
      "Has a lifecycle"
    ],
    "hasContent": true,
    "detailedExplanation": "A process in memory is typically divided into four sections:\n1. **Text:** The compiled program code.\n2. **Data:** Global and static variables.\n3. **Heap:** Memory dynamically allocated during run time.\n4. **Stack:** Temporary data like function parameters, return addresses, and local variables.",
    "keyPoints": [
      "Program = Passive; Process = Active.",
      "Contains Text, Data, Heap, and Stack sections."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_14": {
    "overview": "As a process executes, it changes state. The state of a process is defined in part by the current activity of that process.",
    "formal": "A process may be in one of the following states: New (being created), Running (instructions are being executed), Waiting/Blocked (waiting for some event to occur), Ready (waiting to be assigned to a processor), and Terminated (has finished execution).",
    "intuition": "Think of an actor in a play. New (getting dressed), Ready (waiting in the wings), Running (on stage acting), Waiting (waiting for a prop to be brought out), Terminated (going home).",
    "coreProperties": [
      "New",
      "Ready",
      "Running",
      "Waiting",
      "Terminated"
    ],
    "hasContent": true,
    "detailedExplanation": "State Transitions:\n- **New → Ready:** Admitted by the long-term scheduler.\n- **Ready → Running:** Dispatched by the short-term scheduler.\n- **Running → Ready:** Interrupt (e.g., time quantum expires).\n- **Running → Waiting:** I/O or event wait requested.\n- **Waiting → Ready:** I/O or event completion.\n- **Running → Terminated:** Process exits.\n\nOnly ONE process can be running on any processor at any instant, although many processes may be ready and waiting.",
    "keyPoints": [
      "New, Ready, Running, Waiting, Terminated.",
      "The 'Waiting' state is also called 'Blocked' or 'Sleeping'.",
      "A process in the Waiting state CANNOT transition directly to Running; it must go to Ready first."
    ],
    "examNotes": "A very common exam question asks you to draw the Process State Transition Diagram. Make sure to draw arrows exactly as defined (e.g., no arrow from Waiting directly to Running).",
    "sourceIndicator": "BOTH"
  },
  "os_m1_15": {
    "overview": "Process Management involves the creation, scheduling, and termination of processes by the OS.",
    "formal": "The OS manages processes by maintaining a ready queue, waiting queues, and utilizing short-term, medium-term, and long-term schedulers to transition processes between states.",
    "intuition": "The project manager that hires workers (create), assigns them desks (memory), tells them when to work (schedule), and fires them (terminate).",
    "coreProperties": [
      "Creation via fork()",
      "Termination via exit()",
      "Scheduling"
    ],
    "hasContent": true,
    "detailedExplanation": "- **Process Creation:** A parent process creates child processes using `fork()`. The child may execute concurrently or the parent may wait for it to finish.\n- **Process Termination:** A process finishes executing its final statement and asks the OS to delete it using `exit()`. The OS deallocates all resources.\n- **Zombie Process:** A process that has terminated, but its parent hasn't called `wait()` yet to read its exit status.\n- **Orphan Process:** A child process whose parent has terminated. The OS usually reassigns it to the `init` process.",
    "keyPoints": [
      "`fork()` creates a new process.",
      "`wait()` pauses a parent until the child terminates.",
      "Zombie and Orphan processes are edge cases of process termination."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_16": {
    "overview": "Each process is represented in the operating system by a Process Control Block (PCB), also called a task control block.",
    "formal": "The PCB serves as the repository for any information that may vary from process to process. When a context switch occurs, the state of the old process is saved into its PCB, and the state of the new process is loaded from its PCB.",
    "intuition": "Think of a PCB as a patient's medical chart. When the doctor (CPU) switches from Patient A to Patient B, they write down A's current vitals in A's chart, and read B's chart to know where to resume treatment.",
    "coreProperties": [
      "State preservation",
      "High overhead cost",
      "Driven by hardware interrupts"
    ],
    "hasContent": true,
    "detailedExplanation": "A PCB contains:\n- **Process State:** The state (new, ready, running, etc.).\n- **Program Counter:** The address of the next instruction to be executed.\n- **CPU Registers:** Accumulators, index registers, stack pointers, and condition codes. Must be saved along with the PC when an interrupt occurs.\n- **CPU-Scheduling Information:** Process priority, pointers to scheduling queues.\n- **Memory-Management Information:** Value of base and limit registers, page tables.\n- **Accounting Information:** Amount of CPU and real time used, time limits, process numbers.\n- **I/O Status Information:** List of I/O devices allocated, list of open files.",
    "keyPoints": [
      "PCB is the data structure the OS uses to manage a process.",
      "Context Switching involves saving the context of the old process in its PCB and loading the context of the new process from its PCB.",
      "Context-switch time is pure overhead; the system does no useful work while switching."
    ],
    "examNotes": "Often asked as a short note. List at least 5 components of the PCB. Emphasize that the Program Counter and CPU Registers are critical for resuming execution.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_17": {
    "overview": "Interrupts are signals sent to the CPU by hardware or software indicating an event that needs immediate attention.",
    "formal": "An interrupt transfers control to the interrupt service routine (ISR). The CPU stops what it's doing, saves its state, and executes the ISR. A software-generated interrupt is called a trap or exception.",
    "intuition": "You're reading a book (CPU running). The phone rings (interrupt). You put a bookmark in (save state), answer the phone (ISR), and then resume reading.",
    "coreProperties": [
      "Asynchronous hardware signals",
      "Synchronous software traps",
      "Interrupt Vector Table"
    ],
    "hasContent": true,
    "detailedExplanation": "Modern operating systems are interrupt-driven. If there are no processes to execute and no I/O devices to service, the OS sits quietly, waiting for an interrupt.\n\nWhen an interrupt occurs, the hardware saves the address of the interrupted instruction. Many systems use a table of pointers (Interrupt Vector) to store the memory addresses of the various interrupt service routines, indexed by the interrupt number.",
    "keyPoints": [
      "Hardware interrupts (e.g., key press, disk read complete).",
      "Software interrupts / Traps (e.g., division by zero, system call).",
      "OS is fundamentally interrupt-driven."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_18": {
    "overview": "Interprocess Communication (IPC) provides mechanisms for processes to communicate and synchronize their actions.",
    "formal": "Cooperating processes require an IPC mechanism. There are two primary models: Shared Memory and Message Passing.",
    "intuition": "Shared Memory is like a whiteboard everyone can write on. Message Passing is like sending emails to each other.",
    "coreProperties": [
      "Shared Memory",
      "Message Passing",
      "Pipes",
      "Sockets"
    ],
    "hasContent": true,
    "detailedExplanation": "1. **Shared Memory:** A region of memory is shared by cooperating processes. Processes can then read and write data to this shared region. It is very fast, but requires explicit synchronization (like semaphores) by the user processes to avoid race conditions.\n2. **Message Passing:** Communication takes place by means of messages exchanged between the cooperating processes via the OS (e.g., `send(message)` and `receive(message)`). It is easier to implement and inherently synchronized, but slower due to system call overhead.",
    "keyPoints": [
      "Shared Memory = High speed, requires user synchronization.",
      "Message Passing = Slower (kernel involvement), avoids conflicts."
    ],
    "examNotes": "A classic comparison question. Always mention that message passing is better for small amounts of data and distributed systems, while shared memory is faster for large data on a single machine.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_19": {
    "overview": "A thread is a basic unit of CPU utilization; it comprises a thread ID, a program counter, a register set, and a stack.",
    "formal": "A thread shares with other threads belonging to the same process its code section, data section, and other operating-system resources, such as open files and signals. A traditional (or heavyweight) process has a single thread of control.",
    "intuition": "Think of a process as a house, and threads as the people living in it. They all share the same living room and kitchen (code and data), but each person has their own private bedroom (stack and registers).",
    "coreProperties": [
      "Lightweight process",
      "Shared data and heap",
      "Private stack and registers"
    ],
    "hasContent": true,
    "workedExamples": [
      {
        "problem": "Exam Comparison: Process vs Thread",
        "solution": "Process: Heavyweight, isolated memory space, high context-switch overhead, communication via IPC. Represented by PCB.\nThread: Lightweight, shares memory/data/heap with peers, low context-switch overhead, direct communication via shared variables. Represented by TCB (Thread Control Block).",
        "explanation": "Threads are essentially 'processes within a process'. The TCB stores thread-specific data like the program counter, registers, and stack pointer."
      }
    ],
    "detailedExplanation": "Why use threads?\n1. **Responsiveness:** Multithreading an interactive application may allow a program to continue running even if part of it is blocked.\n2. **Resource Sharing:** Threads share the memory and resources of the process to which they belong by default.\n3. **Economy:** Allocating memory and resources for process creation is costly. Because threads share these, it is much more economical to create and context-switch threads.\n4. **Scalability:** The benefits of multithreading can be greatly increased in a multiprocessor architecture, where threads may be running in parallel on different processing cores.",
    "keyPoints": [
      "Threads share: Code, Data, Open Files.",
      "Threads have their own: Thread ID, Program Counter, Register Set, Stack.",
      "Context switching between threads is faster than between processes."
    ],
    "examNotes": "The difference between Process and Thread is almost a guaranteed question. Create a comparison table: Heavyweight vs Lightweight, memory isolation vs sharing, creation time, context switch overhead.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_20": {
    "overview": "Like processes, threads undergo state transitions during their lifecycle.",
    "formal": "A thread can be in any of the standard execution states: Ready, Running, or Blocked (Waiting). However, because threads share the same address space, if one thread alters data, the other threads see the alteration immediately.",
    "intuition": "The states of an individual worker within the factory. They can be working, waiting for parts, or taking a break.",
    "coreProperties": [
      "New",
      "Ready",
      "Running",
      "Blocked",
      "Terminated"
    ],
    "hasContent": true,
    "detailedExplanation": "A thread's state is saved in the Thread Control Block (TCB) rather than the PCB. The TCB contains the thread ID, thread state, CPU registers, and stack pointer. Importantly, if a thread blocks (e.g., waiting for I/O), in a Many-to-One model, the entire process blocks. In a One-to-One model, only that specific thread blocks while others continue.",
    "keyPoints": [
      "Ready, Running, Blocked.",
      "State is stored in the TCB.",
      "Blocking behavior depends on the threading model."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_21": {
    "overview": "Thread operations refer to the creation, termination, and management of threads within a process.",
    "formal": "Unlike process creation (which duplicates the entire address space using fork), thread creation only allocates a new stack, a new TCB, and a PC. Threads can be cancelled synchronously (target thread periodically checks if it should terminate) or asynchronously (terminated immediately).",
    "intuition": "Assigning a worker a task (create), waiting for them to finish (join), or pulling them off the floor (cancel).",
    "coreProperties": [
      "pthread_create",
      "pthread_join",
      "Cancellation points"
    ],
    "hasContent": true,
    "keyPoints": [
      "Creation is fast (only allocates stack/TCB).",
      "Cancellation can be deferred or asynchronous.",
      "Threads within a process can be joined (waiting for a thread to finish)."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_22": {
    "overview": "Threading models define how user-level threads are mapped to kernel-level threads.",
    "formal": "There are three primary multithreading models: Many-to-One, One-to-One, and Many-to-Many.",
    "intuition": "Like airline ticketing: Many-to-One is one agent for many passengers (bottleneck). One-to-One is one agent per passenger (expensive). Many-to-Many is a pool of agents serving a pool of passengers (efficient).",
    "coreProperties": [
      "Many-to-One",
      "One-to-One",
      "Many-to-Many"
    ],
    "hasContent": true,
    "detailedExplanation": "1. **Many-to-One:** Maps many user threads to one kernel thread. Thread management is efficient (done in user space), but if one thread makes a blocking system call, the entire process blocks. Multiple threads cannot run in parallel on multiprocessors.\n2. **One-to-One:** Maps each user thread to a kernel thread. Provides true concurrency and prevents blocking the whole process. Drawback: creating a user thread requires creating a kernel thread, which adds overhead (Windows, Linux).\n3. **Many-to-Many:** Multiplexes many user threads to a smaller or equal number of kernel threads. Developers can create as many user threads as necessary, and the corresponding kernel threads can run in parallel on a multiprocessor.",
    "examNotes": "A highly tested topic. Always mention the blocking problem in Many-to-One, and the overhead problem in One-to-One.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_23": {
    "overview": "CPU scheduling is the basis of multiprogrammed operating systems. By switching the CPU among processes, the OS makes the computer more productive.",
    "formal": "Whenever the CPU becomes idle, the OS must select one of the processes in the ready queue to be executed. The selection process is carried out by the short-term scheduler.",
    "intuition": "The manager deciding which employee gets to use the single expensive piece of equipment next.",
    "coreProperties": [
      "Maximizes utilization",
      "Driven by the Short-Term Scheduler"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_24": {
    "overview": "Scheduling occurs at three distinct levels: Long-term, Short-term, and Medium-term.",
    "formal": "These levels dictate how often the scheduler runs and what its primary objective is.",
    "intuition": "Long-term = admissions office deciding who gets into the university. Short-term = professor deciding who speaks next in class. Medium-term = sending a student to study abroad for a semester to free up dorm space.",
    "coreProperties": [
      "Long-term",
      "Medium-term",
      "Short-term"
    ],
    "hasContent": true,
    "detailedExplanation": "- **Short-Term Scheduler (CPU Scheduler):** Selects which process should be executed next and allocates CPU. Runs very frequently (every few milliseconds). Must be extremely fast.\n- **Long-Term Scheduler (Job Scheduler):** Selects which processes should be brought into the ready queue from the disk. Controls the degree of multiprogramming. Runs infrequently.\n- **Medium-Term Scheduler:** Removes processes from memory temporarily (swapping) to reduce the degree of multiprogramming and free up memory.",
    "keyPoints": [
      "Short-term: Picks next process for CPU.",
      "Long-term: Brings processes into RAM.",
      "Medium-term: Swaps processes out to disk."
    ],
    "examNotes": "Differentiate between short and long-term schedulers by speed and objective. Long-term controls degree of multiprogramming; short-term controls CPU dispatching.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_25": {
    "overview": "Scheduling algorithms are categorized based on whether a running process can be forcefully removed from the CPU.",
    "formal": "Under non-preemptive scheduling, once the CPU has been allocated to a process, the process keeps the CPU until it releases it either by terminating or switching to the waiting state. Preemptive scheduling allows the OS to interrupt a running process and assign the CPU to another process.",
    "intuition": "Non-preemptive: You get the mic and can talk until you finish. Preemptive: The host can cut your mic after 5 minutes and pass it to someone else.",
    "coreProperties": [
      "Preemptive allows time-sharing",
      "Non-preemptive lacks timer interrupts",
      "Preemption requires complex state saving"
    ],
    "hasContent": true,
    "keyPoints": [
      "Non-preemptive: Process yields voluntarily (e.g., FCFS, SJF).",
      "Preemptive: OS forces the process out (e.g., RR, SRTF).",
      "Preemption requires hardware timer interrupts."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_26": {
    "overview": "Different systems have different objectives for their scheduling algorithms.",
    "formal": "Batch systems focus on throughput and turnaround time. Interactive systems focus on response time and fairness. Real-time systems focus on meeting hard deadlines.",
    "intuition": "Balancing the need to serve many customers quickly vs the overhead of constantly switching between them.",
    "coreProperties": [
      "Utilization",
      "Throughput",
      "Turnaround Time",
      "Waiting Time",
      "Response Time"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_27": {
    "overview": "To compare scheduling algorithms, we use specific criteria to measure their performance.",
    "formal": "The primary criteria are: CPU Utilization, Throughput, Turnaround Time, Waiting Time, and Response Time.",
    "intuition": "The scorecard for evaluating a manager's performance.",
    "coreProperties": [
      "Higher is better: Utilization, Throughput",
      "Lower is better: TAT, WT, RT"
    ],
    "revisionSummary": "Formulas: TAT = CT - AT, WT = TAT - BT, RT = First CPU Start - AT",
    "hasContent": true,
    "detailedExplanation": "- **CPU Utilization:** Keep the CPU as busy as possible (0-100%).\n- **Throughput:** Number of processes completed per time unit.\n- **Turnaround Time (TAT):** Time from submission to completion (Completion Time - Arrival Time).\n- **Waiting Time (WT):** Amount of time a process spends waiting in the ready queue (TAT - Burst Time).\n- **Response Time (RT):** Time from submission until the FIRST response is produced.",
    "keyPoints": [
      "Maximize: CPU Utilization, Throughput.",
      "Minimize: TAT, WT, RT."
    ],
    "examNotes": "Memorize the formulas: TAT = CT - AT. WT = TAT - BT. These are heavily used in numerical problems.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_28": {
    "overview": "Priorities determine the order in which processes are selected by the scheduler.",
    "formal": "Priorities can be static (assigned once and never change) or dynamic (adjusted by the OS over time).",
    "intuition": "VIP passes at an amusement park. VIPs jump the queue.",
    "coreProperties": [
      "Internal vs External",
      "Static vs Dynamic",
      "Aging prevents Starvation"
    ],
    "hasContent": true,
    "detailedExplanation": "Aging is a technique where the priority of a process gradually increases the longer it waits in the system. This prevents starvation of low-priority processes.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_29": {
    "hasContent": true,
    "overview": "First-Come, First-Served (FCFS) is the simplest CPU scheduling algorithm where the process that requests the CPU first is allocated the CPU first.",
    "formal": "FCFS scheduling is implemented using a FIFO queue. When a process enters the ready queue, its PCB is linked onto the tail of the queue. The CPU is allocated to the process at the head of the queue.",
    "intuition": "Think of waiting in line at a grocery store checkout. The person who gets in line first gets served first, regardless of how many items they have.",
    "coreProperties": [
      "Non-preemptive",
      "FIFO Queue Implementation",
      "Susceptible to Convoy Effect"
    ],
    "workedExamples": [
      {
        "problem": "Consider 3 processes arriving at time 0 in the order P1, P2, P3. Burst times: P1=24ms, P2=3ms, P3=3ms. Calculate Average Waiting Time and Average Turnaround Time.",
        "solution": "Gantt Chart: [0]-P1-[24]-P2-[27]-P3-[30]\n\nWaiting Times (WT = Start Time - Arrival Time):\nP1 = 0 - 0 = 0ms\nP2 = 24 - 0 = 24ms\nP3 = 27 - 0 = 27ms\nAverage WT = (0 + 24 + 27) / 3 = 17ms\n\nTurnaround Times (TAT = Completion Time - Arrival Time):\nP1 = 24ms\nP2 = 27ms\nP3 = 30ms\nAverage TAT = (24 + 27 + 30) / 3 = 27ms"
      }
    ],
    "detailedExplanation": "In FCFS, when the CPU becomes free, it is assigned to the process at the beginning of the ready queue. The running process is then removed from the queue.\n\nProperties:\n- **Non-preemptive:** Once the CPU has been allocated to a process, that process keeps the CPU until it releases it by terminating or requesting I/O.\n- **Convoy Effect:** If a CPU-bound process with a long burst time gets the CPU, all other processes (including short I/O-bound processes) must wait. This leads to lower CPU and device utilization.",
    "keyPoints": [
      "Selection Rule: Choose the process with the earliest arrival time.",
      "Behavior: strictly Non-preemptive.",
      "Suffers from the Convoy Effect, leading to poor average waiting times if a long process arrives first.",
      "Easy to implement and understand."
    ],
    "examNotes": "Always check the Arrival Time! If all arrive at 0, order matters. If they arrive at different times, sort by Arrival Time first. Be prepared to discuss the Convoy Effect.",
    "commonMistakes": [
      {
        "mistake": "Calculating Waiting Time without subtracting Arrival Time.",
        "fix": "Always use WT = Turnaround Time - Burst Time, or WT = Start Time - Arrival Time."
      },
      {
        "mistake": "Assuming FCFS is always optimal.",
        "fix": "FCFS can have terrible average waiting times depending on process order."
      }
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m1_30": {
    "hasContent": true,
    "overview": "Shortest-Job-First (SJF) scheduling associates each process with the length of its next CPU burst, allocating the CPU to the process with the smallest burst.",
    "formal": "SJF selects the process with the smallest next CPU burst from the ready queue. If two processes have the same length next CPU burst, FCFS scheduling is used to break the tie. It provides the provably optimal minimum average waiting time for a given set of processes.",
    "intuition": "Think of a supermarket express lane for people with fewer items. Letting quick shoppers go first drastically reduces the average time everyone spends waiting in line.",
    "coreProperties": [
      "Optimal for minimum average waiting time",
      "Can cause starvation"
    ],
    "workedExamples": [
      {
        "problem": "Processes arrive at time 0. Burst times: P1=6, P2=8, P3=7, P4=3. Calculate Average Waiting Time using SJF.",
        "solution": "Sort by burst time: P4(3), P1(6), P3(7), P2(8).\n\nGantt Chart: [0]-P4-[3]-P1-[9]-P3-[16]-P2-[24]\n\nWaiting Times:\nP4 = 0\nP1 = 3\nP3 = 9\nP2 = 16\n\nAverage WT = (0 + 3 + 9 + 16) / 4 = 28 / 4 = 7ms"
      }
    ],
    "detailedExplanation": "SJF can be either preemptive or non-preemptive. The non-preemptive version (often just called SJF) allows the current process to finish its CPU burst even if a new process arrives with a shorter burst.\n\nThe real difficulty with SJF is knowing the length of the next CPU request. For short-term CPU scheduling, we cannot know the exact length. We typically predict it using exponential averaging of previous CPU bursts:\n\nτ_{n+1} = α * t_n + (1 - α) * τ_n\n\nWhere t_n is the actual length of the nth burst, and τ_n is our past history prediction.",
    "keyPoints": [
      "Selection Rule: Choose the process with the shortest next CPU burst.",
      "Behavior: Typically non-preemptive (the preemptive version is called SRTF).",
      "Provably optimal for minimizing average waiting time.",
      "Impossible to implement perfectly because future burst lengths are unknown.",
      "Can cause Starvation for long processes if short processes keep arriving."
    ],
    "examNotes": "In exams, if the problem doesn't state arrival times, assume they all arrive at 0. SJF is famous for 'Starvation'—if short jobs keep coming, long jobs never execute.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_31": {
    "hasContent": true,
    "overview": "Shortest-Remaining-Time-First (SRTF) is the preemptive version of SJF. It preempts the running process if a new process arrives with a shorter burst time than what is remaining.",
    "formal": "In SRTF, if a new process arrives with a CPU burst length less than the remaining time of the currently executing process, the CPU is preempted. The new process takes over immediately.",
    "intuition": "You are doing a 5-hour task. Someone hands you a 5-minute task. You pause the 5-hour task, finish the 5-minute one instantly, and then resume your long task.",
    "coreProperties": [
      "Preemptive algorithm",
      "Lower average WT than non-preemptive SJF",
      "Starvation for long processes"
    ],
    "workedExamples": [
      {
        "problem": "Arrivals: P1(0ms, burst 8), P2(1ms, burst 4), P3(2ms, burst 9), P4(3ms, burst 5). Calculate Average Waiting Time.",
        "solution": "Time 0: P1 arrives and starts. Remaining: P1=8\nTime 1: P2 arrives(4). P1 remaining is 7. 4 < 7. P1 is preempted! P2 starts.\nTime 2: P3 arrives(9). P2 remaining is 3. 3 < 9. P2 continues.\nTime 3: P4 arrives(5). P2 remaining is 2. 2 < 5. P2 continues.\nTime 5: P2 finishes. Remaining: P1=7, P3=9, P4=5. P4 starts.\nTime 10: P4 finishes. Remaining: P1=7, P3=9. P1 starts.\nTime 17: P1 finishes. P3 starts.\nTime 26: P3 finishes.\n\nGantt: [0]-P1-[1]-P2-[5]-P4-[10]-P1-[17]-P3-[26]\n\nTurnaround Times (Completion - Arrival):\nP1: 17 - 0 = 17\nP2: 5 - 1 = 4\nP3: 26 - 2 = 24\nP4: 10 - 3 = 7\nAvg TAT = (17+4+24+7)/4 = 13ms\n\nWaiting Times (TAT - Burst):\nP1: 17 - 8 = 9\nP2: 4 - 4 = 0\nP3: 24 - 9 = 15\nP4: 7 - 5 = 2\nAvg WT = (9+0+15+2)/4 = 6.5ms"
      }
    ],
    "detailedExplanation": "SRTF requires keeping track of the exact remaining time for every process. Every time a new process arrives, the scheduler compares its burst time with the *remaining* burst time of the currently executing process.\n\nWhile SRTF provides better average waiting times than non-preemptive SJF when processes arrive at different times, it incurs much higher context switching overhead because the CPU can be swapped rapidly as new, shorter processes arrive.",
    "keyPoints": [
      "Selection Rule: Choose the process with the shortest REMAINING CPU burst.",
      "Behavior: Preemptive.",
      "Provides optimal average waiting time when arrival times vary.",
      "High context switch overhead.",
      "Still suffers from Starvation for long processes."
    ],
    "examNotes": "A classic exam question involves doing the Gantt chart for SRTF. Mark the timeline at every single arrival time, and recalculate who has the shortest remaining time at that exact millisecond.",
    "commonMistakes": [
      {
        "mistake": "Forgetting to reduce the remaining time of the running process before comparing it to the new arrival.",
        "fix": "Always subtract the time spent running before doing the `<` comparison."
      }
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m1_32": {
    "hasContent": true,
    "overview": "Priority Scheduling assigns a priority to each process, and the CPU is allocated to the process with the highest priority.",
    "formal": "A priority (an integer) is associated with each process. Equal-priority processes are scheduled in FCFS order. SJF is actually a special case of priority scheduling where priority is the inverse of the next CPU burst.",
    "intuition": "Like a hospital emergency room (triage). The patient with the most life-threatening injury gets treated first, regardless of who arrived first.",
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
    ],
    "detailedExplanation": "Priorities can be defined internally (e.g., time limits, memory requirements, ratio of I/O to CPU burst) or externally (importance of the process, funds being paid).\n\nA major problem with priority scheduling is **Starvation** (Indefinite Blocking). A steady stream of high-priority processes can leave a low-priority process waiting indefinitely.\n\nThe solution is **Aging**: gradually increasing the priority of processes that wait in the system for a long time.",
    "keyPoints": [
      "Selection Rule: Highest priority process.",
      "Behavior: Can be preemptive or non-preemptive.",
      "Major Issue: Starvation.",
      "Solution: Aging."
    ],
    "examNotes": "Pay attention to priority definitions! In some systems, 0 is the highest priority; in others, 0 is the lowest. The exam problem should state this. If it doesn't, usually a lower number means higher priority in textbook contexts.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_33": {
    "hasContent": true,
    "overview": "Round-Robin (RR) is a preemptive scheduling algorithm designed especially for time-sharing systems, giving each process a small unit of CPU time called a time quantum.",
    "formal": "The ready queue is treated as a circular queue. The CPU scheduler goes around the queue, allocating the CPU to each process for a time interval of up to 1 time quantum (q). If the process's burst exceeds q, it is preempted and put at the back of the queue.",
    "intuition": "Like taking turns sharing a video game controller. Everyone gets 10 minutes to play. If you beat your level in 5 minutes, you pass it early. If not, the timer rings and you go to the back of the line.",
    "coreProperties": [
      "Preemptive",
      "Fair (no starvation)",
      "Performance depends on quantum size"
    ],
    "workedExamples": [
      {
        "problem": "Processes arrive at 0: P1(24), P2(3), P3(3). Time quantum = 4ms.",
        "solution": "Gantt Chart:\n[0]-P1-[4]-P2-[7]-P3-[10]-P1-[14]-P1-[18]-P1-[22]-P1-[26]-P1-[30]\n\nNotice P2 and P3 finish in their first quantum (since 3 < 4). P1 requires multiple trips around the queue.\n\nWaiting Times:\nP1 = (0-0) + (10-4) = 6ms\nP2 = 4ms\nP3 = 7ms\nAvg WT = (6 + 4 + 7) / 3 = 5.66ms"
      }
    ],
    "detailedExplanation": "The performance of the RR algorithm depends heavily on the size of the time quantum.\n\n- **Very large quantum:** RR essentially becomes FCFS.\n- **Very small quantum:** RR results in enormous context-switch overhead, as the CPU spends all its time swapping processes instead of executing them.\n\nA rule of thumb from the textbook is that 80% of CPU bursts should be shorter than the time quantum.",
    "keyPoints": [
      "Selection Rule: FCFS order, but preempted after `q` time units.",
      "Behavior: Strictly Preemptive.",
      "Guarantees fairness and no starvation.",
      "Excellent response time (good for interactive systems).",
      "Average waiting time is often long."
    ],
    "examNotes": "Be extremely careful with arrival times during RR. If a process arrives exactly when another process's quantum expires, standard convention puts the newly arrived process in the queue BEFORE the preempted process is pushed to the back.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_34": {
    "overview": "Multilevel Queue Scheduling partitions the ready queue into several separate queues, permanently assigning processes to one queue based on properties like memory size or process type.",
    "formal": "A multilevel queue scheduling algorithm partitions the ready queue into separate queues (e.g., foreground/interactive and background/batch). Each queue has its own scheduling algorithm. In addition, there must be scheduling *among* the queues, which is commonly implemented as fixed-priority preemptive scheduling.",
    "intuition": "Think of an airport boarding system. First class passengers have their own line, economy has another. The first class line is always served completely before anyone in the economy line is served.",
    "coreProperties": [
      "Multiple queues",
      "No process migration",
      "Foreground vs Background"
    ],
    "hasContent": true,
    "detailedExplanation": "For example, a system might have:\n1. System processes (highest priority)\n2. Interactive processes\n3. Interactive editing processes\n4. Batch processes\n5. Student processes (lowest priority)\n\nEach queue has absolute priority over lower-priority queues. No process in the batch queue could run unless the queues for system, interactive, and interactive editing processes are all empty. If an interactive process enters the ready queue while a batch process is running, the batch process is preempted.",
    "keyPoints": [
      "Multiple independent queues.",
      "Processes are permanently assigned to a queue upon entry.",
      "Each queue can have its own scheduling algorithm (e.g., RR for foreground, FCFS for background).",
      "Fixed priority scheduling between queues can cause starvation for lower-priority queues."
    ],
    "examNotes": "A common question asks what happens to a batch process if interactive processes keep arriving. The answer is starvation, because Multilevel Queue does not allow processes to move between queues.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_35": {
    "overview": "Multilevel Feedback Queue Scheduling allows a process to move between queues, dynamically separating processes according to the characteristics of their CPU bursts.",
    "formal": "It uses multiple queues, but unlike Multilevel Queue, processes can migrate. If a process uses too much CPU time, it is moved to a lower-priority queue (leaving higher priority for I/O-bound processes). If a process waits too long in a lower-priority queue, it may be moved to a higher-priority queue (aging).",
    "intuition": "Like a loyalty program that demotes you if you consume too many free samples, but promotes you if you wait patiently for a long time.",
    "coreProperties": [
      "Prevents starvation via aging",
      "Most complex scheduling algorithm",
      "Self-adjusting based on process behavior"
    ],
    "hasContent": true,
    "detailedExplanation": "Defined by several parameters:\n- Number of queues.\n- Scheduling algorithm for each queue.\n- Method used to determine when to upgrade a process to a higher priority.\n- Method used to determine when to demote a process to a lower priority.\n- Method used to determine which queue a process enters when it needs service.\n\nExample:\n- Queue 0: RR with time quantum 8ms.\n- Queue 1: RR with time quantum 16ms.\n- Queue 2: FCFS.\nA new process enters Queue 0. If it doesn't finish in 8ms, it is moved to the tail of Queue 1. If it doesn't finish in 16ms, it moves to Queue 2.",
    "keyPoints": [
      "Processes can migrate between queues.",
      "Dynamically favors I/O-bound and interactive processes.",
      "Prevents starvation via aging (moving old processes up).",
      "The most general CPU-scheduling algorithm, but also the most complex to configure."
    ],
    "examNotes": "Know the difference: Multilevel Queue = fixed queues. Multilevel Feedback Queue = dynamic queues with migration. It solves the starvation problem of the standard Multilevel Queue.",
    "sourceIndicator": "BOTH"
  },
  "os_m1_36": {
    "overview": "Process execution consists of an alternating cycle of CPU execution and I/O wait.",
    "formal": "Processes alternate between a CPU burst and an I/O burst. Execution begins with a CPU burst, followed by an I/O burst, and so on.",
    "intuition": "You calculate numbers for a minute (CPU burst), then ask the user for input and wait (I/O burst), then calculate again.",
    "coreProperties": [
      "CPU Burst",
      "I/O Burst",
      "Dictates scheduling algorithm efficiency"
    ],
    "hasContent": true,
    "detailedExplanation": "An I/O-bound process has many short CPU bursts. A CPU-bound process has a few very long CPU bursts.\nThe distribution of CPU bursts is important for selecting a scheduling algorithm. An exponential curve usually describes burst lengths: there is a large number of very short CPU bursts, and a small number of very long CPU bursts.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_37": {
    "overview": "The CPU Scheduler decides WHICH process runs. The Dispatcher actually gives that process control of the CPU.",
    "formal": "The dispatcher is the module that gives control of the CPU to the process selected by the short-term scheduler. It involves switching context, switching to user mode, and jumping to the proper location in the user program to restart it.",
    "intuition": "The Scheduler is the judge deciding who fights next. The Dispatcher is the referee who physically brings them to the ring and rings the bell.",
    "coreProperties": [
      "Scheduler = decision maker",
      "Dispatcher = execution mechanism",
      "Dispatch latency",
      "Dispatch Latency"
    ],
    "hasContent": true,
    "keyPoints": [
      "Scheduler = Decision maker.",
      "Dispatcher = Mechanism executor."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_38": {
    "overview": "Dispatch Latency is the time it takes for the dispatcher to stop one process and start another running.",
    "formal": "Context switching requires saving the state of the old process and loading the state of the new process. This time is pure overhead, because the system does no useful work while switching.",
    "intuition": "The time it takes to put away your math homework and take out your history homework. If you switch every 2 minutes, you spend all your time swapping books.",
    "coreProperties": [
      "Pure overhead",
      "Hardware dependent",
      "Affects throughput"
    ],
    "hasContent": true,
    "detailedExplanation": "The speed of the context switch is heavily dependent on memory speed, the number of registers that must be copied, and whether special hardware instructions (like a single instruction to save all registers) exist.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_39": {
    "overview": "Demand scheduling refers to scheduling tasks or pages dynamically as they are requested.",
    "formal": "Often used in memory (Demand Paging) but in scheduling, it refers to systems where CPU time is allocated strictly based on active, explicit requests or real-time event triggers rather than a static polling loop.",
    "intuition": "Instead of asking every worker 'do you need help?' every 5 minutes, you wait for them to press a 'Help' button.",
    "coreProperties": [
      "Event-driven",
      "Efficient for sparse workloads"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_40": {
    "overview": "Real-time scheduling must guarantee that critical tasks complete within their deadlines.",
    "formal": "Soft real-time requires that critical tasks receive priority over others. Hard real-time requires that tasks must be serviced by their deadline; otherwise, the system fails.",
    "intuition": "Scheduling trains on a single track. Missing a deadline by 1 second causes a collision.",
    "coreProperties": [
      "Rate Monotonic (Static Priority)",
      "EDF (Dynamic Priority)",
      "Deterministic latency required"
    ],
    "hasContent": true,
    "detailedExplanation": "Algorithms like Rate Monotonic (assigns priority based on the period of the task) and Earliest Deadline First (EDF) are used.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_41": {
    "overview": "On systems that support threads, it is kernel-level threads—not processes—that are being scheduled by the OS.",
    "formal": "User-level threads are managed by a thread library, and the kernel is unaware of them. To run on a CPU, user-level threads must be mapped to an associated kernel-level thread.",
    "intuition": "PCS is a department manager dividing tasks among their team. SCS is the CEO deciding which department gets funding.",
    "coreProperties": [
      "PCS (Local)",
      "SCS (Global)",
      "Pthread scheduling parameters"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m1_42": {
    "overview": "If multiple CPUs are available, load sharing becomes possible, but the scheduling problem becomes correspondingly more complex.",
    "formal": "Symmetric Multiprocessing (SMP) allows each processor to examine a common ready queue and select a process to execute.",
    "intuition": "Load balancing multiple checkout lanes. You can either have one big line feeding all cashiers (common queue) or separate lines for each cashier (private queues).",
    "coreProperties": [
      "SMP is standard",
      "Processor Affinity (Cache warmth)",
      "Load Balancing (Push/Pull migration)"
    ],
    "hasContent": true,
    "detailedExplanation": "Multiprocessor scheduling must handle **Processor Affinity**: a process has an affinity for the processor on which it is currently running due to cache memory. Moving it to another processor invalidates the cache, so the OS tries to keep a process on the same processor.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_1": {
    "overview": "Process synchronization is required to coordinate the execution of cooperating processes and ensure data consistency.",
    "formal": "When processes execute concurrently and share data, data inconsistency can result. Process synchronization provides mechanisms to ensure the orderly execution of cooperating processes that share a logical address space.",
    "intuition": "If two people try to edit a shared Google Doc at the exact same millisecond without the software coordinating it, the text becomes garbled.",
    "coreProperties": [
      "Race Condition",
      "Data inconsistency",
      "Race conditions",
      "Requires coordination mechanisms"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_2": {
    "overview": "Mutual Exclusion ensures that only one process can execute in its critical section at a time.",
    "formal": "If process Pi is executing in its critical section, then no other processes can be executing in their critical sections.",
    "intuition": "1. Only one in the bathroom. 2. The bathroom can't remain empty if people are in line. 3. No one can cut the line forever (fairness).",
    "coreProperties": [
      "Mutual Exclusion",
      "Progress (No deadlock)",
      "Bounded Waiting (No starvation)"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_3": {
    "overview": "The Critical Section is a segment of code where a process accesses shared variables, files, or databases.",
    "formal": "The critical-section problem is to design a protocol that processes can use to cooperate. A process must request permission to enter its critical section in the entry section. It may then follow with an exit section and a remainder section.",
    "intuition": "A single-stall public restroom. The critical section is inside the restroom. You must lock the door (entry section) so no one else enters.",
    "coreProperties": [
      "Entry section",
      "Critical section",
      "Exit section",
      "Remainder section"
    ],
    "hasContent": true,
    "detailedExplanation": "Code structure:\n```c\ndo {\n  // Entry section\n  // CRITICAL SECTION\n  // Exit section\n  // Remainder section\n} while (true);\n```\nThe goal is to ensure that no two processes are in the CRITICAL SECTION at the same time.",
    "keyPoints": [
      "Accesses shared resources.",
      "Must be protected by an Entry Section."
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_4": {
    "overview": "Any valid solution to the critical-section problem must satisfy three requirements: Mutual Exclusion, Progress, and Bounded Waiting.",
    "formal": "1. Mutual Exclusion: Only one process inside at a time. \n2. Progress: If no process is in its critical section and some wish to enter, the selection cannot be postponed indefinitely. \n3. Bounded Waiting: There exists a bound on the number of times other processes can enter before a specific process's request is granted.",
    "intuition": "1. Only one in the bathroom. 2. The bathroom can't remain empty if people are in line. 3. No one can cut the line forever (fairness).",
    "coreProperties": [
      "Mutual Exclusion",
      "Progress (No deadlock)",
      "Bounded Waiting (No starvation)"
    ],
    "hasContent": true,
    "examNotes": "Memorize these three. They are the golden rules for evaluating any synchronization algorithm.",
    "sourceIndicator": "BOTH"
  },
  "os_m2_5": {
    "overview": "Software solutions to the critical section problem rely purely on logic and shared variables, without special hardware support.",
    "formal": "Algorithms like Dekker's and Peterson's are pure software solutions.",
    "intuition": "Using a physical 'Do Not Disturb' sign and a notebook to agree on whose turn it is.",
    "coreProperties": [
      "No hardware support required",
      "Vulnerable to instruction reordering",
      "Often restricted to 2 processes"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_6": {
    "hasContent": true,
    "overview": "Peterson's Solution is a classic software-based solution to the critical-section problem for two processes.",
    "formal": "It guarantees mutual exclusion, progress, and bounded waiting using two variables: an `int turn` and a `boolean flag[2]`. The `flag` array indicates if a process is ready to enter its critical section. The `turn` variable resolves simultaneous entry attempts.",
    "intuition": "Like two polite people at a doorway. Process 0 says 'I want to go in (flag[0]=true), but you can go first (turn=1)'. Process 1 says the same. Whoever said 'you go first' LAST is the one who waits.",
    "coreProperties": [
      "Software solution",
      "Restricted to 2 processes",
      "Guarantees Mutual Exclusion, Progress, and Bounded Waiting",
      "Fails on modern architectures due to reordering"
    ],
    "detailedExplanation": "Code structure for Process i (where j is the other process):\n```c\ndo {\n  flag[i] = true;\n  turn = j;\n  while (flag[j] && turn == j);\n\n  // Critical Section\n\n  flag[i] = false;\n\n  // Remainder Section\n} while (true);\n```\nIt is guaranteed to work on modern architectures ONLY if instructions are not reordered by the compiler or CPU. It's primarily studied for its elegant logical proof of the three synchronization requirements.",
    "keyPoints": [
      "Software solution restricted to TWO processes.",
      "Uses `turn` and `flag[2]`.",
      "Satisfies Mutual Exclusion, Progress, and Bounded Waiting.",
      "Not guaranteed to work on modern hardware due to out-of-order execution."
    ],
    "examNotes": "You may be asked to prove how it satisfies Mutual Exclusion. The proof relies on the fact that `turn` can only hold one value at a time; it cannot be both 0 and 1 simultaneously.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_7": {
    "overview": "Hardware solutions rely on specific CPU instructions that are guaranteed to execute atomically.",
    "formal": "Many systems provide hardware support for critical section code by providing special atomic hardware instructions.",
    "intuition": "A mechanical lock that can both be checked and turned in a single physical motion that cannot be interrupted.",
    "coreProperties": [
      "Atomic instructions",
      "Foundation for modern locks",
      "Solves multiprocessor sync issues"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_8": {
    "overview": "The Test-and-Set instruction is an atomic hardware instruction used to implement locks.",
    "formal": "It tests a boolean variable and sets it to true, returning the original value. Because it is executed atomically by the hardware, it cannot be interrupted.",
    "intuition": "Reaching out, checking if a light switch is off, and turning it on in a single split-second movement. If it was already on, you know someone else is in the room.",
    "coreProperties": [
      "Hardware instruction",
      "Atomic execution",
      "Used for spinlocks"
    ],
    "hasContent": true,
    "detailedExplanation": "```c\nboolean test_and_set(boolean *target) {\n  boolean rv = *target;\n  *target = true;\n  return rv;\n}\n```\nUsed with a lock variable initialized to false.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_9": {
    "overview": "Compare-and-Swap (CAS) is another atomic hardware instruction that compares a value and updates it only if it matches an expected value.",
    "formal": "It takes three operands: a pointer to the variable, the expected value, and the new value. It returns the original value.",
    "intuition": "'I will only change the price tag to $10 if it currently says $5.' If someone else changed it to $7 while you weren't looking, your operation fails safely.",
    "coreProperties": [
      "Atomic",
      "CAS instruction",
      "Foundation of lock-free data structures"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_10": {
    "overview": "Mutex (Mutual Exclusion) Locks are the simplest software tools provided by the OS API to protect critical sections.",
    "formal": "A process must acquire the lock before entering a critical section and release it when it exits. The `acquire()` and `release()` functions must be atomic.",
    "intuition": "A literal physical key to a room. You take the key (acquire), go inside, do your work, leave, and put the key back (release).",
    "coreProperties": [
      "acquire() and release()",
      "Can cause busy waiting (Spinlocks)",
      "Simplest synchronization tool"
    ],
    "hasContent": true,
    "detailedExplanation": "Traditional mutex locks suffer from 'busy waiting', meaning while a process is waiting for the lock, it sits in a tight loop checking it. These are also called 'spinlocks'. They waste CPU cycles but avoid context switch overhead.",
    "keyPoints": [
      "Simpler than semaphores (only binary).",
      "Can cause busy waiting (spinlock)."
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m2_11": {
    "overview": "A Semaphore is a synchronization tool that provides a more robust way for processes to synchronize their activities than simple hardware locks.",
    "formal": "A semaphore S is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait() and signal(). Originally termed P() for proberen (test) and V() for verhogen (increment) by Dijkstra.",
    "intuition": "Think of a library with 5 study rooms (a counting semaphore initialized to 5). When a student takes a room, they wait() and the count drops. When it hits 0, the next student must wait in line. When someone leaves, they signal() and the count goes up.",
    "coreProperties": [
      "Values: 0 or 1",
      "Equivalent to Mutex",
      "Solves Mutual Exclusion"
    ],
    "hasContent": true,
    "detailedExplanation": "Definition of wait():\n```c\nwait(S) {\n  while (S <= 0)\n    ; // busy wait\n  S--;\n}\n```\nDefinition of signal():\n```c\nsignal(S) {\n  S++;\n}\n```\nThese operations MUST be executed indivisibly. In actual OS implementations, instead of busy waiting (spinning), processes block themselves and are placed in a waiting queue associated with the semaphore.",
    "keyPoints": [
      "Atomic `wait()` and `signal()` operations.",
      "Can be Binary (0 or 1, like a mutex) or Counting (unrestricted domain).",
      "Solves complex synchronization problems without needing complicated software algorithms like Peterson's.",
      "Can lead to Deadlock if used incorrectly."
    ],
    "commonMistakes": [
      {
        "mistake": "Thinking wait() and signal() can be interrupted.",
        "fix": "They are atomic. The OS guarantees that once wait() starts modifying S, no other process can modify S."
      }
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m2_12": {
    "overview": "wait() and signal() are the two fundamental atomic operations used to manipulate a semaphore.",
    "formal": "wait() decrements the semaphore. If the value becomes negative, the process blocks. signal() increments the semaphore and wakes a blocked process if there are any.",
    "intuition": "Wait() is taking a ticket from a dispenser. If it's empty, you wait. Signal() is the clerk putting a new ticket into the dispenser.",
    "coreProperties": [
      "Atomic operations",
      "Historically P() and V()",
      "No other way to access a semaphore"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_13": {
    "overview": "A Binary Semaphore can only range between 0 and 1. It is logically equivalent to a mutex lock.",
    "formal": "Binary semaphores are often used on systems that do not provide a native mutex.",
    "intuition": "A simple occupied/vacant sign on a bathroom door.",
    "coreProperties": [
      "Values: 0 or 1",
      "Equivalent to Mutex",
      "Solves Mutual Exclusion"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_14": {
    "overview": "A Counting Semaphore's integer value can range over an unrestricted domain, used to control access to a resource with multiple instances.",
    "formal": "The semaphore is initialized to the number of available resources. Each wait() decreases it, each signal() increases it.",
    "intuition": "A parking lot with 50 spaces. The sign says '50'. Every car entering decrements the sign. At 0, the gate won't open until a car leaves (increments the sign).",
    "coreProperties": [
      "Tracks resource counts",
      "Solves bounded buffer problems"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_15": {
    "overview": "The Dining Philosophers problem is a classic synchronization problem that illustrates the challenges of allocating multiple resources among multiple processes without causing deadlock or starvation.",
    "formal": "Five philosophers sit around a circular table. There are five chopsticks. A philosopher needs TWO chopsticks to eat. They must pick up the left chopstick and then the right chopstick. If all philosophers pick up their left chopstick simultaneously, a deadlock occurs.",
    "intuition": "Imagine 5 people needing a fork and a knife to eat a steak, but there are only 5 utensils total alternating between them. If everyone grabs the utensil to their left, nobody has a utensil on their right. Everyone starves while waiting forever.",
    "coreProperties": [
      "Demonstrates Deadlock",
      "Demonstrates Starvation",
      "Solved via asymmetric locking or a monitor"
    ],
    "hasContent": true,
    "detailedExplanation": "A naive semaphore implementation uses an array of 5 semaphores (one for each chopstick), all initialized to 1.\n```c\nwait(chopstick[i]);\nwait(chopstick[(i+1) % 5]);\n// Eat\nsignal(chopstick[i]);\nsignal(chopstick[(i+1) % 5]);\n```\n**Deadlock Scenario:** All 5 philosophers execute `wait(chopstick[i])` simultaneously. All chopsticks are now 0. They all block on the second `wait` forever.\n\n**Solutions:**\n1. Allow at most 4 philosophers to sit at the table.\n2. Asymmetric solution: Odd philosophers pick left then right; Even philosophers pick right then left.\n3. Allow picking up chopsticks only if BOTH are available.",
    "examNotes": "A highly common exam question is to write the semaphore code for the Dining Philosophers and then explain how it can cause a deadlock. Always memorize the asymmetric solution to fix it.",
    "sourceIndicator": "BOTH"
  },
  "os_m2_16": {
    "overview": "The Sleeping Barber problem is a classic inter-process communication and synchronization problem between multiple customer threads and one barber thread.",
    "formal": "A barbershop has one barber, one barber chair, and N waiting chairs. If there are no customers, the barber goes to sleep. If a customer arrives and the barber is sleeping, the customer wakes the barber. If a customer arrives and the barber is busy, the customer sits in a waiting chair. If all chairs are full, the customer leaves.",
    "intuition": "It's exactly like a real barbershop, but the barber is a process and customers are incoming requests. You need to synchronize them so that the barber doesn't sleep forever, and customers don't wait if there are no chairs.",
    "coreProperties": [
      "Producer-Consumer variant",
      "Uses semaphores for waiting room count"
    ],
    "hasContent": true,
    "detailedExplanation": "We need three semaphores and one integer:\n- `Semaphore customers = 0` (Counts waiting customers)\n- `Semaphore barber = 0` (Indicates if the barber is idle)\n- `Semaphore mutex = 1` (Protects the `waiting` counter)\n- `int waiting = 0` (Number of customers in the waiting room)\n\n**Customer Code:**\n```c\nwait(mutex);\nif (waiting < N) {\n  waiting++;\n  signal(customers); // Wake barber if sleeping\n  signal(mutex);\n  wait(barber); // Wait for barber to be ready\n  // Get haircut\n} else {\n  signal(mutex); // Leave shop\n}\n```\n**Barber Code:**\n```c\nwhile(true) {\n  wait(customers); // Go to sleep if 0\n  wait(mutex);\n  waiting--;\n  signal(barber); // Barber is ready\n  signal(mutex);\n  // Cut hair\n}\n```",
    "keyPoints": [
      "Demonstrates producer-consumer with a finite buffer (waiting chairs).",
      "Requires protecting shared state (`waiting` count) with a mutex.",
      "VSSUT syllabus specifically requires this classic problem."
    ],
    "sourceIndicator": "CLASS NOTES"
  },
  "os_m2_17": {
    "overview": "Classic problems (Producer-Consumer, Readers-Writers, Dining Philosophers) are used to test nearly every newly proposed synchronization scheme.",
    "formal": "Includes the Bounded-Buffer (Producer-Consumer) Problem, Readers-Writers Problem, and Dining-Philosophers Problem. They represent real-world OS design challenges like networking buffers or database read/write locks.",
    "intuition": "The standard 'stress tests' in computer science for proving that your locking mechanism doesn't cause crashes, deadlocks, or starvation.",
    "coreProperties": [
      "Bounded-Buffer",
      "Readers-Writers",
      "Dining-Philosophers"
    ],
    "hasContent": true,
    "workedExamples": [
      {
        "problem": "Exam Focus: Monitors & Producer-Consumer",
        "solution": "1. Producer-Consumer Problem: A producer generates items into a shared buffer, and a consumer removes them. Synchronization is required to prevent producing into a full buffer or consuming from an empty one (using full, empty, and mutex semaphores).\n2. Monitors: A high-level language construct that abstracts synchronization. Only one process can be active within a monitor at a time. It uses Condition Variables (wait, signal) to handle synchronization without exposing low-level locks to the programmer.",
        "explanation": "Monitors prevent the common programming errors associated with raw semaphores (like swapping wait/signal order)."
      }
    ],
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_18": {
    "overview": "A Deadlock occurs when a set of blocked processes each hold a resource and wait to acquire a resource held by another process in the set.",
    "formal": "In a multiprogramming environment, several processes may compete for a finite number of resources. If a process requests a resource that is unavailable, it enters a waiting state. Sometimes, it is never again able to change state because the requested resources are held by other waiting processes.",
    "intuition": "Four cars arrive at a 4-way stop at the exact same time. The rules say yield to the right. Everyone yields to the right in a circle, so nobody ever moves.",
    "coreProperties": [
      "Permanent blocking",
      "Requires cyclical dependency"
    ],
    "hasContent": true,
    "sourceIndicator": "BOTH"
  },
  "os_m2_19": {
    "overview": "A classic deadlock example involves two processes and two distinct resources (like a printer and a disk drive).",
    "formal": "P1 requests Printer, gets it. P2 requests Disk, gets it. P1 requests Disk (blocks). P2 requests Printer (blocks). Both wait forever.",
    "intuition": "You have the key to the vault, but you need the passcode. Your partner has the passcode, but they need the key. Neither will give up what they have.",
    "coreProperties": [
      "Resource contention",
      "Database locking",
      "Message passing deadlocks"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_20": {
    "overview": "Resources are entities required by processes to execute, such as CPU cycles, memory space, files, and I/O devices.",
    "formal": "A process must request a resource before using it and must release it after. Resources can be preemptable (CPU, memory) or non-preemptable (Printers, mutex locks). Deadlocks usually involve non-preemptable resources.",
    "intuition": "Books in a library. You check them out (request), read them (use), and return them (release).",
    "coreProperties": [
      "Request -> Use -> Release",
      "Preemptable vs Non-preemptable"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_21": {
    "overview": "A system has various resource types, and each type may have multiple identical instances.",
    "formal": "If a process requests an instance of a resource type, the allocation of ANY instance of that type will satisfy the request.",
    "intuition": "You don't care WHICH of the 5 identical coffee machines you use, you just need ONE coffee machine.",
    "coreProperties": [
      "Resource Types (R1, R2...)",
      "Instances (W1, W2...)"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_22": {
    "overview": "Deadlock characterization defines the four necessary conditions that must hold simultaneously for a deadlock to arise in a system.",
    "formal": "A deadlock situation can arise if and only if the following four conditions hold simultaneously in a system: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
    "intuition": "Imagine a four-way stop intersection. Cars arrive from all 4 directions simultaneously. Every car holds its spot (Hold and Wait), nobody can force another car out (No Preemption), there is only space for one car per lane (Mutual Exclusion), and everyone is waiting for the car on their right to go (Circular Wait). Traffic is deadlocked.",
    "coreProperties": [
      "Coffman Conditions",
      "Graph modeling"
    ],
    "hasContent": true,
    "detailedExplanation": "1. **Mutual Exclusion:** At least one resource must be held in a non-sharable mode; only one process at a time can use the resource.\n2. **Hold and Wait:** A process must be holding at least one resource and waiting to acquire additional resources held by other processes.\n3. **No Preemption:** Resources cannot be preempted; a resource can be released only voluntarily by the process holding it, after it has completed its task.\n4. **Circular Wait:** There must exist a set {P0, P1, ..., Pn} of waiting processes such that P0 is waiting for a resource held by P1, P1 is waiting for P2, ..., and Pn is waiting for P0.",
    "keyPoints": [
      "All four conditions MUST occur simultaneously.",
      "If we can prevent even ONE of these conditions, deadlock is impossible (This is the basis of Deadlock Prevention).",
      "Circular wait implies hold-and-wait, but they are conceptually distinct in defining the state."
    ],
    "examNotes": "A highly common short-answer question is simply listing and defining these four conditions.",
    "sourceIndicator": "BOTH"
  },
  "os_m2_23": {
    "overview": "The Four Necessary Conditions for deadlock are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
    "formal": "1. Mutual exclusion (non-sharable resource). 2. Hold and wait (process holding a resource waits for another). 3. No preemption (resources cannot be forcibly taken). 4. Circular wait (P0 waits for P1, P1 waits for P2... Pn waits for P0).",
    "intuition": "If you can break even ONE of these rules (e.g., allow stealing resources, or allow sharing), a deadlock is physically impossible.",
    "coreProperties": [
      "Mutual Exclusion",
      "Hold & Wait",
      "No Preemption",
      "Circular Wait"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_24": {
    "overview": "A Resource-Allocation Graph is a directed graph used to precisely describe deadlocks.",
    "formal": "It consists of a set of vertices V and edges E. V is partitioned into P (processes, circles) and R (resources, squares with dots for instances).",
    "intuition": "A map of arrows. If you can follow the arrows in a circle, you have a traffic jam (deadlock).",
    "coreProperties": [
      "P = Process set",
      "R = Resource set",
      "Cycles indicate potential deadlock"
    ],
    "hasContent": true,
    "detailedExplanation": "A directed edge from process Pi to resource Rj is a **request edge**. An edge from Rj to Pi is an **assignment edge**.\n\n**Rule:**\n- If the graph contains no cycles, there is NO deadlock.\n- If the graph contains a cycle:\n  - And each resource type has exactly 1 instance, a deadlock EXISTS.\n  - And resource types have multiple instances, a deadlock MAY exist.",
    "examNotes": "Be able to draw this graph. Use circles for processes, squares for resources, and put dots inside the squares for instances.",
    "sourceIndicator": "BOTH"
  },
  "os_m2_25": {
    "overview": "There are three general ways to handle deadlocks: Prevention/Avoidance, Detection & Recovery, or ignoring the problem entirely.",
    "formal": "Most OSes (including Linux and Windows) use the third method: the Ostrich Algorithm. They ignore the problem and assume deadlocks rarely occur. If they do, you reboot.",
    "intuition": "1. Pretend it never happens and reboot if it does. 2. Build a rigid system so it can't happen. 3. Install an alarm system to fix it when it happens.",
    "coreProperties": [
      "Prevention",
      "Avoidance",
      "Detection/Recovery",
      "Ostrich Algorithm"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_26": {
    "overview": "Deadlock Prevention provides a set of methods to ensure that at least one of the necessary conditions cannot hold.",
    "formal": "- Break Mutual Exclusion: Make resources sharable (often impossible).\n- Break Hold and Wait: Require processes to request all resources at once before execution.\n- Break No Preemption: Allow the OS to forcefully take resources away.\n- Break Circular Wait: Impose a total ordering of all resource types, and require processes to request resources in an increasing order of enumeration.",
    "intuition": "Creating physical laws so a traffic jam can't exist (e.g., making all streets one-way strictly north-to-south).",
    "coreProperties": [
      "Breaks 1 of 4 conditions",
      "Often leads to low device utilization",
      "Imposes strict structural rules"
    ],
    "hasContent": true,
    "keyPoints": [
      "Focuses on structurally breaking the 4 conditions.",
      "Can lead to low device utilization and reduced throughput."
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m2_27": {
    "overview": "Deadlock Avoidance requires that the OS be given additional information in advance concerning which resources a process will request.",
    "formal": "By knowing the maximum future demands, the OS can dynamically examine the resource-allocation state (e.g., using Banker's Algorithm) to ensure a circular wait condition can never exist.",
    "intuition": "A bank checking your credit limit and their vault cash before approving a loan, ensuring they never go bankrupt.",
    "coreProperties": [
      "Requires a priori information",
      "Safe State checking",
      "Banker's Algorithm"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_28": {
    "overview": "A state is safe if the system can allocate resources to each process (up to its maximum) in some order and still avoid a deadlock.",
    "formal": "More formally, a system is in a safe state only if there exists a safe sequence. A sequence of processes <P1, P2, ..., Pn> is a safe sequence if, for each Pi, the resources that Pi can still request can be satisfied by the currently available resources plus the resources held by all Pj (where j < i).",
    "intuition": "If you have $100 and three friends who each might need up to $50, you can't guarantee you won't run out. But if you know Friend 1 will return their $50 before Friend 2 needs theirs, you are in a 'safe state'. There is a specific order of fulfilling requests that guarantees success.",
    "coreProperties": [
      "Safe Sequence exists",
      "Safe State -> NO Deadlock",
      "Unsafe State -> Potential Deadlock"
    ],
    "hasContent": true,
    "detailedExplanation": "A safe state is NOT a deadlocked state. Conversely, a deadlocked state is an unsafe state. However, not all unsafe states are deadlocks! An unsafe state simply means the system *could* deadlock depending on the order processes actually request resources. The Banker's Algorithm ensures the system never enters an unsafe state.",
    "keyPoints": [
      "Safe State => No Deadlock.",
      "Unsafe State => Possibility of Deadlock (but not necessarily deadlocked yet).",
      "Deadlock State => Unsafe State.",
      "A Safe Sequence is the proof that a state is safe."
    ],
    "examNotes": "Remember the relationship: Deadlock states are a subset of Unsafe states. The OS tries to prevent entering the Unsafe zone entirely.",
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_29": {
    "hasContent": true,
    "overview": "Banker's Algorithm is a deadlock avoidance algorithm that simulates the maximum possible allocation of resources to ensure the system never enters an unsafe state.",
    "formal": "Developed by Dijkstra, it requires each process to declare a priori the maximum number of instances of each resource type it may need. The algorithm checks every resource request against the available resources and the maximum future needs. It only grants the request if the resulting state forms a 'Safe Sequence' where all processes can theoretically finish.",
    "intuition": "Think of a bank with a limited amount of cash. The bank manager (OS) only approves a loan (resource request) if they can guarantee that they will still have enough cash left over to satisfy the maximum needs of at least one customer, who will then pay back their entire loan, freeing up cash for the next person.",
    "coreProperties": [
      "Deadlock Avoidance",
      "Requires Max resources in advance",
      "Less restrictive than Deadlock Prevention"
    ],
    "workedExamples": [
      {
        "problem": "5 processes, 3 resources (A,B,C). Available = [3, 3, 2]. P1 Need = [1, 2, 2], Allocation = [2, 0, 0]. Can P1 be satisfied safely?",
        "solution": "1. P1 Need [1, 2, 2] <= Available [3, 3, 2]. (Yes, it can run).\n2. If P1 runs to completion, it will return its Allocation. Work becomes Work + Allocation[P1] = [3, 3, 2] + [2, 0, 0] = [5, 3, 2].\n3. This new Work pool [5, 3, 2] is then used to satisfy the next process. If we can find a sequence for all processes, it's a Safe State."
      }
    ],
    "detailedExplanation": "The algorithm uses several matrices and vectors:\n- **Available[m]:** Number of available instances of each resource.\n- **Max[n][m]:** Maximum demand of each process.\n- **Allocation[n][m]:** Currently allocated resources for each process.\n- **Need[n][m]:** Remaining resource needs. `Need[i][j] = Max[i][j] - Allocation[i][j]`\n\n**Safety Algorithm:**\n1. Initialize `Work = Available` and `Finish[i] = false` for all i.\n2. Find an index i such that `Finish[i] == false` AND `Need[i] <= Work`.\n3. If found, `Work = Work + Allocation[i]`, `Finish[i] = true`. Go to step 2.\n4. If all `Finish[i] == true`, the state is Safe.",
    "keyPoints": [
      "Avoids deadlock by ensuring the system always remains in a Safe State.",
      "Requires processes to state their Maximum Needs upfront.",
      "Highly conservative; prevents deadlocks but lowers resource utilization.",
      "Uses the Safety Algorithm to verify a state, and the Resource-Request Algorithm to grant/deny live requests."
    ],
    "examNotes": "You WILL get a 10-15 mark matrix question on Banker's Algorithm. Always calculate the NEED matrix first (Max - Allocation). Then, explicitly write down the Safe Sequence (e.g., <P1, P3, P4, P0, P2>) and show the Work vector updating at each step.",
    "commonMistakes": [
      {
        "mistake": "Adding Need to Work instead of Allocation to Work.",
        "fix": "When a process finishes, it returns what it was HOLDING (Allocation), not what it needed. Work = Work + Allocation."
      }
    ],
    "sourceIndicator": "BOTH"
  },
  "os_m2_30": {
    "overview": "The Resource-Request Algorithm is the dynamic part of Banker's Algorithm that decides whether an incoming request should be granted immediately or made to wait.",
    "formal": "1. If Request <= Need, proceed. Else Error.\n2. If Request <= Available, proceed. Else Wait.\n3. Pretend to allocate: Available -= Request, Allocation += Request, Need -= Request.\n4. Run the Safety Algorithm on this new simulated state. If Safe, grant. If Unsafe, roll back and make process Wait.",
    "intuition": "The bank teller doing the math on scratch paper before officially handing you the cash.",
    "coreProperties": [
      "Modifies state hypothetically",
      "Calls Safety Algorithm"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_31": {
    "overview": "If a system does not employ a deadlock-prevention or a deadlock-avoidance algorithm, then a deadlock situation may occur, requiring Detection.",
    "formal": "The system must provide an algorithm that examines the state to determine if deadlock occurred, and an algorithm to recover from it. For single instances, it uses a Wait-For Graph.",
    "intuition": "A helicopter flying over the city looking for traffic gridlocks.",
    "coreProperties": [
      "O(V+E) for single instance",
      "O(m x n^2) for multiple instances",
      "High runtime overhead"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_32": {
    "overview": "A Wait-for Graph is a variant of the resource-allocation graph used for deadlock detection when all resources have exactly one instance.",
    "formal": "We obtain it by removing the resource nodes and collapsing the appropriate edges. An edge from Pi to Pj exists if Pi is waiting for a resource Pj holds. A cycle implies deadlock.",
    "intuition": "Just mapping who is waiting for whom. If Bob waits for Alice, Alice waits for Charlie, and Charlie waits for Bob, you have a circle of waiting.",
    "coreProperties": [
      "Single-instance resources only",
      "Cycle detection algorithm used"
    ],
    "hasContent": true,
    "sourceIndicator": "TEXTBOOK"
  },
  "os_m2_33": {
    "overview": "Once a deadlock is detected, the system must recover. The two main options are process termination or resource preemption.",
    "formal": "1. **Process Termination:** Abort all deadlocked processes, or abort one at a time until the deadlock cycle is eliminated.\n2. **Resource Preemption:** Successively preempt some resources from processes and give them to others until the cycle is broken. Requires rollback capabilities.",
    "intuition": "Sending a tow truck to forcibly remove a car from the traffic jam, or making a car reverse out of the intersection.",
    "coreProperties": [
      "Process Abortion",
      "Resource Preemption",
      "Rollback",
      "Victim Selection"
    ],
    "hasContent": true,
    "sourceIndicator": "BOTH"
  }
};

Object.assign(osContent, batch2Foundations, batch2Sync, batch2Deadlocks, batch2Extensions);
