import "swiper/css";
import "swiper/css/navigation";
import Header from "./components/Header";
import Main from "./components/Main";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import { useEffect, useRef, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {   
    const fetchProjects = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main data={data} setIsLoading={setIsLoading} />} />
        <Route path="/detail/:id" element={<Detail data={data} setIsLoading={setIsLoading} />} />
      </Routes>
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
