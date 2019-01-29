import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
class UserPanel extends Component {
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Sign in as <strong>User</strong>
        </span>
      ),
      disable: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span>Sign Out</span>
    }
  ];

  render() {
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>
          </Grid.Row>
          <Header inverted as="h3">
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
