import ProjectSmall from "./ProjectSmall";

const ProjectGallery = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2" id="projects">
            {projects.map((project) => (
            <div
                key={project.id} 
                className="relative group"
            >
                <ProjectSmall project={project} />
            </div>
            ))}
        </div>
    );
}
 
export default ProjectGallery;