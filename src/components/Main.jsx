import HeroSection from "./HeroSection";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProjectGallery from "./ProjectGallery";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import SlideBar from "./SlideBar";

const Main = ({ data, setIsLoading }) => {
    const [indexedProject, setIndexedProject] = useState();
    const [projects, setProjects] = useState([]);
    const [coreProjects, setCoreProjects] = useState([]);
    const [introduce, setIntroduce] = useState("");
    const [contributions, setContributions] = useState([]);

    const location = useLocation(); 
    const projectsRef = useRef(null);
    const contactRef = useRef(null);
    
    const navigationType = useNavigationType();
    useEffect(() => {
      if (navigationType === "PUSH") {
        if (location.state === "contact" && contactRef.current) {
          setTimeout(() => {
            contactRef.current.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else if (location.state === "projects" && projectsRef.current) {
          setTimeout(() => {
            projectsRef.current.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
        window.scrollTo({ top: 0, behavior:"smooth" });
      }
    }, [location, projectsRef, contactRef]);

    useEffect(() => {
        if(data) {
          setProjects(data.includeCoreProject ? data.projects : data.projects.slice(data.coreProjectCount));
          setIntroduce(data.introduce);
          setContributions(data.contributions);
          setCoreProjects(data.projects.slice(0, data.coreProjectCount));
          setIndexedProject(data.projects[0]); // 첫 번째 프로젝트로 초기화
          setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [data]);

    const handleActiveIndexChange = (slide) => {
        setIndexedProject(coreProjects[slide.realIndex]);
    }

    return (
        <main>
          <section>
            <Swiper navigation modules={[Navigation]} onActiveIndexChange={handleActiveIndexChange} className="mySwiper">
              {coreProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <HeroSection project={project} indexedProject={indexedProject} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <SlideBar />
          <section ref={projectsRef}>
            <ProjectGallery projects={projects} />
          </section>
          <div ref={contactRef}>
            <Footer introduce={introduce} contributions={contributions} />          
          </div>
        </main>
    );
};

export default Main;