import * as React from "react";
import { Team } from "../../models";
import GenericDepartmentsEnvironmentsTeamsTables from "./GenericDepartmentsEnvironmentsTeamsTables";

export const TeamsTable: React.FC<{
  team: Team;
}> = (props) => {
  const team: Team = props.team;
  return (
    <React.Fragment>
      <GenericDepartmentsEnvironmentsTeamsTables
        items={team.namespaces}
        maxReplicas={0}
      ></GenericDepartmentsEnvironmentsTeamsTables>
    </React.Fragment>
  );
};
