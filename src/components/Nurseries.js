import React from "react";
import NurseriesDB from "../utils/api";
import "./Nurserie.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class Nurseries extends React.Component {
  state = {
    nurseries: [],
  };

  componentDidMount() {
    const nurseries = new NurseriesDB();
    nurseries.getAllNurseries().then((response) => {
      this.setState({
        nurseries: response.data,
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
            toast("Added to favorites");
          })
      : toast("Login or signup please!");
    // : this.props.history.push("/");
  };

  render() {
    return (
      <div>
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
