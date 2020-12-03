import axios from "axios";

class KindergartensApi {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_CML_API}`,
    });
    this.service = service;
  }

  getAllKindergartens() {
    return this.service.get("/query?where=1%3D1&outFields=*&outSR=4326&f=json");
  }

  getKindergartensId() {
    return this.service.get(`#`);
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

export default KindergartensApi;
