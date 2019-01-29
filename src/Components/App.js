import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel";
import SidePanel from "./SidePanel";
import Messages from "./Messages";
import MetaPanel from "./MetaPanel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>

        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
