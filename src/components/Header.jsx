import { motion } from 'framer-motion';
import logo from '../assets/Logo_500_white.png';

const Header = () => {
    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    return (
        <motion.nav 
            initial={{ y: -100 }} 
            animate={{ y: 0 }} 
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed top-0 w-full p-4 flex justify-between z-50"
        >
            <button onClick={() => scrollToTop()}>
                <img src={logo} alt="logo" className="h-6" />
            </button>
            <div className='text-white'>
                <a href="#projects" className="mr-4">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </motion.nav>
    );
}
 
export default Header;