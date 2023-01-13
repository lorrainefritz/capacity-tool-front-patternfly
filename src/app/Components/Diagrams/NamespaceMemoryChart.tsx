import * as React from "react";
import { ChartBullet } from "@patternfly/react-charts";
import { Namespace } from "../../models/Namespace";

export const NamespaceMemoryChart: React.FC<{
  namespace: Namespace;
}> = (props) => {
  const namespace: Namespace = props.namespace;
  const name = namespace.name;
  const currentMemory = namespace.current_memory;
  const requestsMemory = namespace.requests_memory;
  const limitMemory: number = namespace.limits_memory;
  const limitAbscisse =
    Math.max(currentMemory, requestsMemory, limitMemory) + 100; // mandatory because maxdomain don't tolerate limitCpu even with as number

  return (
    <div style={{ height: "275px", width: "450px" }}>
      <ChartBullet
        comparativeWarningMeasureData={[
          { name: "limit Memory", y: limitMemory },
        ]}
        comparativeWarningMeasureLegendData={[
          { name: "limit Memory : " + limitMemory },
        ]}
        constrainToVisibleArea
        height={250}
        labels={({ datum }) => `${datum.name}: ${datum.y}`}
        legendAllowWrap
        legendPosition="bottom-left"
        maxDomain={{ y: limitAbscisse }}
        name="NamespaceMemoryChart"
        padding={{
          bottom: 50, // Adjusted to accommodate legend
          left: 50,
          right: 50,
          top: 100,
        }}
        primarySegmentedMeasureData={[
          { name: "Request Memory", y: requestsMemory as number },
          { name: "Current Memory", y: currentMemory as number },
        ]}
        primarySegmentedMeasureLegendData={[
          { name: "Request Memory : " + requestsMemory },
          { name: "Current Memory : " + currentMemory },
        ]}
        qualitativeRangeData={[
          { name: "limitMemory", x: 1, y: limitMemory as number },
        ]}
        title={"Memory " + name}
        titlePosition="top-left"
      />
    </div>
  );
};
