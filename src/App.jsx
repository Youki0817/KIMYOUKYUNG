import HeroSection from "./components/HeroSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectGallery from "./components/ProjectGallery";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [indexedProject, setIndexedProject] = useState();
  const [coreProjects, setCoreProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [introduce, setIntroduce] = useState("");
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    // 화면이 준비되면 로딩 해제
    const fetchProjects = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setCoreProjects(data.coreProjects);
      setProjects(data.projects);
      setIndexedProject(data.coreProjects[0]); // 첫 번째 프로젝트로 초기화
      setIntroduce(data.introduce);
      setContributions(data.contributions);
      setIsLoading(false); // 데이터 로딩이 완료되면 로딩 해제
    };
    
    fetchProjects();
  }, []);

  const handleActiveIndexChange = (slide) => {
    setIndexedProject(coreProjects[slide.realIndex]);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div>
        <Header />
        <main>
          <section>
            <Swiper navigation loop modules={[Navigation]} onActiveIndexChange={handleActiveIndexChange} className="mySwiper">
              {coreProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <HeroSection project={project} indexedProject={indexedProject} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <section className={`bg-main h-20 flex flex-col items-center`}>
            <motion.h2
              className="text-4xl text-white text-center font-[BOLD] tracking-widest whitespace-nowrap inline-block my-auto"
              initial={{ x: '+100vw' }}
              animate={{ x: '-100vw' }}
              transition={{ stiffness: 120, repeat: Infinity, duration: 20 }}
            >
              KIMYOUKYUNG +82.10.8598.1362 김유경 youkyung.kim@themill.com @youki__kim
            </motion.h2>
          </section>
          <section>
            <ProjectGallery projects={projects} />
          </section>
        </main>
      </div>
      <Footer introduce={introduce} contributions={contributions} />
    </div>
  );
}

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default App;
