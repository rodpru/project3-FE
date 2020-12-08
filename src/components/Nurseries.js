import React from "react";
import NurseriesDB from "../utils/api";
import "./Nurserie.css";
import { Link } from "react-router-dom";

class Nurseries extends React.Component {
  state = {
    nurseries: [],
    show: true,
  };

  clickIcon = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  componentDidMount() {
    const nurseries = new NurseriesDB();
    nurseries.getAllNurseries().then((response) => {
      this.setState({
        nurseries: response.data,
      });
    });
  }

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
            onClick={this.clickInput}
            id="input-nursery"
            type="text"
            placeholder="search something"
          />
        </div>
        <div id="overlay" className="overlay" style={{ display: "none" }}></div>
        <h2 className="title">
          <b>Nurseries</b>
        </h2>
        <p className="title">Find the best nurseries in Lisbon</p>
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
                  alt="nursery"
                />
                <div className="card-body">
                  <Link to={{ pathname: `/${nursery._id}`, state: nursery }}>
                    {" "}
                    <h5 className="card-title">{nursery.name}</h5>{" "}
                  </Link>
                  <p className="card-text">{nursery.description}</p>
                  <button
                    onClick={() => {
                      this.addFavorite(nursery.name);
                    }}
                    className="btn btn-primary"
                    id="btn-fav-nurse"
                  >
                    Add to Favourites
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Nurseries;
