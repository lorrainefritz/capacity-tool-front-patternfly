import * as React from "react";
import {Department} from "../../models";
import GenericDepartmentsEnvironmentsTeamsTables from "./GenericDepartmentsEnvironmentsTeamsTables";

export const DepartmentsTable: React.FC<{
  department: Department;
}> = (props) => {
  const department: Department = props.department;
  return <React.Fragment>
      <GenericDepartmentsEnvironmentsTeamsTables items={department.namespaces} maxReplicas={0} ></GenericDepartmentsEnvironmentsTeamsTables>
  </React.Fragment>;
};
