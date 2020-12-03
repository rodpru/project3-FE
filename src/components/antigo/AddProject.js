import React from "react";
import ProjectsService from "../../utils/api";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class AddProject extends React.Component {
  state = {
    title: "",
    description: "",
  };

  handleChange = (event) => {
    let { name, value, type } = event.target;

    if (type === "checkbox") {
      value = event.target.checked;
    }

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const projectsService = new ProjectsService();
    projectsService.addProject(this.state).then(() => {
      toast.success("Project Created!!");
      this.props.history.push("/projects");
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

        <button>Create</button>
      </form>
    );
  }
}

export default withRouter(AddProject);
