'use client';

import React from 'react';
import CpuSchedulerLab from './CpuSchedulerLab';
import BankersLab from './BankersLab';
import ProcessStateLab from './ProcessStateLab';
import SemaphoreLab from './SemaphoreLab';

export default function OsLaboratoryRegistry({ topicId }: { topicId: string }) {

  // Exact mapping based on VSSUT OS topic IDs
  const cpuSchedulingTopics = [
    'os_m1_23', 'os_m1_24', 'os_m1_25', 'os_m1_26', 'os_m1_27', 'os_m1_28',
    'os_m1_29', 'os_m1_30', 'os_m1_31', 'os_m1_32', 'os_m1_33', 'os_m1_37'
  ];

  if (cpuSchedulingTopics.includes(topicId)) {
    return <CpuSchedulerLab />;
  }

  // Process State Machine (os_m1_14)
  if (topicId === 'os_m1_14') {
    return <ProcessStateLab />;
  }

  // Semaphore Playground (os_m2_11, os_m2_13, os_m2_14)
  if (topicId === 'os_m2_11' || topicId === 'os_m2_13' || topicId === 'os_m2_14') {
    return <SemaphoreLab />;
  }

  // Banker's Algorithm (os_m2_28, os_m2_29, os_m2_30)
  if (topicId === 'os_m2_28' || topicId === 'os_m2_29' || topicId === 'os_m2_30') {
    return <BankersLab />;
  }

  // If no lab is registered for this topic, render nothing
  return null;
}
