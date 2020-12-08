import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../utils/auth";
import "../App.css";
import "./Navbar.css";
import MyModal from "./Modal";

class Navbar extends React.Component {
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
              <MyModal />

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
