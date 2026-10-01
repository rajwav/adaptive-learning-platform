const fs = require('fs');

const m1_titles = [
  "Introduction to Operating Systems", "Simple Batch Systems", "Multiprogramming Systems", 
  "Time-Sharing Systems", "Personal Computer Systems", "Parallel Systems", "Distributed Systems", 
  "Real-Time Systems", "OS Structures / System Components", "Protection System", "OS Services", 
  "System Calls", "Process Concept", "Process States", "Process Management", 
  "PCB and Context Switching", "Interrupts", "Interprocess Communication", "Threads Introduction", 
  "Thread States", "Thread Operations", "Threading Models", "CPU Scheduling Introduction", 
  "Scheduling Levels", "Preemptive vs Non-Preemptive Scheduling", "Scheduling Objectives", 
  "Scheduling Criteria", "Scheduling Priorities", "FCFS Scheduling", "SJF Scheduling", 
  "SRTF / Preemptive SJF Scheduling", "Priority Scheduling", "Round Robin Scheduling", 
  "Multilevel Queue Scheduling", "Multilevel Feedback Queue Scheduling", "CPU-I/O Burst Cycle", 
  "CPU Scheduler and Dispatcher", "Context-Switch Overhead", "Demand Scheduling", 
  "Real-Time Scheduling", "Thread Scheduling", "Multiprocessor Scheduling"
];

const m2_titles = [
  "Process Synchronization Background", "Mutual Exclusion", "Critical Section Problem", 
  "Requirements: Mutual Exclusion, Progress, Bounded Waiting", "Software Solutions", 
  "Peterson's Solution", "Hardware Solutions", "Test-and-Set", "Compare-and-Swap", 
  "Mutex Locks", "Semaphores", "wait() / signal()", "Binary Semaphores", 
  "Counting Semaphores", "Dining Philosophers", "Barbershop Problem", 
  "Classic Synchronization Problems", "Deadlock Introduction", "Deadlock Examples", 
  "Resource Concepts", "Resource Types and Instances", "Deadlock Characterization", 
  "Four Necessary Conditions", "Resource-Allocation Graph", "Deadlock Handling Methods", 
  "Deadlock Prevention", "Deadlock Avoidance", "Safe State", "Banker's Algorithm", 
  "Resource-Request Algorithm", "Deadlock Detection", "Wait-for Graph", "Deadlock Recovery"
];

let m1_topics = m1_titles.map((title, i) => {
  return {
    id: `os_m1_${i+1}`,
    moduleId: 'os-mod-1',
    title: title,
    description: `Learn about ${title}.`,
    order: i + 1,
    prerequisites: i > 0 ? [`os_m1_${i}`] : [] // basic sequential prereqs
  };
});

// Custom prereqs for scheduling to match the prompt's request:
// Scheduling Basics -> Scheduling Criteria -> FCFS -> SJF -> SRTF -> Priority -> Round Robin -> MLQ -> MLFQ
const sched_base = 'os_m1_23'; // CPU Scheduling Introduction
const sched_crit = 'os_m1_27'; // Scheduling Criteria
m1_topics[28].prerequisites = [sched_crit]; // FCFS
m1_topics[29].prerequisites = ['os_m1_29']; // SJF depends on FCFS
m1_topics[30].prerequisites = ['os_m1_30']; // SRTF depends on SJF
m1_topics[31].prerequisites = ['os_m1_31']; // Priority depends on SRTF
m1_topics[32].prerequisites = ['os_m1_32']; // RR depends on Priority
m1_topics[33].prerequisites = ['os_m1_33']; // MLQ depends on RR
m1_topics[34].prerequisites = ['os_m1_34']; // MLFQ depends on MLQ

let m2_topics = m2_titles.map((title, i) => {
  return {
    id: `os_m2_${i+1}`,
    moduleId: 'os-mod-2',
    title: title,
    description: `Learn about ${title}.`,
    order: i + 1,
    prerequisites: i > 0 ? [`os_m2_${i}`] : []
  };
});

// Sync prereqs: Critical Section -> Mutual Exclusion -> Software -> Hardware -> Semaphores -> Classic
m2_topics[1].prerequisites = ['os_m2_3']; // Mutual Exclusion depends on Critical Section Problem (wait, Critical Section is m2_3)
m2_topics[2].prerequisites = ['os_m2_1']; 
m2_topics[4].prerequisites = ['os_m2_2'];
m2_topics[6].prerequisites = ['os_m2_5'];
m2_topics[10].prerequisites = ['os_m2_7'];
m2_topics[14].prerequisites = ['os_m2_11']; // Dining Philosophers -> Semaphores

// Banker's: Deadlock Basics -> Necessary Conditions -> RAG -> Safe State -> Banker's -> Resource Request
m2_topics[22].prerequisites = ['os_m2_18']; // Four Necessary Conditions -> Deadlock Intro
m2_topics[23].prerequisites = ['os_m2_23']; // RAG -> Four Necessary Conditions
m2_topics[27].prerequisites = ['os_m2_24']; // Safe State -> RAG
m2_topics[28].prerequisites = ['os_m2_28']; // Banker's -> Safe State
m2_topics[29].prerequisites = ['os_m2_29']; // Resource Request -> Banker's


const code = `import { Topic } from '@/types';

export const osTopics: Topic[] = ${JSON.stringify([...m1_topics, ...m2_topics], null, 2)};
`;

fs.writeFileSync('src/lib/seed-os-topics.ts', code);
