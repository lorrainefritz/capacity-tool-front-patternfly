import * as React from "react";
import "./CustomWorkersNameButton.css";
import { Button } from "@patternfly/react-core";

const CustomWorkersNameButton: React.FC<{ name: string }> = (props) => {
 
  return (
    <Button className="workersNameButton">
      {props.name}
    </Button>
  );
};
export default CustomWorkersNameButton;
