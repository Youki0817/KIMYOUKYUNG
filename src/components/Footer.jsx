const Footer = ({ introduce, contributions }) => {
    return (
        <footer
            className={`min-h-screen flex flex-col bg-main text-white p-8 justify-between`}
            id="contact"
        >
            <div className="mx-8 grid grid-cols-1 lg:grid-cols-2 mt-16">
                <div className="mb-8 mr-16">
                    <h2 className="text-3xl font-bold mb-4 font-[BIGJOHN]">About Me</h2>
                    <p className="text-lg leading-relaxed max-w-2xl font-[SHARP]">
                        {introduce}
                    </p>
                </div>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 font-[BIGJOHN]">
                        Projects & Contributions
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                        {contributions.map((con) => (
                            <li
                                key={con.id}
                                className={`py-5 lg:mr-10 ${
                                    con.id % 2 === 1 && "md:mr-5"
                                }`}
                            >
                                <div>
                                    <span className="text-2xl font-[BIGJOHN]">
                                        {con.title}
                                    </span>
                                    <p className="mt-3 font-[SHARP]">{con.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold font-[BIGJOHN]">CONTACT</h2>
                <div className="flex space-x-4 mt-2 mb-8">
                    <a
                        href="mailto:youkyung.kim@themill.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        Email
                    </a>
                    <a
                        href="https://linkedin.com/in/youkikim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://instagram.com/youki__kim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        Instagram
                    </a>
                </div>
                <p>&copy; 2024 YouKyung KIM</p>
            </div>
        </footer>
    );
};

export default Footer;
