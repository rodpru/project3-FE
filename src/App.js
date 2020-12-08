import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import React from "react";
import Login from "./components/Login";
import AuthService from "./utils/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./components/Homepage";
import AllSchools from "./components/AllSchools";
import Kindergartens from "./components/Kindergartens";
import Nurseries from "./components/Nurseries";
import Profile from "./components/Profile";
import Details from "./components/Details";
import "./components/Navbar.css";
import Footer from "./components/Footer";

class App extends React.Component {
  state = {
    loggedInUser: null,
  };
  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };
  componentDidMount() {
    if (this.state.loggedInUser === null) {
      const authService = new AuthService();
      //check if the user session is still active on the server
      //and set the user with current user
      authService.loggedin().then((response) => {
        if (response.data._id) {
          this.setCurrentUser(response.data);
          localStorage.setItem("loggedInUser", response.data._id);
        } else {
          localStorage.removeItem("loggedInUser");
        }
      });
    }
  }
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navbar
          loggedInUser={this.state.loggedInUser}
          setCurrentUser={this.setCurrentUser}
        />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signup" component={Signup} />
          <Route path="/kindergartens" component={Kindergartens} />
          <Route path="/nurseries" component={Nurseries} />
          <Route
            path="/login"
            render={() => {
              return <Login setCurrentUser={this.setCurrentUser} />;
            }}
          />
          <Route
            path="/schools"
            render={() => {
              return <AllSchools loggedInUser={this.state.loggedInUser} />;
            }}
          />
          <Route
            path="/login-google"
            render={() => {
              window.location.href = `${process.env.REACT_APP_PROJECTS_API}/api/auth/google`;
            }}
          />
          <Route
            path="/profile/:id"
            render={() => {
              return <Profile loggedInUser={this.state.loggedInUser} />;
            }}
          />
          <Route path="/:id" component={Details} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
