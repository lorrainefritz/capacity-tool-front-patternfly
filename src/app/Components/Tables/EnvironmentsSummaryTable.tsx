import React from 'react';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { Environment, Totals } from '../../models';
import { Button } from '@patternfly/react-core';

export const EnvironmentsSummaryTable: React.FC<{
  environments: Environment[];
  totals: Totals;
}> = (props) => {
  const environmentsList: Environment[] = props.environments;
  const columnNames = {
    name: 'Environment',
    env_size: 'Projects',
    currentPods: 'Pods',
    requests_cpu: 'Request CPU',
    per_req_cpu: '%',
    limits_cpu: 'Cpu Req/Lim ',
    per_lim_cpu: '%',
    requests_memory: 'Req mem',
    per_req_memory: '%',
    limits_memory: 'Lim mem',
    per_lim_memory: '%',
    quotaCpuRequest: 'Quota Request Cpu',
    per_quota_req_cpu: '%',
    quotaCpuLimit: 'Quota Limit Cpu',
    per_quota_lim_cpu: '%',
    quotaMemoryRequest: 'Quota Request Mem',
    per_quota_req_memory: '%',
    quotaMemoryLimit: 'Quota Limit Mem',
    per_quota_lim_memory: '%',
  };
  return (
    <React.Fragment>
      <TableComposable>
        <Thead>
          <Tr>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.env_size}</Th>
            <Th>{columnNames.currentPods}</Th>
            <Th>{columnNames.requests_cpu}</Th>
            <Th>{columnNames.per_req_cpu}</Th>
            <Th>{columnNames.limits_cpu}</Th>
            <Th>{columnNames.per_lim_cpu}</Th>
            <Th>{columnNames.requests_memory}</Th>
            <Th>{columnNames.per_req_memory}</Th>
            <Th>{columnNames.limits_memory}</Th>
            <Th>{columnNames.per_lim_memory}</Th>
            <Th>{columnNames.quotaCpuRequest}</Th>
            <Th>{columnNames.per_quota_req_cpu}</Th>
            <Th>{columnNames.quotaCpuLimit}</Th>
            <Th>{columnNames.per_quota_lim_cpu}</Th>
            <Th>{columnNames.quotaMemoryRequest}</Th>
            <Th>{columnNames.per_quota_req_memory}</Th>
            <Th>{columnNames.quotaMemoryLimit}</Th>
            <Th>{columnNames.per_quota_lim_memory}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {environmentsList.map((environment) => (
            <Tr key={environment.name}>
              <Td dataLabel={columnNames.name}>
                <Button variant="tertiary" isSmall>
                  {environment.name}
                </Button>
              </Td>
              <Td dataLabel={columnNames.env_size}>{environment.env_size}</Td>
              <Td dataLabel={columnNames.currentPods}>{environment.currentPods}</Td>
              <Td dataLabel={columnNames.requests_cpu}>{environment.requestCpu}</Td>
              <Td dataLabel={columnNames.per_req_cpu}>{environment.per_req_cpu}</Td>
              <Td dataLabel={columnNames.limits_cpu}>{environment.limitCpu}</Td>
              <Td dataLabel={columnNames.per_lim_cpu}>{environment.per_lim_cpu}</Td>
              <Td dataLabel={columnNames.requests_memory}>{environment.requestMemory}</Td>
              <Td dataLabel={columnNames.per_req_memory}>{environment.per_req_memory}</Td>
              <Td dataLabel={columnNames.limits_memory}>{environment.limitMemory}</Td>
              <Td dataLabel={columnNames.per_lim_memory}>{environment.per_lim_memory}</Td>
              <Td dataLabel={columnNames.quotaCpuRequest}>{environment.quotaCpuRequest}</Td>
              <Td dataLabel={columnNames.per_quota_req_cpu}>{environment.per_quota_req_cpu}</Td>
              <Td dataLabel={columnNames.quotaCpuLimit}>{environment.quotaCpuLimit}</Td>
              <Td dataLabel={columnNames.per_quota_lim_cpu}>{environment.per_quota_lim_cpu}</Td>
              <Td dataLabel={columnNames.quotaMemoryRequest}>{environment.quotaMemoryRequest}</Td>
              <Td dataLabel={columnNames.per_quota_req_memory}>{environment.per_quota_req_memory}</Td>
              <Td dataLabel={columnNames.quotaMemoryLimit}>{environment.quotaMemoryLimit}</Td>
              <Td dataLabel={columnNames.per_quota_lim_memory}>{environment.per_quota_lim_memory}</Td>
            </Tr>
          ))}
        </Tbody>
        <Thead>
          <Tr>
            <Td>Totals %</Td>
            <Td />
            <Td>{props.totals.tot_pods}</Td>
            <Td>{props.totals.tot_request_cpu}</Td>
            <Td>{props.totals.prc_totCpuRequest}%</Td>
            <Td>{props.totals.tot_lim_cpu}</Td>
            <Td>{props.totals.prc_totCpuLimit}%</Td>
            <Td>{props.totals.tot_request_memory}</Td>
            <Td>{props.totals.prc_totMemRequest}%</Td>
            <Td>{props.totals.tot_limit_memory}</Td>
            <Td>{props.totals.prc_totMemlimit}%</Td>
          </Tr>
        </Thead>
      </TableComposable>
    </React.Fragment>
  );
};
export default EnvironmentsSummaryTable;
