import React, { Component } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from "mime-types";
// import ProgressBar from "./ProgressBar";

class FileModal extends Component {
  state = {
    visible: false,
    file: null,
    authorized: ["image/jpeg", "image/png"]
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
      this.props.uploadFile(file, metadata);
      this.setState({
        visible: false,
        file: null
      });
    }
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
          <Input
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
            onChange={this.addFile}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.sendFile}>
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
