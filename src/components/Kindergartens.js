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
    const nurseries = new NurseriesDB();
    kindergartens.getAllKindergartens().then((responseKinder) => {
      console.log("responseKinder", responseKinder);
      nurseries.getAllNurseries().then((responseNurseries) => {
        const kinderFromDB = new NurseriesDB();
        kinderFromDB.getAll().then((schoolsWithPhotos) => {
          //console.log(response.data[0].schoolType, "response");

          responseKinder.data.features.forEach((kindergarten) => {
            schoolsWithPhotos.data.forEach((schoolWithPhoto) => {
              if (
                schoolWithPhoto.schoolType === "kindergarten" &&
                schoolWithPhoto.GlobalID === kindergarten.attributes.GlobalID
              ) {
                kindergarten.attributes.photo = schoolWithPhoto.photo;
              }
            });
          });
          this.setState({
            kindergartens: responseKinder.data.features,
          });
        });
      });
    });
  }

  addFavorite = (id) => {
    const nurseries = new NurseriesDB();

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
                  src={kindergarten.attributes.photo}
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
                    id="btn-fav-nurse3"
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
