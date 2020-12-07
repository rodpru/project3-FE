import React from "react";
import KindergartensApi from "../utils/api-cml";

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
            placeholder="Search Something"
          />
        </div>
        <div id="overlay" className="overlay" style={{ display: "none" }}></div>
        <div className="card-deck d-flex flex-wrap">
          {this.state.kindergartens.map((kindergarten, index) => {
            return (
              <div
                className="card col-sm-4"
                key={index}
                style={{ minWidth: "55vh" }}
              >
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    {kindergarten.attributes.INF_NOME}
                  </h5>
                  <p className="card-text">
                    {kindergarten.attributes.INF_DESCRICAO}
                  </p>
                  <a href="#" className="btn btn-primary">
                    Add to Favourites
                  </a>{" "}
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

export default Kindergartens;
