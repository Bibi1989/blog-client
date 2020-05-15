import React from "react";
import { Tab, Input } from "semantic-ui-react";
import Users from "./Users";

const panes = [
  {
    menuItem: "Users",
    render: () => <Tab.Pane></Tab.Pane>,
  },
];

const FirstLayout = () => {
  return <Tab className='layout' panes={panes} />;
};

export default FirstLayout;
