import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

const { Item } = Menu;

class Channels extends Component {
  state = { channels: [] };

  render() {
    const { channels } = this.state;
    return (
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Item>
          <span>
            <Icon name="exchange" />
            CHANNELS
          </span>
          ({channels.length}) <Icon name="add" />
        </Item>
      </Menu.Menu>
    );
  }
}

export default Channels;
