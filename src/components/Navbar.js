import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/projects">
            List Projects
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/projects/add">
            Add Project
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/signup">
            Signup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
