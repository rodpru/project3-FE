import React from "react";
import NurseriesDB from "../utils/api";
import KindergartensApi from "../utils/api-cml";
import { Link } from "react-router-dom";

class AllSchools extends React.Component {
  state = {
    nurseries: [],
    kindergartens: [],
  };
  componentDidMount() {
    const kindergartens = new KindergartensApi();
    const nurseries = new NurseriesDB();
    kindergartens.getAllKindergartens().then((responseKinder) => {
      return nurseries.getAllNurseries().then((responseNurseries) => {
        this.setState({
          kindergartens: responseKinder.data.features,
          nurseries: responseNurseries.data,
        });
      });
    });
  }

  render() {
    return (
      <div>
        <div id="nurse-kind-cards2" className="container">
          <div id="nursery-text">
            <h2 className="title">
               <b>Nurseries</b>
            </h2>
            <p className="title">Find the best nurseries in Lisbon</p>
            <div className="card-deck d-flex flex-wrap">
              {this.state.nurseries.map((nursery, index) => {
                return (
                  <div
                    className="card col-sm-3"
                    key={index}
                    style={{ width: "200px" }}
                  >
                    <img
                      src="/images/annie-spratt-fBrGckWLQ0Q-unsplash.jpg"
                      className="card-img-top"
                      alt="nurseries"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{nursery.name}</h5>
                      <p className="card-text">{nursery.description}</p>
                      <a href="#" class="btn btn-primary">
                        Add to Favourites
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="kinder-text">
            <h2 className="title">
               <b>Kindergartens</b>
            </h2>
            <p className="title">Find the best kindergartens in Lisbon</p>
            <div className="card-deck d-flex flex-wrap">
              {this.state.kindergartens.map((kindergarten, index) => {
                return (
                  <div
                    className="card col-sm-3"
                    key={index}
                    style={{ width: "200px" }}
                  >
                    <img
                      src="/images/thiago-cerqueira-Wr3HGvx_RSM-unsplash.jpg"
                      className="card-img-top"
                      alt="kindergartens"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {kindergarten.attributes.INF_NOME}
                      </h5>
                      <p className="card-text">
                        {kindergarten.attributes.INF_DESCRICAO}
                      </p>
                      <a href="#" class="btn btn-primary">
                      Add to Favourites
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllSchools;
