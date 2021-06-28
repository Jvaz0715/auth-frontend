import React, { Component } from "react";
// We use validator on the clientside to validate we put parameters on how a user can sign up
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";

// toast is used to create message cards if a user successfully signs up or if the user tries to sign up with existing database information
import { toast } from "react-toastify";

import Axios from "../utils/Axios";
//we get our axios from the axios.js file. axios is a fetch dependency that makes it easier to make and post requests on the front end

import "./Signup.css";

export class Signup extends Component {
  // we have our state that will include the keys for a user. We also use state to set a start state of our submit button (we start with it disabled)
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  //handleOnChange is our function that will fire when we add text in the input fields of signup.
  // this function includes various helper functions to make easier to read code
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }

        if (event.target.name === "email") {
          this.handleEmailInput();
        }

        if (event.target.name === "username") {
          this.handleUsernameInput();
        }
        if (event.target.name === "password") {
          this.handlePasswordInput();
        }

        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput();
        }
      }
    );
  };

  // we use the following function to validate our confirm password is correct
  //if passwords dont match we disable our button, else we set an empty error message
  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Password does not match!",
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        confirmPasswordError: "",
      });
    }
  };
  
  // we use the following function to validate our password is correct
  //if password does not meet the requirements we disable our button, else we set an empty error message
  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match",
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }

    if (this.state.password.length === 0) {
      this.setState({
        passwordError: "Password cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
          isButtonDisabled: true,
        });
      }
    }
  };

  // we use the following function to validate our email is correct
  //if email does not meet the requirements we disable our button, else we set an empty error message
  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: "Email cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Please, enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  // we use the following function to validate our first and last name are correct
  //if the names do not meet the requirements we disable our button, else we set an empty error message
  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  // we use the following function to validate our password is correct
  //if password does not meet the requirements we disable our button, else we set an empty error message
  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: "Username cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({
          usernameError: "Username can only have alphabet and number",
          isButtonDisabled: true,
        });
      }
    }
  };
  
  // handleOnSubmit is the bulk of our code that will create a new user, and check if any of our unique keys already exists in the database
  handleOnSubmit = async (event) => {
    // this will prevent the browser from constantly refreshing
    event.preventDefault();
    // try to create a new user
    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      //we use axios to post our new user with the userInputObj
      let success = await Axios.post("/api/user/sign-up", userInputObj);
      console.log(success);
      // we use toast to deliver a success message card
      toast.success(`${success.data.message}`);
    } catch (e) {
      // we use toast to deliver an error message card
      toast.error(`${e.response.data.message}`);
    }
  };

  // this function is used so that if a user clicks inside an input field, does not type anything and clicks off the input field, a message will be delivered that something needs to be typed
  handleOnBlur = (event) => {
    // console.log(event.target.name);
    // console.log("handle onBlur Triggered");

    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };


  //if fields are properly filled out, this function will both make sure the submit button becomes available, but also if anyhing is changed in the fields to make the paramaters incorrect, the button becomes disabled again
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  //if on focus is false, we change the onfocus to true for the given key/inputfield
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };
  // below we render the sign up page
  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    return (
      <div className="container">
        <div className="form-text">Sign up</div>

        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
