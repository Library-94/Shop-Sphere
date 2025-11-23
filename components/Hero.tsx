import React, { useState } from 'react';

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/Gw/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574598342_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/Nov/Unrec/Resized/3000/Unrec_3000_Under_499_std._CB542056769_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img2020/img21/apparelGW/augatf23/unrec/citi/pc-1_2x._CB580502462_.jpg"
  ];

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative w-full max-w-[1500px] mx-auto">
      <div className="relative overflow-hidden">
        {/* Gradient Overlay to blend into page bg */}
        <div className="absolute w-full h-1/2 bottom-0 bg-gradient-to-b from-transparent to-[#E3E6E6] z-10 pointer-events-none"></div>
        
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((s, i) => (
            <img key={i} src={s} alt={`Slide ${i}`} className="w-full object-cover min-h-[250px] sm:min-h-[300px] md:min-h-[600px]" 
                style={{maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'}}
            />
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-2 sm:left-8 top-1/4 sm:top-1/3 z-20 h-40 sm:h-60 px-2 focus:outline-none group">
             <span className="border-2 border-transparent group-hover:border-white rounded p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-gray-700 group-hover:text-amazon-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </span>
        </button>
        <button onClick={nextSlide} className="absolute right-2 sm:right-8 top-1/4 sm:top-1/3 z-20 h-40 sm:h-60 px-2 focus:outline-none group">
            <span className="border-2 border-transparent group-hover:border-white rounded p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-gray-700 group-hover:text-amazon-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </span>
        </button>
      </div>
    </div>
  );
};