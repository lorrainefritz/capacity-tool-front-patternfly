import * as React from 'react';
import { useState, useEffect } from 'react';
import { Spinner } from '@patternfly/react-core';

import { Worker, Totals } from 'src/app/models';
import { WorkersTable } from '@app/Components/tables';
// import useHttp from 'src/app/hooks/useHttp';
// import { properties } from 'src/properties';


export const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [totals, setTotals] = useState<Totals>(new Totals());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchWorkersHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://capacity-tool-route-capacity-tool-dev.apps.ocp-lab2.its4u.eu/api/v1/nodes"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const workersData = await response.json();
      setWorkers(workersData);
      console.log(workersData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function fetchClustersHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://capacity-tool-route-capacity-tool-dev.apps.ocp-lab2.its4u.eu/api/v1/cluster"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const totalsData = await response.json();
      setTotals(totalsData);
      console.log(totalsData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWorkersHandler();
    fetchClustersHandler();
  }, []);


 
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
