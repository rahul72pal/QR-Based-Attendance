// import React from 'react';
import { Button } from '@/components/ui/button';
import { FaClock, FaUserCheck, FaSyncAlt, FaCloud, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Benefits = () => {
  const router = useNavigate();
  const list = [
    {
      title: "Accessible Anytime, Anywhere",
      icon: <FaCloud />, // Cloud icon for accessibility
    },
    {
      title: "Parents Can Monitor Attendance",
      icon: <FaUserCheck />, // User-check icon for parental monitoring
    },
    {
      title: "Real-Time Data Updates",
      icon: <FaSyncAlt />, // Sync icon for real-time updates
    },
    {
      title: "24/7 Access to Attendance Records",
      icon: <FaClock />, // Clock icon for 24/7 access
    },
    {
      title: "Secure QR Code Scanning for Accuracy",
      icon: <FaShieldAlt />, // Shield icon for security
    },
    {
      title: "Instant Reports and Real-Time Insights",
      icon: <FaChartBar />, // Chart bar icon for reports and insights
    },
  ];

  return (
    <div className='w-[70%] sm:w-[100%] sm:my-6 mx-auto'>
      <h1 className='text-4xl text-center py-8 text-yellow-400'>Benefits</h1>

      <div className=''>
        <ul className='flex flex-col gap-6  w-fit sm:mx-auto'>
          {list.map((item, index) => (
            <li key={index} className='flex gap-3 items-center'>
              <span className='text-2xl sm:text-lg'>{item.icon} </span><span className='text-lg sm:text-sm'>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className=' text-center my-8'>
       <Button className='text-white font-bold' onClick={()=>router('/pricing')}>Check Our Pricing</Button>
      </div>
    </div>
  );
};

export default Benefits;
