import { motion } from 'framer-motion';
import logo from '../assets/Logo_500_white.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleNavigation = (path, location) => {
        navigate(path, {state : location});
    };

    const controlHeader = () => {
        if (window.innerWidth <= 768) { // 모바일 화면에서만 동작하도록 조건 추가
            if (window.scrollY > lastScrollY) {
                setShowHeader(false);  // 스크롤 내릴 때 헤더 숨김
            } else {
                setShowHeader(true);   // 스크롤 올릴 때 헤더 표시
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);

    return (
        <motion.nav 
            initial={{ y: -100 }} 
            animate={{ y: showHeader ? 0 : -100 }}  // 스크롤에 따라 헤더가 사라지거나 나타남
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed top-0 w-full p-4 flex justify-between z-50"
        >
            <button onClick={() => handleNavigation("/", null)}>
                <img src={logo} alt="logo" className="h-6 drop-shadow-lg" />
            </button>
            <div className='flex text-white font-[BIGJOHN] gap-4'>
                <button onClick={() => handleNavigation("/", "projects")} className="drop-shadow-lg">Projects</button>
                <button onClick={() => handleNavigation("/", "contact")} className="drop-shadow-lg">Contact</button>
            </div>
        </motion.nav>
    );
}
 
export default Header;