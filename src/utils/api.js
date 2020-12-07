import axios from "axios";

class NurseriesDB {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}`,
    });
    this.service = service;
  }

  getAllNurseries() {
    //axios.get('http://localhost:5000/characters);
    return this.service.get("/nurseries");
  }

  getNurseryId(id) {
    //axios.get('http://localhost:5000/characters/1);
    return this.service.get(`/schools/${id}`);
  }

  addFavorite(user, id) {
    return this.service.post("/profile", { user, id });
  }

  getFavorites(id) {
    return this.service.get(`/profile/${id}`);
  }

  // addProject(project) {
  //   //axios.post('http://localhost:5000/characters/, { name: 'miguel});
  //   return this.service.post("/projects", project);
  // }
  // //create a delete project function for our projectService
  // deleteProject(id) {
  //   return this.service.delete(`/projects/${id}`);
  // }
  // updateProject(updatedProject) {
  //   return this.service.put(`/projects/${updatedProject.id}`, updatedProject);
  // }
}

export default NurseriesDB;
