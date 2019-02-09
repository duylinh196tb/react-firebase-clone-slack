import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { UserContext } from "../Ctx/UserContext";
class UserPanel extends Component {
  dropdownOptions = User => [
    {
      key: "user",
      text: (
        <span>
          Sign in as <strong>{User.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign out");
      });
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ User }) => (
          <Grid style={{ background: "#4c3c4c" }}>
            <Grid.Column>
              <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
                <Header inverted={true} floated={true} as="h2">
                  <Icon name="code" />
                  <Header.Content>DevChat</Header.Content>
                </Header>
                <Header inverted as="h3">
                  <Dropdown
                    trigger={
                      <span>
                        <Image src={User.photoURL} spaced="right" avatar />
                        {User.displayName}
                      </span>
                    }
                    options={this.dropdownOptions(User)}
                  />
                </Header>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        )}
      </UserContext.Consumer>
    );
  }
}

export default UserPanel;
