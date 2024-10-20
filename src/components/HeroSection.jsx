import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ProjectVideo from './ProjectVideo';

const HeroSection = ({ project, indexedProject }) => {
    const videoRef = useRef();

    const controls = useAnimationControls();
    useEffect(() => {
        if (indexedProject.id === project.id) {
            controls.start({ y: 0 });
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            controls.start({ y: -500 });
        }
    }, [controls, project, indexedProject]);
    
    return (
        <motion.div 
            className="h-screen flex items-center justify-center bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ProjectVideo src={project.video} main={true} videoRef={videoRef} />
            <motion.h1
                className="absolute text-white text-6xl font-bold z-10 p-4"
                initial={{ y: -500 }} 
                animate={controls}
                transition={{ type: "spring", stiffness: 120 }}
            >
                {project.title}
            </motion.h1>
        </motion.div>
    )
}
 
export default HeroSection;