import React from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../utils/auth";
import "../App.css";

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
        <div className="navbar navbar-light bg-light">
          <p className="teste">Welcome {this.props.loggedInUser.username}</p>
          <nav className="navbar navbar-light bg-light">
            <ul>
              <li>
                <NavLink to="/">
                  <button onClick={this.logoutUser}>Logout</button>
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: "red" }} exact to="/">
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink activeStyle={{ color: "red" }} exact to="/projects">
                  List Projects
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  activeStyle={{ color: "red" }}
                  exact
                  to="/projects/add"
                >
                  Add Project
                </NavLink>
              </li> */}
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <nav
          className="navbar navbar-light "
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <NavLink activeStyle={{ color: "red" }} exact to="/">
            Home
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} exact to="/schools">
            Schools
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} exact to="/login">
            Login
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
            Login With Google
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} exact to="/signup">
            Signup
          </NavLink>
        </nav>
      );
    }
  }
}
export default Navbar;
