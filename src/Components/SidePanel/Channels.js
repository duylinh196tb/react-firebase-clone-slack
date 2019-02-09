import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

const { Item } = Menu;

class Channels extends Component {
  state = { channels: [], modal: false, channelDetails: "", channelName: "" };

  closeModal = () => this.setState({ modal: false });

  openModal = () => this.setState({ modal: true });

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { channels, modal, channelDetails, channelName } = this.state;
    return (
      <>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Item>
            <span>
              <Icon name="exchange" />
              CHANNELS
            </span>
            ({channels.length})
            <Icon
              name="add"
              onClick={this.openModal}
              style={{ cursor: "pointer" }}
            />
          </Item>
        </Menu.Menu>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  name="channelName"
                  onChange={this.handleChange}
                  label="Name of channel"
                  value={channelName}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  name="channelDetails"
                  onChange={this.handleChange}
                  value={channelDetails}
                  label="About the Channel"
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default Channels;
