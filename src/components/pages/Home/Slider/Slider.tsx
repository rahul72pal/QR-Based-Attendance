import React, { useState, useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export default (props: any) => {
  const [activeSlide, setActiveSlide] = useState(props.activeSlide || 0);
  const [isHovered, setIsHovered] = useState(false);

  const next = () => {
    setActiveSlide((prev: any) =>
      prev < props.data.length - 1 ? prev + 1 : 0
    );
  };

  const prev = () => {
    setActiveSlide((prev: any) =>
      prev > 0 ? prev - 1 : props.data.length - 1
    );
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        next();
      }, 3500);

      // Clear interval on component unmount or hover
      return () => clearInterval(interval);
    }
  }, [props.data.length, isHovered]);

  const getStyles = (index: any) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <div className="relative py-12 overflow-hidden">
      {/* Carousel */}
      <div
        className="slideC mt-5 hover:cursor-pointer perspective-1000 transform-style-3d scale-[0.35] sm:scale-50 md:scale-75 lg:scale-95 xl:scale-110 origin-center transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.data.map((item: any, i: any) => (
          <React.Fragment key={item.id}>
            <div
              className="slide transition-all duration-500 ease-out"
              style={{
                ...getStyles(i),
              }}
            >
              <SliderContent {...item} />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Buttons */}
      <div className="btns flex justify-center items-center gap-8 mt-12 z-20 relative">
        <button
          className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md"
          onClick={prev}
        >
          <GrPrevious className="text-2xl" />
        </button>
        <button
          className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md"
          onClick={next}
        >
          <GrNext className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

const SliderContent = (props: any) => {
  return (
    <div
      className="sliderContent rounded-2xl relative mt-9 overflow-hidden shadow-2xl border border-border"
      style={{
        backgroundImage: `url(${props.icon})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col justify-end h-full">
        <h2 className="text-white text-3xl font-bold mb-3 font-title tracking-wide">
          {props.title}
        </h2>
        <p className="text-gray-200 text-sm leading-6 font-light">
          {props.desc}
        </p>
      </div>
    </div>
  );
};
