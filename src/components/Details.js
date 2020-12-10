import React from "react";
import { withRouter } from "react-router-dom";
import KindergartensApi from "../utils/api-cml";
import "./Details.css";

class Details extends React.Component {
  state = {
    school: this.props.location.state,
    kindergarten: null,
    loaded: false,
  };

  componentDidMount() {
    debugger;
    if (!this.state.school.schoolType) {
      let newSchool = { ...this.state.school };
      newSchool.schoolType = "kindergarten";
      newSchool.GlobalID = this.state.school.attributes.GlobalID;
      this.setState({
        school: newSchool,
      });
    }
    const kindergartens = new KindergartensApi();
    kindergartens.getAllKindergartens().then((response) => {
      let thisKindergarten = response.data.features.filter((school) => {
        return school.attributes.GlobalID === this.state.school.GlobalID;
      });
      debugger;
      this.setState({
        kindergarten: thisKindergarten[0],
        loaded: true,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState({
        school: this.props.location.state,
      });
    }
  }

  render() {
    if (this.state.school.schoolType === "kindergarten" && this.state.loaded) {
      const x = this.state.kindergarten.geometry.x;
      const y = this.state.kindergarten.geometry.y;
      // console.log(this.state.school.attributes, "API");
      return (
        <div className="container-flex-details">
          <div className="details-row">
            <div className="column-details">
              <div className="detail-photo">
                <img
                  id="img-details"
                  src="https://res.cloudinary.com/dgyg9zh3a/image/upload/v1607423361/Nurseries/pro-church-media-2DTE3ePfnD8-unsplash_qpndxi.jpg"
                  alt="index"
                />
              </div>
            </div>
            <div className="column-details">
              <div className="text-details">
                <h2> {this.state.kindergarten.attributes.INF_NOME}</h2> <br />
                <p>{this.state.kindergarten.attributes.INF_DESCRICAO}</p>
                <p>Address: {this.state.kindergarten.attributes.INF_MORADA}</p>
                <p></p>
                <p>Email: {this.state.kindergarten.attributes.INF_EMAIL}</p>
                <p>
                  Tel: {this.state.kindergarten.attributes.INF_TELEFONE}
                </p>{" "}
                <br />
                <p className="detail-footer">
                  {" "}
                  <a
                    href={this.state.kindergarten.attributes.INF_SITE}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WebSite
                  </a>{" "}
                  ||{" "}
                  <a
                    href={`http://maps.google.com/maps?q=${y}, ${x}`}
                    target="_blank" // abre novo separador
                    rel="noreferrer"
                  >
                    See on the Map
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.school.schoolType === "nursery") {
      // console.log(this.state.school.geo.lat);
      return (
        // <p>{this.state.school.name}</p>
        <div className="container-flex-details">
          <div className="details-row">
            <div className="column-details">
              <div className="detail-photo">
                <img src={this.state.school.photo} alt="index" />
              </div>
            </div>
            <div className="column-details">
              <div className="text-details">
                <h2> {this.state.school.name}</h2> <br />
                <p>{this.state.school.description}</p>
                <p>Address: {this.state.school.address}</p>
                <p>Email: {this.state.school.email}</p>
                <p>Tel: {this.state.school.phone}</p> <br />
                <p className="detail-footer">
                  {" "}
                  <a
                    href={this.state.school.site}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WebSite
                  </a>{" "}
                  ||{" "}
                  <a
                    href={`http://maps.google.com/maps?q=${this.state.school.geo.lat}, ${this.state.school.geo.lng}`}
                    target="_blank" // abre novo separador
                    rel="noreferrer"
                  >
                    See on the Map{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

export default withRouter(Details);
