import React from "react";
import KindergartensApi from "../utils/api-cml";
import { withRouter, Redirect, Link } from "react-router-dom";
import NurseriesDB from "../utils/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class Kindergartens extends React.Component {
  state = {
    kindergartens: [],
    show: true,
  };

  clickIcon = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  componentDidMount() {
    const kindergartens = new KindergartensApi();
    kindergartens.getAllKindergartens().then((response) => {
      return this.setState({
        kindergartens: response.data.features,
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
        <div id="search" className={this.state.show ? "search" : "search open"}>
          <svg
            onClick={this.clickIcon}
            id="icon"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-search"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
            />
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
            />
          </svg>
          <input
            id="input-nursery"
            type="text"
            placeholder="search something"
          />
        </div>
        <div id="overlay" className="overlay" style={{ display: "none" }}></div>
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
                  alt="kindergarten"
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
                  </button>{" "}
                  {/* <a href="/" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Kindergartens);
