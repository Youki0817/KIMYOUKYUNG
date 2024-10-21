import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectSmall = ({ project, videoRef }) => {
    const [visibleImages, setVisibleImages] = useState([]);
    const navigate = useNavigate();
    const imageControl = useAnimationControls();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 모바일 기기 감지
        const mobileCheck = window.matchMedia("(pointer: coarse)").matches;
        setIsMobile(mobileCheck);

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

    const handleMouseEnter = () => {
        if (!isMobile) {
            videoRef.current.forEach(v => v.pause());
            const currentVideo = videoRef.current[project.id];
            if (currentVideo) {
                currentVideo.play();  // 특정 videoRef의 play 호출
                imageControl.start({ opacity: 0 });
            }
        }
    };

    const handleMouseLeave = () => {
        // if (!isMobile) {
        //     const currentVideo = videoRef.current[project.id];
        //     if (currentVideo) {
        //         currentVideo.pause();  // 특정 videoRef의 pause 호출
        //     }
        // }
    };

    const handleTouchStart = () => {
        if (isMobile) {
            videoRef.current.forEach(v => v.pause());
            const currentVideo = videoRef.current[project.id];
            if (currentVideo) {
                currentVideo.play();  // 모바일 터치 시 비디오 재생
                imageControl.start({ opacity: 0 });
            }
        }
    };

    // const handleTouchEnd = () => {
    //     if (isMobile) {
    //         const currentVideo = videoRef.current[project.id];
    //         if (currentVideo) {
    //             currentVideo.pause();  // 터치 끝날 때 비디오 일시정지
    //         }
    //     }
    // };

    return (
        <div 
            className="cursor-pointer" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onClick={() => navigate(`/detail/${project.id}`)}
        >
            <motion.img src={project.image} className='absolute w-full h-full object-cover'
                initial={{ opacity: 1 }}
                animate={imageControl}
            />
            <motion.div
                className='absolute inset-0 bg-black flex items-center justify-center transition duration-300 z-10'
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isMobile || visibleImages.includes(project.id.toString()) ? 0 : 0.5,
                }}
                transition={{ duration: 0.8, ease: 'easeIn' }}
            >
            </motion.div>
            <motion.video
                ref={(el) => (videoRef.current[project.id] = el)}
                data-index={project.id}
                loop muted playsInline
                className={`w-full h-full object-cover`}
            >
                <source src={project.video} />
            </motion.video>
        </div>
    );
}

export default ProjectSmall;
