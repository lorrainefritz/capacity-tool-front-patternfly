import * as React from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ThProps,
  Caption,
  ExpandableRowContent,
} from "@patternfly/react-table";
import {
  Icon,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import { Namespace } from "../../models";
import { PodsAndChartHandler } from "../../utils";
import useFindByKeyword from "../../hooks/useFindByKeyword";
import { useState } from "react";

export const GenericDepartmentsEnvironmentsTeamsTables: React.FC<{
  items: Namespace[];
  maxReplicas: number;
}> = (props) => {
  const namespacesList: Namespace[] = props.items;
  const columnNames = {
    name: "Projects",
    nbrPods: "Nbr Pods",
    nbrPodPossibleToDeploy: "Avl Pods",
    protectedByLimits: "Limits",
    protectedByQuotas: "quotas",
    rollingUpdate: "Rolling update",
    displayCurrentCpu: "Cur Cpu",
    percentageCurrentCpu: "%",
    displayRequestCpu: "Req Cpu",
    percentageRequestCpu: "%",
    displayLimitCpu: "Cpu[Req/Lim]",
    percentageLimitCpu: "%",
    displayCurrentMemory: "Cur Mem",
    percentageCurrentMemory: "%",
    displayRequestMemory: "Req Mem",
    percentageRequestMemory: "%",
    displayLimitMemory: "Lim Mem",
    percentageLimitMemory: "%",
  };

  //For Handling MaxReplicas

  const MaxReplicasHandler = () => {
    if (props.maxReplicas > 0) {
      return <Caption>Max Replicas : {props.maxReplicas}</Caption>;
    } else {
      return <Tbody></Tbody>;
    }
  };

  // In this example, expanded rows are tracked by the namespace names from each row
  // This is to prevent state from being based on row order index in case we later add sorting.

  const [expandedNamespacesNames, setExpandedNamespacesNames] = useState<
    string[]
  >([]);

  const setNamespaceExpanded = (namespace: Namespace, isExpanding = true) =>
    setExpandedNamespacesNames((prevExpanded) => {
      const otherExpandedNamespacesNames = prevExpanded.filter(
        (r) => r !== namespace.name
      );
      return isExpanding
        ? [...otherExpandedNamespacesNames, namespace.name]
        : otherExpandedNamespacesNames;
    });

  const isNamespaceExpanded = (namespace: Namespace) =>
    expandedNamespacesNames.includes(namespace.name);

  // Index of the   sorted column
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
  const getSortableRowValues = (namespace: Namespace): (string | number)[] => {
    const { name } = namespace;
    return [name];
  };

  // Note that we perform the sort as part of the component's render logic and not in onSort.
  // We shouldn't store the list of data in state because we don't want to have to sync that with props.
  let sortedNamespaces = namespacesList;
  if (activeSortIndex !== null) {
    sortedNamespaces = namespacesList.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === "number") {
        // Numeric sort
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

  //SEARCHING WITH COMPO USEFINDBYKEYWORD
  // Set up for searching entries
  const [searchValue, setSearchValue] = useState("");

  let onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  let filteredNamespaces = useFindByKeyword(sortedNamespaces, searchValue);

  const searchInput = (
    <SearchInput
      placeholder="Filter by name"
      value={searchValue}
      onChange={onSearchChange}
      onClear={() => onSearchChange("")}
    />
  );

  const toolbar = (
    <Toolbar id="search-input-filter-toolbar">
      <ToolbarContent>
        <ToolbarItem variant="search-filter">{searchInput}</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <React.Fragment>
      {toolbar}
      <TableComposable aria-label="Expandable table" isStriped isExpandable>
        <MaxReplicasHandler />
        <Thead>
          <Tr>
            <Th />
            <Th sort={getSortParams(0)}>{columnNames.name}</Th>
            <Th>{columnNames.nbrPods}</Th>
            <Th>{columnNames.nbrPodPossibleToDeploy}</Th>
            <Th>{columnNames.protectedByLimits}</Th>
            <Th>{columnNames.protectedByQuotas}</Th>
            <Th>{columnNames.rollingUpdate}</Th>
            <Th>{columnNames.displayCurrentCpu}</Th>
            <Th>{columnNames.percentageCurrentCpu}</Th>
            <Th>{columnNames.displayRequestCpu}</Th>
            <Th>{columnNames.percentageRequestCpu}</Th>
            <Th>{columnNames.displayLimitCpu}</Th>
            <Th>{columnNames.percentageLimitCpu}</Th>
            <Th>{columnNames.displayCurrentMemory}</Th>
            <Th>{columnNames.percentageCurrentMemory}</Th>
            <Th>{columnNames.displayRequestMemory}</Th>
            <Th>{columnNames.percentageRequestMemory}</Th>
            <Th>{columnNames.displayLimitMemory}</Th>
            <Th>{columnNames.percentageLimitMemory}</Th>
          </Tr>
        </Thead>
        {filteredNamespaces.map((namespace, rowIndex) => {
          return (
            <Tbody
              key={namespace.name}
              isExpanded={isNamespaceExpanded(namespace)}
            >
              <Tr>
                <Td
                  expand={
                    namespace.podListByNamespace
                      ? {
                          rowIndex,
                          isExpanded: isNamespaceExpanded(namespace),
                          onToggle: () =>
                            setNamespaceExpanded(
                              namespace,
                              !isNamespaceExpanded(namespace)
                            ),
                        }
                      : undefined
                  }
                />
                <Td dataLabel={columnNames.name}>{namespace.name}</Td>
                <Td dataLabel={columnNames.nbrPods}>{namespace.nbrPods}</Td>
                <Td dataLabel={columnNames.nbrPodPossibleToDeploy}>
                  {namespace.nbrPodPossibleToDeploy}
                </Td>
                {namespace.protectedByLimits === false ? (
                  <Td>
                    <Icon status="danger">
                      <ExclamationCircleIcon />
                    </Icon>
                  </Td>
                ) : (
                  <Td>
                    <Icon status="success">
                      <CheckCircleIcon />
                    </Icon>
                  </Td>
                )}
                {namespace.protectedByQuotas === false ? (
                  <Td>
                    <Icon status="danger">
                      <ExclamationCircleIcon />
                    </Icon>
                  </Td>
                ) : (
                  <Td>
                    <Icon status="success">
                      <CheckCircleIcon />
                    </Icon>
                  </Td>
                )}
                {namespace.rollingUpdate === false ? (
                  <Td>
                    <Icon status="danger">
                      <ExclamationCircleIcon />
                    </Icon>
                  </Td>
                ) : (
                  <Td>
                    <Icon status="success">
                      <CheckCircleIcon />
                    </Icon>
                  </Td>
                )}
                <Td dataLabel={columnNames.displayCurrentCpu}>
                  {namespace.displayCurrentCpu}
                </Td>
                <Td dataLabel={columnNames.percentageCurrentCpu}>
                  {namespace.percentageCurrentCpu}
                </Td>
                <Td dataLabel={columnNames.displayRequestCpu}>
                  {namespace.displayRequestCpu}
                </Td>
                <Td dataLabel={columnNames.percentageRequestCpu}>
                  {namespace.percentageRequestCpu}
                </Td>
                <Td dataLabel={columnNames.displayLimitCpu}>
                  {namespace.displayLimitCpu}
                </Td>
                <Td dataLabel={columnNames.percentageLimitCpu}>
                  {namespace.percentageLimitCpu}
                </Td>
                <Td dataLabel={columnNames.displayCurrentMemory}>
                  {namespace.displayCurrentMemory}
                </Td>
                <Td dataLabel={columnNames.percentageCurrentMemory}>
                  {namespace.percentageCurrentMemory}
                </Td>
                <Td dataLabel={columnNames.displayRequestMemory}>
                  {namespace.displayRequestMemory}
                </Td>
                <Td dataLabel={columnNames.percentageRequestMemory}>
                  {namespace.percentageRequestMemory}
                </Td>
                <Td dataLabel={columnNames.displayLimitMemory}>
                  {namespace.displayLimitMemory}
                </Td>
                <Td dataLabel={columnNames.percentageLimitMemory}>
                  {namespace.percentageLimitMemory}
                </Td>
              </Tr>
              {namespace.podListByNamespace ? (
                <Tr isExpanded={isNamespaceExpanded(namespace)}>
                  <Td />
                  {namespace.podListByNamespace ? (
                    <Td dataLabel="Namespace details">
                      <ExpandableRowContent>
                        <PodsAndChartHandler namespace={namespace} />
                      </ExpandableRowContent>
                    </Td>
                  ) : null}
                </Tr>
              ) : null}
            </Tbody>
          );
        })}
      </TableComposable>
    </React.Fragment>
  );
};
export default GenericDepartmentsEnvironmentsTeamsTables;
