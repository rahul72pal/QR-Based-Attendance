// import { StrictMode } from "react";
// import ReactDOM from "react-dom";

import Slider from "./Slider";

import data from "./data";
import "./style.css";

export const SliderCursol = ()=>{
    return(
        <div className="mt-6">
      <Slider data={data} activeSlide={2} />
    </div>
    )
}
