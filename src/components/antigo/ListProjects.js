import React from 'react';
import ProjectsService from '../utils/api';
import { Link } from 'react-router-dom';

class ListProjects extends React.Component {
    state = {
        projects: []
    }

    componentDidMount() {
        const projectsService = new ProjectsService();
        projectsService.getAll()
            .then((response) => {
                console.log(response);
                this.setState({
                    projects: response.data
                });
            });
    }
    
    render() {
        return(
            <div>
                {this.state.projects.map((project, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/projects/${project._id}`}>{project.title}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ListProjects;

