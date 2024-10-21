import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ProjectVideo from './ProjectVideo';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ project, indexedProject }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (indexedProject.id === project.id) {            
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [project, indexedProject]);

    const navigate = useNavigate();
    return (
        <motion.div 
            className="h-screen flex items-center justify-center bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ProjectVideo src={project.video} main={true} videoRef={videoRef} />
            {/* <button 
                className="absolute bottom-11 bg-main text-white border border-main-light hover:bg-main-dark focus:outline-none font-medium font-[SHARP] rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 drop-shadow-lg"
                onClick={() => navigate(`/detail/${project.id}`)}
            >
                Details
            </button> */}
        </motion.div>
    )
}
 
export default HeroSection;