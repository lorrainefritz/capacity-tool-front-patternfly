import * as React from 'react';
import { useState, useEffect } from 'react';
import { Flex, PageSection, Spinner } from '@patternfly/react-core';
import { Environment, Totals } from '../models';
import { EnvironmentsSummaryTable } from 'src/app/Components/tables/EnvironmentsSummaryTable';
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';
import { EnvironmentsPercentagesCPUChart, EnvironmentsPercentagesMemoryChart } from '../Components/Diagrams';

export const EnvironmentsSummaryPage = () => {
  const [envSummary, setEnvSummary] = useState<Environment[]>([]);
  const [totals, setTotals] = useState<Totals>(new Totals());
  const { isLoading, error, sendRequest: fetch } = useHttp();

  useEffect(() => {
    const transformEnvironments = (environmentsObj) => {
      setEnvSummary(environmentsObj);
    };

    const transformTotals = (totalsObj) => {
      setTotals(totalsObj);
    };

    fetch(
      {
        url: `${properties.path.api}/environments`,
      },
      transformEnvironments
    );

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
  if (envSummary.length > 0 && totals != null) {
    content = (
      <React.Fragment>
        <PageSection>
          <EnvironmentsSummaryTable environments={envSummary} totals={totals} />{' '}
          <Flex style={{ border: '1px solid RGB(231, 231, 231)' }} justifyContent={{ default: 'justifyContentCenter' }}>
            <EnvironmentsPercentagesCPUChart totals={totals} />
            <EnvironmentsPercentagesMemoryChart totals={totals} />
          </Flex>
        </PageSection>
      </React.Fragment>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
export default EnvironmentsSummaryPage;
