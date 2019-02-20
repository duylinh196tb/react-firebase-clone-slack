import React, { Component } from "react";
import { connect } from "react-redux";

export const UserContext = React.createContext();

class UserProvider extends Component {
  render() {
    return (
      <UserContext.Provider
        value={{
          User: this.props.User,
          Channel: this.props.Channel
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default connect(
  state => ({
    User: state.User.currentUser,
    Channel: state.Channel.currentChannel
  }),
  {}
)(UserProvider);
