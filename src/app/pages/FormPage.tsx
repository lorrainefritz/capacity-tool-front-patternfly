import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageSection, Spinner, Tab, Tabs, TabTitleText } from '@patternfly/react-core';
import { ProjectsToForm } from '../models/Form/ProjectsToForm';
import useHttp from '../hooks/useHttp';
import { EnviroForm } from '@app/Components/Form';
import { EnviroToForm } from '@app/models/Form/EnviroToForm';
import { PlaceHolderToForm } from '@app/models/Form/PlaceholderToForm';

export const FormPage = () => {
  const [projet, setProjet] = useState<ProjectsToForm>(new ProjectsToForm());
  const { isLoading, error, sendRequest: fetch } = useHttp();
 
const DUMMY: ProjectsToForm = {
    "project_Id": "formation",
     "gitUrl": "https://github.com/kevbrain/formation.git",
     "owner": "its4u",
     "team": "devops",
     "valueChain": "it",
     "description": "",
    "environments": [
         {
             "environment": "formation-dev",
            "projectId": "formation",
            "argoEnvId": "lab.its4u.eu-dev",
            "releaseTag": null,
           "argoServer": null,
           "argoUser": null,
            "argoPassword": null,
            "argoProj": null,
             "gitOpsRepo": "https://github.com/kevbrain/ocp-gitops.git",
             "gitOpsAppsRepo": "https://github.com/kevbrain/ocp-gitops-apps-deploy.git",
             "placeholders": [
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "actuator.password"
                     },
                     "value": "password",
                     "type": "secret"
                 },
                 {
                     "placeHolderId": {
                        "environment": "formation-dev",
                         "key": "app-actuator.port"
                     },
                     "value": "8080",
                     "type": ""
                },
               {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "app-container.port"
                     },
                     "value": "8080",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "app-limit.cpu"
                     },
                     "value": "500m",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "app-limit.memory"
                     },
                     "value": "750Mi",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "app-request.cpu"
                     },
                     "value": "200m",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "app-request.memory"
                     },
                     "value": "250Mi",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "app-version"
                     },
                     "value": "0.0.1-SNAPSHOT",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "cluster-suffix"
                     },
                     "value": "apps.ocp-lab.its4u.eu",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "ocp-cluster.registry"
                     },
                     "value": "image-registry.openshift-image-registry.svc.cluster.local:5000",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "ocp.environment"
                     },
                     "value": "dev",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "ocp-namespace"
                     },
                     "value": "formation-dev",
                     "type": ""
                 },
                 {
                     "placeHolderId": {
                         "environment": "formation-dev",
                         "key": "ocp.replicas"
                     },
                     "value": "1",
                     "type": ""
                 }
             ],
             "placeHoldersMap": {
                 "ocpclusterregistry": "image-registry.openshift-image-registry.svc.cluster.local:5000",
                 "ocpenvironment": "dev",
                 "appactuatorport": "8080",
                 "apprequestmemory": "250Mi",
                 "apprequestcpu": "200m",
                 "appversion": "0.0.1-SNAPSHOT",
                 "ocpreplicas": "1",
                 "applimitmemory": "750Mi",
                 "applimitcpu": "500m",
                 "actuatorpassword": "password",
                 "ocpnamespace": "formation-dev",
                 "clustersuffix": "apps.ocp-lab.its4u.eu",
                 "appcontainerport": "8080"
             }
         },
         {
             "environment": "formation-tst",
             "projectId": "formation",
             "argoEnvId": "lab.its4u.eu-dev",
             "releaseTag": null,
             "argoServer": null,
             "argoUser": null,
             "argoPassword": null,
             "argoProj": null,
                          "gitOpsRepo": "https://github.com/kevbrain/ocp-gitops.git",
             "gitOpsAppsRepo": "https://github.com/kevbrain/ocp-gitops-apps-deploy.git",
             "placeholders": [],
             "placeHoldersMap": {
               "ocpclusterregistry": "image-registry.openshift-image-registry.svc.cluster.local:5000",
               "ocpenvironment": "dev",
               "appactuatorport": "8080",
               "apprequestmemory": "250Mi",
               "apprequestcpu": "200m",
               "appversion": "0.0.1-SNAPSHOT",
               "ocpreplicas": "1",
               "applimitmemory": "750Mi",
               "applimitcpu": "500m",
               "actuatorpassword": "password",
               "ocpnamespace": "formation-dev",
               "clustersuffix": "apps.ocp-lab.its4u.eu",
               "appcontainerport": "8080"
             }
         },
         {
             "environment": "formation-int",
             "projectId": "formation",
             "argoEnvId": "lab.its4u.eu-dev",
             "releaseTag": null,
             "argoServer": null,
             "argoUser": null,
             "argoPassword": null,
             "argoProj": null,
             "gitOpsRepo": "https://github.com/kevbrain/ocp-gitops.git",
             "gitOpsAppsRepo": "https://github.com/kevbrain/ocp-gitops-apps-deploy.git",
             "placeholders": [],
             "placeHoldersMap": {
               "ocpclusterregistry": "image-registry.openshift-image-registry.svc.cluster.local:5000",
               "ocpenvironment": "dev",
               "appactuatorport": "8080",
               "apprequestmemory": "250Mi",
               "apprequestcpu": "200m",
               "appversion": "0.0.1-SNAPSHOT",
               "ocpreplicas": "1",
               "applimitmemory": "750Mi",
               "applimitcpu": "500m",
               "actuatorpassword": "password",
               "ocpnamespace": "formation-dev",
               "clustersuffix": "apps.ocp-lab.its4u.eu",
               "appcontainerport": "8080"
             }
         }
     ],
     "versions": [
         {
             "versionsid": {
                 "projectId": "formation",
                 "version": "0.0.1-SNAPSHOT"
             }
         }
     ]
 }




