import React from "react";
import NurseriesDB from "../utils/api";
import { withRouter } from "react-router-dom";

class Profile extends React.Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const nurseries = new NurseriesDB();
    nurseries.getFavorites(id).then((response) => {
      this.setState({
        favorites: response.data,
      });
    });
  }
  render() {
    return (
      <div>
        <h2>Hello from profile</h2>
      </div>
    );
  }
}

export default withRouter(Profile);
