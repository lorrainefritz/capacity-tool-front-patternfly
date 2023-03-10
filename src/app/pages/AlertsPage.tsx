import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageSection, Spinner } from '@patternfly/react-core';
import { Alert } from '../models';
import { PodsIntempestivRestartTable } from '../Components/Table/AlertTables';
import { PodsWithHighCpuConsumptionTable } from '../Components/Table/AlertTables';
import { PodsWithHighMemoryConsumptionTable } from '../Components/Table/AlertTables';
import { ProjectsWithoutLimitsOrQuotasTable } from '../Components/Table/AlertTables';
import useHttp from '../hooks/useHttp';
import { properties } from 'src/properties';
import { ExpandableSectionWithTitle } from '../utils';

export const AlertsPage = () => {
  const [projectsWithoutLimits, setProjectsWithoutLimits] = useState<Alert[]>([]);
  const [projectsWithoutQuotas, setProjectsWithoutQuotas] = useState<Alert[]>([]);
  const [podsWitIntempestivRestart, setPodsWitIntempestivRestart] = useState<Alert[]>([]);
  const [podsWithHighCpuConsumption, setPodsWithHighCpuConsumption] = useState<Alert[]>([]);
  const [podsWithHighMemConsumption, setPodsWithHighMemConsumption] = useState<Alert[]>([]);

  const { isLoading, error, sendRequest: fetch } = useHttp();

  useEffect(() => {
    const transformProjectsWithoutLimits = (projectsWithoutLimitObj) => {
      setProjectsWithoutLimits(projectsWithoutLimitObj);
    };

    const transformProjectsWithoutQuotas = (projectsWithoutLimitQuotasObj) => {
      setProjectsWithoutQuotas(projectsWithoutLimitQuotasObj);
    };

    const transformPodsWithRestarts = (podsWithRestartObj) => {
      setPodsWitIntempestivRestart(podsWithRestartObj);
    };

    const transformPodsWithHighCpu = (podsWithHighCpuConsumptionObj) => {
      setPodsWithHighCpuConsumption(podsWithHighCpuConsumptionObj);
    };

    const transformPodsWithHighMemory = (podsWithHighMemoryObj) => {
      setPodsWithHighMemConsumption(podsWithHighMemoryObj);
    };

    fetch(
      {
        url: `${properties.path.api}/alerts/podwithoutLimits`,
      },
      transformProjectsWithoutLimits
    );

    fetch(
      {
        url: `${properties.path.api}/alerts/podwithoutQuotas`,
      },
      transformProjectsWithoutQuotas
    );
    fetch(
      {
        url: `${properties.path.api}/alerts/podRestarts`,
      },
      transformPodsWithRestarts
    );

    fetch(
      {
        url: `${properties.path.api}/alerts/podsHightCpu`,
      },
      transformPodsWithHighCpu
    );
    fetch(
      {
        url: `${properties.path.api}/alerts/podHightMemory`,
      },
      transformPodsWithHighMemory
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
  } else {
    content = (
      <PageSection>
        <React.Fragment>
          <ExpandableSectionWithTitle title="Projects without Default limits">
            <ProjectsWithoutLimitsOrQuotasTable alerts={projectsWithoutLimits} />
          </ExpandableSectionWithTitle>

          <ExpandableSectionWithTitle title="Projects without Quotas">
            <ProjectsWithoutLimitsOrQuotasTable alerts={projectsWithoutQuotas} />
          </ExpandableSectionWithTitle>

          <ExpandableSectionWithTitle title="Pods Wit Intempestive Restart">
            <PodsIntempestivRestartTable alerts={podsWitIntempestivRestart} />
          </ExpandableSectionWithTitle>

          <ExpandableSectionWithTitle title="Pods With High Cpu Consumption">
            <PodsWithHighCpuConsumptionTable namespaceShortAlerts={podsWithHighCpuConsumption} />
          </ExpandableSectionWithTitle>

          <ExpandableSectionWithTitle title="Pods With High Mem Consumption">
            <PodsWithHighMemoryConsumptionTable namespaceShortAlerts={podsWithHighMemConsumption} />
          </ExpandableSectionWithTitle>
        </React.Fragment>
      </PageSection>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