//    useEffect(() => {
//      const transformProjets = (projetsObj:ProjectsToForm) => {
//        setProjet(projetsObj);
//        console.table(projetsObj);
//     };

//      fetch({ url: 'https://placeholdermanager-route-placeholdermanager-dev.apps.ocp-lab2.its4u.eu/projects/get/formation' }, transformProjets);
//    }, [fetch]);



  let content = <PageSection />;
  //   if (error) {
  //     content = (
  //       <PageSection>
  //         <React.Fragment>Oops an error occured +{error}</React.Fragment>
  //       </PageSection>
  //     );
  //   }
  //   if (isLoading) {
  //     content = (
  //       <PageSection>
  //         <div style={{ margin: '0', position: 'absolute', top: '50%', left: '50%' }}>
  //           <Spinner isSVG size="xl" />
  //         </div>
  //       </PageSection>
  //     );
  //   }

  //   if (projets.length > 0 ) {


  content = (
    <React.Fragment>
      <PageSection>
      <div>
      <EnviroForm gitTitle={DUMMY.gitUrl} environments={DUMMY.environments} /> 
      {/* <EnviroForm gitTitle={projet.gitUrl} environments={projet.environments} />  */}
    </div>
        {/* <Tabs defaultActiveKey={0}>
          {projets.map((projet) => (
            <Tab title={<TabTitleText>{projet.description}</TabTitleText>} eventKey={projets.indexOf(projet)}>
              <EnviroForm gitTitle={projet.gitUrl} environments={projet.environments} />
            </Tab>
          ))}
        </Tabs> */}
      </PageSection>
    </React.Fragment>
  );
  //   }
  //   if (projets.length == 0 && projets == null && isLoading == false) {
  //     content = (
  //       <PageSection>
  //         <h1>No projets to display</h1>
  //       </PageSection>
  //     );
  //     console.table(projets)
  //   }

  return <React.Fragment>{content}</React.Fragment>;
};
