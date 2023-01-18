import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageSection, Spinner } from '@patternfly/react-core';
import { Department } from '../models';
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';
import { DepartmentsToTableMappingHandler } from '../utils';

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { isLoading, error, sendRequest: fetch } = useHttp();
  let content = <PageSection />;

  useEffect(() => {
    const transformDepartments = (departmentsObj) => {
      setDepartments(departmentsObj);
    };

    fetch(
      {
        url: `${properties.path.api}/valueChains`,
      },
      transformDepartments
    );
  }, [fetch]);

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
  if (departments.length > 0 && departments != null) {
    content = (
      <PageSection>
        <DepartmentsToTableMappingHandler departments={departments} />
      </PageSection>
    );
  }
  if (departments.length == 0 && isLoading == false) {
    content = (
      <PageSection>
        <h1>No departments to display</h1>
      </PageSection>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
