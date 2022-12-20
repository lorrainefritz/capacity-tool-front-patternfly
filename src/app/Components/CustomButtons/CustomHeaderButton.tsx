import * as React from 'react';
import { NavLink } from "react-router-dom";
import './CustomHeaderButton.css'
import { useTranslation } from "react-i18next";
import {
  Button,
} from "@patternfly/react-core";


const CustomHeaderButton : React.FC<{title: string, navigationTo: string}> = (props) => {
    const {t} = useTranslation();
    return (
        < Button className='headerNavButton' variant="tertiary">
        <NavLink
          to={props.navigationTo}
          style={({ isActive }) => ({
            color: isActive ? "#f49701" : "#d6d6d6"})}>
          {t(props.title)}
        </NavLink>
      </Button>
    );
}
export default CustomHeaderButton;