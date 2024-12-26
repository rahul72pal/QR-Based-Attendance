import React from "react";

interface DayProps {
  date: any;
  count: any;
}

const Day: React.FC<DayProps> = ({ date, count }) => {
  const dayNumber = new Date(date).getDate();
  // Set background color based on count
  const backgroundColor = count === 0 ? "red" : count === 1 ? "#63cb44" : "#162338";

  return (
    <div
      title={`${date}: ${count === -1 ? "No data" : count}`}
      style={{
        backgroundColor,
      }}
      className="w-[30px] h-[30px] text-center"
    >
      {dayNumber}
    </div>
  );
};

export default Day;
