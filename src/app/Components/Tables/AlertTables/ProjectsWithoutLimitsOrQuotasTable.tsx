import * as React from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
import { Alert } from "../../../models";

export const ProjectsWithoutLimitsOrQuotasTable: React.FC<{
  alerts: Alert[];
}> = (props) => {
  const alertList: Alert[] = props.alerts;
  const columnNames = {
    namespaceName: "Namespace",
    link: "Link",
  };
  return (
    <React.Fragment>
      <TableComposable>
        <Thead>
          <Tr>
            <Th>{columnNames.namespaceName}</Th>
            <Th>{columnNames.link}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {alertList.map((namespace) => (
            <Tr key={namespace.namespaceName}>
              <Td dataLabel={columnNames.namespaceName}>
                {namespace.namespaceName}
              </Td>
              <Td dataLabel={columnNames.link}>
                {" "}
                <a href={namespace.link}>{namespace.link}</a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};
export default ProjectsWithoutLimitsOrQuotasTable;
