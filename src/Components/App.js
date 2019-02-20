import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel";
import SidePanel from "./SidePanel";
import Messages from "./Messages";
import MetaPanel from "./MetaPanel";
import UserProvider from "./Ctx/UserContext";
import { connect } from "react-redux";

import "./App.css";

const App = ({ User, Channel }) => {
  return (
    <UserProvider>
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages User={User} Channel={Channel} />
        </Grid.Column>

        {/* <Grid.Column width={4}>
            <MetaPanel />
          </Grid.Column> */}
      </Grid>
    </UserProvider>
  );
};

export default connect(
  state => ({
    User: state.User.currentUser,
    Channel: state.Channel.currentChannel
  }),
  {}
)(App);
