import * as React from "react";
import { Tabs, Tab, TabTitleText } from "@patternfly/react-core";
import { DepartmentsTable } from "src/app/Components/tables/DepartmentsTable";
import { Department } from "../models";

export const DepartmentsToTableMappingHandler: React.FC<{
  departments: Department[];
}> = (props) => {
  const depList = props.departments;

  return (
    <React.Fragment>
      <Tabs defaultActiveKey={0}>
        {depList.map((department) => (
          <Tab
            key={department.vcName}
            eventKey={depList.indexOf(department)}
            title={<TabTitleText>{department.vcName}</TabTitleText>}
          >
            <DepartmentsTable department={department} />
          </Tab>
        ))}
      </Tabs>
    </React.Fragment>
  );
};
