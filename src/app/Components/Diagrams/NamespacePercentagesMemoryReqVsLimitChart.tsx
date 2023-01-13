import * as React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
  ChartDonutThreshold,
  ChartDonutUtilization,
  ChartThemeColor,
} from "@patternfly/react-charts";
import { Namespace } from "../../models";

export const NamespacePercentagesMemoryReqVsLimitChart: React.FC<{
  namespace: Namespace;
}> = (props) => {
  const namespace = props.namespace;
  const percentageMemoryReqVsLimit = namespace.percentageLimitMemory;
  return (
    <div style={{ height: "350px", width: "230px" }}>
      <ChartDonutThreshold
        constrainToVisibleArea
        data={[
          { x: "Warning at 60%", y: 60 },
          { x: "Danger at 90%", y: 90 },
        ]}
        height={350}
        labels={({ datum }) => (datum.x ? datum.x : null)}
        name="NamespacePercentagesMemoryReqVsLimitChart"
        padding={{
          bottom: 125, // Adjusted to accommodate legend
          left: 20,
          right: 20,
          top: 20,
        }}
        width={230}
      >
        <ChartDonutUtilization
          data={{ x: "CPU", y: percentageMemoryReqVsLimit }}
          labels={({ datum }) => (datum.x ? `${datum.x}: ${datum.y}%` : null)}
          legendData={[
            { name: `Memory[Req/Lim]%: ` + percentageMemoryReqVsLimit + ` %` },
            { name: "Warning threshold at 60%" },
            { name: "Danger threshold at 90%" },
          ]}
          legendOrientation="vertical"
          legendPosition="bottom"
          subTitle="of 100 %"
          title={percentageMemoryReqVsLimit + `%`}
          themeColor={ChartThemeColor.blue}
          thresholds={[{ value: 60 }, { value: 90 }]}
        />
      </ChartDonutThreshold>
    </div>
  );
};
