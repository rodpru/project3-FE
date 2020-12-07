import React from "react";
import { withRouter } from "react-router-dom";
import KindergartensApi from "../utils/api-cml";
import NurseriesDB from "../utils/api";

class Details extends React.Component {
  state = {
    school: this.props.location.state,
    // name: "",
    // address: "",
    // description: "",
    // email: "",
    // site: "",
    // phone: "",
    // rating: "",
    // photo: "",
    // globalID: "",
    // schoolType: "",
    // geo: {
    //   lat: "",
    //   lng: "",
    // },
  };

  render() {
    if (this.state.school.attributes) {
      return (
        <div>
          <h1> {this.state.school.attributes.INF_NOME}</h1>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.state.school.name}</p>
        </div>
      );
    }
  }
}

export default withRouter(Details);
