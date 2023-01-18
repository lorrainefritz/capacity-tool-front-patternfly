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
        <React.Fragment>Oops an error occured + {error}</React.Fragment>
      </PageSection>
    );
  }
  if (isLoading) {
    content = (
      <PageSection>
        <div style={{ margin: '0', position: 'absolute', top: '50%', left: '50%' }}>
          <Spinner isSVG size="xl"/>
        </div>
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
  if ( envDetails.length == 0 && isLoading== false )  {
    content = (
    <PageSection>
      <h1>No environments to display</h1>
    </PageSection>)
  }
  return <React.Fragment>{content}</React.Fragment>;
};
export default EnvironmentsDetailsPage;
