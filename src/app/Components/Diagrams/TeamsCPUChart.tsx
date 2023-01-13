import * as React from "react";
import { ChartBullet } from "@patternfly/react-charts";
import { Team } from "../../models/Team";

export const TeamsCPUChart: React.FC<{
  team: Team;
}> = (props) => {
  const team: Team = props.team;
  let teamname = team.teamName;
  return (
    <div style={{ height: "475px", width: "650px" }}>
      <ChartBullet
        constrainToVisibleArea
        height={250}
        labels={({ datum }) => `${datum.name}: ${datum.y}`}
        legendAllowWrap
        legendPosition="bottom-left"
        maxDomain={{ y: team.currentReqCpu }}
        name="TeamsCpuCharts"
        padding={{
          bottom: 50, // Adjusted to accommodate legend
          left: 50,
          right: 50,
          top: 100,
        }}
        primarySegmentedMeasureData={[
          { name: "CPU Current request", y: team.currentReqCpu },
        ]}
        primarySegmentedMeasureLegendData={[{ name: "CPU Current request" }]}
        title={teamname}
        titlePosition="top-left"
      />
    </div>
  );
};
