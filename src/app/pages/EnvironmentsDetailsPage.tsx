import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageSection, Spinner } from '@patternfly/react-core';
import { Environment } from '../models';
import { EnvironmentsToTableMappingHandler } from '../utils';
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';

export const EnvironmentsDetailsPage = () => {
  const [envDetails, setEnvDetails] = useState<Environment[]>([]);
  const { isLoading, error, sendRequest: fetch } = useHttp();
  let content = <PageSection />;

  useEffect(() => {
    const transformEnvs = (envsObj) => {
      setEnvDetails(envsObj);
    };

    fetch(
      {
        url: `${properties.path.api}/environments`,
      },
      transformEnvs
    );
  }, [fetch]);

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
  if (envDetails.length > 0) {
    content = (
      <PageSection>
        <React.Fragment>
          <EnvironmentsToTableMappingHandler environments={envDetails} />
        </React.Fragment>
      </PageSection>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
};
export default EnvironmentsDetailsPage;
