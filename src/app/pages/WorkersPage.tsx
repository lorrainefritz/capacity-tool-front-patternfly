import * as React from 'react';
import { useState, useEffect } from 'react';
import { Flex, PageSection, Spinner } from '@patternfly/react-core';
import { Worker, Totals } from '../models';
import { WorkersTable } from '../Components/Table';
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';
import {
  PercentagesCPUChart,
  PercentagesMemoryChart,
  PercentagesRequestCPUChart,
  PercentagesRequestMemoryChart,
} from '../Components/Diagrams';

export const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [totals, setTotals] = useState<Totals>(new Totals());
  const { isLoading, error, sendRequest: fetch } = useHttp();

  useEffect(() => {
    const transformWorkers = (workersObj) => {
      setWorkers(workersObj);
    };

    const transformTotals = (totalsObj) => {
      setTotals(totalsObj);
    };

    fetch({ url: `${properties.path.api}/nodes` }, transformWorkers);

    fetch(
      {
        url: `${properties.path.api}/cluster`,
      },
      transformTotals
    );
  }, [fetch]);

  let content = <PageSection />;
  if (error) {
    content = (
      <PageSection>
        <React.Fragment>Oops an error occured +{error}</React.Fragment>
      </PageSection>
    );
  }
  if (isLoading) {
    content = (
      <PageSection>
        <div style={{ margin: '0', position: 'absolute', top: '50%', left: '50%' }}>
          <Spinner isSVG size="xl" />
        </div>
      </PageSection>
    );
  }
  if (workers.length > 0 && totals != null) {
    content = (
      <React.Fragment>
        <PageSection>
          <WorkersTable workers={workers} totals={totals} />{' '}
          <Flex style={{ border: '1px solid RGB(231, 231, 231)' }} justifyContent={{ default: 'justifyContentCenter' }}>
            <PercentagesCPUChart totals={totals} />
            <PercentagesMemoryChart totals={totals} />
            <PercentagesRequestCPUChart totals={totals} />
            <PercentagesRequestMemoryChart totals={totals} />
          </Flex>
        </PageSection>
      </React.Fragment>
    );
  }
  if (workers.length == 0 && totals == null && isLoading == false) {
    content = (
      <PageSection>
        <h1>No workers to display</h1>
      </PageSection>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
