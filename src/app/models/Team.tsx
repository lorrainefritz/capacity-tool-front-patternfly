import { Namespace } from "../models";
export class Team {
  teamName!: string;
  pods!: number;
  currentCurCpu!: number;
  currentReqCpu!: number;
  limCpu!: number;
  currentMemory!: number;
  reqMemory!: number;
  limMemory!: number;
  namespaces!: Namespace[];
}

export default Team;
