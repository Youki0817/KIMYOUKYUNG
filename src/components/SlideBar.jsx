import { motion } from 'framer-motion';

const SlideBar = () => {
    return (
        <section className="bg-main overflow-hidden relative h-20">
            <div className="absolute translate-y-1/2">
                <motion.h2
                    className="text-4xl text-white font-[BOLD] relative inline-flex whitespace-nowrap"
                    initial={{ x: '0%' }}
                    animate={{ x: '-50%' }}
                    transition={{ ease: "linear", repeat: Infinity, duration: 5 }}
                >
                <div className="flex">KIMYOUKYUNG &nbsp; +82.10.8598.1362 &nbsp; 김유경 &nbsp; youkyung.kim@themill.com &nbsp; @youki__kim &nbsp; </div>
                <div className="flex">KIMYOUKYUNG &nbsp; +82.10.8598.1362 &nbsp; 김유경 &nbsp; youkyung.kim@themill.com &nbsp; @youki__kim &nbsp; </div>
                </motion.h2>
            </div>
        </section>
    );
}
 
export default SlideBar;