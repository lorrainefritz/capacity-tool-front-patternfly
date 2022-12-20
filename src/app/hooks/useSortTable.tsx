import * as React from "react";
import { ThProps } from "@patternfly/react-table";

import { Worker } from "../models";


export const useSortTable = (props) => {



  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(
    null
  );


  const [activeSortDirection, setActiveSortDirection] = React.useState<
    "asc" | "desc" | null
  >(null);

  const getSortableRowValues = (worker: Worker): (string | number)[] => {
    const { name } = worker;
    return [name];
  };

 
    const workersList = props.list;

    let sortedWorkers = workersList;

    if (activeSortIndex !== null) {
      sortedWorkers = workersList.sort((a, b) => {
        const aValue = getSortableRowValues(a)[activeSortIndex];
        const bValue = getSortableRowValues(b)[activeSortIndex];
          if (activeSortDirection === "asc") {
            return (aValue as string).localeCompare(bValue as string);
          }
          return (bValue as string).localeCompare(aValue as string);
      });
    }

    const getSortParams = (columnIndex: number): ThProps["sort"] => ({
      sortBy: {
        index: activeSortIndex!,
        direction: activeSortDirection!,
        defaultDirection: "asc",
      },
      onSort: (_event, index, direction) => {
        setActiveSortIndex(index);
        setActiveSortDirection(direction);
      },
      columnIndex,
    });

    getSortParams(0);
 
};
