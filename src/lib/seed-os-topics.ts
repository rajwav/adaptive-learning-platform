import { Topic } from '@/types';

export const osTopics: Topic[] = [
  {
    "id": "os_m1_1",
    "moduleId": "os-mod-1",
    "title": "Introduction to Operating Systems",
    "description": "Learn about Introduction to Operating Systems.",
    "order": 1,
    "prerequisites": []
  },
  {
    "id": "os_m1_2",
    "moduleId": "os-mod-1",
    "title": "Simple Batch Systems",
    "description": "Learn about Simple Batch Systems.",
    "order": 2,
    "prerequisites": [
      "os_m1_1"
    ]
  },
  {
    "id": "os_m1_3",
    "moduleId": "os-mod-1",
    "title": "Multiprogramming Systems",
    "description": "Learn about Multiprogramming Systems.",
    "order": 3,
    "prerequisites": [
      "os_m1_2"
    ]
  },
  {
    "id": "os_m1_4",
    "moduleId": "os-mod-1",
    "title": "Time-Sharing Systems",
    "description": "Learn about Time-Sharing Systems.",
    "order": 4,
    "prerequisites": [
      "os_m1_3"
    ]
  },
  {
    "id": "os_m1_5",
    "moduleId": "os-mod-1",
    "title": "Personal Computer Systems",
    "description": "Learn about Personal Computer Systems.",
    "order": 5,
    "prerequisites": []
  },
  {
    "id": "os_m1_6",
    "moduleId": "os-mod-1",
    "title": "Parallel Systems",
    "description": "Learn about Parallel Systems.",
    "order": 6,
    "prerequisites": []
  },
  {
    "id": "os_m1_7",
    "moduleId": "os-mod-1",
    "title": "Distributed Systems",
    "description": "Learn about Distributed Systems.",
    "order": 7,
    "prerequisites": []
  },
  {
    "id": "os_m1_8",
    "moduleId": "os-mod-1",
    "title": "Real-Time Systems",
    "description": "Learn about Real-Time Systems.",
    "order": 8,
    "prerequisites": []
  },
  {
    "id": "os_m1_9",
    "moduleId": "os-mod-1",
    "title": "OS Structures / System Components",
    "description": "Learn about OS Structures / System Components.",
    "order": 9,
    "prerequisites": [
      "os_m1_1"
    ]
  },
  {
    "id": "os_m1_10",
    "moduleId": "os-mod-1",
    "title": "Protection System",
    "description": "Learn about Protection System.",
    "order": 10,
    "prerequisites": [
      "os_m1_9"
    ]
  },
  {
    "id": "os_m1_11",
    "moduleId": "os-mod-1",
    "title": "OS Services",
    "description": "Learn about OS Services.",
    "order": 11,
    "prerequisites": [
      "os_m1_9"
    ]
  },
  {
    "id": "os_m1_12",
    "moduleId": "os-mod-1",
    "title": "System Calls",
    "description": "Learn about System Calls.",
    "order": 12,
    "prerequisites": [
      "os_m1_11"
    ]
  },
  {
    "id": "os_m1_13",
    "moduleId": "os-mod-1",
    "title": "Process Concept",
    "description": "Learn about Process Concept.",
    "order": 13,
    "prerequisites": [
      "os_m1_3"
    ]
  },
  {
    "id": "os_m1_14",
    "moduleId": "os-mod-1",
    "title": "Process States",
    "description": "Learn about Process States.",
    "order": 14,
    "prerequisites": [
      "os_m1_13"
    ]
  },
  {
    "id": "os_m1_15",
    "moduleId": "os-mod-1",
    "title": "Process Management",
    "description": "Learn about Process Management.",
    "order": 15,
    "prerequisites": [
      "os_m1_16"
    ]
  },
  {
    "id": "os_m1_16",
    "moduleId": "os-mod-1",
    "title": "PCB and Context Switching",
    "description": "Learn about PCB and Context Switching.",
    "order": 16,
    "prerequisites": [
      "os_m1_14"
    ]
  },
  {
    "id": "os_m1_17",
    "moduleId": "os-mod-1",
    "title": "Interrupts",
    "description": "Learn about Interrupts.",
    "order": 17,
    "prerequisites": []
  },
  {
    "id": "os_m1_18",
    "moduleId": "os-mod-1",
    "title": "Interprocess Communication",
    "description": "Learn about Interprocess Communication.",
    "order": 18,
    "prerequisites": [
      "os_m1_13"
    ]
  },
  {
    "id": "os_m1_19",
    "moduleId": "os-mod-1",
    "title": "Threads Introduction",
    "description": "Learn about Threads Introduction.",
    "order": 19,
    "prerequisites": [
      "os_m1_13"
    ]
  },
  {
    "id": "os_m1_20",
    "moduleId": "os-mod-1",
    "title": "Thread States",
    "description": "Learn about Thread States.",
    "order": 20,
    "prerequisites": [
      "os_m1_19"
    ]
  },
  {
    "id": "os_m1_21",
    "moduleId": "os-mod-1",
    "title": "Thread Operations",
    "description": "Learn about Thread Operations.",
    "order": 21,
    "prerequisites": []
  },
  {
    "id": "os_m1_22",
    "moduleId": "os-mod-1",
    "title": "Threading Models",
    "description": "Learn about Threading Models.",
    "order": 22,
    "prerequisites": [
      "os_m1_19"
    ]
  },
  {
    "id": "os_m1_23",
    "moduleId": "os-mod-1",
    "title": "CPU Scheduling Introduction",
    "description": "Learn about CPU Scheduling Introduction.",
    "order": 23,
    "prerequisites": [
      "os_m1_16",
      "os_m1_19"
    ]
  },
  {
    "id": "os_m1_24",
    "moduleId": "os-mod-1",
    "title": "Scheduling Levels",
    "description": "Learn about Scheduling Levels.",
    "order": 24,
    "prerequisites": [
      "os_m1_23"
    ]
  },
  {
    "id": "os_m1_25",
    "moduleId": "os-mod-1",
    "title": "Preemptive vs Non-Preemptive Scheduling",
    "description": "Learn about Preemptive vs Non-Preemptive Scheduling.",
    "order": 25,
    "prerequisites": [
      "os_m1_23"
    ]
  },
  {
    "id": "os_m1_26",
    "moduleId": "os-mod-1",
    "title": "Scheduling Objectives",
    "description": "Learn about Scheduling Objectives.",
    "order": 26,
    "prerequisites": []
  },
  {
    "id": "os_m1_27",
    "moduleId": "os-mod-1",
    "title": "Scheduling Criteria",
    "description": "Learn about Scheduling Criteria.",
    "order": 27,
    "prerequisites": [
      "os_m1_23"
    ]
  },
  {
    "id": "os_m1_28",
    "moduleId": "os-mod-1",
    "title": "Scheduling Priorities",
    "description": "Learn about Scheduling Priorities.",
    "order": 28,
    "prerequisites": []
  },
  {
    "id": "os_m1_29",
    "moduleId": "os-mod-1",
    "title": "FCFS Scheduling",
    "description": "Learn about FCFS Scheduling.",
    "order": 29,
    "prerequisites": [
      "os_m1_25",
      "os_m1_27"
    ]
  },
  {
    "id": "os_m1_30",
    "moduleId": "os-mod-1",
    "title": "SJF Scheduling",
    "description": "Learn about SJF Scheduling.",
    "order": 30,
    "prerequisites": [
      "os_m1_29"
    ]
  },
  {
    "id": "os_m1_31",
    "moduleId": "os-mod-1",
    "title": "SRTF / Preemptive SJF Scheduling",
    "description": "Learn about SRTF / Preemptive SJF Scheduling.",
    "order": 31,
    "prerequisites": [
      "os_m1_30"
    ]
  },
  {
    "id": "os_m1_32",
    "moduleId": "os-mod-1",
    "title": "Priority Scheduling",
    "description": "Learn about Priority Scheduling.",
    "order": 32,
    "prerequisites": [
      "os_m1_27"
    ]
  },
  {
    "id": "os_m1_33",
    "moduleId": "os-mod-1",
    "title": "Round Robin Scheduling",
    "description": "Learn about Round Robin Scheduling.",
    "order": 33,
    "prerequisites": [
      "os_m1_29"
    ]
  },
  {
    "id": "os_m1_34",
    "moduleId": "os-mod-1",
    "title": "Multilevel Queue Scheduling",
    "description": "Learn about Multilevel Queue Scheduling.",
    "order": 34,
    "prerequisites": [
      "os_m1_32",
      "os_m1_33"
    ]
  },
  {
    "id": "os_m1_35",
    "moduleId": "os-mod-1",
    "title": "Multilevel Feedback Queue Scheduling",
    "description": "Learn about Multilevel Feedback Queue Scheduling.",
    "order": 35,
    "prerequisites": [
      "os_m1_34"
    ]
  },
  {
    "id": "os_m1_36",
    "moduleId": "os-mod-1",
    "title": "CPU-I/O Burst Cycle",
    "description": "Learn about CPU-I/O Burst Cycle.",
    "order": 36,
    "prerequisites": []
  },
  {
    "id": "os_m1_37",
    "moduleId": "os-mod-1",
    "title": "CPU Scheduler and Dispatcher",
    "description": "Learn about CPU Scheduler and Dispatcher.",
    "order": 37,
    "prerequisites": [
      "os_m1_23"
    ]
  },
  {
    "id": "os_m1_38",
    "moduleId": "os-mod-1",
    "title": "Context-Switch Overhead",
    "description": "Learn about Context-Switch Overhead.",
    "order": 38,
    "prerequisites": [
      "os_m1_37"
    ]
  },
  {
    "id": "os_m1_39",
    "moduleId": "os-mod-1",
    "title": "Demand Scheduling",
    "description": "Learn about Demand Scheduling.",
    "order": 39,
    "prerequisites": []
  },
  {
    "id": "os_m1_40",
    "moduleId": "os-mod-1",
    "title": "Real-Time Scheduling",
    "description": "Learn about Real-Time Scheduling.",
    "order": 40,
    "prerequisites": []
  },
  {
    "id": "os_m1_41",
    "moduleId": "os-mod-1",
    "title": "Thread Scheduling",
    "description": "Learn about Thread Scheduling.",
    "order": 41,
    "prerequisites": []
  },
  {
    "id": "os_m1_42",
    "moduleId": "os-mod-1",
    "title": "Multiprocessor Scheduling",
    "description": "Learn about Multiprocessor Scheduling.",
    "order": 42,
    "prerequisites": []
  },
  {
    "id": "os_m2_1",
    "moduleId": "os-mod-2",
    "title": "Process Synchronization Background",
    "description": "Learn about Process Synchronization Background.",
    "order": 1,
    "prerequisites": [
      "os_m1_18",
      "os_m1_19"
    ]
  },
  {
    "id": "os_m2_2",
    "moduleId": "os-mod-2",
    "title": "Mutual Exclusion",
    "description": "Learn about Mutual Exclusion.",
    "order": 2,
    "prerequisites": [
      "os_m2_1"
    ]
  },
  {
    "id": "os_m2_3",
    "moduleId": "os-mod-2",
    "title": "Critical Section Problem",
    "description": "Learn about Critical Section Problem.",
    "order": 3,
    "prerequisites": [
      "os_m2_2"
    ]
  },
  {
    "id": "os_m2_4",
    "moduleId": "os-mod-2",
    "title": "Requirements: Mutual Exclusion, Progress, Bounded Waiting",
    "description": "Learn about Requirements: Mutual Exclusion, Progress, Bounded Waiting.",
    "order": 4,
    "prerequisites": [
      "os_m2_3"
    ]
  },
  {
    "id": "os_m2_5",
    "moduleId": "os-mod-2",
    "title": "Software Solutions",
    "description": "Learn about Software Solutions.",
    "order": 5,
    "prerequisites": [
      "os_m2_4"
    ]
  },
  {
    "id": "os_m2_6",
    "moduleId": "os-mod-2",
    "title": "Peterson's Solution",
    "description": "Learn about Peterson's Solution.",
    "order": 6,
    "prerequisites": [
      "os_m2_5"
    ]
  },
  {
    "id": "os_m2_7",
    "moduleId": "os-mod-2",
    "title": "Hardware Solutions",
    "description": "Learn about Hardware Solutions.",
    "order": 7,
    "prerequisites": [
      "os_m2_4"
    ]
  },
  {
    "id": "os_m2_8",
    "moduleId": "os-mod-2",
    "title": "Test-and-Set",
    "description": "Learn about Test-and-Set.",
    "order": 8,
    "prerequisites": []
  },
  {
    "id": "os_m2_9",
    "moduleId": "os-mod-2",
    "title": "Compare-and-Swap",
    "description": "Learn about Compare-and-Swap.",
    "order": 9,
    "prerequisites": []
  },
  {
    "id": "os_m2_10",
    "moduleId": "os-mod-2",
    "title": "Mutex Locks",
    "description": "Learn about Mutex Locks.",
    "order": 10,
    "prerequisites": [
      "os_m2_7"
    ]
  },
  {
    "id": "os_m2_11",
    "moduleId": "os-mod-2",
    "title": "Semaphores",
    "description": "Learn about Semaphores.",
    "order": 11,
    "prerequisites": [
      "os_m2_10"
    ]
  },
  {
    "id": "os_m2_12",
    "moduleId": "os-mod-2",
    "title": "wait() / signal()",
    "description": "Learn about wait() / signal().",
    "order": 12,
    "prerequisites": [
      "os_m2_11"
    ]
  },
  {
    "id": "os_m2_13",
    "moduleId": "os-mod-2",
    "title": "Binary Semaphores",
    "description": "Learn about Binary Semaphores.",
    "order": 13,
    "prerequisites": [
      "os_m2_12"
    ]
  },
  {
    "id": "os_m2_14",
    "moduleId": "os-mod-2",
    "title": "Counting Semaphores",
    "description": "Learn about Counting Semaphores.",
    "order": 14,
    "prerequisites": [
      "os_m2_12"
    ]
  },
  {
    "id": "os_m2_15",
    "moduleId": "os-mod-2",
    "title": "Dining Philosophers",
    "description": "Learn about Dining Philosophers.",
    "order": 15,
    "prerequisites": [
      "os_m2_17"
    ]
  },
  {
    "id": "os_m2_16",
    "moduleId": "os-mod-2",
    "title": "Barbershop Problem",
    "description": "Learn about Barbershop Problem.",
    "order": 16,
    "prerequisites": [
      "os_m2_17"
    ]
  },
  {
    "id": "os_m2_17",
    "moduleId": "os-mod-2",
    "title": "Classic Synchronization Problems",
    "description": "Learn about Classic Synchronization Problems.",
    "order": 17,
    "prerequisites": [
      "os_m2_14"
    ]
  },
  {
    "id": "os_m2_18",
    "moduleId": "os-mod-2",
    "title": "Deadlock Introduction",
    "description": "Learn about Deadlock Introduction.",
    "order": 18,
    "prerequisites": [
      "os_m2_1"
    ]
  },
  {
    "id": "os_m2_19",
    "moduleId": "os-mod-2",
    "title": "Deadlock Examples",
    "description": "Learn about Deadlock Examples.",
    "order": 19,
    "prerequisites": []
  },
  {
    "id": "os_m2_20",
    "moduleId": "os-mod-2",
    "title": "Resource Concepts",
    "description": "Learn about Resource Concepts.",
    "order": 20,
    "prerequisites": []
  },
  {
    "id": "os_m2_21",
    "moduleId": "os-mod-2",
    "title": "Resource Types and Instances",
    "description": "Learn about Resource Types and Instances.",
    "order": 21,
    "prerequisites": []
  },
  {
    "id": "os_m2_22",
    "moduleId": "os-mod-2",
    "title": "Deadlock Characterization",
    "description": "Learn about Deadlock Characterization.",
    "order": 22,
    "prerequisites": [
      "os_m2_18"
    ]
  },
  {
    "id": "os_m2_23",
    "moduleId": "os-mod-2",
    "title": "Four Necessary Conditions",
    "description": "Learn about Four Necessary Conditions.",
    "order": 23,
    "prerequisites": [
      "os_m2_22"
    ]
  },
  {
    "id": "os_m2_24",
    "moduleId": "os-mod-2",
    "title": "Resource-Allocation Graph",
    "description": "Learn about Resource-Allocation Graph.",
    "order": 24,
    "prerequisites": [
      "os_m2_23"
    ]
  },
  {
    "id": "os_m2_25",
    "moduleId": "os-mod-2",
    "title": "Deadlock Handling Methods",
    "description": "Learn about Deadlock Handling Methods.",
    "order": 25,
    "prerequisites": [
      "os_m2_24"
    ]
  },
  {
    "id": "os_m2_26",
    "moduleId": "os-mod-2",
    "title": "Deadlock Prevention",
    "description": "Learn about Deadlock Prevention.",
    "order": 26,
    "prerequisites": [
      "os_m2_25"
    ]
  },
  {
    "id": "os_m2_27",
    "moduleId": "os-mod-2",
    "title": "Deadlock Avoidance",
    "description": "Learn about Deadlock Avoidance.",
    "order": 27,
    "prerequisites": [
      "os_m2_25"
    ]
  },
  {
    "id": "os_m2_28",
    "moduleId": "os-mod-2",
    "title": "Safe State",
    "description": "Learn about Safe State.",
    "order": 28,
    "prerequisites": [
      "os_m2_27"
    ]
  },
  {
    "id": "os_m2_29",
    "moduleId": "os-mod-2",
    "title": "Banker's Algorithm",
    "description": "Learn about Banker's Algorithm.",
    "order": 29,
    "prerequisites": [
      "os_m2_28"
    ]
  },
  {
    "id": "os_m2_30",
    "moduleId": "os-mod-2",
    "title": "Resource-Request Algorithm",
    "description": "Learn about Resource-Request Algorithm.",
    "order": 30,
    "prerequisites": [
      "os_m2_29"
    ]
  },
  {
    "id": "os_m2_31",
    "moduleId": "os-mod-2",
    "title": "Deadlock Detection",
    "description": "Learn about Deadlock Detection.",
    "order": 31,
    "prerequisites": [
      "os_m2_25"
    ]
  },
  {
    "id": "os_m2_32",
    "moduleId": "os-mod-2",
    "title": "Wait-for Graph",
    "description": "Learn about Wait-for Graph.",
    "order": 32,
    "prerequisites": [
      "os_m2_31"
    ]
  },
  {
    "id": "os_m2_33",
    "moduleId": "os-mod-2",
    "title": "Deadlock Recovery",
    "description": "Learn about Deadlock Recovery.",
    "order": 33,
    "prerequisites": [
      "os_m2_31"
    ]
  }
];
