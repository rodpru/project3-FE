import React from "react";
import NurseriesDB from "../utils/api";
import KindergartensApi from "../utils/api-cml";
import { Link } from "react-router-dom";
import "./Nurserie.css";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
    this.props.loggedInUser
      ? nurseries
          .addFavorite(this.props.loggedInUser._id, id)
          .then((response) => {
            console.log(response);
          })
      : toast("Login or signup please!");
    // : this.props.history.push("/");
  };

  render() {
    return (
      <div>
        {/* <div id="nurse-kind-cards2" className="container"> */}
        <div id="nursery-text">
          <h2 className="title">
            <b>Nurseries</b>
          </h2>
          <p className="title">Find the best nurseries in Lisbon</p>
          <div
            id="overlay"
            className="overlay"
            style={{ display: "none" }}
          ></div>
          <div className="card-deck d-flex flex-wrap">
            {this.state.nurseries.map((nursery, index) => {
              return (
                <div
                  className="card col-sm-4"
                  key={index}
                  style={{ minWidth: "55vh" }}
                >
                  <img
                    src={nursery.photo}
                    className="card-img-top"
                    alt="nurseries"
                  />
                  <div className="card-body">
                    <Link to={{ pathname: `/${nursery._id}`, state: nursery }}>
                      {" "}
                      <h5 className="card-title">{nursery.name}</h5>{" "}
                    </Link>
                    <p className="card-text">❢ {nursery.address}</p>
                    <p className="card-text">tel: {nursery.phone}</p>

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
          <div className="card-deck d-flex flex-wrap">
            {this.state.kindergartens.map((kindergarten, index) => {
              return (
                <div
                  className="card col-sm-4"
                  key={index}
                  style={{ minWidth: "55vh" }}
                >
                  <img
                    src="/images/pro-church-media-2DTE3ePfnD8-unsplash.jpg"
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
                      ❢ {kindergarten.attributes.INF_MORADA}
                    </p>
                    <p className="card-text">
                      tel:
                      {kindergarten.attributes.INF_TELEFONE}
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
        {/* </div> */}
      </div>
    );
  }
}

export default AllSchools;
