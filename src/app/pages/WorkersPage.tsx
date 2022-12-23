import * as React from 'react';
import { useState} from 'react';
import { Worker} from 'src/app/models';
import { WorkersTable } from '@app/Components/tables';
import { Button } from '@patternfly/react-core';
export const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);

  async function fetchWorkersHandler() {
    const response = await fetch('https://capacity-tool-route-capacity-tool-dev.apps.ocp-lab2.its4u.eu/api/v1/nodes');
    console.log('in workerPage after fetch nodes ' + response + ' where response status is ' + response.status);
    const workersData = await response.json();
    setWorkers(workersData);
    console.log('in workerPage after setWorkersData where workersData ' + workersData);
  }
 
  
  let content = <React.Fragment />;
  if (workers.length > 0) {
    content = <WorkersTable workers={workers} />;
  }
  return (
    <React.Fragment>
      <h1>WORKERS  </h1><Button variant = "secondary" onClick={fetchWorkersHandler}>Fetch Workers</Button>
      {content}
    </React.Fragment>
  );
};
