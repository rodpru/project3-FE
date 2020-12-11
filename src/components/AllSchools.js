import React from "react";
import NurseriesDB from "../utils/api";
import KindergartensApi from "../utils/api-cml";
import { Link } from "react-router-dom";
import "./Nurserie.css";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

class AllSchools extends React.Component {
  state = {
    nurseries: [],
    kindergartens: [],
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
            nurseries: responseNurseries.data,
          });
        });
      });
    });
    //paste under
    // const kinderFromDB = new NurseriesDB();
    // kinderFromDB.getAll().then((response) => {
    //   //console.log(response.data[0].schoolType, "response");
    //   let kinderDB = response.data.filter((school) => {
    //     return school.schoolType === "kindergarten";
    //   });
    //   // if (kinderDB.GlobalID === kindergartens)
    //   console.log(kinderDB, "kinderDB");
    //   console.log(this.kindergartens, "kindergartens state");
    // });
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
                      id="btn-fav-nurse2"
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
                    src={kindergarten.attributes.photo}
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
                      id="btn-fav-nurse4"
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
