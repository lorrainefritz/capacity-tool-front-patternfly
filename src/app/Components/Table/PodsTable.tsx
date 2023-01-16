import * as React from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
import { Pod } from "../../models";

export const PodsTable: React.FC<{ pods: Pod[] }> = (props) => {
  const podsList: Pod[] = props.pods;

  const columnNames = {
    name: "Pod",
    countRestart: "Restart",
    cpuDisplay: "Cpu[Req/Lim]",
    memoryDisplay: "Mem[Req/Lim]",
    usageCpu: "Usg Cpu",
    maxCpu: "Max Cpu",
    usageMemory: "Usg Mem",
    maxMemory: "Max Mem",
  };
  return (
    <React.Fragment>
      <TableComposable>
        <Thead>
          <Tr>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.countRestart}</Th>
            <Th>{columnNames.cpuDisplay}</Th>
            <Th>{columnNames.memoryDisplay}</Th>
            <Th>{columnNames.usageCpu}</Th>
            <Th>{columnNames.maxCpu}</Th>
            <Th>{columnNames.usageMemory}</Th>
            <Th>{columnNames.maxMemory}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {podsList.map((pod) => (
            <Tr key={pod.name}>
              <Td dataLabel={columnNames.name}>{pod.name}</Td>
              <Td dataLabel={columnNames.countRestart}>{pod.countRestart}</Td>
              <Td dataLabel={columnNames.cpuDisplay}>{pod.cpuDisplay}</Td>
              <Td dataLabel={columnNames.memoryDisplay}>{pod.memoryDisplay}</Td>
              <Td dataLabel={columnNames.usageCpu}>{pod.usageCpu}</Td>
              <Td dataLabel={columnNames.maxCpu}>{pod.maxCpu}</Td>
              <Td dataLabel={columnNames.usageMemory}>{pod.usageMemory}</Td>
              <Td dataLabel={columnNames.maxMemory}>{pod.maxMemory}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};
