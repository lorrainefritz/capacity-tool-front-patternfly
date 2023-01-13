import * as React from "react";
import { ChartBullet } from "@patternfly/react-charts";
import { Namespace } from "../../models";

export const NamespaceCPUChart: React.FC<{
  namespace: Namespace;
}> = (props) => {
  const namespace: Namespace = props.namespace;
  const name = namespace.name;
  const currentCpu = namespace.current_cpu;
  const requestsCpu = namespace.requests_cpu;
  const limitCpu = namespace.limits_cpu;
  const limitAbscisse = Math.max(currentCpu, requestsCpu, limitCpu) + 100; // mandatory because maxdomain don't tolerate limitCpu even with as number

  return (
    <React.Fragment>
      <div style={{ height: "275px", width: "450px" }}>
        <ChartBullet
          comparativeWarningMeasureData={[
            { name: "limit CPU", y: limitCpu as number },
          ]}
          comparativeWarningMeasureLegendData={[
            { name: "limit CPU : " + limitCpu },
          ]}
          legendAllowWrap
          legendPosition="bottom-left"
          constrainToVisibleArea
          height={250}
          labels={({ datum }) => `${datum.name}: ${datum.y}`}
          minDomain={limitAbscisse}
          name="NamespaceCPUChart"
          padding={{
            bottom: 50, // Adjusted to accommodate legend
            left: 50,
            right: 50,
            top: 100,
          }}
          primarySegmentedMeasureData={[
            { name: "Request CPU ", x: 1, y: requestsCpu as number },
            { name: "Current CPU", x: 1, y: currentCpu as number },
          ]}
          primarySegmentedMeasureLegendData={[
            { name: "Request CPU : " + requestsCpu },
            { name: "Current CPU : " + currentCpu },
          ]}
          qualitativeRangeData={[
            { name: "limitCPU", x: 1, y: limitCpu as number },
          ]}
          title={"CPU " + name}
          titlePosition="top-left"
        />
      </div>
    </React.Fragment>
  );
};
