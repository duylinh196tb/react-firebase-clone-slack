import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import Message from "./Message";
import firebase from "../../firebase";

const messagesRef = firebase.database().ref("messages");
class Messages extends Component {
  state = {
    dynamicHeight: 0,
    messages: [],
    messagesLoading: false
  };

  refHeader = React.createRef();
  refFM = React.createRef();

  componentDidMount() {
    this.setState({
      dynamicHeight: `calc(95% - ${this.refHeader.current.clientHeight}px - ${
        this.refFM.current.clientHeight
      }px)`
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { User, Channel } = this.props;
    if (nextProps.Channel.id && nextProps.Channel.id !== Channel.id && User) {
      this.setState({ messagesLoading: true, messages: [] });
      this.addListeners(nextProps.Channel.id);
    }
  }

  addListeners = channelId => {
    let loadedMessages = [];
    messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
    });
  };

  displayMessages = () => {
    const { messages } = this.state;
    return messages.map(_message => (
      <Message message={_message} user={this.props.User} />
    ));
  };

  render() {
    return (
      <>
        <MessagesHeader refHeader={this.refHeader} />
        <Segment style={{ height: this.state.dynamicHeight }}>
          <Comment.Group className="messages">
            {this.displayMessages()}
          </Comment.Group>
        </Segment>
        {/* <MessageForm /> */}
        <MessagesForm
          getHeightMessageForm={this.getHeightMessageForm}
          messagesRef={messagesRef}
          currentChannel={this.props.Channel}
          currentUser={this.props.User}
          refFM={this.refFM}
        />
      </>
    );
  }
}

export default Messages;
