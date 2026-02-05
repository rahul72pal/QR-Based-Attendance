// import Class from "@/components/class/Class";
// import { StudentDataTable } from "@/components/Student Table/data-table";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { SliderCursol } from '../components/pages/Home/Slider/index'
import ServiceSection from "@/components/pages/Home/service/ServiceSection";
import Benefits from "@/components/pages/Home/Benefits/Benefits";
import Footer from "@/components/pages/Home/Footer/Footer";
// import DatePicker from "@/components/general/DatePicker";
// import {students} from '../components/Student Table/StudentData'
// import {columns} from '../components/Student Table/columns'

const Home: React.FC = () => {
  // const [date, setDate] = useState<Date | undefined>()
  // const router = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 text-center relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-title tracking-tight leading-tight">
            Smart <span className="text-primary">QR Attendance</span> <br />
            Made Simple
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Track student attendance effortlessly with our innovative QR-based system. <br className="hidden md:block" />
            Perfect for educators, institutions, and events.
          </p>
        </div>

        {/* Slider Section */}
        <div className="w-full max-w-6xl mx-auto">
          <SliderCursol />
        </div>
      </section>

      {/* Services Section */}
      <div id="services">
        <ServiceSection />
      </div>

      {/* Benefits Section */}
      <div id="features">
        <Benefits />
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Home;