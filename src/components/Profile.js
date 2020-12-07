import React from "react";
import NurseriesDB from "../utils/api";
import { withRouter } from "react-router-dom";
import Kindergartens from "./Kindergartens";
import KindergartensApi from "../utils/api-cml";
import AuthService from "../utils/auth";

class Profile extends React.Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    // const name = this.props.loggedInUser.favorites;
    const nurseries = new NurseriesDB();
    nurseries.getFavorites(id).then((response) => {
      console.log(response);
      this.setState({
        favorites: response.data,
      });
    });
  }
  // componentDidMount() {
  //   const id = this.props.match.params.id;
  //   const nurseries = new NurseriesDB();
  //   nurseries.getFavorites(id).then((response) => {
  //    let  nurseries =[];
  //    let kindergartensDb = []
  //    let kindergartens = [];
  //    response.map((school) => {
  //      return school.type === 'nursery'? nurseries.push(school) : kindergartensDb.push(school)
  //    })
  //    KindergartensApi.getAll().then((response) =>{
  //      kindergartensDb.map((kindergarten) => {
  //         return response.map((schoolFromDb) => {
  //        if (schoolFromDb.attributes.INF_nome === kindergarten.name )
  //         return kindergartens.push(schoolFromDb)
  //      })
  //      })

  //    })
  //     /* this.setState({
  //       favorites: response.data,
  //     }); */
  //   });
  // }
  render() {
    return (
      <div>
        <h2>Hello from profile</h2>
        {this.state.favorites.map((school) => {
          return (
            <div>
              <p>{school.name}</p>
              <p>{school.address}</p>
              <p>{school.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Profile);
