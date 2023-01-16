import * as React from 'react';
import { useState, useEffect } from 'react';
import { Flex, PageSection, Spinner } from '@patternfly/react-core';
import { Worker, Totals } from '../models';
import { WorkersTable } from '../Components/Table'
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';
import { PercentagesCPUChart, PercentagesMemoryChart, PercentagesRequestCPUChart, PercentagesRequestMemoryChart } from '../Components/Diagrams';

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
        <React.Fragment>{error}</React.Fragment>
      </PageSection>
    );
  }
  if (isLoading) {
    content = (
      <PageSection>
        <Spinner />
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

  return <React.Fragment>{content}</React.Fragment>;
};
