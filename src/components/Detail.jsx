import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = ({ data, setIsLoading }) => {
  const param = useParams();
  const videoRef = useRef();

  const { id } = param;
  const [indexedProject, setIndexedProject] = useState({});

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [indexedProject]);

  useEffect(() => {
    if (data) {
      setIndexedProject(data.projects.find((p) => p.id == id));
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data, id]);

  return (
    <main>
      <section className="bg-main min-h-dvh pt-20 lg:pt-14">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-end mx-10">
            <div className="flex flex-col">
              <h1 className="font-2 text-4xl lg:text-6xl font-[BOLD]">
                {indexedProject.title}
              </h1>
              <h2 className="font-2 text-4xl lg:text-6xl font-[SHARP]">
                {indexedProject.subTitle}
              </h2>
            </div>
          </div>
          {indexedProject.video && (
            <div className="mt-20 lg:my-10 lg:mx-12 flex flex-col gap-10">
              <video
                className="self-center w-full h-full object-cover max-h-[90vh] lg:rounded-lg lg:shadow-lg"
                ref={videoRef}
                loop
                muted
                playsInline
                onLoadedData={() => videoRef.current.play()} // 비디오가 로드된 후 재생
              >
                <source src={indexedProject.video} />
              </video>
              <p className="font-[SHARP] text-3xl whitespace-pre-line">
                {indexedProject.description}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Detail;
