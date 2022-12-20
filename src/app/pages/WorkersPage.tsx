import * as React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "@patternfly/react-core";

import {Worker,Totals} from "src/app/models";
import {WorkersTable }from "src/app/Components/Tables";
import useHttp from "src/app/hooks/useHttp";
import { properties } from "src/properties";

export const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [totals, setTotals] = useState<Totals>(new Totals());

  const { isLoading, error, sendRequest: fetch } = useHttp();

  useEffect(() => {
    const transformWorkers = (workersObj) => {
      setWorkers(workersObj);
    };

    const transformTotals = (totalsObj) => {
      setTotals(totalsObj);
    };

    fetch({ url: `${properties.path.api}/nodes` }, transformWorkers);

    fetch(
      {
        url: `${properties.path.api}/cluster`,
      },
      transformTotals
    );
  }, [fetch]);

  let content = <React.Fragment />;
  if (error) {
    content = <React.Fragment>{error}</React.Fragment>;
  }
  if (isLoading) {
    content = <Spinner/>;
  }
  if (workers.length > 0 && totals != null) {
    content = <WorkersTable workers={workers} totals={totals} />;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

