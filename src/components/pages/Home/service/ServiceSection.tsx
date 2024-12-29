// import React from "react";

// type Props = {}

const ServiceSection = () => {
  return (
    <div className="flex flex-col mx-auto">
      <h1 className="text-4xl text-center py-7 text-yellow-400">Our service</h1>

      <div className="w-[70%] sm:w-[100%] mx-auto">

        {/* card 1 */}
        <div className="flex w-full justify-center items-center">
          {/* image  */}
          <div className="w-[100%] flex justify-center items-center rounded-xl p-5">
            <img src="./assets/img1.png" className="w-80 h-80 sm:w-40 sm:h-40 rounded-xl " alt="" />
          </div>

          {/* text  */}
          <div className="w-[100%]">
            <h2 className="text-xl text-center">Easy to Use</h2>
            <p className="text-sm leading-6 py-6 italic">
              GWL QR Attendance makes tracking attendance effortless. Just scan
              the QR code, and the system does the rest! Perfect for schools,
              offices, and events looking for quick, accurate, and hassle-free
              solutions.
            </p>
          </div>
        </div>

        {/* card 2 */}
        <div className="flex flex-row-reverse w-full justify-center items-center">
          {/* image  */}
          <div className="w-[100%] flex justify-center items-center rounded-xl p-5">
            <img src="./assets/img2.png" className="w-80 h-80 sm:w-40 sm:h-40 rounded-xl " alt="" />
          </div>

          {/* text  */}
          <div className="w-[100%]">
            <h2 className="text-xl">Smart and Efficient</h2>
            <p className="text-sm leading-6 py-6 italic">
            Simplify attendance with GWL QR Attendance. Our system uses QR codes for instant tracking, ensuring accuracy and saving time. Ideal for organizations that value precision and productivity.
            </p>
          </div>
        </div>

        {/* card 3 */}
        <div className="flex flex-row w-full justify-center items-center">
          {/* image  */}
          <div className="w-[100%] flex justify-center items-center rounded-xl p-5">
            <img src="./assets/img3.png" className="w-80 h-80 sm:w-40 sm:h-40 rounded-xl " alt="" />
          </div>

          {/* text  */}
          <div className="w-[100%]">
            <h2 className="text-xl">Quick and Reliable</h2>
            <p className="text-sm leading-6 py-6 italic">
            Say goodbye to manual attendance hassles! GWL QR Attendance offers a fast, secure, and reliable way to manage attendance through QR code technology, perfect for modern institutions and workplaces.
            </p>
          </div>
        </div>

        {/* card 4 */}
        <div className="flex flex-row-reverse w-full justify-center items-center">
          {/* image  */}
          <div className="w-[100%] flex justify-center items-center rounded-xl p-5">
            <img src="./assets/img4.png" className="w-80 h-80 sm:w-40 sm:h-40 rounded-xl " alt="" />
          </div>

          {/* text  */}
          <div className="w-[100%]">
            <h2 className="text-xl">Seamless Tracking</h2>
            <p className="text-sm leading-6 py-6 italic">
            GWL QR Attendance provides a seamless solution for attendance management. With real-time QR code scanning, you can ensure error-free records and enhance overall efficiency in your organization.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceSection;
