import React from "react";
import ProjectsService from "../utils/api";
import { withRouter } from "react-router-dom";

class EditProject extends React.Component {
  state = {
    id: "",
    title: "",
    description: "",
  };

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {
    const projectsService = new ProjectsService();
    const id = this.props.match.params.id;
    projectsService.getProject(id).then((response) => {
      this.setState({
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
      });
    });
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const projectsService = new ProjectsService();
    projectsService.updateProject(this.state).then(() => {
      this.props.history.push(`/projects/${this.state.id}`);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.state.title}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          onChange={this.handleChange}
          value={this.state.description}
        />

        <button>Save</button>
      </form>
    );
  }
}

export default withRouter(EditProject);
