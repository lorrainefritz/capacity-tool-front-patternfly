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

export const PodsIntempestivRestartTable: React.FC<{ alerts: Alert[] }> = (
  props
) => {
  const alertList: Alert[] = props.alerts;
  const columnNames = {
    teamEmail: "Team Email",
    namespaceName: "Namespace",
    pod: "Pod",
    countRestart: "Count Restart",
    reason: "Reason",
    link: "Link",
  };
  return (
    <React.Fragment>
      <TableComposable>
        <Thead>
          <Tr>
            <Th>{columnNames.teamEmail}</Th>
            <Th>{columnNames.namespaceName}</Th>
            <Th>{columnNames.pod}</Th>
            <Th>{columnNames.countRestart}</Th>
            <Th>{columnNames.reason}</Th>
            <Th>{columnNames.link}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {alertList.map((namespace) => (
            <Tr key={namespace.pod.name}>
              <Td dataLabel={columnNames.teamEmail}>{namespace.teamEmail}</Td>
              <Td dataLabel={columnNames.namespaceName}>
                {namespace.namespaceName}
              </Td>
              <Td dataLabel={columnNames.pod}>{namespace.pod.name}</Td>
              <Td dataLabel={columnNames.countRestart}>
                {namespace.countRestart}
              </Td>
              <Td dataLabel={columnNames.reason}>{namespace.reason}</Td>
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

export default PodsIntempestivRestartTable;
