import React from "react";
import { Link } from "react-router-dom";
import KindergartensApi from "../utils/api-cml";
import NurseriesDB from "../utils/api";

class Homepage extends React.Component {
  state = {
    kindergartens: [],
    nurseries: [],
  };

  componentDidMount() {
    const kindergartens = new KindergartensApi();
    const nurseries = new NurseriesDB();
    kindergartens.getAllKindergartens().then((responseKinder) => {
      //console.log("responseKinder", responseKinder);
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
  }

  getRandom() {
    // filter the kindergarten array
    let copy = [...this.state.kindergartens]; // all the array
    let copy2 = [...this.state.nurseries];
    let result = [];
    let result2 = [];
    for (let i = 0; i < 4; i++) {
      let randomNumber = [Math.floor(Math.random() * copy.length)];
      let randomNumber2 = [Math.floor(Math.random() * copy2.length)];

      result.push(copy[randomNumber]);
      result2.push(copy2[randomNumber2]);
      copy.splice(randomNumber, 1);
      copy2.splice(randomNumber2, 1);
    }
    this.setState({
      kindergartens: result,
      nurseries: result2,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.kindergartens.length > 4) {
      this.getRandom();
    }
  }

  render() {
    return (
      <div>
        <div id="home-container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  // id="img2"
                  src="/images/jessica-rockowitz-5NLCaz2wJXE-unsplash.jpg"
                  className="d-block w-100"
                  alt="childrenpics"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/chewy-59TTmbSL1Yw-unsplash.jpg"
                  className="d-block w-100"
                  alt="childrenpics"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="images/scott-webb-obKbq4Z3cuA-unsplash.jpg"
                  className="d-block w-100"
                  alt="childrenpics"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/markus-spiske-z02yFSgVRbA-unsplash.jpg"
                  className="d-block w-100"
                  alt="childrenpics"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div id="img-text" className="container">
            <h1>
              Find the best kindergarten <br />
              or nursery for your children!
            </h1>
            <p>
              My First School it's a platform to help parents
              <br /> find the best schools near their residency
              <br /> in a quick and intuitive way.
            </p>
            <Link to={"/nurseries"}>
              <button className="btn btn-light">Nurseries</button>
            </Link>
            <Link to={"/kindergartens"}>
              <button className="btn btn-light">Kindergartens</button>
            </Link>
          </div>
          <div id="nurse-kind-cards" className="container">
            <div id="nursery-text">
              <h2 className="title">
                Featured <b>Nurseries</b>
              </h2>
              <p className="title">Find the best nurseries in Lisbon</p>
              <div className="card-deck d-flex flex-wrap">
                {this.state.nurseries.map((nursery, index) => {
                  return (
                    <div
                      className="card col-sm-3"
                      key={index}
                      style={{ minWidth: "30vh" }}
                    >
                      <img
                        src={nursery.photo}
                        className="card-img-top"
                        id="card-img-1"
                        alt="nurseries"
                      />
                      <div className="card-body">
                        <Link
                          to={{ pathname: `/${nursery._id}`, state: nursery }}
                        >
                          {" "}
                          <h5 className="card-title">{nursery.name}</h5>{" "}
                        </Link>
                        <p className="card-text">❢ {nursery.address}</p>
                        <p className="card-text">tel: {nursery.phone}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div id="kinder-text">
              <h2 className="title">
                Featured <b>Kindergartens</b>
              </h2>
              <p className="title">Find the best kindergartens in Lisbon</p>
              <div className="card-deck d-flex flex-wrap">
                {this.state.kindergartens.map((kindergarten, index) => {
                  return (
                    <div
                      className="card col-sm-3"
                      key={index}
                      style={{ minWidth: "30vh" }}
                    >
                      <img
                        src={kindergarten.attributes.photo}
                        className="card-img-top"
                        id="card-img-2"
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
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
