import React from "react";
import Day from "./Day";

export const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

interface MonthProps {
  name: string; // Month name (e.g., "December-2024")
  year: number;
  monthIndex: number; // 0-based month index
  daysData: { date: string; count: number }[];
}

const Month: React.FC<MonthProps> = ({ name, year, monthIndex, daysData }) => {
  // Calculate total days in the month
  const totalDays = daysInMonth(monthIndex + 1, year); // monthIndex is 0-based

  // Determine the starting day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();

  // Create a map for quick lookup of data
  const dayDataMap = daysData.reduce(
    (acc: Record<number, { date: string; count: number }>, day) => {
      const dayNumber = new Date(day.date).getDate();
      acc[dayNumber] = day;
      return acc;
    },
    {}
  );

  // Generate all days of the month, filling missing ones with default values
  const allDays = Array.from({ length: totalDays }, (_, i) => {
    const dayNumber = i + 1;
    const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
      dayNumber
    ).padStart(2, "0")}`;
    return dayDataMap[dayNumber] || { date, count: -1 }; // Default count -1 for missing data
  });

  // Add placeholders for days before the first day of the month
  const daysWithPlaceholders: ({ date: string; count: number } | null)[] = [
    ...Array.from({ length: firstDayOfWeek }, () => null), // Placeholder nulls
    ...allDays, // Existing days data
  ];
  

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>{name}</h3>
      {/* Days of the week header */}
      <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 30px)",
            gap: "2px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            style={{
                textAlign: "center",
                fontSize: "12px",
            }}
          >
            {day}
          </div>
        ))}
      </div>
      {/* Days in the month */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 30px)",
          gap: "2px",
        }}
      >
        {daysWithPlaceholders.map((dayData, index) =>
          dayData ? (
            <Day key={index} date={dayData.date} count={dayData.count} />
          ) : (
            <div key={index} style={{ width: "30px", height: "30px" }}></div> // Empty placeholder
          )
        )}
      </div>
    </div>
  );
};

export default Month;
