import * as React from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
import { Alert } from "src/models";

export const PodsWithHighCpuConsumptionTable: React.FC<{
  namespaceShortAlerts: Alert[];
}> = (props) => {
  const alertList: Alert[] = props.namespaceShortAlerts;
  const columnNames = {
    namespaceName: "Namespace",
    pod: "Pod",
    cpu: "CPU %",
    link: "Link",
  };
  return (
    <React.Fragment>
      <TableComposable>
        <Thead>
          <Tr>
            <Th>{columnNames.namespaceName}</Th>
            <Th>{columnNames.pod}</Th>
            <Th>{columnNames.cpu}</Th>
            <Th>{columnNames.link}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {alertList.map((namespace) => (
            <Tr key={namespace.pod.name}>
              <Td dataLabel={columnNames.namespaceName}>
                {namespace.namespaceName}
              </Td>
              <Td dataLabel={columnNames.pod}>{namespace.pod.name}</Td>
              <Td dataLabel={columnNames.cpu}>
                {namespace.pod.percentageCurrentCpu}
              </Td>
              <Td dataLabel={columnNames.link}>
                <a href={namespace.link}>{namespace.link}</a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};
