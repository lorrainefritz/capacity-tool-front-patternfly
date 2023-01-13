
import * as React from "react";
import {Namespace} from "../../models";
import GenericDepartmentsEnvironmentsTeamsTables from "./GenericDepartmentsEnvironmentsTeamsTables";

export const EnvironmentsDetailsTable: React.FC<{
  namespaces: Namespace[];
  maxReplicas:number;
}> = (props) => {
  const namespaces: Namespace[] = props.namespaces;
  return <React.Fragment>
      <GenericDepartmentsEnvironmentsTeamsTables items={namespaces} maxReplicas={props.maxReplicas} ></GenericDepartmentsEnvironmentsTeamsTables>
  </React.Fragment>;
};

















// import React from "react";
// import {
//   TableComposable,
//   Thead,
//   Tr,
//   Th,
//   Tbody,
//   Td,
//   ThProps,
//   Caption,
//   ExpandableRowContent,
// } from "@patternfly/react-table";
// import {Icon} from "@patternfly/react-core";
// import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
// import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";

// import {Namespace} from "src/models";
// import {PodsTable} from "./PodsTable";

// export const EnvironmentsDetailsTable: React.FC<{
//   namespace: Namespace[];
//   maxReplicas: number;
// }> = (props) => {
//   const environmentsList: Namespace[] = props.namespace;

//   const columnNames = {
//     name: "Projects",
//     nbrPods: "Nbr Pods",
//     nbrPodPossibleToDeploy: "Avl Pods",
//     protectedByLimits: "Limits",
//     protectedByQuotas: "quotas",
//     rollingUpdate: "Rolling update",
//     displayCurrentCpu: "Cur Cpu",
//     percentageCurrentCpu: "%",
//     displayRequestCpu: "Req Cpu",
//     percentageRequestCpu: "%",
//     displayLimitCpu: "Cpu[Req/Lim]",
//     percentageLimitCpu: "%",
//     displayCurrentMemory: "Cur Mem",
//     percentageCurrentMemory: "%",
//     displayRequestMemory: "Req Mem",
//     percentageRequestMemory: "%",
//     displayLimitMemory: "Lim Mem",
//     percentageLimitMemory: "%",
//   };

//   // Index of the   sorted column
//   // Note: if you intend to make columns reorderable, you may instead want to use a non-numeric key
//   // as the identifier of the sorted column. See the "Compound expandable" example.
//   const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(
//     null
//   );

//   // Sort direction of the currently sorted column
//   const [activeSortDirection, setActiveSortDirection] = React.useState<
//     "asc" | "desc" | null
//   >(null);

//   // Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
//   // This example is trivial since our data objects just contain strings, but if the data was more complex
//   // this would be a place to return simplified string or number versions of each column to sort by.
//   const getSortableRowValues = (enviro: Namespace): (string | number)[] => {
//     const { name } = enviro;
//     return [name];
//   };

//   // Note that we perform the sort as part of the component's render logic and not in onSort.
//   // We shouldn't store the list of data in state because we don't want to have to sync that with props.
//   let sortedEnvironments = environmentsList;
//   if (activeSortIndex !== null) {
//     sortedEnvironments = environmentsList.sort((a, b) => {
//       const aValue = getSortableRowValues(a)[activeSortIndex];
//       const bValue = getSortableRowValues(b)[activeSortIndex];
//       if (typeof aValue === "number") {
//         // Numeric sort
//         if (activeSortDirection === "asc") {
//           return (aValue as number) - (bValue as number);
//         }
//         return (bValue as number) - (aValue as number);
//       } else {
//         // String sort
//         if (activeSortDirection === "asc") {
//           return (aValue as string).localeCompare(bValue as string);
//         }
//         return (bValue as string).localeCompare(aValue as string);
//       }
//     });
//   }

//   const getSortParams = (columnIndex: number): ThProps["sort"] => ({
//     sortBy: {
//       index: activeSortIndex!,
//       direction: activeSortDirection!,
//       defaultDirection: "asc", // starting sort direction when first sorting a column. Defaults to 'asc'
//     },
//     onSort: (_event, index, direction) => {
//       setActiveSortIndex(index);
//       setActiveSortDirection(direction);
//     },
//     columnIndex,
//   });

//   // In this example, expanded rows are tracked by the enviro names from each row. This could be any unique identifier.
//   // This is to prevent state from being based on row order index in case we later add sorting.
//   // Note that this behavior is very similar to selection state.
//   const initialExpandedEnviroNames = environmentsList
//     .filter((enviro) => !!enviro.podListByNamespace)
//     .map((enviro) => enviro.name); // Default to all expanded

//   const [expandedEnviroNames, setExpandedEnviroNames] = React.useState<string[]>(
//     initialExpandedEnviroNames
//   );

//   const setEnviroExpanded = (enviro: Namespace, isExpanding = true) =>
//     setExpandedEnviroNames((prevExpanded) => {
//       const otherExpandedEnviroNames = prevExpanded.filter(
//         (r) => r !== enviro.name
//       );
//       return isExpanding
//         ? [...otherExpandedEnviroNames, enviro.name]
//         : otherExpandedEnviroNames;
//     });

//   const isEnviroExpanded = (enviro: Namespace) =>
//     expandedEnviroNames.includes(enviro.name);

