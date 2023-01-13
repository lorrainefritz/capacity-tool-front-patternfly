import * as React from "react";
import { Tabs, Tab, TabTitleText } from "@patternfly/react-core";
import { Environment } from "../models";
import { EnvironmentsDetailsTable } from "../Components/tables/EnvironmentsDetailsTable";

export const EnvironmentsToTableMappingHandler: React.FC<{
  environments: Environment[];
}> = (props) => {
  const envList = props.environments;

  return (
    <React.Fragment>
      <Tabs defaultActiveKey={0}>
        {envList.map((enviro) => (
          <Tab
            key={enviro.name}
            eventKey={envList.indexOf(enviro)}
            title={<TabTitleText>{enviro.name}</TabTitleText>}
          >
            <EnvironmentsDetailsTable
              namespaces={enviro.namespaces}
              maxReplicas={enviro.defaultMaxReplicas}
            />
          </Tab>
        ))}
      </Tabs>
    </React.Fragment>
  );
};
