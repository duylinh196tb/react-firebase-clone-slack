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
import md5 from "md5";
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
    name: "username",
    icon: "user",
    placeholder: "Username",
    type: "text"
  },
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
  },
  {
    name: "passwordConfimation",
    icon: "repeat",
    placeholder: "Password Confimation",
    type: "password"
  }
];

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfimation: "",
    errors: {
      message: "",
      list: []
    },
    loading: false,
    usersRef: firebase.database().ref("users")
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  isFormValid = () => {
    const { email, password, passwordConfimation, username } = this.state;

    const checkForm = isFormEmpty({
      email,
      password,
      passwordConfimation,
      username
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

    const checkPW = verifyPassword(password, passwordConfimation);
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
    if (checkPW === 2)
      return this.setState({
        errors: {
          message: "Two password not equal",
          list: ["passwordConfimation"]
        }
      });
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, username } = this.state;
    if (!this.isFormValid()) return;
    this.setState({ errors: { message: "", list: [] }, loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            this.saveUser(createdUser).then(() => {
              console.log("user saved");
              this.setState({
                loading: false
              });
            });
          })
          .catch(err => {
            console.error(err);
            this.setState({
              errors: { message: err.message },
              loading: false
            });
          });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: { message: err.message },
          loading: false
        });
      });
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
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
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
                color="orange"
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
              Already a user? <Link to="/login"> Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
