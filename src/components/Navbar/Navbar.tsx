import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className='
      flex h-full w-full 
      m-0 p-4 py-4 gap-2 justify-between items-center
    '>
      {/* left box  */}
      <div className='h-full flex justify-center items-center gap-2'>
        <img 
          className='w-[40px] h-[40px] rounded-full'
          src="./assets/img12.png" 
          alt="Attendance Logo" 
        />
        <span className="leading-[20px] font-title text-[20px]">Attendance</span>
      </div>

      {/* right box  */}
      <div className='h-full flex gap-2 justify-center items-center text-xs'>
        <button className='px-2 py-3 bg-[#161D29] rounded-lg text-xs'>Login</button>
        <button className='px-2 py-3 bg-[#161D29] rounded-lg text-xs'>Sign up</button>
      </div>
    </div>
  );
}

export default Navbar;