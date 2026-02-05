// import React from "react";

// type Props = {}

const ServiceSection = () => {
  const services = [
    {
      title: "Easy to Use",
      desc: "Experience a seamless interface designed for efficiency. Our intuitive layout ensures you can manage attendance with zero learning curve.",
      img: "./assets/img1.png",
      reverse: false,
    },
    {
      title: "Keep Track of Everyone",
      desc: "Real-time monitoring capabilities allow you to oversee attendance patterns instantly. Stay informed with live updates and detailed reporting.",
      img: "./assets/img2.png",
      reverse: true,
    },
    {
      title: "Insightful Analytics",
      desc: "Gain valuable insights with our comprehensive analytics tools. Visualize data trends to make informed decisions for your organization.",
      img: "./assets/img3.png",
      reverse: false,
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-title text-gradient-gold mb-6 tracking-tight">
            Our Service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how Attendify transforms attendance management with powerful features and intuitive design.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${service.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-16`}
            >
              {/* Image section using glass card effect */}
              <div className="w-full lg:w-1/2 flex justify-center perspective-1000">
                <div className="relative group w-full max-w-lg">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative glass-card p-4 rounded-3xl transform transition duration-500 hover:scale-[1.02] hover:rotate-1">
                    <img
                      src={service.img}
                      className="w-full h-auto rounded-2xl shadow-lg"
                      alt={service.title}
                    />
                  </div>
                </div>
              </div>

              {/* Text section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold font-title text-foreground">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {service.desc}
                </p>
                <div className="flex justify-center lg:justify-start">
                  <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
