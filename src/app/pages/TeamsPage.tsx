import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageSection, Spinner } from '@patternfly/react-core';
import { Team } from '../models';
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';
import { TeamsToTableMappingHandler } from '../utils';

export const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const { isLoading, error, sendRequest: fetch } = useHttp();
  let content = <PageSection />;

  useEffect(() => {
    const transformTeams = (teamsObj) => {
      setTeams(teamsObj);
    };
    fetch(
      {
        url: `${properties.path.api}/teams`,
      },
      transformTeams
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
  if (teams.length > 0 && teams != null) {
    content = (
      <PageSection>
        <TeamsToTableMappingHandler teams={teams} />
      </PageSection>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
