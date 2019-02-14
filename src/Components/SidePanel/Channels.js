import React, { Component } from "react";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
  Message
} from "semantic-ui-react";
import { isFormEmpty } from "../../utils/helper/verifyValue";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../redux/actions/channel";
const { Item } = Menu;

const initialState = {
  modal: false,
  channelDetails: "",
  channelName: "",
  errors: "",
  firstLoad: true
};

class Channels extends Component {
  state = {
    ...initialState,
    channels: [],
    channelsRef: firebase.database().ref("channels")
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => {
        // set first channel
        this.state.firstLoad &&
          loadedChannels.length > 0 &&
          this.props.setCurrentChannel(loadedChannels[0]) &&
          this.setState({ firstLoad: false });
      });
    });
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(_channel => (
      <Item
        key={_channel.id}
        style={{ opacity: 0.7 }}
        onClick={() => this.props.setCurrentChannel(_channel)}
        name={_channel.name}
        active={_channel.id === this.props.Channel.currentChannel.id}
      >
        # {_channel.name}
      </Item>
    ));

  closeModal = () => this.setState({ ...initialState });

  openModal = () => this.setState({ modal: true });

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  isFormValid = obj => {
    const checkForm = isFormEmpty(obj);

    if (checkForm !== true)
      return this.setState({
        errors: "Please fulfill fields"
      });

    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { channelDetails, channels, modal, channelName } = this.state;
    if (!this.isFormValid({ channelName, channelDetails })) return;
    this.setState({ errors: "", loading: true });
    this.addChanel();
  };

  addChanel = () => {
    const { channelsRef, channelName, channelDetails } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: this.props.User.displayName,
        avatar: this.props.User.photoURL
      }
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.closeModal();
        console.log("Channel added");
      })
      .catch(err => console.error(err));
  };

  render() {
    const { channels, modal, channelDetails, channelName, errors } = this.state;
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
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Model */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  name="channelName"
                  onChange={this.handleChange}
                  label="Name of channel"
                  value={channelName}
                  required={true}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  name="channelDetails"
                  onChange={this.handleChange}
                  value={channelDetails}
                  label="About The Channel"
                  required={true}
                />
              </Form.Field>
            </Form>
            {errors && (
              <Message color="red">
                <p>{errors}</p>
              </Message>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default connect(
  state => ({
    Channel: state.Channel
  }),
  { setCurrentChannel }
)(Channels);
