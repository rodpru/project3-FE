import React from "react";
import ProjectsService from "../utils/api";
import { withRouter } from "react-router-dom";

class ProjectDetail extends React.Component {
  state = {
    title: "",
    description: "",
  };

  componentDidMount() {
    const projectsService = new ProjectsService();
    const id = this.props.match.params.id;
    projectsService.getProject(id).then((response) => {
      this.setState({
        title: response.data.title,
        description: response.data.description,
      });
    });
  }
  handleDeleteProject = () => {
    const projectsService = new ProjectsService();
    const id = this.props.match.params.id;
    projectsService.deleteProject(id).then(() => {
      this.props.history.push("/projects");
      console.log({ message: "the project was deleted" });
    });
  };

  render() {
    return (
      //create a button that calls a handledeleteproject function and pass the id
      <div>
        <h2>{this.state.title}</h2>
        <h3>description: {this.state.description}</h3>
        <div>
          <button onClick={() => this.handleDeleteProject(this.state.id)}>
            Delete
          </button>
        </div>        
        <div>
          <button onClick={() => this.props.history.push(`/projects/${this.props.match.params.id}/edit`)}>
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectDetail);
