import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      //send authenticated encryped info to the back server
      //this is setting Set.Cookie on the header request
      withCredentials: true,
    });
    this.service = service;
  }
  signup = (username, password) => {
    return this.service.post("/signup", { username, password });
  };
  login = (username, password) => {
    return this.service.post("/login", { username, password });
  };
  logout = () => {
    return this.service.post("/logout");
  };
  //this returns if the user either with an active session or not
  loggedin = () => {
    return this.service.get("/loggedin");
  };
}

export default AuthService;
