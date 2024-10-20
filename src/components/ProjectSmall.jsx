import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ProjectSmall = ({ project }) => {
    const [visibleImages, setVisibleImages] = useState([]);
    const videoRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.4, // 이미지가 40% 이상 보이면 동작
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibleImages((prev) => [...prev, entry.target.dataset.index]);
                } else {
                    setVisibleImages((prev) =>
                        prev.filter((index) => index !== entry.target.dataset.index)
                    );
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const currentVideoRefs = videoRef.current;
        currentVideoRefs.forEach((v) => {
            if (v) observer.observe(v);
        });

        return () => {
            currentVideoRefs.forEach((v) => {
                if (v) observer.unobserve(v);
            });
        };
    }, []);

    const titleControls = useAnimationControls();
    const subTitleControls = useAnimationControls();
    
    const handleMouseEnter = () => {
        const currentVideo = videoRef.current[project.id];
        if (currentVideo) {
            currentVideo.play();  // 특정 videoRef의 play 호출
        }
        titleControls.start({ y: -50 });
        subTitleControls.start({ y: 0, opacity: 1 })
    };

    const handleMouseLeave = () => {
        const currentVideo = videoRef.current[project.id];
        if (currentVideo) {
            currentVideo.pause();  // 특정 videoRef의 pause 호출
        }
        titleControls.start({ y: 0 });
        subTitleControls.start({ y: 100, opacity: 0 })
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.div
                className='absolute inset-0 bg-black flex items-center justify-center transition duration-300'
                initial={{ opacity: 0 }}
                animate={{
                    opacity: visibleImages.includes(project.id.toString()) ? 0 : 0.8,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
            </motion.div>
            <motion.div className={`z-10 h-auto absolute top-1/2 w-full text-white text-3xl text-center`}
                initial={{ y: 0 }}
                animate={titleControls}
                transition={{ type: "spring", stiffness: 120 }}
            >
                {project.title}
            </motion.div>
            <motion.div className={`z-10 h-auto absolute top-1/2 w-full text-white text-2xl text-center`}
                initial={{ y: 0, opacity: 0 }}
                animate={subTitleControls}
                transition={{ type: "spring", stiffness: 120 }}
            >
                {project.subTitle}
            </motion.div>
            <motion.video 
                ref={(el) => (videoRef.current[project.id] = el)}
                data-index={project.id}
                loop muted playsInline
                className={`w-full h-full object-cover`}
            >
                <source src={project.video} type="video/mp4" />
            </motion.video>
        </div>
    );
}
 
export default ProjectSmall;