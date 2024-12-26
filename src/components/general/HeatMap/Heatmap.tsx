import React from "react";
import Month from "./Month";

type DayData = {
  date: string; // ISO date string
  count: number; // Activity count
};

interface HeatmapProps {
  data: DayData[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  // Group data by month-year (e.g., "December-2024")
  const groupedData = data.reduce((acc: Record<string, DayData[]>, curr) => {
    const date = new Date(curr.date);
    const yearMonth = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`; // Format: "2024-12"

    if (!acc[yearMonth]) acc[yearMonth] = [];
    acc[yearMonth].push(curr);

    return acc;
  }, {});

  return (
    <div className="flex border pl-[200px] bg-[#0F1725] gap-4 justify-center items-center w-[100%] px-6 mx-auto overflow-x-scroll ">
      {Object.entries(groupedData).map(([yearMonth, daysData]) => {
        const [year, month] = yearMonth.split("-");
        const monthName = new Date(
          Number(year),
          Number(month) - 1
        ).toLocaleString("en-US", { month: "long" });

        return (
          <Month
            key={yearMonth}
            name={`${monthName}-${year}`}
            year={Number(year)}
            monthIndex={Number(month) - 1}
            daysData={daysData}
          />
        );
      })}
    </div>
  );
};

export default Heatmap;
