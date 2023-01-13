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
  if (departments.length > 0 && departments != null) {
    content = (
      <PageSection>
        <DepartmentsToTableMappingHandler departments={departments} />
      </PageSection>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
