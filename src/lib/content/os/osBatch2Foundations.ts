import { TopicContent } from '@/lib/content/types';

export const batch2Foundations: Record<string, TopicContent> = {
  "os_m1_1": {
    "hasContent": true,
    "overview": "An Operating System (OS) is software that manages computer hardware and provides an environment for application programs to execute.",
    "formal": "An OS is fundamentally a resource allocator and a control program. As a resource allocator, it manages CPU time, memory space, file-storage, and I/O devices to ensure efficiency. As a control program, it manages the execution of user programs to prevent errors and improper use of the computer.",
    "intuition": "Think of an OS as a government. It performs no useful function by itself, but it provides the secure and organized environment in which other programs (the citizens) can do useful work.",
    "textbookReference": "Galvin Section 1.1",
    "learningObjectives": [
      "Define the dual role of an OS as a resource allocator and control program.",
      "Identify the core components of a computer system: hardware, OS, applications, and users."
    ],
    "coreProperties": [
      "Resource Allocator",
      "Control Program",
      "Hardware Abstraction"
    ],
    "keyPoints": [
      "No universally accepted definition of an OS exists, but it is generally the one program running at all times (the kernel).",
      "Ease of use and resource utilization are its two primary competing goals."
    ],
    "prerequisites": [],
    "commonMistakes": [
      {
        "mistake": "Confusing the OS with the User Interface (GUI). The OS is the underlying resource allocator and control program, not just the graphical desktop.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_2": {
    "hasContent": true,
    "overview": "A Simple Batch System executes a series of jobs in batches without user interaction, minimizing setup time by grouping similar jobs.",
    "formal": "Early computers ran one job at a time. To speed up processing, operators batched together jobs with similar needs and ran them through the computer as a group. A resident monitor automatically transferred control from one job to the next.",
    "intuition": "Like a commercial laundry service. You don't wash one shirt at a time. You wait until you have a massive batch of whites, load them all, and run the cycle.",
    "textbookReference": "Galvin Section 1.4",
    "learningObjectives": [
      "Understand the transition from single-job to batch processing.",
      "Identify the role of the resident monitor."
    ],
    "coreProperties": [
      "No user interaction",
      "Resident monitor",
      "Job grouping"
    ],
    "keyPoints": [
      "The CPU is often idle because I/O devices are slow compared to the CPU.",
      "Batch systems lack interactivity, making debugging difficult."
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing Batch with Time-Sharing. Batch has zero user interaction during execution. Time-Sharing is highly interactive.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ],
    "prerequisites": [
      "os_m1_1"
    ]
  },
  "os_m1_3": {
    "hasContent": true,
    "overview": "Multiprogramming increases CPU utilization by organizing jobs so that the CPU always has one to execute.",
    "formal": "The operating system keeps several jobs in memory simultaneously. When a job has to wait for an I/O task, the OS switches to another job, ensuring the CPU is never idle.",
    "intuition": "Like a chef cooking a complex meal. While the pasta is boiling (waiting for I/O), the chef chops vegetables (CPU). The chef doesn't just stare at the pot.",
    "textbookReference": "Galvin Section 1.4",
    "learningObjectives": [
      "Explain how multiprogramming maximizes CPU utilization.",
      "Define the concept of a job pool and ready queue."
    ],
    "coreProperties": [
      "Job Pool",
      "CPU Multiplexing",
      "High Utilization"
    ],
    "keyPoints": [
      "It is the fundamental concept behind all modern operating systems.",
      "Requires memory management and CPU scheduling to decide which jobs to bring to memory and which to run."
    ],
    "commonMistakes": [
      {
        "mistake": "Thinking multiprogramming means running jobs at the exact same time. It means switching between them rapidly on a single CPU, not true parallel execution.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ],
    "prerequisites": [
      "os_m1_1"
    ]
  },
  "os_m1_4": {
    "hasContent": true,
    "overview": "Time-Sharing (multitasking) is a logical extension of multiprogramming where CPU time is interleaved rapidly among multiple users.",
    "formal": "A time-shared OS uses CPU scheduling and multiprogramming to provide each user with a small portion of a time-shared computer. Each user has at least one separate program in memory.",
    "intuition": "A chess grandmaster playing 50 simultaneous games. They spend 5 seconds at each board and move on. Each amateur feels they are playing a continuous game.",
    "textbookReference": "Galvin Section 1.4",
    "learningObjectives": [
      "Differentiate between Multiprogramming and Time-Sharing.",
      "Understand the requirement for interactive response times."
    ],
    "coreProperties": [
      "Interactive",
      "Time Slicing",
      "Multitasking"
    ],
    "keyPoints": [
      "Response time should be short (typically < 1 second).",
      "Requires complex memory management and protection to isolate users from each other."
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming Time-Sharing is fundamentally different from Multiprogramming. Time-Sharing is just Multiprogramming optimized for response time rather than raw throughput.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ],
    "prerequisites": [
      "os_m1_1"
    ]
  },
  "os_m1_5": {
    "hasContent": true,
    "overview": "Personal Computer Systems are dedicated to a single user, prioritizing user convenience and responsiveness over maximizing CPU utilization.",
    "formal": "Historically, as hardware costs plummeted, the focus shifted from maximizing expensive mainframe CPU time to maximizing user convenience. PC operating systems (like Windows, macOS) adopted time-sharing principles for a single user.",
    "intuition": "Owning your own car instead of taking the bus. You might leave it parked 90% of the time (low utilization), but it's always ready when you need it.",
    "textbookReference": "Supplementary / VSSUT-Specific",
    "learningObjectives": [
      "Identify the primary design goal shift from utilization to convenience."
    ],
    "coreProperties": [
      "Single User",
      "Convenience-focused",
      "Low average utilization"
    ],
    "keyPoints": [
      "Early PC operating systems often provided limited protection compared with systems designed for protected multi-user environments. Modern general-purpose PC operating systems provide hardware-supported protection and memory isolation."
    ],
    "prerequisites": [
      "os_m1_1"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming modern PCs still lack protection. Early PCs lacked protection for cost/convenience, but modern PCs implement full hardware-enforced isolation.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_6": {
    "hasContent": true,
    "overview": "Parallel Systems (Multiprocessor Systems) have two or more processors in close communication, sharing the computer bus, clock, memory, and peripheral devices.",
    "formal": "Also known as tightly coupled systems, they increase throughput and reliability. They can be Symmetric (SMP) where all CPUs are peers, or Asymmetric (ASMP) where a master CPU assigns tasks to slave CPUs.",
    "intuition": "A kitchen with multiple chefs working on the same order. They share the same counter space (memory) and utensils (I/O).",
    "textbookReference": "Galvin Section 1.3.2",
    "learningObjectives": [
      "List the three main advantages: increased throughput, economy of scale, increased reliability.",
      "Differentiate SMP from ASMP."
    ],
    "coreProperties": [
      "Tightly Coupled",
      "Shared Memory",
      "Fault Tolerance"
    ],
    "keyPoints": [
      "Graceful degradation: if one processor fails, the system slows down but doesn't halt.",
      "Symmetric Multiprocessing (SMP) is the standard in modern multi-core systems."
    ],
    "prerequisites": [
      "os_m1_1"
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing asymmetric and symmetric multiprocessing (SMP). SMP treats all processors equally, whereas ASMP relies on a boss-worker relationship.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_7": {
    "hasContent": true,
    "overview": "Distributed Systems are a collection of physically separate, heterogeneous computer systems networked to provide users with access to various resources.",
    "formal": "A loosely coupled system where each node has its own local memory and clock. Nodes communicate via a network (LAN/WAN). They provide resource sharing, computation speedup, and extreme reliability.",
    "intuition": "A global franchise of restaurants. They communicate over the phone (network) and share recipes, but each has its own kitchen (memory) and manager (CPU).",
    "textbookReference": "Galvin Section 1.10",
    "learningObjectives": [
      "Contrast tightly coupled (parallel) vs loosely coupled (distributed) systems.",
      "Identify the benefits of resource sharing across a network."
    ],
    "coreProperties": [
      "Loosely Coupled",
      "No Shared Memory",
      "Networked"
    ],
    "keyPoints": [
      "Client-Server and Peer-to-Peer are the two primary structural models for distributed systems."
    ],
    "prerequisites": [
      "os_m1_1"
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing parallel systems (tightly coupled, shared memory) with distributed systems (loosely coupled, network communication).",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_8": {
    "hasContent": true,
    "overview": "Real-Time Systems are used when rigid time requirements have been placed on the operation of a processor or the flow of data.",
    "formal": "Processing must be done within the defined constraints, or the system will fail. A hard real-time system guarantees critical tasks complete on time. A soft real-time system gives critical tasks priority but no absolute guarantee.",
    "intuition": "A car's airbag system. If it deploys 1 second too late, the computation is technically correct, but the patient dies. Timing is part of the correctness.",
    "textbookReference": "Galvin Section 1.11",
    "learningObjectives": [
      "Differentiate Hard vs Soft Real-Time.",
      "Explain why standard OS features like virtual memory delay are unacceptable in Hard Real-Time."
    ],
    "coreProperties": [
      "Rigid Deadlines",
      "Deterministic",
      "Priority-based"
    ],
    "keyPoints": [
      "Hard real-time systems often lack secondary storage and virtual memory to avoid page fault delays.",
      "Soft real-time is used in multimedia streaming where an occasional dropped frame is acceptable."
    ],
    "prerequisites": [
      "os_m1_1"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming 'real-time' simply means 'very fast'. Real-time means deterministic and predictable response times meeting strict deadlines, not just raw speed.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_9": {
    "hasContent": true,
    "overview": "OS Structures and System Components dictate how the operating system is organized and partitioned into manageable pieces.",
    "formal": "Modern OSes are large and complex. They must be engineered carefully. Common architectures include Simple (MS-DOS), Layered, Microkernel (Mach), and Modular (Linux, Windows).",
    "intuition": "Building a house. You don't just dump all materials into a pile (monolithic). You build the foundation, then walls, then roof (layered), or you build modular rooms and connect them.",
    "textbookReference": "Galvin Section 2.5/2.6",
    "learningObjectives": [
      "Understand the Layered approach and its inefficiency.",
      "Explain the Microkernel architecture and its benefits for security."
    ],
    "coreProperties": [
      "Monolithic",
      "Layered",
      "Microkernel",
      "Modules"
    ],
    "keyPoints": [
      "Microkernels move as much as possible from the kernel into user space, communicating via message passing.",
      "Most modern OSes (Linux, Solaris, Windows) use loadable kernel modules (LKMs)."
    ],
    "prerequisites": [
      "os_m1_1"
    ],
    "commonMistakes": [
      {
        "mistake": "Believing microkernels are faster than monolithic kernels. Microkernels are actually often slower due to message passing overhead, but provide much higher security and reliability.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_10": {
    "hasContent": true,
    "overview": "The Protection System ensures that the resources of the computer are accessed only in authorized ways by authorized processes.",
    "formal": "Protection is any mechanism for controlling the access of programs, processes, or users to the resources defined by a computer system. It requires distinguishing between authorized and unauthorized usage.",
    "intuition": "The locks on the doors of an apartment building. The OS gives you a key that only opens your apartment, preventing you from walking into your neighbor's unit.",
    "textbookReference": "Galvin Section 1.9",
    "learningObjectives": [
      "Differentiate Protection (internal mechanism) from Security (external defense)."
    ],
    "coreProperties": [
      "Access Control",
      "Isolation",
      "Privilege levels"
    ],
    "keyPoints": [
      "Relies heavily on the Dual-Mode operation (User mode vs Kernel mode) supported by hardware."
    ],
    "prerequisites": [
      "os_m1_9"
    ],
    "commonMistakes": [
      {
        "mistake": "Using 'Security' and 'Protection' interchangeably. Protection is the internal mechanism controlling resource access; Security is the broader defense against external/internal attacks.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_11": {
    "hasContent": true,
    "overview": "OS Services are the functions the operating system provides to programs and to the users of those programs.",
    "formal": "The OS provides an environment for execution. Core services include User Interface, Program Execution, I/O Operations, File-System Manipulation, Communications, Error Detection, Resource Allocation, Accounting, and Protection/Security.",
    "intuition": "A hotel concierge. They handle room service (I/O), wake-up calls (execution), handling complaints (error detection), and keeping the bill (accounting).",
    "textbookReference": "Galvin Section 2.1",
    "learningObjectives": [
      "List the primary services an OS provides to the user vs to the system itself."
    ],
    "coreProperties": [
      "Program Execution",
      "I/O",
      "File Systems",
      "Communications"
    ],
    "keyPoints": [
      "System calls are the interface to these services."
    ],
    "prerequisites": [
      "os_m1_9"
    ],
    "commonMistakes": [
      {
        "mistake": "Failing to distinguish between services helpful to the user (like UI and program execution) and services ensuring efficient system operation (like resource allocation and protection).",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_12": {
    "hasContent": true,
    "overview": "System Calls provide the programmatic interface to the services made available by an operating system.",
    "formal": "A system call invokes a routine in the OS kernel. They are mostly accessed by programs via a high-level API (POSIX, Win32) rather than direct assembly instruction traps.",
    "intuition": "Ordering from a menu. You don't tell the chef exactly how to cook the steak (hardware registers); you use the standard menu item (API/System Call).",
    "textbookReference": "Galvin Section 2.3",
    "learningObjectives": [
      "Explain how a system call generates a trap to switch to kernel mode.",
      "Identify parameter passing methods (Registers, Block, Stack)."
    ],
    "coreProperties": [
      "API",
      "Trap/Interrupt",
      "Parameter Passing"
    ],
    "keyPoints": [
      "Passing parameters in a block/table in memory is preferred when there are more parameters than registers."
    ],
    "prerequisites": [
      "os_m1_9"
    ],
    "commonMistakes": [
      {
        "mistake": "Do not confuse a system call with a hardware interrupt; a system call is the controlled interface through which a user process requests an OS service.",
        "fix": "Remember that an API may invoke a system call, but the system call is the actual trap into kernel mode."
      }
    ]
  },
  "os_m1_13": {
    "hasContent": true,
    "overview": "A process is a program in execution. It is the fundamental unit of work in a modern operating system.",
    "formal": "A program is a passive entity (a file on disk). A process is an active entity, with a program counter specifying the next instruction, a stack containing temporary data, a data section containing global variables, and a heap for dynamically allocated memory.",
    "intuition": "A recipe is a program (passive text). You cooking the recipe in your kitchen is the process (active, consuming ingredients/memory, current step/PC).",
    "textbookReference": "Galvin Section 3.1.1",
    "learningObjectives": [
      "Distinguish between a program and a process.",
      "Identify the memory layout of a process (Text, Data, Heap, Stack)."
    ],
    "coreProperties": [
      "Active Entity",
      "Text Section",
      "Data Section",
      "Heap",
      "Stack"
    ],
    "keyPoints": [
      "The stack and heap are commonly arranged so that they can grow toward each other, allowing flexible use of available address space. The exact layout and growth behavior are implementation-dependent.",
      "Two processes running the same program (e.g., two Chrome windows) are entirely separate execution sequences."
    ],
    "prerequisites": [
      "os_m1_12"
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing a program with a process. A program is a passive file on disk; a process is an active entity executing in memory with a program counter and state.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_14": {
    "hasContent": true,
    "overview": "As a process executes, it changes state. The state of a process is defined by its current activity.",
    "formal": "A process may be in one of five generic states: New (being created), Running (instructions are being executed), Waiting/Blocked (waiting for some event to occur), Ready (waiting to be assigned to a processor), and Terminated (finished execution).",
    "intuition": "Like a job application: You write the resume (New), you sit in the waiting room (Ready), you do the interview (Running), you wait for a background check (Blocked/Waiting), and you either get hired or rejected (Terminated).",
    "textbookReference": "Galvin Section 3.1.2",
    "learningObjectives": [
      "Map process transitions between the 5 standard states.",
      "Distinguish between 'Ready' and 'Waiting/Blocked'."
    ],
    "labIntegrationPrompt": "Open the Process State Machine Laboratory. Click 'Create Process' to transition from New to Ready, then use 'Dispatch' to move it to Running. Force an I/O request to see how it moves to Blocked rather than Ready.",
    "coreProperties": [
      "New",
      "Ready",
      "Running",
      "Waiting",
      "Terminated"
    ],
    "keyPoints": [
      "Only one process can be 'Running' on any processor at any instant, but many processes may be 'Ready' or 'Waiting'.",
      "An I/O completion event moves a process from 'Waiting' to 'Ready', never directly to 'Running'."
    ],
    "prerequisites": [
      "os_m1_13"
    ],
    "commonMistakes": [
      {
        "mistake": "Do not assume every process moves directly from READY to TERMINATED; state transitions depend on scheduling and events such as I/O.",
        "fix": "An I/O completion event always moves a process to Ready, where it must wait for the scheduler."
      }
    ]
  },
  "os_m1_15": {
    "hasContent": true,
    "overview": "Process Management involves the creation, scheduling, and termination of processes by the OS.",
    "formal": "The OS is responsible for creating and deleting both user and system processes, suspending and resuming processes, providing mechanisms for process synchronization, process communication, and deadlock handling.",
    "intuition": "An air traffic controller. They tell planes when to take off (create), land (terminate), circle (wait), and ensure they don't crash into each other (synchronization/deadlock).",
    "textbookReference": "Galvin Section 3.1 - 3.3",
    "learningObjectives": [
      "List the 5 major activities of an OS in regard to process management."
    ],
    "coreProperties": [
      "Creation/Deletion",
      "Suspension/Resumption",
      "Synchronization"
    ],
    "keyPoints": [
      "The OS uses various queues (Ready Queue, Device Queues) to manage the lifecycle and scheduling of these processes."
    ],
    "prerequisites": [
      "os_m1_13"
    ],
    "commonMistakes": [
      {
        "mistake": "Thinking process management only involves CPU scheduling. It also includes creation, termination, synchronization, and deadlock handling.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_16": {
    "hasContent": true,
    "overview": "Each process is represented in the operating system by a Process Control Block (PCB), also called a task control block.",
    "formal": "The PCB serves as the repository for any information that may vary from process to process. It contains Process State, Program Counter, CPU Registers, CPU Scheduling Information, Memory-Management Information, Accounting Information, and I/O Status Information.",
    "intuition": "A patient's medical chart at a hospital. Whenever the doctor (CPU) sees the patient (Process), they read the chart (PCB) to know exactly where they left off.",
    "textbookReference": "Galvin Section 3.1.3",
    "learningObjectives": [
      "List the key components stored in a PCB.",
      "Explain why the PCB is critical during a context switch."
    ],
    "coreProperties": [
      "Process State",
      "Program Counter",
      "Registers",
      "Memory Limits"
    ],
    "keyPoints": [
      "The PCB must be saved to memory when a process is preempted, and loaded from memory when resumed. This is the core overhead of a context switch."
    ],
    "prerequisites": [
      "os_m1_13"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming the PCB is stored in user memory. The PCB is a critical kernel data structure stored in protected OS memory to prevent user tampering.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_17": {
    "hasContent": true,
    "overview": "Interrupts are signals sent to the CPU by hardware or software indicating an event that needs immediate attention.",
    "formal": "When an interrupt occurs, the hardware transfers control to the operating system. It saves the state of the interrupted process and jumps to the Interrupt Vector Table to execute the appropriate Interrupt Service Routine (ISR).",
    "intuition": "You are reading a book (executing). The phone rings (hardware interrupt). You place a bookmark (save PC/state), answer the phone (ISR), and then resume reading from the bookmark.",
    "textbookReference": "Galvin Section 1.2.1",
    "learningObjectives": [
      "Trace the execution flow of an interrupt.",
      "Differentiate a hardware interrupt from a software trap/exception."
    ],
    "coreProperties": [
      "Asynchronous",
      "Interrupt Vector",
      "ISR",
      "Trap"
    ],
    "keyPoints": [
      "A trap is a software-generated interrupt caused either by an error (divide by zero) or a user request (system call)."
    ],
    "prerequisites": [
      "os_m1_12"
    ],
    "commonMistakes": [
      {
        "mistake": "Using 'interrupt' and 'trap' interchangeably. A trap is a software-generated synchronous event (like divide-by-zero or system call), while an interrupt is typically asynchronous hardware-generated.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_18": {
    "hasContent": true,
    "overview": "Interprocess Communication (IPC) provides mechanisms for processes to communicate and synchronize their actions.",
    "formal": "Cooperating processes require an IPC mechanism. The two primary models are Shared Memory (a region of memory is shared by processes) and Message Passing (communication takes place by means of messages exchanged via the OS).",
    "intuition": "Shared Memory is like a whiteboard in a shared office; anyone can read/write it instantly. Message Passing is like sending physical mail through the postal service (the OS).",
    "textbookReference": "Galvin Section 3.4",
    "learningObjectives": [
      "Compare Shared Memory vs Message Passing.",
      "Identify situations where message passing is safer but slower."
    ],
    "coreProperties": [
      "Shared Memory",
      "Message Passing",
      "Direct/Indirect Naming"
    ],
    "keyPoints": [
      "Shared memory allows maximum speed and convenience since it runs at memory speeds. Message passing avoids conflicts and is easier to implement in distributed systems."
    ],
    "prerequisites": [
      "os_m1_13"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming shared memory is always better than message passing. While faster, shared memory introduces complex synchronization problems that message passing avoids.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_36": {
    "hasContent": true,
    "overview": "Process execution consists of a cycle of CPU execution and I/O wait. Processes alternate between these two states.",
    "formal": "Process execution begins with a CPU burst, followed by an I/O burst, which is followed by another CPU burst, then another I/O burst, and so on. Eventually, the final CPU burst ends with a system request to terminate execution. The duration of CPU bursts has been measured extensively; an exponential or hyperexponential frequency curve characterizes CPU-burst durations.",
    "intuition": "Think of an office worker reading a report (CPU burst), waiting for a coworker to reply with missing data (I/O burst), typing notes (CPU burst), and printing the file (I/O burst).",
    "textbookReference": "Galvin Section 5.1.1",
    "learningObjectives": [
      "Understand the alternating CPU-I/O burst cycle of process execution.",
      "Differentiate between CPU-bound and I/O-bound processes based on burst duration distributions.",
      "Explain why CPU-burst duration frequency curves are skewed toward short bursts."
    ],
    "coreProperties": [
      "CPU Burst",
      "I/O Burst",
      "Exponential Distribution",
      "CPU-bound vs I/O-bound"
    ],
    "keyPoints": [
      "An I/O-bound process typically has many short CPU bursts.",
      "A CPU-bound process typically has a few very long CPU bursts.",
      "Empirical distribution curves show a large frequency of short bursts (<8 ms) and a small frequency of long bursts."
    ],
    "prerequisites": [
      "os_m1_14",
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming all CPU bursts are of similar duration or long.",
        "fix": "Empirical data shows that the vast majority of CPU bursts are extremely short, while only a small fraction are long bursts."
      }
    ]
  },
  "os_m1_37": {
    "hasContent": true,
    "overview": "The CPU Scheduler decides WHICH process runs. The Dispatcher actually gives that process control of the CPU.",
    "formal": "The dispatcher is the module that gives control of the CPU to the process selected by the short-term scheduler. This function involves: switching context, switching to user mode, and jumping to the proper location in the user program to restart it.",
    "intuition": "The Scheduler is the judge deciding who wins the race. The Dispatcher is the official who hands them the trophy and pushes them onto the podium.",
    "textbookReference": "Galvin Section 5.1",
    "learningObjectives": [
      "Differentiate the conceptual choice (Scheduler) from the mechanical action (Dispatcher)."
    ],
    "coreProperties": [
      "Context Switch",
      "Mode Switch",
      "Jump to PC"
    ],
    "keyPoints": [
      "The dispatcher is invoked during every process switch; therefore, it must be written in highly optimized assembly code."
    ],
    "prerequisites": [
      "os_m1_14"
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing the Scheduler and the Dispatcher. The Scheduler decides WHICH process gets the CPU; the Dispatcher actually GIVES control to that process.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_38": {
    "hasContent": true,
    "overview": "Dispatch Latency is the time it takes for the dispatcher to stop one process and start another running.",
    "formal": "Context switching requires saving the state of the old process and loading the state of the new process. This time is pure overhead, because the system does no useful work while switching.",
    "intuition": "The time it takes to clear the plates from the previous restaurant guest and set the table for the next guest. No one is eating during this time.",
    "textbookReference": "Galvin Section 5.1",
    "learningObjectives": [
      "Define Dispatch Latency.",
      "Explain why a high rate of context switching degrades overall system throughput."
    ],
    "coreProperties": [
      "Overhead",
      "State Save/Restore",
      "Hardware dependent"
    ],
    "keyPoints": [
      "Context-switch times are highly dependent on hardware support (e.g., multiple sets of registers allow context switching by simply changing a single pointer)."
    ],
    "prerequisites": [
      "os_m1_14"
    ],
    "commonMistakes": [
      {
        "mistake": "Thinking context switching is 'free' or instantaneous. It is pure overhead where no useful work is done, heavily impacting system throughput.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_39": {
    "hasContent": true,
    "overview": "Demand scheduling refers to scheduling tasks or pages dynamically as they are requested.",
    "formal": "While not a standard CPU scheduling classification in Galvin, in academic contexts it often refers to dynamic, event-driven scheduling mechanisms, or it is a conflation with Demand Paging (loading pages only when a page fault occurs).",
    "intuition": "A short-order cook. You don't cook meals in advance (batch); you only cook exactly what the customer orders, at the exact moment they order it.",
    "textbookReference": "Supplementary / VSSUT-Specific",
    "learningObjectives": [
      "Recognize this term in the context of the VSSUT syllabus as a supplementary or hybrid concept."
    ],
    "coreProperties": [
      "Dynamic",
      "Event-driven",
      "On-Demand"
    ],
    "keyPoints": [
      "Always verify with your instructor if this refers to CPU scheduling dynamics or memory management (Demand Paging)."
    ],
    "prerequisites": [
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing demand scheduling with Demand Paging. Always clarify whether the context is CPU task scheduling or memory management.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_19": {
    "hasContent": true,
    "overview": "A thread is a basic unit of CPU utilization; it comprises a thread ID, a program counter, a register set, and a stack.",
    "formal": "A thread shares with other threads belonging to the same process its code section, data section, and other operating-system resources, such as open files and signals. A traditional process has a single thread of control.",
    "intuition": "A process is a factory. Threads are the workers inside the factory. They all share the same building, power, and materials, but each worker does their own task concurrently.",
    "textbookReference": "Galvin Section 4.1.1",
    "learningObjectives": [
      "Differentiate between a process and a thread.",
      "Identify what resources are shared between threads and what are private."
    ],
    "coreProperties": [
      "Shared Data",
      "Private Stack",
      "Private PC",
      "Lightweight"
    ],
    "keyPoints": [
      "Threads share Code, Data, and Files. Threads have private Program Counters, Registers, and Stacks.",
      "Creating a thread is significantly faster than creating a process (fork)."
    ],
    "commonMistakes": [
      {
        "mistake": "Do not assume threads have completely separate address spaces.",
        "fix": "While threads share an address space, each thread must have its own private stack for function calls and local variables."
      }
    ],
    "prerequisites": [
      "os_m1_13"
    ]
  },
  "os_m1_20": {
    "hasContent": true,
    "overview": "Like processes, threads undergo state transitions during their lifecycle.",
    "formal": "A thread can be in any of the standard execution states: Ready, Running, or Blocked (Waiting). Because threads share the same address space, synchronization is mandatory.",
    "intuition": "Just like whole factories can be shut down or running, individual workers (threads) can be actively working (Running), waiting for parts (Blocked), or ready to work (Ready).",
    "textbookReference": "Galvin Section 4.4",
    "learningObjectives": [
      "Understand that thread scheduling can happen independently of process scheduling.",
      "Identify thread cancellation methods."
    ],
    "coreProperties": [
      "Ready/Running/Blocked",
      "Asynchronous Cancellation",
      "Deferred Cancellation"
    ],
    "keyPoints": [
      "Deferred cancellation (the thread checks a flag periodically) is safer than asynchronous cancellation, which can kill a thread while it holds a lock."
    ],
    "prerequisites": [
      "os_m1_19"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming asynchronous thread cancellation is always safe. Killing a thread immediately can leave shared data structures in an inconsistent state or locks permanently held.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_21": {
    "hasContent": true,
    "overview": "Thread operations refer to the creation, termination, and management of threads within a process.",
    "formal": "Unlike process creation (which duplicates the entire address space using fork), thread creation only allocates a new stack, a new TCB, and a PC. Threads can be cancelled synchronously (target thread periodically checks if it should terminate) or asynchronously (terminated immediately).",
    "intuition": "Hiring a new worker in a factory (thread) vs building an entirely new factory (process).",
    "textbookReference": "Galvin Section 4.4",
    "learningObjectives": [
      "Explain the performance differences between process and thread creation.",
      "Identify why asynchronous cancellation is dangerous."
    ],
    "coreProperties": [
      "Creation",
      "Cancellation",
      "Signal Handling"
    ],
    "keyPoints": [
      "Thread cancellation can lead to resource leaks if a thread is killed while holding a lock (asynchronous cancellation)."
    ],
    "prerequisites": [
      "os_m1_19"
    ],
    "commonMistakes": [
      {
        "mistake": "Believing thread creation uses fork(). Fork duplicates an entire process address space; thread creation only allocates a new stack and TCB within the existing process space.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_22": {
    "hasContent": true,
    "overview": "Threading models define how user-level threads are mapped to kernel-level threads.",
    "formal": "There are three primary multithreading models: Many-to-One (maps many user threads to one kernel thread), One-to-One (maps each user thread to a kernel thread), and Many-to-Many (multiplexes many user threads to a smaller or equal number of kernel threads).",
    "intuition": "Think of user threads as passengers and kernel threads as cars. Many-to-One is a bus (if the bus stops, everyone stops). One-to-One is everyone getting their own taxi (fast, but causes traffic). Many-to-Many is a flexible carpool.",
    "textbookReference": "Galvin Section 4.2",
    "learningObjectives": [
      "Compare the advantages and limitations of the three multithreading models.",
      "Explain why the Many-to-One model blocks all threads if one makes a blocking system call.",
      "Identify the One-to-One model as the standard for modern OSes (Windows, Linux)."
    ],
    "coreProperties": [
      "Many-to-One",
      "One-to-One",
      "Many-to-Many"
    ],
    "keyPoints": [
      "Many-to-One: Efficient user-space management, but unable to run in parallel on multiprocessors. A single blocking system call blocks the entire process.",
      "One-to-One: Allows true parallelism, but creating a user thread requires creating a heavy kernel thread (used by Windows and Linux).",
      "Many-to-Many provides flexible mapping between user and kernel threads, but it is more complex to implement. General-purpose systems commonly use One-to-One models, while the Many-to-Many model is important for understanding the design trade-offs among threading models."
    ],
    "prerequisites": [
      "os_m1_19"
    ],
    "commonMistakes": [
      {
        "mistake": "Believing the Many-to-One model allows true parallel execution on multiple cores. Because only one kernel thread exists, the OS can only schedule it on a single core at a time.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_23": {
    "hasContent": true,
    "overview": "CPU scheduling is the basis of multiprogrammed operating systems. By switching the CPU among processes, the OS makes the computer more productive.",
    "formal": "Whenever the CPU becomes idle, the OS must select one of the processes in the ready queue to be executed. The selection process is carried out by the short-term scheduler.",
    "intuition": "A juggler keeping multiple balls in the air. The juggler's hand is the CPU, the balls are processes. Timing the catches and throws perfectly keeps the system running smoothly.",
    "textbookReference": "Galvin Section 5.1",
    "learningObjectives": [
      "Define the primary goal of CPU scheduling."
    ],
    "coreProperties": [
      "Multiprogramming",
      "CPU Utilization",
      "Ready Queue"
    ],
    "keyPoints": [
      "The success of CPU scheduling depends on the observed property that processes alternate between CPU bursts and I/O bursts."
    ],
    "prerequisites": [
      "os_m1_14"
    ],
    "commonMistakes": [
      {
        "mistake": "Thinking CPU scheduling is only necessary when a process terminates. The scheduler is crucial whenever a process blocks for I/O or its time quantum expires.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_24": {
    "hasContent": true,
    "overview": "Scheduling occurs at three distinct levels: Long-term, Short-term, and Medium-term.",
    "formal": "The Long-Term Scheduler (job scheduler) selects processes from the pool and loads them into memory. The Short-Term Scheduler (CPU scheduler) selects from among the processes that are ready to execute. The Medium-Term Scheduler removes processes from memory (swapping) to reduce the degree of multiprogramming.",
    "intuition": "Long-term = admitting students to a university. Medium-term = suspending a student for a semester. Short-term = the professor calling on a student in class today.",
    "textbookReference": "Galvin Section 3.2.2",
    "learningObjectives": [
      "Distinguish between the three levels of schedulers.",
      "Explain 'degree of multiprogramming'."
    ],
    "coreProperties": [
      "Long-Term (Admit)",
      "Short-Term (Execute)",
      "Medium-Term (Swap)"
    ],
    "keyPoints": [
      "Modern OSes like Windows and UNIX often have no long-term scheduler; every submitted process is immediately placed in memory."
    ],
    "prerequisites": [
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing the Short-term and Long-term schedulers. The short-term scheduler runs every few milliseconds to allocate the CPU; the long-term scheduler dictates the degree of multiprogramming.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_25": {
    "hasContent": true,
    "overview": "Scheduling algorithms are categorized based on whether a running process can be forcefully removed from the CPU.",
    "formal": "Under non-preemptive scheduling, once the CPU has been allocated to a process, the process keeps the CPU until it releases it either by terminating or switching to the waiting state. Preemptive scheduling allows the OS to interrupt a running process.",
    "intuition": "Non-preemptive: You get the microphone and nobody can take it until you finish your speech. Preemptive: The moderator can cut your mic if someone more important arrives.",
    "textbookReference": "Galvin Section 5.1",
    "learningObjectives": [
      "Define Preemptive vs Non-Preemptive scheduling.",
      "Identify the hardware requirement (Timer) for preemption."
    ],
    "coreProperties": [
      "Preemptive",
      "Non-Preemptive",
      "Cooperative"
    ],
    "keyPoints": [
      "Preemptive scheduling requires a hardware timer interrupt to force the CPU back to the OS.",
      "Preemption introduces complex race conditions requiring strict synchronization."
    ],
    "prerequisites": [
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Believing non-preemptive systems cannot multitask. They can, but they rely on processes voluntarily yielding the CPU (cooperative multitasking), which can lead to system hangs.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_26": {
    "hasContent": true,
    "overview": "Different environments have fundamentally different objectives for their scheduling algorithms.",
    "formal": "Batch systems focus on throughput and turnaround time. Interactive (Time-Sharing) systems focus on response time and fairness. Real-time systems focus on meeting hard deadlines predictability.",
    "intuition": "A freight train (batch) cares about moving maximum tons per day (throughput). A sports car (interactive) cares about 0-60 acceleration (response time).",
    "textbookReference": "Galvin Section 5.1",
    "learningObjectives": [
      "Align scheduling goals with system types."
    ],
    "coreProperties": [
      "Batch (Throughput)",
      "Interactive (Response)",
      "Real-Time (Deadlines)"
    ],
    "keyPoints": [
      "An algorithm that is optimal for a batch system (like SJF) is terrible for an interactive system (because it ignores response time)."
    ],
    "prerequisites": [
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming one scheduling algorithm is universally 'the best.' Batch systems prioritize throughput, while interactive systems prioritize rapid response time, requiring different algorithms.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_27": {
    "hasContent": true,
    "overview": "To compare scheduling algorithms, we use specific criteria to measure their performance.",
    "formal": "The primary criteria are: CPU Utilization (keep CPU as busy as possible), Throughput (processes completed per time unit), Turnaround Time (submission to completion), Waiting Time (time spent in ready queue), and Response Time (submission to first response).",
    "intuition": "If you order a pizza: Turnaround Time is when it arrives. Response Time is when they answer the phone to take your order. Waiting Time is how long the pizza sat in the kitchen before delivery.",
    "textbookReference": "Galvin Section 5.2",
    "learningObjectives": [
      "Define CT, TAT, WT, and RT.",
      "Calculate these metrics given a Gantt chart."
    ],
    "coreProperties": [
      "Utilization",
      "Throughput",
      "TAT",
      "WT",
      "RT"
    ],
    "keyPoints": [
      "Most scheduling algorithms aim to minimize AVERAGE waiting time or AVERAGE turnaround time.",
      "Interactive systems aim to minimize the VARIANCE in response time to provide a predictable user experience."
    ],
    "prerequisites": [
      "os_m1_26"
    ],
    "commonMistakes": [
      {
        "mistake": "Do not confuse turnaround time with waiting time.",
        "fix": "Turnaround time includes execution time; waiting time is strictly the time spent sitting in the Ready queue."
      }
    ]
  },
  "os_m1_28": {
    "hasContent": true,
    "overview": "Throughput is the measure of how much work is being completed by the system.",
    "formal": "Throughput is defined as the number of processes that are completed per time unit. For long processes, this rate may be one process per hour; for short transactions, it may be 10 processes per second.",
    "intuition": "Throughput is the number of cars passing through a toll booth every hour.",
    "textbookReference": "Galvin Section 5.2",
    "learningObjectives": [
      "Understand throughput as a primary metric for Batch systems."
    ],
    "coreProperties": [
      "Processes per time unit",
      "Batch Metric"
    ],
    "keyPoints": [
      "Maximizing throughput does not necessarily minimize turnaround time for individual processes (e.g., if one massive job blocks the queue)."
    ],
    "prerequisites": [
      "os_m1_26"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming maximizing throughput automatically minimizes response time. Focusing entirely on throughput might starve interactive processes, ruining response time.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_40": {
    "hasContent": true,
    "overview": "Thread Scheduling focuses on how user-level threads are scheduled by the thread library and how kernel-level threads are scheduled by the OS.",
    "formal": "On operating systems that support them, it is kernel-level threads—not processes—that are being scheduled by the operating system. User-level threads are managed by a thread library, mapping them to LWP (Lightweight Processes).",
    "intuition": "The OS (city traffic light) only sees cars (kernel threads). It doesn't see or schedule the individual passengers inside the car (user threads).",
    "textbookReference": "Galvin Section 5.5",
    "learningObjectives": [
      "Distinguish between Process Contention Scope (PCS) and System Contention Scope (SCS)."
    ],
    "coreProperties": [
      "Kernel-level scheduling",
      "LWP",
      "PCS/SCS"
    ],
    "keyPoints": [
      "PCS: Competition for the CPU takes place among threads belonging to the same process. SCS: Competition takes place among all threads in the system."
    ],
    "prerequisites": [
      "os_m1_23",
      "os_m1_19"
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting that on modern OSes, the kernel schedules kernel-level threads, not processes. User-level threads must be mapped to kernel threads to get CPU time.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_41": {
    "hasContent": true,
    "overview": "Multiprocessor Scheduling introduces load sharing across multiple CPUs, making the scheduling problem correspondingly more complex.",
    "formal": "Approaches include Asymmetric Multiprocessing (one master CPU handles all scheduling decisions) and Symmetric Multiprocessing (SMP) where each processor is self-scheduling from a common ready queue or its own private ready queue.",
    "intuition": "Multiple checkout lanes at a grocery store. Do you have one single line feeding all registers (common queue), or does every register have its own line (private queue)?",
    "textbookReference": "Galvin Section 5.4",
    "learningObjectives": [
      "Understand the complexity of SMP scheduling.",
      "Define processor affinity and load balancing."
    ],
    "coreProperties": [
      "SMP/ASMP",
      "Processor Affinity",
      "Load Balancing"
    ],
    "keyPoints": [
      "Processor Affinity: A process has an affinity for the processor on which it is currently running (to preserve cache warmth).",
      "Load Balancing attempts to keep the workload evenly distributed, which often conflicts with Processor Affinity."
    ],
    "prerequisites": [
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Ignoring processor affinity. Moving a process to a new idle CPU seems efficient, but it often degrades performance due to cache invalidation overhead.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  },
  "os_m1_42": {
    "hasContent": true,
    "overview": "Real-time scheduling must guarantee that critical tasks complete within their deadlines.",
    "formal": "In hard real-time systems, a task must be serviced by its deadline; servicing it after the deadline has the same consequences as no service at all. Soft real-time systems provide no guarantee as to when a critical real-time process will be scheduled, only that it will be given preference.",
    "intuition": "A pacemaker. It must fire at exactly the right millisecond (hard real-time). Streaming a video: you want the frame now, but if it's 10ms late, the video just drops a frame (soft real-time).",
    "textbookReference": "Galvin Section 5.6",
    "learningObjectives": [
      "Distinguish Hard vs Soft real-time.",
      "Identify Rate-Monotonic and Earliest-Deadline-First (EDF) scheduling."
    ],
    "coreProperties": [
      "Hard vs Soft",
      "Deadlines",
      "Deterministic"
    ],
    "keyPoints": [
      "General-purpose OSes like Windows and Linux support soft real-time but cannot support hard real-time without specialized kernel modifications (e.g., RTLinux)."
    ],
    "prerequisites": [
      "os_m1_23"
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming soft real-time guarantees a deadline. Soft real-time only guarantees the task gets highest priority; hard real-time is required for absolute deadline guarantees.",
        "fix": "Review the formal definition and properties to understand the exact mechanisms."
      }
    ]
  }
};
