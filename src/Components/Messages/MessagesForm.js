import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import uuidv4 from "uuid/v4";
import ProgressBar from "./ProgressBar";

const initialState = {
  message: "",
  loading: false,
  uploadTask: null,
  uploadState: "",
  errors: []
};
const storageRef = firebase.storage().ref();

class MessagesForm extends Component {
  state = { ...initialState };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL
      }
    };
    if (fileUrl) {
      message.image = fileUrl;
    } else {
      message.content = this.state.message;
    }
    return message;
  };

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
  uploadFile = (file, metadata) => {
    const { currentChannel, messagesRef } = this.props;
    const pathToUpload = currentChannel.id;
    const ref = messagesRef;
    const filePath = `chat/public/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            console.log("xxx");
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                console.log({ downloadUrl });
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        console.log({ done: "done" });
        this.setState({ uploadState: "done" });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err)
        });
      });
  };

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
              Channel={this.props.currentChannel}
              messagesRef={this.props.messagesRef}
              createMessage={this.createMessage}
              uploadFile={this.uploadFile}
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
          <ProgressBar
            percentUploaded={this.state.percentUploaded}
            uploadState={this.state.uploadState}
          />
        </Segment>
      </div>
    );
  }
}

export default MessagesForm;
