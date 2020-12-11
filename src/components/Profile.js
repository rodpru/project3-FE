import React from "react";
import NurseriesDB from "../utils/api";
import { withRouter } from "react-router-dom";
import Kindergartens from "./Kindergartens";
import KindergartensApi from "../utils/api-cml";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  state = {
    favorites: [],
  };

  getFavorites2() {
    const id = this.props.match.params.id;
    // const name = this.props.loggedInUser.favorites;
    const nurseries = new NurseriesDB();
    nurseries.getFavorites(id).then((response) => {
      //console.log(response, "response");
      this.setState({
        favorites: response.data,
      });
    });
  }

  componentDidMount() {
    this.getFavorites2();
  }

  handleDeleteFavorite = (id) => {
    let userId = this.props.match.params.id;
    const nurseries = new NurseriesDB();
    //console.log(id);
    nurseries.deleteFavorite(id, userId).then(() => {
      this.getFavorites2();
      // this.props.history.push(`/profile/${id}`);
      console.log({ message: "the school was deleted" });
    });
  };

  render() {
    // console.log(this.state, "profile state");
    return (
      <div className="container" style={{ minHeight: "380px" }}>
        {/* <h2>Your favorites is empty</h2> */}
        <div className="card-deck d-flex flex-wrap">
          {this.state.favorites.map((school, index) => {
            return (
              <div
                className="card col-sm-4"
                key={index}
                style={{ minWidth: "30vh" }}
              >
                <img
                  src={school.photo}
                  className="card-img-top"
                  id="card-img-top-profile"
                  alt="nurseries"
                />
                <div className="card-body">
                  <Link
                    to={{
                      pathname:
                        school.schoolType === "kindergarten"
                          ? `/${school.GlobalID}`
                          : `/${school._id}`,
                      state: school,
                    }}
                  >
                    {" "}
                    <h5 className="card-title">{school.name}</h5>{" "}
                  </Link>
                  <p className="card-text">type: {school.schoolType}</p>
                  <button
                    id="delete-btn"
                    className="btn btn-primary"
                    onClick={() => this.handleDeleteFavorite(school._id)}
                  >
                    Delete Favorite
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

export default withRouter(Profile);
