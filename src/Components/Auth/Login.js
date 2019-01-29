import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import {
  isFormEmpty,
  verifyEmail,
  verifyPassword
} from "../../utils/helper/verifyValue";
import { Link } from "react-router-dom";
import "../App.css";
import firebase from "../../firebase";

const optionFormInput = [
  {
    name: "email",
    icon: "mail",
    placeholder: "Email address",
    type: "email"
  },
  {
    name: "password",
    icon: "lock",
    placeholder: "Password",
    type: "password"
  }
];

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      message: "",
      list: []
    },
    loading: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  isFormValid = () => {
    const { email, password } = this.state;
    const checkForm = isFormEmpty({
      email,
      password
    });

    if (checkForm !== true)
      return this.setState({
        errors: {
          message: "Please fulfill fields",
          list: [...checkForm]
        }
      });

    if (!verifyEmail(email))
      return this.setState({
        errors: { message: "Email is invalid", list: ["email"] }
      });

    const checkPW = verifyPassword(password);
    if (!checkPW)
      return this.setState({
        errors: { message: "Password invalid", list: ["password"] }
      });
    if (checkPW === 1)
      return this.setState({
        errors: {
          message: "Password have length greet than 6",
          list: ["password"]
        }
      });
    return true;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!this.isFormValid()) return;
    this.setState({ errors: { message: "", list: [] }, loading: true });
    try {
      const signedInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log({ signedInUser });
    } catch (error) {
      this.setState({
        errors: { message: error.message, list: [] },
        loading: false
      });
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const { errors, loading } = this.state;

    return (
      <Grid verticalAlign="middle" textAlign="center" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login for DevChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              {optionFormInput.map(
                ({ name, icon, placeholder, type }, index) => (
                  <Form.Input
                    key={index}
                    fluid
                    name={name}
                    icon={icon}
                    iconPosition="left"
                    placeholder={placeholder}
                    type={type}
                    onChange={this.handleChange}
                    value={this.state[name]}
                    className={errors.list.indexOf(name) !== -1 ? "error" : ""}
                  />
                )
              )}

              <Button
                color="violet"
                fluid
                size="large"
                className={loading ? "loading" : ""}
                disabled={loading}
              >
                Submit
              </Button>
            </Segment>
            {errors.message && (
              <Message color="red">
                <p>{errors.message}</p>
              </Message>
            )}
            <Message>
              Don't have a account? <Link to="/register">Register</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
