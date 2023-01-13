export class Worker {
  name!: string;
  allocatable_cpu!: number;
  allocatable_memory!: number;
  quota_request_cpu!: number;
  quota_request_memory!: number;
  current_cpu!: number;
  current_memory!: number;
  max_cpu_last2w!: number;
  max_memory_last2w!: number;
  limits_cpu!: number;
  limits_memory!: number;
  requests_cpu!: number;
  requests_memory!: number;
  percentageCurrentCpu!: number;
  percentageCurrentMemory!: number;
  percentageRequestCpu!: number;
  percentageRequestMemory!: number;
  percentageLimitCpu!: number;
  percentageLimitMemory!: number;
  displayCurrentCpu!: string;
  displayCurrentMemory!: string;
  displayRequestCpu!: string;
  displayRequestMemory!: string;
  displayLimitCpu!: string;
  displayLimitMemory!: string;
  nbrPods!: number;
  hightRequestOrMemory!: boolean;
  mediumRequestOrMemory!: boolean;
  percentageMaxCpu!: number;
  percentageMaxMemory!: number;
  perCpuFromCpuLimit!: string;
  perMemoryFromMemoryLimit!: string;
}

export default Worker;
