import axios from "axios";
import React from "react";
import KindergartensApi from "../utils/api-cml";

class Kindergartens extends React.Component {
  state = {
    kindergartens: [],
  };

  componentDidMount() {
    const kindergartens = new KindergartensApi();
    kindergartens.getAllKindergartens().then((response) => {
      return this.setState({
        kindergartens: response.data.features,
      });
    });
  }

  
  //search method
  // filterKindergarten = (id) => {
  //   this.state.kindergartens.find((kindergarten) => {
  //     console.log(id, kindergarten);
  //     return id === kindergarten.attributes.GlobalID;
  //   });
  // };

  render() {
    return (
      <div>
        <h2>Hello from Kindergartens page</h2>
      </div>
    );
  }
}

export default Kindergartens;
