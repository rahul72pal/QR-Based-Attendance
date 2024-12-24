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
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
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
    <>
      {/* Carousel */}
      <div
        className="slideC mt-5 hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.data.map((item: any, i: any) => (
          <React.Fragment key={item.id}>
            <div
              className="slide"
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
      <div className="btns -mt-7 flex justify-center items-center">
        <GrPrevious className="btn text-2xl" onClick={prev} />
        <GrNext className="btn text-2xl" onClick={next} />
      </div>
    </>
  );
};

const SliderContent = (props: any) => {
  return (
    <div
      className="sliderContent rounded-lg relative mt-9 pt-7 shadow-lg shadow-white"
      style={{
        backgroundImage: `url(${props.icon})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <h2 className="text-white text-3xl font-bold">{props.title}</h2>
        <p className="text-gray-200 text-xs leading-5">{props.desc}</p>
      </div>
    </div>
  );
};
