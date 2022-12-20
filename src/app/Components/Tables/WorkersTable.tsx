import * as React from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ThProps,
} from "@patternfly/react-table";
import { Button, Icon } from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";

import {Worker,Totals} from "src/app/models";


export const WorkersTable: React.FC<{
  workers: Worker[];
  totals: Totals;
}> = (props) => {
  const workersList: Worker[] = props.workers;
  // const totalList: Totals

  const columnNames = {
    name: "Worker",
    health: "Health",
    nbrPods: "NbrPods",
    displayCurrentCpu: "Usg CPU",
    percentageCurrentCpu: "%",
    requests_cpu: "Req CPU",
    percentageRequestCpu: "%",
    limits_cpu: "Cpu Req/Lim ",
    percentageLimitCpu: "%",
    displayCurrentMemory: "Usg mem",
    percentageCurrentMemory: "%",
    requests_memory: "Req mem",
    percentageRequestMemory: "%",
    limits_memory: "Lim mem",
    percentageLimitMemory: "%",
  };

  // Index of the sorted column
  // Note: if you intend to make columns reorderable, you may instead want to use a non-numeric key
  // as the identifier of the sorted column. See the "Compound expandable" example.
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(
    null
  );

  // Sort direction of the currently sorted column
  const [activeSortDirection, setActiveSortDirection] = React.useState<
    "asc" | "desc" | null
  >(null);

  // Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
  // This example is trivial since our data objects just contain strings, but if the data was more complex
  // this would be a place to return simplified string or number versions of each column to sort by.
  const getSortableRowValues = (worker: Worker): (string | number)[] => {
    const { name } = worker;
    console.table("name " +name);
    return [name];
  };

  // Note that we perform the sort as part of the component's render logic and not in onSort.
  // We shouldn't store the list of data in state because we don't want to have to sync that with props.
  let sortedWorkers = workersList;
  if (activeSortIndex !== null) {
    sortedWorkers = workersList.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      console.log("a"+a+" b"+b + " avalue "+ aValue+" bvalue " + bValue)
      if (typeof aValue === "number") {
        // Numeric sort
        console.error("number "+ aValue)
        if (activeSortDirection === "asc") {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === "asc") {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }

  const getSortParams = (columnIndex: number): ThProps["sort"] => ({
    sortBy: {
      index: activeSortIndex!,
      direction: activeSortDirection!,
      defaultDirection: "asc", // starting sort direction when first sorting a column. Defaults to 'asc'
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex,
  });

  // In this example, we wrap all but the 1st column and make the 1st and 3rd columns sortable just to demonstrate.
  return (
    <React.Fragment>
      <TableComposable aria-label="Sortable table">
        <Thead>
          <Tr>
            <Th sort={getSortParams(0)}>{columnNames.name}</Th>
            <Th>{columnNames.health}</Th>
            <Th>{columnNames.nbrPods}</Th>
            <Th>{columnNames.displayCurrentCpu}</Th>
            <Th>{columnNames.percentageCurrentCpu}</Th>
            <Th>{columnNames.requests_cpu}</Th>
            <Th>{columnNames.percentageRequestCpu}</Th>
            <Th>{columnNames.limits_cpu}</Th>
            <Th>{columnNames.percentageLimitCpu}</Th>
            <Th>{columnNames.displayCurrentMemory}</Th>
            <Th>{columnNames.percentageCurrentMemory}</Th>
            <Th>{columnNames.requests_memory}</Th>
            <Th>{columnNames.percentageRequestMemory}</Th>
            <Th>{columnNames.limits_memory}</Th>
            <Th>{columnNames.percentageLimitMemory}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedWorkers.map((worker, rowIndex) => (
            <Tr key={rowIndex}>
              <Td dataLabel={columnNames.name}>
              <Button variant="tertiary" isSmall >{worker.name}</Button>
              </Td>
              {worker.hightRequestOrMemory === true ? (
                <Td>
                  <Icon status="danger">
                    <ExclamationCircleIcon />
                  </Icon>
                </Td>
              ) : worker.hightRequestOrMemory === false &&
                worker.mediumRequestOrMemory === true ? (
                <Td>
                  <Icon status="warning">
                    <ExclamationTriangleIcon />
                  </Icon>
                </Td>
              ) : (
                <Td>
                  <Icon status="success">
                    <CheckCircleIcon />
                  </Icon>
                </Td>
              )}
              <Td dataLabel={columnNames.nbrPods}>{worker.nbrPods}</Td>
              <Td dataLabel={columnNames.displayCurrentCpu}>
                {worker.displayCurrentCpu}
              </Td>
              <Td dataLabel={columnNames.percentageCurrentCpu}>
                {worker.percentageCurrentCpu}
              </Td>
              <Td dataLabel={columnNames.requests_cpu}>
                {worker.requests_cpu}
              </Td>
              <Td dataLabel={columnNames.percentageRequestCpu}>
                {worker.percentageRequestCpu}
              </Td>
              <Td dataLabel={columnNames.limits_cpu}>{worker.limits_cpu}</Td>
              <Td dataLabel={columnNames.percentageLimitCpu}>
                {worker.percentageLimitCpu}
              </Td>
              <Td dataLabel={columnNames.displayCurrentMemory}>
                {worker.displayCurrentMemory}
              </Td>
              <Td dataLabel={columnNames.percentageCurrentMemory}>
                {worker.percentageCurrentMemory}
              </Td>
              <Td dataLabel={columnNames.requests_memory}>
                {worker.requests_memory}
              </Td>
              <Td dataLabel={columnNames.percentageRequestMemory}>
                {worker.percentageRequestMemory}
              </Td>
              <Td dataLabel={columnNames.limits_memory}>
                {worker.limits_memory}
              </Td>
              <Td dataLabel={columnNames.percentageLimitMemory}>
                {worker.percentageLimitMemory}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Thead>
          <Tr>
            <Td >Totals %</Td>
            <Td />
            <Td />
            <Td />
            <Td>{props.totals.prc_totCpu}%</Td>
            <Td />
            <Td>{props.totals.prc_totCpuRequest}%</Td>
            <Td />
            <Td>{props.totals.prc_totCpuLimit}%</Td>
            <Td />
            <Td>{props.totals.prc_totMem}%</Td>
            <Td />
            <Td>{props.totals.prc_totMemRequest}%</Td>
            <Td />
            <Td>{props.totals.prc_totMemlimit}%</Td>
          </Tr>
        </Thead>
      </TableComposable>
    </React.Fragment>
  );
};
