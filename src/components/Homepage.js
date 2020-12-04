import React from "react";
import { Link } from "react-router-dom";
import KindergartensApi from "../utils/api-cml";

class Homepage extends React.Component {
  state = {
    kindergartens: [],
  };

  componentDidMount() {
    const kindergartens = new KindergartensApi();
    kindergartens.getAllKindergartens().then((response) => {
      return this.setState({
        kindergartens: response.data.features,
      });
    });
  }

  getRandom() {
    // filter the kindergarten array
    let copy = [...this.state.kindergartens]; // all the array
    let result = [];
    for (let i = 0; i < 4; i++) {
      let randomNumber = [Math.floor(Math.random() * copy.length)];
      result.push(copy[randomNumber]);
      copy.splice(randomNumber, 1);
    }
    this.setState({
      kindergartens: result,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.kindergartens.length > 4) {
      this.getRandom();
    }
  }

  render() {
    // function getRandomKindergarten(items) {
    //   return [Math.floor(Math.random() * items.length)];
    // }

    return (
      <div>
        <div id="home-container">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/images/kelly-sikkema-JRVxgAkzIsM-unsplash.jpg"
                  className="d-block w-100"
                  alt="schoolpic"
                />
              </div>
              <div className="carousel-item">
                <img
                  id="img2"
                  src="/images/pro-church-media-2DTE3ePfnD8-unsplash.jpg"
                  className="d-block w-100"
                  alt="schoolpic"
                />
              </div>
            </div>
          </div>
          <div id="img-text" className="container">
            <h1>
              Find the best kindergarten <br />
              or nursery for your children!
            </h1>
            <p>
              Lorem Ipsum has been the industry's standard dummy
              <br /> text ever since the 1500s, when an unknown printer took a
              <br /> galley of type and scrambled it to make a type specimen
              book.
            </p>
            <Link to={"/nurseries"}>
              <button className="btn btn-light">Nurseries</button>
            </Link>
            <Link to={"/kindergartens"}>
              <button className="btn btn-light">Kindergartens</button>
            </Link>
          </div>
          <div id="nursery-text">
            <h2>Best Nurseries</h2>
            <p>Find the best nurseries in Lisbon</p>
          </div>
          <div id="kinder-text">
            <h2>Best Kindergartens</h2>
            <p>Find the best kindergartens in Lisbon</p>
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
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {kindergarten.attributes.INF_NOME}
                      </h5>
                      <p className="card-text">
                        {kindergarten.attributes.INF_DESCRICAO}
                      </p>
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

export default Homepage;
