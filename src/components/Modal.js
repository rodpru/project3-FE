import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink, Link, withRouter } from "react-router-dom";
import AuthService from "../utils/auth";

import React from "react";

class MyModal extends React.Component {
  state = {
    show: false,
    username: "",
    password: "",
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
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
      <>
        <NavLink
          to="#"
          type="button"
          variant="primary"
          onClick={this.handleShow}
        >
          Login
        </NavLink>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <svg
              onClick={this.handleClose}
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-x-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                fill-rule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Modal.Header>
          <Modal.Body>
            <div className="container-login">
              <div className="google-oauth">
                <button>
                  <img
                    src="../../images/google.png"
                    alt="google-logo"
                    className="google-icon"
                  />
                  <NavLink
                    activeStyle={{ color: "red" }}
                    exact
                    to="/login-google"
                  >
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
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(MyModal);