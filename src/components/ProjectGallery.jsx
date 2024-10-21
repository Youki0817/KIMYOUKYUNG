import { useRef } from "react";
import ProjectSmall from "./ProjectSmall";

const ProjectGallery = ({ projects }) => {
    const videoRef = useRef([]);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2" id="projects">
            {projects.map((project) => (
            <div
                key={project.id} 
                className="relative group"
            >
                <ProjectSmall project={project} videoRef={videoRef} />
            </div>
            ))}
        </div>
    );
}
 
export default ProjectGallery;