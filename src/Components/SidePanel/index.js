import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import { UserContext } from "../Ctx/UserContext";

class SidePanel extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ User }) => (
          <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
          >
            <UserPanel User={User} />
            <Channels User={User} />
          </Menu>
        )}
      </UserContext.Consumer>
    );
  }
}

export default SidePanel;
