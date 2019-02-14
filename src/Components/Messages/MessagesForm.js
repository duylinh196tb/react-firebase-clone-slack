import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";

const initialState = { message: "", loading: false };

class MessagesForm extends Component {
  state = { ...initialState };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  sendMessage = () => {
    console.log("Send message");
  };

  handleKeyPress = e => {
    if (e.key === "Enter") this.sendMessage();
  };

  render() {
    return (
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
        />

        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessagesForm;
