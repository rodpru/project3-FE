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

  addFavorite = (id) => {
    const nurseries = new NurseriesDB();
    // console.log(id);
    // console.log(this.props.loggedInUser);
    nurseries.addFavorite(this.props.loggedInUser._id, id).then((response) => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <div id="nurse-kind-cards2" className="container">
          <div id="nursery-text">
            <h2 className="title">
              <b>Nurseries</b>
            </h2>
            <p className="title">Find the best nurseries in Lisbon</p>
            <div className="row row-cols-1 row-cols-lg-5">
              {this.state.nurseries.map((nursery, index) => {
                return (
                  <div
                    className="card col-lg-5"
                    key={index}
                    style={{ width: "200px" }}
                  >
                    <img
                      src="/images/annie-spratt-fBrGckWLQ0Q-unsplash.jpg"
                      className="card-img-top"
                      alt="nurseries"
                    />
                    <div className="card-body">
                      <Link
                        to={{ pathname: `/${nursery._id}`, state: nursery }}
                      >
                        {" "}
                        <h5 className="card-title">{nursery.name}</h5>{" "}
                      </Link>
                      <p className="card-text">{nursery.description}</p>

                      <button
                        onClick={() => {
                          this.addFavorite(nursery.name);
                        }}
                        className="btn btn-primary"
                      >
                        Add to Favourites
                      </button>
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
            <div className="row row-cols-1 row-cols-lg-5">
              {this.state.kindergartens.map((kindergarten, index) => {
                return (
                  <div
                    className="card col-lg-5"
                    key={index}
                    style={{ width: "200px" }}
                  >
                    <img
                      src="/images/thiago-cerqueira-Wr3HGvx_RSM-unsplash.jpg"
                      className="card-img-top"
                      alt="kindergartens"
                    />
                    <div className="card-body">
                      <Link
                        to={{
                          pathname: `/${kindergarten.attributes.GlobalID}`,
                          state: kindergarten,
                        }}
                      >
                        {" "}
                        <h5 className="card-title">
                          {kindergarten.attributes.INF_NOME}
                        </h5>{" "}
                      </Link>
                      <p className="card-text">
                        {kindergarten.attributes.INF_DESCRICAO}
                      </p>
                      <button
                        onClick={() => {
                          this.addFavorite(kindergarten.attributes.INF_NOME);
                        }}
                        className="btn btn-primary"
                      >
                        Add to Favourites
                      </button>
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
