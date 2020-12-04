import React from "react";
import NurseriesDB from "../utils/api";

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

  render() {
    return (
      <div>
        {this.state.nurseries.map((nursery, index) => {
          return (
            <div className="card" key={index} style={{ width: "200px" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{nursery.name}</h5>
                <p className="card-text">{nursery.description}</p>
                {/* <a href="/" className="btn btn-primary">
                  Go somewhere
                </a> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Nurseries;
