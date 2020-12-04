import React from "react";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  render() {
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
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
