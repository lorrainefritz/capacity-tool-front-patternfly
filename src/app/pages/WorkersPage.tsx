import * as React from 'react';
import { useState, useEffect } from 'react';
import { Spinner } from '@patternfly/react-core';

import { Worker, Totals } from 'src/app/models';
import { WorkersTable } from '@app/Components/tables';
import useHttp from 'src/app/hooks/useHttp';
import { properties } from 'src/properties';

export const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [totals, setTotals] = useState<Totals>(new Totals());

  const { isLoading, error, sendRequest: fetch } = useHttp();

  const tot = {
    name: 'lab2.its4u',
    server: 'https://api.ocp-lab2.its4u.eu:6443',
    cluster_cpu: 57000,
    cluster_memory: 153906,
    tot_pods: 294,
    tot_usage_cpu: 8369,
    tot_request_cpu: 34481,
    tot_lim_cpu: 84800,
    tot_usage_memory: 78669,
    tot_request_memory: 126704,
    tot_limit_memory: 165260,
    sim_tot_request_cpu: 34481,
    sim_tot_lim_cpu: 84800,
    sim_tot_request_memory: 126704,
    sim_tot_limit_memory: 165260,
    totQuotaCpuRequest: 2000,
    totQuotaCpuLimit: 8000,
    totQuotaMemoryRequest: 2048,
    totQuotaMemoryLimit: 8192,
    prc_totCpu: 101,
    prc_totMem: 51,
    prc_totCpuRequest: 61,
    prc_totCpuLimit: 149,
    prc_totMemRequest: 83,
    prc_totMemlimit: 107,
    sim_prc_totCpuRequest: 61,
    sim_prc_totCpuLimit: 149,
    sim_prc_totMemRequest: 83,
    sim_prc_totMemlimit: 107,
    default_request_cpu: 200,
    default_limit_cpu: 500,
    default_request_memory: 250,
    default_limit_memory: 750,
    alertPercentageConsumptionResourceThreshold: 90,
    consoleUrl: 'https://console-openshift-console.apps.ocp-lab2.its4u.eu/',
    availablePodsInCurrentUsage: 108,
    availablePodsInFullWorkload: 108,
    nbrPodsForReserve: 20,
  };
  useEffect(() => {
    const transformWorkers = (workersObj) => {
      console.log("in WorkersPage where workersObj are "+workersObj);
      setWorkers(workersObj);
      setTotals(tot);
    };

    // const transformTotals = (totalsObj) => {
    //   setTotals(totalsObj);
    // };

    fetch({ url: `${properties.path.api}/nodes` }, transformWorkers);

    // fetch(
    //   {
    //     url: `${properties.path.api}/cluster`,
    //   },
    //   transformTotals
    // );
  }, [fetch]);

  let content = <React.Fragment />;
  if (error) {
    content = <React.Fragment>{error}</React.Fragment>;
  }
  if (isLoading) {
    content = <Spinner />;
  }
  if (workers.length > 0 && totals != null) {
    content = <WorkersTable workers={workers} totals={totals} />;
  }

  return (
    <React.Fragment>
      <h1>WORKERS</h1>
      {content}
    </React.Fragment>
  );
};
