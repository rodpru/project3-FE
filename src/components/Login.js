import React from "react";
import AuthService from "../utils/auth";
import { NavLink } from "react-router-dom";

import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const authService = new AuthService();
    authService.login(username, password).then((response) => {
      //lifting the state, function passed from App.js as props
      this.props.setCurrentUser(response.data);
      //save user id to browser local storage
      localStorage.setItem("loggedInUser", response.data._id);
      this.props.history.push("/projects");
    });
  };

  render() {
    return (
      <div>
        <div className="container-login">
          <div className="google-oauth">
            <button>
              <img src="../../images/google.png" className="google-icon" />
              <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
                Login With Google
              </NavLink>
            </button>
          </div>
          <div className="login-signup">
            <form onSubmit={this.handleFormSubmit}>
              {/* <label>Username:</label> */}
              <input
                type="text"
                name="username"
                placeholder="Your Username Here!"
                value={this.state.username}
                onChange={this.handleChange}
              />{" "}
              <br />
              {/* <label>Password:</label> */}
              <input
                type="password"
                name="password"
                placeholder="Your Password Here!"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br />
              <button>Login</button>
            </form>
          </div>
          <p>
            Don't have account?
            <Link to={"/signup"}> Signup</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
