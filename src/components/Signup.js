import React from "react";
import AuthService from "../utils/auth";
import { Link, withRouter, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

class Signup extends React.Component {
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
    const authService = new AuthService();
    authService
      .signup(this.state.username, this.state.password)
      .then((response) => {
        this.props.setCurrentUser(response.data);
        toast(`Welcome ${this.state.username}`);
        //save user id to browser local storage
        localStorage.setItem("loggedInUser", response.data._id);

        this.props.history.push("/schools");
      });
  };
  render() {
    return (
      <div className="signup-container">
        <div className="signup-image">
          <img
            style={{
              objectFit: "cover",
            }}
            src="../../images/annie-spratt-O1TNdLNvJLM-unsplash.jpg"
            alt="signup"
          />
        </div>
        <div className="container-login">
          <div className="google-oauth">
            <button
              className="btn btn-primary"
              id="google-btn3"
              style={{
                borderRadius: "15px",
                height: "9vh",
                width: "25vw",
                justifyContent: "space-evenly",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <img
                src="../../images/google.png"
                style={{
                  marginTop: 0,
                  width: "4vw",
                }}
                className="google-icon"
                alt="google-icon"
              />
              <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
                Signup with Google
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
                Create
              </button>
            </form>
          </div>
          {/* <p>
            Already have an account
            <Link to={"/signin"}> Signin</Link>
          </p> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
