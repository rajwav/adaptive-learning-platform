import { TopicContent } from '@/lib/content/types';

export const batch2Extensions: Record<string, TopicContent> = {
  // BATCH 2.2: THE SCHEDULER
  "os_m1_29": {
    hasContent: true,
    overview: "First-Come, First-Served (FCFS) allocates the CPU to the process that requests it first, implemented using a FIFO queue.",
    formal: "In FCFS scheduling, the PCB of an arriving process is linked to the tail of the ready queue. When the CPU is free, it is allocated to the process at the head of the queue. The running process is then removed from the queue.",
    intuition: "Think of waiting in line at a supermarket checkout. The person who gets in line first gets served first, regardless of how many items they have.",
    textbookReference: "Galvin Section 5.3.1",
    learningObjectives: [
      "Understand the mechanics of a FIFO scheduling queue.",
      "Calculate Completion Time, Turnaround Time, and Waiting Time for FCFS.",
      "Identify the Convoy Effect and explain why it degrades system performance."
    ],
    whenItIsUsed: "Used in simple batch systems where predictability is prioritized over response time, or as a secondary tie-breaking mechanism in other algorithms.",
    selectionRule: "Select the process with the earliest Arrival Time.",
    preemptionBehavior: "Non-Preemptive",
    metricsFormulas: {
      CT: "Time at which the process finishes execution.",
      TAT: "Completion Time (CT) - Arrival Time (AT).",
      WT: "Turnaround Time (TAT) - Burst Time (BT).",
      RT: "First Start Time - Arrival Time (AT). In FCFS, RT = WT."
    },
    ganttChartProcedure: [
      "1. Find the process with the earliest Arrival Time.",
      "2. If multiple arrive at the same time, break ties using Process ID (e.g., P1 before P2).",
      "3. Execute the selected process for its entire Burst Time.",
      "4. If no processes have arrived by the current time, the CPU is IDLE until the next arrival.",
      "5. Repeat until all processes are complete."
    ],
    workedExamples: [
      {
        problem: "Processes: P1(AT=0, BT=24), P2(AT=0, BT=3), P3(AT=0, BT=3). Calculate average WT.",
        solution: "Gantt: P1 runs [0-24]. P2 runs [24-27]. P3 runs [27-30].\nWT for P1 = 0. WT for P2 = 24. WT for P3 = 27.\nAverage WT = (0 + 24 + 27) / 3 = 17."
      },
      {
        problem: "What happens if P2 and P3 arrive first? P2(0,3), P3(0,3), P1(0,24).",
        solution: "Gantt: P2 runs [0-3]. P3 runs [3-6]. P1 runs [6-30].\nWT: P2=0, P3=3, P1=6. Average WT = (0+3+6)/3 = 3. Notice how much lower the average WT is compared to the previous example! This demonstrates the Convoy Effect."
      }
    ],
    commonMistakes: [
      { mistake: "Ignoring arrival times and just processing in order of Process ID.", fix: "Always check the AT. Sort the ready queue by AT first." },
      { mistake: "Assuming WT is always Start Time.", fix: "WT = Start Time - AT. If AT > 0, WT is less than Start Time." }
    ],
    labIntegrationPrompt: "Open the CPU Scheduling Simulator, select FCFS, and input a massive burst time for P1 followed by short bursts for P2 and P3. Watch the TAT/WT metrics explode to see the Convoy Effect in action.",
    coreProperties: ["Non-Preemptive", "FIFO Queue", "Convoy Effect"],
    keyPoints: [
      "Extremely simple to implement.",
      "Average waiting time is often quite long.",
      "Non-preemptive nature makes it unsuitable for time-sharing systems where responsiveness is critical."
    ]
  },

  "os_m1_30": {
    hasContent: true,
    overview: "Shortest-Job-First (SJF) associates with each process the length of its next CPU burst, allocating the CPU to the process with the smallest burst.",
    formal: "SJF is a priority scheduling algorithm where the priority is the inverse of the predicted next CPU burst. It is provably optimal for minimizing average waiting time for a given set of processes.",
    intuition: "Like a grocery express lane that actually works: if everyone lets the person with the fewest items go next, the total time everyone spends waiting is minimized.",
    textbookReference: "Galvin Section 5.3.2",
    learningObjectives: [
      "Understand why SJF minimizes average waiting time.",
      "Execute non-preemptive SJF mathematically using a Gantt chart.",
      "Recognize the difficulty of predicting future CPU bursts in real systems."
    ],
    whenItIsUsed: "Rarely used for short-term CPU scheduling because burst lengths are unknown. It is used frequently in long-term scheduling (batch processing) where users estimate job time limits.",
    selectionRule: "Select the arrived process with the smallest Burst Time. Tie-break with Arrival Time, then Process ID.",
    preemptionBehavior: "Non-Preemptive",
    metricsFormulas: {
      CT: "Time at which the process finishes its continuous execution block.",
      TAT: "CT - AT.",
      WT: "TAT - BT.",
      RT: "First Start Time - AT."
    },
    ganttChartProcedure: [
      "1. At the current time t, identify all processes that have arrived (AT <= t).",
      "2. From this subset, select the process with the smallest Burst Time (BT).",
      "3. Execute this process to completion (t = t + BT).",
      "4. Repeat until all processes are done."
    ],
    workedExamples: [
      {
        problem: "P1(AT=0, BT=6), P2(AT=2, BT=8), P3(AT=3, BT=7), P4(AT=4, BT=3)",
        solution: "t=0: Only P1 is available. P1 runs to 6.\nt=6: P2, P3, P4 are available. Shortest is P4(3). P4 runs to 9.\nt=9: P2(8) and P3(7) available. Shortest is P3. P3 runs to 16.\nt=16: P2 runs to 24.\nWT: P1=0-0=0, P2=16-2=14, P3=9-3=6, P4=6-4=2. Avg WT = 5.5."
      }
    ],
    commonMistakes: [
      { mistake: "Choosing the shortest job even if it hasn't arrived yet.", fix: "You can only select from the processes currently in the Ready Queue (AT <= current time)." }
    ],
    labIntegrationPrompt: "Open the simulator, set algorithm to SJF (NP). Observe how once a process starts, it never stops, even if a shorter process arrives immediately after.",
    coreProperties: ["Optimal Avg WT", "Requires burst prediction", "Risk of starvation for long jobs"],
    keyPoints: ["Provably optimal for minimizing WT.", "Non-preemptive by definition (its preemptive variant is SRTF)."]
  },

  "os_m1_31": {
    hasContent: true,
    overview: "Shortest-Remaining-Time-First (SRTF) is the preemptive version of SJF. It preempts the running process if a new process arrives with a shorter burst than what is remaining.",
    formal: "In SRTF, as new processes enter the ready queue, the scheduler compares their burst times with the remaining time of the currently executing process. If the new process's burst is shorter, the CPU is preempted.",
    intuition: "You're reading a 500-page book. A friend hands you a 5-page memo. You put down the book, read the memo, and then go back to your book.",
    textbookReference: "Galvin Section 5.3.2",
    learningObjectives: [
      "Master preemptive Gantt chart tracing.",
      "Understand how remaining time is updated dynamically.",
      "Calculate metrics involving multiple execution blocks for a single process."
    ],
    whenItIsUsed: "Used as a theoretical benchmark for optimal preemptive scheduling. Real systems use variations of it combined with aging to prevent starvation.",
    selectionRule: "Select the arrived process with the smallest Remaining Burst Time.",
    preemptionBehavior: "Preemptive",
    metricsFormulas: {
      CT: "Time of the FINAL completion block.",
      TAT: "Final CT - AT.",
      WT: "TAT - Initial Total Burst Time.",
      RT: "First Start Time - AT (Do not recalculate for resumptions)."
    },
    ganttChartProcedure: [
      "1. At current time t, find all arrived processes.",
      "2. Select the one with the lowest Remaining Time (RT).",
      "3. Run it for 1 unit of time (t = t + 1).",
      "4. Decrement its Remaining Time.",
      "5. If a new process arrives at t+1, re-evaluate step 2. Preempt if necessary."
    ],
    workedExamples: [
      {
        problem: "P1(AT=0, BT=8), P2(AT=1, BT=4), P3(AT=2, BT=9), P4(AT=3, BT=5)",
        solution: "t=0: P1 runs (Rem 8). \nt=1: P2 arrives (BT=4). P1 Rem=7. 4 < 7. P2 preempts P1. P2 runs.\nt=2: P3 arrives (BT=9). P2 Rem=3. 3 < 9. P2 continues.\nt=3: P4 arrives (BT=5). P2 Rem=2. 2 < 5. P2 continues.\nt=5: P2 finishes. Remaining: P1(7), P3(9), P4(5). P4 is shortest. P4 runs.\nt=10: P4 finishes. P1(7) vs P3(9). P1 runs.\nt=17: P1 finishes. P3 runs to 26.\nAvg WT: P1(17-0-8=9), P2(5-1-4=0), P3(26-2-9=15), P4(10-3-5=2). Avg = 6.5."
      }
    ],
    commonMistakes: [
      { mistake: "Comparing the new arrival's BT to the running process's original BT.", fix: "Always compare against the Remaining Time of the running process." },
      { mistake: "Calculating Response Time based on the last time the process resumed.", fix: "Response Time is strictly the FIRST time it gets the CPU minus AT." }
    ],
    labIntegrationPrompt: "Open the CPU Simulator and run SRTF. Watch the state visualizer closely during an arrival event to see the 'Interrupt' arrow explicitly trigger when a shorter job arrives.",
    coreProperties: ["Preemptive", "Optimal for Avg WT", "High context switch overhead"],
    keyPoints: ["The preemptive twin of SJF.", "Requires constant remaining-time evaluation at every arrival."]
  },

  "os_m1_32": {
    hasContent: true,
    overview: "Priority Scheduling allocates the CPU to the process with the highest priority. It can be implemented in both Non-Preemptive and Preemptive forms.",
    formal: "A priority (an integer) is associated with each process. The CPU is allocated to the process with the highest priority (often denoted by the smallest integer). Equal-priority processes are scheduled in FCFS order. A major problem is indefinite blocking (starvation), solved by aging.",
    intuition: "VIP access at a club. No matter how long you've been waiting, if a VIP (high priority) arrives, they get in immediately. If an even more important VIP arrives, they skip the first VIP.",
    textbookReference: "Galvin Section 5.3.3",
    learningObjectives: [
      "Distinguish between preemptive and non-preemptive priority handling.",
      "Understand the risk of starvation and the mechanism of aging.",
      "Calculate CT/TAT/WT/RT across both variants."
    ],
    whenItIsUsed: "Used in real-time systems and operating systems where tasks have strict hierarchies of importance (e.g., OS kernel tasks > user tasks).",
    metricsFormulas: {
      CT: "Time of the final block.",
      TAT: "Final CT - AT.",
      WT: "TAT - BT.",
      RT: "First Start Time - AT."
    },
    variants: [
      {
        variantName: "Non-Preemptive Priority",
        selectionRule: "From all arrived processes, select the one with the highest priority (lowest integer value). Tie-break with Arrival Time, then PID.",
        preemptionBehavior: "Non-Preemptive",
        ganttChartProcedure: [
          "1. At current time t, find all arrived processes.",
          "2. Select the one with the highest priority (lowest priority number).",
          "3. Execute this process to completion (t = t + BT).",
          "4. Repeat until all processes are done."
        ],
        workedExamples: [
          {
            problem: "P1(AT=0, BT=10, Pri=3), P2(AT=1, BT=1, Pri=1), P3(AT=2, BT=2, Pri=4), P4(AT=3, BT=1, Pri=5), P5(AT=4, BT=5, Pri=2)",
            solution: "t=0: Only P1 is available. P1 runs to 10.\nt=10: P2, P3, P4, P5 are available. Highest priority is P2(Pri=1). P2 runs to 11.\nt=11: P5(Pri=2) runs to 16.\nt=16: P3(Pri=4) runs to 18.\nt=18: P4(Pri=5) runs to 19.\nWT: P1=0, P2=10-1=9, P3=16-2=14, P4=18-3=15, P5=11-4=7. Avg = 9.0"
          }
        ]
      },
      {
        variantName: "Preemptive Priority",
        selectionRule: "Select the arrived process with the highest priority. Preempt if a newly arrived process has a strictly higher priority (lower integer value).",
        preemptionBehavior: "Preemptive",
        ganttChartProcedure: [
          "1. At current time t, find all arrived processes.",
          "2. Select the one with the highest priority.",
          "3. Run it for 1 unit of time (t = t + 1), decrement its Remaining Time.",
          "4. If a new process arrives at t+1 with a HIGHER priority than the running process, preempt.",
          "5. If a new process arrives with EQUAL priority, do NOT preempt (FCFS tie-break)."
        ],
        workedExamples: [
          {
            problem: "P1(AT=0, BT=10, Pri=3), P2(AT=1, BT=1, Pri=1), P3(AT=2, BT=2, Pri=4), P4(AT=3, BT=1, Pri=5), P5(AT=4, BT=5, Pri=2)",
            solution: "t=0: P1 runs. \nt=1: P2(Pri=1) arrives. 1 < 3. P2 preempts P1. P2 runs.\nt=2: P2 finishes. P1(Pri=3) resumes.\nt=2: P3(Pri=4) arrives. 4 > 3. P1 continues.\nt=3: P4(Pri=5) arrives. 5 > 3. P1 continues.\nt=4: P5(Pri=2) arrives. 2 < 3. P5 preempts P1. P5 runs to 9.\nt=9: P5 finishes. P1(Pri=3) resumes and runs to 17 (remaining 8 units).\nt=17: P1 finishes. P3(Pri=4) runs to 19.\nt=19: P4(Pri=5) runs to 20."
          }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Preempting when a process with an EQUAL priority arrives.", fix: "Equal priorities tie-break using FCFS. Only preempt for strictly higher priority." },
      { mistake: "Assuming higher integer = higher priority.", fix: "Always check the prompt. In Unix/Linux, and by default in our engine, a lower number means higher priority." }
    ],
    labIntegrationPrompt: "Open the CPU Scheduling Simulator, toggle between Priority (NP) and Priority (Pre). Set up the exact same process table and observe how the Gantt chart shatters into fragments in the preemptive version.",
    coreProperties: ["Can be preemptive or non-preemptive", "Risk of starvation", "Aging solves starvation"],
    keyPoints: ["A major problem is Starvation (indefinite blocking). A low-priority process might wait forever.", "The solution is Aging: gradually increasing the priority of processes that wait in the system for a long time."]
  },

  "os_m1_33": {
    hasContent: true,
    overview: "Round Robin (RR) scheduling is designed for time-sharing systems. It assigns a small fixed time quantum to each process, cycling through the ready queue circularly.",
    formal: "The ready queue is treated as a circular queue (FIFO). The CPU scheduler goes around the queue, allocating the CPU to each process for a time interval of up to 1 time quantum (q). If the burst exceeds q, the process is preempted and put at the tail of the queue.",
    intuition: "Dealing cards in a circle. Everyone gets one card (time quantum). If you need more cards, you have to wait for the dealer to come back around to you.",
    textbookReference: "Galvin Section 5.3.4",
    learningObjectives: [
      "Understand the impact of time quantum size on context switching.",
      "Trace the ready queue explicitly to resolve arrival vs preemption ties.",
      "Explain why RR guarantees fairness but increases average turnaround time."
    ],
    whenItIsUsed: "The foundational algorithm for interactive, time-sharing, and desktop operating systems where responsiveness (low Response Time) is more important than Turnaround Time.",
    selectionRule: "Pop the head of the FIFO ready queue.",
    preemptionBehavior: "Preemptive",
    metricsFormulas: {
      CT: "Time of the final block.",
      TAT: "CT - AT.",
      WT: "TAT - BT.",
      RT: "First Start Time - AT. (RR minimizes this!)."
    },
    ganttChartProcedure: [
      "1. Maintain a strict FIFO Ready Queue.",
      "2. Pop the head. Run it for min(Remaining Time, Quantum).",
      "3. CRITICAL RULE: During execution, if new processes arrive, add them to the queue immediately.",
      "4. After execution, if the running process still has remaining time, push it to the BACK of the queue.",
      "5. This ensures newly arrived processes go before a just-preempted process."
    ],
    workedExamples: [
      {
        problem: "P1(AT=0, BT=4), P2(AT=1, BT=5), P3(AT=2, BT=2), Quantum=2.",
        solution: "t=0: Queue=[P1]. P1 runs [0-2].\nt=1: P2 arrives, Queue=[P2].\nt=2: P3 arrives, Queue=[P2, P3]. P1 finishes Q, Rem=2. Push P1. Queue=[P2, P3, P1].\nt=2: Pop P2. Runs [2-4]. Rem=3. Push P2. Queue=[P3, P1, P2].\nt=4: Pop P3. Runs [4-6]. Rem=0. Finished. Queue=[P1, P2].\nt=6: Pop P1. Runs [6-8]. Rem=0. Finished. Queue=[P2].\nt=8: Pop P2. Runs [8-10]. Rem=1. Push P2. Queue=[P2].\nt=10: Pop P2. Runs [10-11]. Finished."
      }
    ],
    commonMistakes: [
      { mistake: "Pushing the preempted process to the queue BEFORE adding newly arrived processes.", fix: "Always process arrivals first! At time t, add any process arriving at t to the queue. THEN push the preempted process." }
    ],
    labIntegrationPrompt: "Open the CPU Simulator, select RR. Change the Quantum value from 2 to 5 and observe how the number of Context Switches drops dramatically, but Response Time increases.",
    coreProperties: ["Preemptive by time", "Fairness", "Quantum-dependent performance"],
    keyPoints: ["Rule of thumb: 80% of CPU bursts should be shorter than the time quantum.", "If quantum is too large, RR devolves into FCFS.", "If quantum is too small, context switch overhead destroys throughput."]
  },

  // BATCH 2.5: MULTILEVEL QUEUE SCHEDULING
  "os_m1_34": {
    hasContent: true,
    overview: "Multilevel Queue Scheduling permanently partitions the ready queue into separate queues, each with its own scheduling algorithm and inter-queue scheduling policy.",
    formal: "A multilevel queue scheduling algorithm partitions the ready queue into several separate queues. Processes are permanently assigned to one queue, generally based on some property of the process such as memory size, process priority, or process type. Each queue has its own scheduling algorithm. In addition, there must be scheduling among the queues, commonly implemented as fixed-priority preemptive scheduling.",
    intuition: "Think of an airport with separate check-in lines: First Class, Business, and Economy. First Class is always served first. Within each line, passengers are served in arrival order (FCFS). An Economy passenger will only get served when no First Class or Business passengers are waiting.",
    textbookReference: "Galvin Section 5.3.5",
    learningObjectives: [
      "Understand how processes are permanently assigned to queues based on their type.",
      "Explain inter-queue scheduling policies: fixed priority preemptive and time-slice allocation.",
      "Identify why MLQ can cause starvation of lower-priority queues."
    ],
    coreProperties: ["Permanent queue assignment", "Per-queue scheduling algorithm", "Inter-queue scheduling"],
    keyPoints: [
      "Processes do NOT move between queues. Assignment is permanent based on process type.",
      "Common partition: System Processes > Interactive Processes > Batch Processes.",
      "Each queue may use a different algorithm: Interactive queue uses RR, Batch queue uses FCFS.",
      "Inter-queue scheduling is typically fixed-priority preemptive: no batch process runs while any interactive process is in its queue.",
      "Alternative: Time-slice between queues (e.g., 80% CPU to interactive queue, 20% to batch queue)."
    ],
    prerequisites: ["os_m1_32", "os_m1_33"],
    commonMistakes: [
      { mistake: "Assuming processes can move between queues in MLQ.", fix: "In Multilevel Queue, assignment is PERMANENT. Only Multilevel FEEDBACK Queue allows movement." },
      { mistake: "Forgetting that lower-priority queues can starve under fixed-priority inter-queue scheduling.", fix: "Without time-slice allocation between queues, batch processes may never execute if interactive processes keep arriving." }
    ]
  },

  "os_m1_35": {
    hasContent: true,
    overview: "Multilevel Feedback Queue Scheduling allows processes to move between queues based on their CPU burst behavior, dynamically adapting to process characteristics.",
    formal: "The multilevel feedback queue scheduling algorithm allows a process to move between queues. The idea is to separate processes according to the characteristics of their CPU bursts. If a process uses too much CPU time, it is moved to a lower-priority queue. Similarly, a process that waits too long in a lower-priority queue may be moved to a higher-priority queue (aging).",
    intuition: "A self-sorting system: new customers start in the Express lane (high priority, short quantum). If they take too long, they are moved to the Regular lane (larger quantum). If they STILL take too long, they go to the Bulk lane (FCFS). This way, short jobs finish quickly and long jobs eventually complete.",
    textbookReference: "Galvin Section 5.3.6",
    learningObjectives: [
      "Describe the parameters that define an MLFQ scheduler.",
      "Trace a process as it migrates between queues based on its CPU burst behavior.",
      "Explain how aging prevents starvation in MLFQ."
    ],
    coreProperties: ["Dynamic queue migration", "Adapts to burst behavior", "Aging prevents starvation"],
    keyPoints: [
      "MLFQ is defined by: number of queues, scheduling algorithm for each queue, method to upgrade/demote processes, method to determine initial queue.",
      "Typical setup: Q0 (RR, q=8), Q1 (RR, q=16), Q2 (FCFS). New processes enter Q0.",
      "If a process in Q0 does not finish within quantum 8, it is demoted to Q1.",
      "If a process in Q1 does not finish within quantum 16, it is demoted to Q2 (FCFS).",
      "Aging: If a process waits too long in Q2, it is promoted back to Q0.",
      "MLFQ is the most general CPU-scheduling algorithm but also the most complex to configure."
    ],
    detailedExplanation: "Example trace: Process P arrives with BT=25.\\n1. P enters Q0 (RR, q=8). Runs for 8 units. Remaining=17. Demoted to Q1.\\n2. P enters Q1 (RR, q=16). Runs for 16 units. Remaining=1. Demoted to Q2.\\n3. P enters Q2 (FCFS). Runs for 1 unit. Complete.\\n\\nMeanwhile, any new short process entering Q0 would preempt P's execution in Q1 or Q2, ensuring interactive responsiveness.",
    prerequisites: ["os_m1_34"],
    commonMistakes: [
      { mistake: "Confusing MLQ with MLFQ. MLQ has permanent assignment; MLFQ allows movement.", fix: "The word 'Feedback' in MLFQ means the scheduler uses the process's past behavior to adjust its queue placement." },
      { mistake: "Forgetting that MLFQ without aging still suffers from starvation.", fix: "Without aging, CPU-bound processes demoted to the lowest queue may never execute if interactive processes keep arriving." }
    ]
  },

  // BATCH 2.4: BANKER'S ALGORITHM SPLIT
  "os_m2_28": {
    hasContent: true,
    overview: "The Safety Algorithm is the core of deadlock avoidance, determining if the current system state can successfully finish all processes without deadlock.",
    formal: "A state is safe if the system can allocate resources to each process in some order and still avoid a deadlock. More formally, a safe sequence <P1, P2, ..., Pn> exists if for each Pi, the resources Pi can still request can be satisfied by currently available resources plus the resources held by all previously finished Pj.",
    intuition: "You're a bank manager. If you can fulfill all customers' maximum loan requests by having them pay you back one by one, your current cash reserves are 'safe'.",
    textbookReference: "Galvin Section 7.5.3.1",
    learningObjectives: [
      "Understand the difference between a safe state, an unsafe state, and a deadlocked state.",
      "Execute the Safety Algorithm using the Work and Finish vectors.",
      "Identify at least one valid safe sequence."
    ],
    whenItIsUsed: "Evaluated continually in Banker's Algorithm environments to ensure no resource grant will push the system into an unsafe state.",
    ganttChartProcedure: [
      "1. Initialize Work = Available, Finish = [false, ..., false].",
      "2. Find an i such that Finish[i] == false and Need[i] <= Work.",
      "3. If found, simulate Pi finishing: Work = Work + Allocation[i]; Finish[i] = true. Go to 2.",
      "4. If no such i exists, stop.",
      "5. If all Finish[i] == true, the system is Safe."
    ],
    workedExamples: [
      {
        problem: "Avail=[3,3,2]. Need: P0[7,4,3], P1[1,2,2], P2[6,0,0], P3[0,1,1], P4[4,3,1]. Alloc: P0[0,1,0], P1[2,0,0], P2[3,0,2], P3[2,1,1], P4[0,0,2].",
        solution: "1. Work=[3,3,2].\n2. Check P0: Need [7,4,3] <= Work [3,3,2] (False).\n3. Check P1: Need [1,2,2] <= Work (True). Finish P1. Work = Work + P1_Alloc[2,0,0] = [5,3,2].\n4. Check P2: Need [6,0,0] <= Work (False).\n5. Check P3: Need [0,1,1] <= Work (True). Finish P3. Work = Work + P3_Alloc[2,1,1] = [7,4,3].\n6. Reset loop, Check P0: Need [7,4,3] <= Work (True). Finish P0. Work = [7,4,3] + [0,1,0] = [7,5,3].\n7. Finish P2, then P4. Sequence: <P1, P3, P0, P2, P4>. Safe!"
      }
    ],
    commonMistakes: [
      { mistake: "Adding Need to Work instead of Allocation.", fix: "When a process finishes, it returns its CURRENT ALLOCATION to the available pool. Work = Work + Allocation." },
      { mistake: "Assuming an unsafe state means deadlock.", fix: "An unsafe state means deadlock *could* happen if processes request their max. It doesn't mean it is currently deadlocked." }
    ],
    labIntegrationPrompt: "Open the Banker's Laboratory. Set up an unsafe state by tweaking the Max array, and watch the visualizer fail to find a process whose Need <= Work.",
    coreProperties: ["Deadlock Avoidance", "Safe Sequence Generation", "O(m * n^2) complexity"],
    keyPoints: ["Not all unsafe states are deadlocks, but all deadlocks are unsafe states."]
  },

  "os_m2_29": {
    hasContent: true,
    overview: "The Banker's Algorithm manages resource allocation across multiple resource instances by combining the Need matrix calculation, the Resource-Request algorithm, and the Safety check.",
    formal: "Named because it could be used in a banking system to ensure the bank never allocates its available cash such that it can no longer satisfy the needs of all its customers. It requires that every process declare a priori the maximum number of resources of each type that it may need.",
    intuition: "The overarching governance framework for a careful bank. It consists of the ledger (Allocation, Max, Available), the risk metric (Need), and the transaction approval process.",
    textbookReference: "Galvin Section 7.5.3",
    learningObjectives: [
      "Define the required data structures (Available, Max, Allocation, Need).",
      "Calculate the Need matrix.",
      "Understand why maximum prior knowledge is required."
    ],
    metricsFormulas: {
      "Need[i,j]": "Max[i,j] - Allocation[i,j]"
    },
    commonMistakes: [
      { mistake: "Calculating Need backwards (Alloc - Max).", fix: "Need is always Max (what they want total) minus Allocation (what they have now)." }
    ],
    labIntegrationPrompt: "Open the Banker's Lab. Modify values in the Allocation and Max matrices and watch the Need matrix auto-calculate in real-time.",
    coreProperties: ["Requires Max upfront", "Deadlock Avoidance strategy"],
    keyPoints: ["Need matrix must be recalculated dynamically.", "Because it requires knowing 'Max' ahead of time, it is rarely used in generic modern OSes, but heavily tested in academia."]
  },

  "os_m2_30": {
    hasContent: true,
    overview: "The Resource-Request algorithm decides dynamically whether a specific request from a process should be granted immediately or made to wait.",
    formal: "When Process Pi requests resources, the system performs validation checks. If valid, it temporarily pretends the resources are allocated, updates the matrices, and runs the Safety Algorithm. If safe, the grant is permanent. If unsafe, it rolls back and Pi waits.",
    intuition: "Customer asks for $5,000. Manager checks: Are they asking for more than their limit? (Request <= Need). Do we have the cash? (Request <= Available). If yes, let's pretend to give it to them and check if we are still safe.",
    textbookReference: "Galvin Section 7.5.3.2",
    learningObjectives: [
      "Evaluate a Request vector against Need and Available vectors.",
      "Perform the temporary allocation updates.",
      "Understand the rollback mechanism when a request causes an unsafe state."
    ],
    ganttChartProcedure: [
      "1. Check if Request[i] <= Need[i]. If false, ERROR (process exceeded max claim).",
      "2. Check if Request[i] <= Available. If false, WAIT (resources unavailable).",
      "3. Pretend allocate:",
      "   Available = Available - Request[i]",
      "   Allocation[i] = Allocation[i] + Request[i]",
      "   Need[i] = Need[i] - Request[i]",
      "4. Run Safety Algorithm on this new state.",
      "5. If SAFE: Grant request.",
      "6. If UNSAFE: Roll back to original state, Pi must wait."
    ],
    workedExamples: [
      {
        problem: "Avail=[3,3,2]. P1(Need=[1,2,2], Alloc=[2,0,0]) requests [1,0,2].",
        solution: "1. Request [1,0,2] <= Need [1,2,2] (True).\n2. Request [1,0,2] <= Avail [3,3,2] (True).\n3. Pretend allocate: Avail becomes [2,3,0]. Alloc becomes [3,0,2]. Need becomes [0,2,0].\n4. Run Safety algorithm on this new state. It returns SAFE. Request granted."
      },
      {
        problem: "P0 requests [3,3,2] (all available).",
        solution: "1. Request <= Need (True for P0).\n2. Request <= Avail (True).\n3. Pretend: Avail becomes [0,0,0].\n4. Safety check: No process can finish (all Needs require > 0 resources). UNSAFE. Roll back. P0 must wait."
      }
    ],
    commonMistakes: [
      { mistake: "Forgetting to update Available when pretending to allocate.", fix: "Resources don't materialize from thin air. Subtract Request from Available." }
    ],
    labIntegrationPrompt: "In the Banker's Lab Experiment mode, use the Request UI to ask for more resources than the Need. Observe the immediate validation error.",
    coreProperties: ["Dynamic validation", "Pretend allocation", "Rollback mechanism"],
    keyPoints: ["The Safety algorithm is a subroutine of the Resource-Request algorithm."]
  }
};
