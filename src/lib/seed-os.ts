import { Subject, Module, Topic, Question } from '@/types';

export const osSubject: Subject = {
  id: 'os',
  name: 'Operating Systems',
  description: 'Operating System Concepts, Process Management, Scheduling, Synchronization, and Deadlocks.',
  slug: 'os'
};

export const osModules: Module[] = [
  {
    id: 'os-mod-1',
    subjectId: 'os',
    title: 'Module I: OS Structures, Processes, and Scheduling',
    description: 'OS basics, processes, threads, and CPU scheduling.',
    order: 1
  },
  {
    id: 'os-mod-2',
    subjectId: 'os',
    title: 'Module II: Synchronization and Deadlocks',
    description: 'Process synchronization, mutual exclusion, semaphores, and deadlock handling.',
    order: 2
  }
];
