import React from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../utils/auth";
import "../App.css";
import "./Navbar.css";

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
          className="navbar navbar-light "
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="nav-bar-logo"></div>
          <div className="nav-bar-links">
            <NavLink activeStyle={{ color: "red" }} exact to="/">
              Home
            </NavLink>
            <NavLink activeStyle={{ color: "red" }} exact to="/schools">
              Schools
            </NavLink>
            <NavLink to="/" onClick={this.logoutUser}>
              Logout
            </NavLink>
          </div>
        </nav>
      );
    } else {
      return (
        <nav
          className="navbar navbar-light "
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="nav-bar-logo"></div>
          <div className="nav-bar-links">
            <NavLink activeStyle={{ color: "red" }} exact to="/">
              Home
            </NavLink>
            <NavLink activeStyle={{ color: "red" }} exact to="/schools">
              Schools
            </NavLink>
            <NavLink activeStyle={{ color: "red" }} exact to="/login">
              Login
            </NavLink>
            {/* <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
              Login With Google
            </NavLink> */}
          </div>
        </nav>
      );
    }
  }
}
export default Navbar;
