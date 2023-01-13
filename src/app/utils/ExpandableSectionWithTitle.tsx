import * as React from "react";
import { Card, CardBody, ExpandableSection } from "@patternfly/react-core";

export const ExpandableSectionWithTitle: React.FC<{
  title: string;
  children;
}> = (props) => {
  return (
    <Card>
      <ExpandableSection toggleText={props.title}>
        <CardBody>{props.children}</CardBody>
      </ExpandableSection>
    </Card>
  );
};
