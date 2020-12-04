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
        {this.state.kindergartens.map((kindergarten, index) => {
          return (
            <div className="card" key={index} style={{ width: "200px" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">
                  {kindergarten.attributes.INF_NOME}
                </h5>
                <p className="card-text">
                  {kindergarten.attributes.INF_DESCRICAO}
                </p>
                {/* <a href="/" className="btn btn-primary">
                  Go somewhere
                </a> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Kindergartens;
