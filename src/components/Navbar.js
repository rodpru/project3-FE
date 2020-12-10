import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../utils/auth";
import "../App.css";
import "./Navbar.css";
import MyModal from "./Modal";

class Navbar extends React.Component {
  state = {
    show: true,
  };

  clickIcon = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  logoutUser = () => {
    const authService = new AuthService();
    authService.logout().then(() => {
      this.props.setCurrentUser(null);
      localStorage.removeItem("loggedInUser");
    });
  };
  render() {
    if (this.props.loggedInUser) {
      return (
        <nav
          className="navbar sticky-top navbar-light"
          id="nav-id2"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="nav-bar-logo">My First School</div>
          <div className="nav-bar-links">
            <div
              id="search"
              className={this.state.show ? "search" : "search open"}
            >
              <svg
                onClick={this.clickIcon}
                id="icon"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
              <input
                onClick={this.clickInput}
                id="input-nursery"
                type="text"
                placeholder="search"
              />
            </div>
            <div
              id="overlay"
              className="overlay"
              style={{ display: "none" }}
            ></div>
            <NavLink activeStyle={{ color: "#5782ad" }} exact to="/">
              Home
            </NavLink>
            <NavLink activeStyle={{ color: "#5782ad" }} exact to="/schools">
              All Schools
            </NavLink>
            <NavLink activeStyle={{ color: "#5782ad" }} exact to="/nurseries">
              Nurseries
            </NavLink>
            <NavLink
              activeStyle={{ color: "#5782ad" }}
              exact
              to="/kindergartens"
            >
              Kindergartens
            </NavLink>
            <NavLink
              activeStyle={{ color: "#5782ad" }}
              exact
              to={`/profile/${this.props.loggedInUser._id}`}
            >
              Favorites
            </NavLink>
            <NavLink to="/" onClick={this.logoutUser}>
              Logout
            </NavLink>

            {/* <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Launch demo modal
            </button> */}
          </div>
        </nav>
      );
    } else {
      return (
        <nav
          className="navbar sticky-top navbar-light"
          id="nav-id"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="container-fluid">
            <div className="nav-bar-logo">My First School</div>
            <div className="nav-bar-links">
              <div
                id="search"
                className={this.state.show ? "search" : "search open"}
              >
                <svg
                  onClick={this.clickIcon}
                  id="icon"
                  width="0.8em"
                  height="0.8em"
                  viewBox="0 0 16 16"
                  className="bi bi-search"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                </svg>
                <input
                  onClick={this.clickInput}
                  id="input-nursery"
                  type="text"
                  placeholder="search"
                />
              </div>
              <div
                id="overlay"
                className="overlay"
                style={{ display: "none" }}
              ></div>
              <NavLink activeStyle={{ color: "#5782ad" }} exact to="/">
                Home
              </NavLink>
              <NavLink activeStyle={{ color: "#5782ad" }} exact to="/schools">
                All Schools
              </NavLink>
              <NavLink activeStyle={{ color: "#5782ad" }} exact to="/nurseries">
                Nurseries
              </NavLink>
              <NavLink
                activeStyle={{ color: "#5782ad" }}
                exact
                to="/kindergartens"
              >
                Kindergartens
              </NavLink>
              <MyModal setCurrentUser={this.props.setCurrentUser} />

              {/* <NavLink activeStyle={{ color: "red" }} exact to="/login">
              Login
            </NavLink> */}
              {/* <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
              Login With Google
            </NavLink> */}
            </div>
          </div>
        </nav>
      );
    }
  }
}
export default Navbar;
