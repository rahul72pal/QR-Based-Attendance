import React from 'react';

const DatePicker = ({ label, selectedDate, onChange }) => {
  return (
    <div className="flex flex-col text-center ">
      <label htmlFor="date-picker" className="text-white">
        {label}
      </label>
      <input
        type="date"
        id="date-picker"
        value={selectedDate}
        onChange={onChange} // Handle date change
        className="bg-gray-800 text-white p-2 rounded-full" // Optional styling
      />
    </div>
  );
};

export default DatePicker;