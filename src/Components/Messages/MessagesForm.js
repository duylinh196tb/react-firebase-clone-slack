import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
const initialState = { message: "", loading: false };

class MessagesForm extends Component {
  state = { ...initialState };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  createMessage = () => ({
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    content: this.state.message,
    user: {
      id: this.props.currentUser.uid,
      name: this.props.currentUser.displayName,
      avatar: this.props.currentUser.photoURL
    }
  });

  sendMessage = () => {
    const { messagesRef, currentChannel } = this.props;
    const { message } = this.state;

    if (message) {
      // this.setState({ loading: true });
      messagesRef
        .child(currentChannel.id)
        .push()
        .set(this.createMessage());

      this.setState({ message: "" });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") this.sendMessage();
  };

  // File Modal

  render() {
    return (
      <div ref={this.props.refFM}>
        <Segment className="message__form">
          <Input
            fluid
            name="message"
            style={{ marginBottom: "0.7em" }}
            label={<Button icon={"add"} />}
            labelPosition="left"
            placeholder="Write your message"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.message}
          />

          <Button.Group icon widths="2">
            <Button
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              onClick={this.sendMessage}
            />
            <FileModal
              Channel={this.props.Channel}
              messagesRef={this.props.messagesRef}
              trigger={handleOpen => (
                <Button
                  onClick={handleOpen}
                  color="teal"
                  content="Upload Media"
                  labelPosition="right"
                  icon="cloud upload"
                />
              )}
            />
          </Button.Group>
        </Segment>
      </div>
    );
  }
}

export default MessagesForm;
