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
    console.log(this.state);
    return (
      <div>
        <h2>Hello from Nurseries page</h2>
      </div>
    );
  }
}

export default Nurseries;
