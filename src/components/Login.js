import React from "react";
import AuthService from "../utils/auth";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
      toast(`Welcome ${username}`);
      //save user id to browser local storage
      localStorage.setItem("loggedInUser", response.data._id);

      this.props.history.push("/schools");
    });
  };

  render() {
    return (
      <div>
        <div className="container-login">
          <div className="google-oauth">
            <button
              className="btn btn-primary"
              id="google-btn2"
              style={{
                borderRadius: "15px",
                height: "9vh",
                width: "20vw",
                justifyContent: "space-evenly",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <img
                src="../../images/google.png"
                style={{
                  width: "4vw",
                }}
                className="google-icon"
                alt="google-icon"
              />
              <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
                Google Login
              </NavLink>
            </button>
          </div>
          <div className="login-signup">
            <form onSubmit={this.handleFormSubmit}>
              {/* <label>Username:</label> */}
              <input
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChange}
              />{" "}
              <br />
              {/* <label>Password:</label> */}
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br />
              <button className="btn btn-primary" id="login-btn-google">
                Login
              </button>
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
