// import React from 'react';
import { Button } from '@/components/ui/button';
import { FaClock, FaUserCheck, FaSyncAlt, FaCloud, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Benefits = () => {
  const router = useNavigate();
  const list = [
    {
      title: "Accessible Anytime, Anywhere",
      icon: <FaCloud />,
      desc: "Manage attendance from any device, anywhere in the world.",
    },
    {
      title: "Monitoring",
      icon: <FaUserCheck />,
      desc: "Keep parents informed with real-time updates and notifications.",
    },
    {
      title: "Real-Time Updates",
      icon: <FaSyncAlt />,
      desc: "Instant data synchronization across all your devices.",
    },
    {
      title: "24/7 Access",
      icon: <FaClock />,
      desc: "Round-the-clock access to all your attendance records.",
    },
    {
      title: "Secure Scanning",
      icon: <FaShieldAlt />,
      desc: "Encrypted QR codes ensure data integrity and prevent fraud.",
    },
    {
      title: "Instant Reports",
      icon: <FaChartBar />,
      desc: "Generate comprehensive reports with just a single click.",
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-title text-gradient-gold mb-6">
            Key Benefits
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Why choose Attendify? Because we deliver reliability, speed, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {list.map((item, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center border-white/5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300 shadow-glow">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-title text-foreground mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            className="bg-primary text-primary-foreground hover:bg-white hover:text-background font-bold px-10 py-6 text-lg rounded-full shadow-glow transition-all duration-300 transform hover:scale-105"
            onClick={() => router('/pricing')}
          >
            Check Our Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
