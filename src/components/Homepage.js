import React from "react";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello from home page</h2>
        <Link to={"/nurseries"}>
          <button>Nurseries</button>
        </Link>
        <Link to={"/kindergartens"}>
          <button>Kindergartens</button>
        </Link>
      </div>
    );
  }
}

export default Homepage;
