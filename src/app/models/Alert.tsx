import Pod from "./Pod";
export class Alert {
  namespaceName!: string;
  link!: string;
  podName!: string;
  countRestart!: number;
  reason!: string;
  pod!: Pod;
  teamEmail!: string;
}
