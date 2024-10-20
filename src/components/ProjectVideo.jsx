const ProjectVideo = ({videoRef, src, main = false }) => {
    return (
        <video ref={videoRef} loop muted playsInline className={`w-full h-full object-cover ${main && "min-h-screen"}`}>
            <source src={src} />
        </video>
    );
}
 
export default ProjectVideo;