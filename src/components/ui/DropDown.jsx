import React from 'react';

const DropDown = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="flex flex-col text-center ">
      <label htmlFor="dropdown" className="text-white">
        {label}
      </label>
      <select
        id="dropdown"
        value={selectedValue}
        onChange={onChange}
        className="bg-gray-800 px-6 text-lg text-white rounded-full" // Optional styling
      >
        <option value="">Classes</option>
        {options.map((option) => (
          <option className='px-0 py-1 text-sm' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;