//   return (
//     <React.Fragment>
//       <TableComposable aria-label="Expandable table" isStriped isExpandable>
//         <Caption> Max Replicas : {props.maxReplicas}</Caption>
//         <Thead>
//           <Tr>
//             <Th />
//             <Th sort={getSortParams(0)}>{columnNames.name}</Th>
//             <Th>{columnNames.nbrPods}</Th>
//             <Th>{columnNames.nbrPodPossibleToDeploy}</Th>
//             <Th>{columnNames.protectedByLimits}</Th>
//             <Th>{columnNames.protectedByQuotas}</Th>
//             <Th>{columnNames.rollingUpdate}</Th>
//             <Th>{columnNames.displayCurrentCpu}</Th>
//             <Th>{columnNames.percentageCurrentCpu}</Th>
//             <Th>{columnNames.displayRequestCpu}</Th>
//             <Th>{columnNames.percentageRequestCpu}</Th>
//             <Th>{columnNames.displayLimitCpu}</Th>
//             <Th>{columnNames.percentageLimitCpu}</Th>
//             <Th>{columnNames.displayCurrentMemory}</Th>
//             <Th>{columnNames.percentageCurrentMemory}</Th>
//             <Th>{columnNames.displayRequestMemory}</Th>
//             <Th>{columnNames.percentageRequestMemory}</Th>
//             <Th>{columnNames.displayLimitMemory}</Th>
//             <Th>{columnNames.percentageLimitMemory}</Th>
//           </Tr>
//         </Thead>
//         {environmentsList.map((enviro, rowIndex) => {
//           // Some arbitrary examples of how you could customize the child row based on your needs

//           return (
//             <Tbody key={enviro.name} isExpanded={isEnviroExpanded(enviro)}>
//               <Tr>
//                 <Td
//                   expand={
//                     enviro.podListByNamespace
//                       ? {
//                           rowIndex,
//                           isExpanded: isEnviroExpanded(enviro),
//                           onToggle: () =>
//                             setEnviroExpanded(enviro, !isEnviroExpanded(enviro)),
//                         }
//                       : undefined
//                   }
//                 />
//                 <Td dataLabel={columnNames.name}>{enviro.name}</Td>
//                 <Td dataLabel={columnNames.nbrPods}>{enviro.nbrPods}</Td>
//                 <Td dataLabel={columnNames.nbrPodPossibleToDeploy}>
//                   {enviro.nbrPodPossibleToDeploy}
//                 </Td>
//                 {enviro.protectedByLimits === false ? (
//                   <Td>
//                     <Icon status="danger">
//                       <ExclamationCircleIcon />
//                     </Icon>
//                   </Td>
//                 ) : (
//                   <Td>
//                     <Icon status="success">
//                       <CheckCircleIcon />
//                     </Icon>
//                   </Td>
//                 )}
//                 {enviro.protectedByQuotas === false ? (
//                   <Td>
//                     <Icon status="danger">
//                       <ExclamationCircleIcon />
//                     </Icon>
//                   </Td>
//                 ) : (
//                   <Td>
//                     <Icon status="success">
//                       <CheckCircleIcon />
//                     </Icon>
//                   </Td>
//                 )}
//                 {enviro.rollingUpdate === false ? (
//                   <Td>
//                     <Icon status="danger">
//                       <ExclamationCircleIcon />
//                     </Icon>
//                   </Td>
//                 ) : (
//                   <Td>
//                     <Icon status="success">
//                       <CheckCircleIcon />
//                     </Icon>
//                   </Td>
//                 )}
//                 <Td dataLabel={columnNames.displayCurrentCpu}>
//                   {enviro.displayCurrentCpu}
//                 </Td>
//                 <Td dataLabel={columnNames.percentageCurrentCpu}>
//                   {enviro.percentageCurrentCpu}
//                 </Td>
//                 <Td dataLabel={columnNames.displayRequestCpu}>
//                   {enviro.displayRequestCpu}
//                 </Td>
//                 <Td dataLabel={columnNames.percentageRequestCpu}>
//                   {enviro.percentageRequestCpu}
//                 </Td>
//                 <Td dataLabel={columnNames.displayLimitCpu}>
//                   {enviro.displayLimitCpu}
//                 </Td>
//                 <Td dataLabel={columnNames.percentageLimitCpu}>
//                   {enviro.percentageLimitCpu}
//                 </Td>
//                 <Td dataLabel={columnNames.displayCurrentMemory}>
//                   {enviro.displayCurrentMemory}
//                 </Td>
//                 <Td dataLabel={columnNames.percentageCurrentMemory}>
//                   {enviro.percentageCurrentMemory}
//                 </Td>
//                 <Td dataLabel={columnNames.displayRequestMemory}>
//                   {enviro.displayRequestMemory}
//                 </Td>
//                 <Td dataLabel={columnNames.percentageRequestMemory}>
//                   {enviro.percentageRequestMemory}
//                 </Td>
//                 <Td dataLabel={columnNames.displayLimitMemory}>
//                   {enviro.displayLimitMemory}
//                 </Td>
//                 <Td dataLabel={columnNames.percentageLimitMemory}>
//                   {enviro.percentageLimitMemory}
//                 </Td>
//               </Tr>
//               {enviro.podListByNamespace ? (
//                 <Tr isExpanded={isEnviroExpanded(enviro)}>
//                   <Td />
//                   {enviro.podListByNamespace ? (
//                     <Td dataLabel="Enviro details">
//                       <ExpandableRowContent>
//                         <PodsTable pods={enviro.podListByNamespace} />
//                       </ExpandableRowContent>
//                     </Td>
//                   ) : null}
//                 </Tr>
//               ) : null}
//             </Tbody>
//           );
//         })}
//       </TableComposable>
//     </React.Fragment>
//   );
// };

// export default EnvironmentsDetailsTable;
