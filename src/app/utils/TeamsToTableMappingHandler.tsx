import * as React from "react";
import { Team } from "../models";
import { Tabs, Tab, TabTitleText, Flex } from "@patternfly/react-core";
import { TeamsCPUChart } from "../Components/Diagrams";
import { TeamsTable } from "../Components/Table";

export const TeamsToTableMappingHandler: React.FC<{
  teams: Team[];
}> = (props) => {
  const teamList = props.teams;

  return (
    <React.Fragment>
      <Tabs defaultActiveKey={0}>
        {teamList.map((team: Team) => (
          <Tab
            key={team.teamName}
            eventKey={teamList.indexOf(team)}
            title={<TabTitleText>{team.teamName}</TabTitleText>}
          >
            <TeamsTable team={team} />
            <Flex
              style={{ border: "1px solid RGB(231, 231, 231)" }}
              justifyContent={{ default: "justifyContentCenter" }}
            >
              <TeamsCPUChart team={team} />
            </Flex>
          </Tab>
        ))}
      </Tabs>
    </React.Fragment>
  );
};
