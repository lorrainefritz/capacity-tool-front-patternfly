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

export const PodsWithHighMemoryConsumptionTable: React.FC<{
  namespaceShortAlerts: Alert[];
}> = (props) => {
  const alertList: Alert[] = props.namespaceShortAlerts;
  const columnNames = {
    namespaceName: "Namespace",
    pod: "Pod",
    mem: "MEM %",
    link: "Link",
  };
  return (
    <React.Fragment>
      <TableComposable>
        <Thead>
          <Tr>
            <Th>{columnNames.namespaceName}</Th>
            <Th>{columnNames.pod}</Th>
            <Th>{columnNames.mem}</Th>
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
              <Td dataLabel={columnNames.mem}>
                {namespace.pod.percentageCurrentMemory}
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
