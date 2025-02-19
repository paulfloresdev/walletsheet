import React from "react";

import img1 from "/assets/react.svg";
import img2 from "/assets/vite.svg";
import img3 from "/assets/tailwind.png";
import img4 from "/assets/typescript.png";
import img5 from "/assets/react-router.svg";
import img6 from "/assets/github.svg";

const Home: React.FC = () => {
    return <>
        <div className="flex justify-center items-center space-x-8 pt-24">
            <img src={img1} alt="React" className="w-16 h-auto" />
            <img src={img2} alt="Vite" className="w-16 h-auto" />
            <img src={img3} alt="Tailwind" className="w-16 h-auto" />
            <img src={img4} alt="TypeScript" className="w-16 h-auto" />
            <img src={img5} alt="React Router" className="w-16 h-auto" />
        </div>
        <div className="flex justify-center items-center space-x-8 pt-16 text-white text-2xl">
            <span>React</span>
            <span>+</span>
            <span>Vite</span>
            <span>+</span>
            <span>Tailwind</span>
            <span>+</span>
            <span>TypeScript</span>
            <span>+</span>
            <span>React Router</span>
        </div>
        <div className="flex flex-col items-center  pt-4 text-white">
            <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-500 font-bold text-sm">TEMPLATE</span>
            <span className="text-xs pt-48">Developed by</span>
            <a href="https://github.com/paulfloresdev" className="flex flex-col items-center">
                <img src={img6} alt="Vite" className="w-8 h-auto pt-6" />
                <span className="text-xs font-bold text-gray-500 pt-2 underline hover:text-gray-300">paulfloresdev</span>
            </a>
            
        </div>

        
    </>
};

export default Home;