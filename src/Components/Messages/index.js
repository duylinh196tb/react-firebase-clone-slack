import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import firebase from "../../firebase";

class Messages extends Component {
  render() {
    const messagesRef = firebase.database().ref("messages");
    return (
      <>
        <MessagesHeader />
        <Segment style={{ height: "75%" }}>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>
        {/* <MessageForm /> */}
        <MessagesForm messagesRef={messagesRef} />
      </>
    );
  }
}

export default Messages;
