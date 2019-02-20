import React, { Component } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from "mime-types";
import uuidv4 from "uuid/v4";
import firebase from "../../firebase";

const storageRef = firebase.storage().ref();

class FileModal extends Component {
  state = {
    visible: false,
    file: null,
    authorized: ["image/jpeg", "image/png"],
    percentUploaded: 0
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleOpen = () => {
    this.setState({ visible: true });
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    if (file !== null && this.isAuthorized(file.name)) {
      const metadata = { contentType: mime.lookup(file.name) };
      this.uploadFile(file, metadata);
    }
  };

  uploadFile = (file, metadata) => {
    // const { Channel, messagesRef } = this.props;
    // const pathToUpload = Channel.id;
    // const ref = messagesRef;
    // const filePath = `chat/public/${uuidv4()}.jpg`;
    // storageRef
    //   .child(filePath)
    //   .put(file, metadata)
    //   .on("state_changed", snap => {
    //     const percentUploaded = Math.round(
    //       (snap.bytesTransferred / snap.totalBytes) * 100
    //     );
    //   });
  };

  isAuthorized = filename =>
    this.state.authorized.includes(mime.lookup(filename));

  render() {
    return (
      <Modal
        trigger={this.props.trigger(this.handleOpen)}
        open={this.state.visible}
        onClose={this.handleClose}
      >
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input fluid label="File types: jpg, png" name="file" type="file" />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Send
          </Button>
          <Button color="red" inverted onClick={this.handleClose}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
