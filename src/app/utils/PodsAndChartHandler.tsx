import * as React from "react";
import { Namespace } from "../models";
import {
  NamespacePercentagesCPUReqVsLimitChart,
  NamespacePercentagesMemoryReqVsLimitChart,
} from "../Components/Diagrams";
import { NamespaceCPUChart } from "../Components/Diagrams";
import { NamespaceMemoryChart } from "../Components/Diagrams";
import { PodsTable } from "src/app/Components/tables/PodsTable";

export const PodsAndChartHandler: React.FC<{
  namespace: Namespace;
}> = (props) => {
  const namespace = props.namespace;
  return (
    <React.Fragment>
      {namespace.podListByNamespace.length > 0 && (
        <div
          style={{
            display: "flex",
          }}
        >
          <PodsTable pods={namespace.podListByNamespace} />
          <div>
            <NamespaceCPUChart namespace={namespace} />
            <NamespaceMemoryChart namespace={namespace} />
          </div>
          <div>
            <NamespacePercentagesCPUReqVsLimitChart namespace={namespace} />
            <NamespacePercentagesMemoryReqVsLimitChart namespace={namespace} />
          </div>
        </div>
      )}
      {namespace.podListByNamespace.length<=0  && (<div>No Pod for this namespace</div>)}
    </React.Fragment>
  );
};
