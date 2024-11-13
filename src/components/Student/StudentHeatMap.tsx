import { FC } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./style.css";

interface StudentHeatmapInterface {
  startDate: string;
  endDate: string;
  data: any;
}

// Define the functional component using the interface
const StudentHeatMap: FC<StudentHeatmapInterface> = ({
  startDate,
  endDate,
  data,
}) => {
  console.log(data);

  const values = [
    { date: "2024-01-01", count: 1 },
    // { date: "2024-01-02", count: 3 },
    { date: "2024-01-03", count: 2 },
    { date: "2024-01-04", count: 4 },
    { date: "2024-01-05", count: 3 },
    { date: "2024-01-06", count: 2 },
    { date: "2024-01-07", count: 1 },
    { date: "2024-01-08", count: 2 },
    { date: "2024-01-09", count: 2 },
    { date: "2024-01-10", count: 4 },
    { date: "2024-01-11", count: 1 },
    // { date: "2024-01-12", count: 5 },
    { date: "2024-01-13", count: 3 },
    { date: "2024-01-14", count: 3 },
    { date: "2024-01-15", count: 2 },
    { date: "2024-01-16", count: 4 },
    { date: "2024-01-17", count: 1 },
    { date: "2024-01-18", count: 3 },
    { date: "2024-01-19", count: 1 },
    { date: "2024-01-20", count: 4 },
    { date: "2024-01-21", count: 2 },
    { date: "2024-01-22", count: 2 },
    { date: "2024-01-23", count: 1 },
    { date: "2024-01-24", count: 3 },
    // { date: "2024-01-25", count: 2 },
    { date: "2024-01-26", count: 2 },
    // { date: "2024-01-27", count: 7 },
    { date: "2024-01-28", count: 3 },
    { date: "2024-01-29", count: 4 },
    // { date: "2024-01-30", count: 6 },
    { date: "2024-01-31", count: 3 },
    { date: "2024-02-01", count: 3 },
    { date: "2024-02-02", count: 2 },
    { date: "2024-02-03", count: 1 },
    { date: "2024-02-04", count: 1 },
    // { date: "2024-02-05", count: 7 },
    { date: "2024-02-06", count: 4 },
    { date: "2024-02-07", count: 2 },
    { date: "2024-02-08", count: 1 },
    { date: "2024-02-09", count: 3 },
    // { date: "2024-02-10", count: 6 },
    { date: "2024-02-11", count: 2 },
    { date: "2024-02-12", count: 4 },
    // { date: "2024-02-13", count: 8 },
    { date: "2024-02-14", count: 2 },
    { date: "2024-02-15", count: 3 },
    { date: "2024-02-16", count: 1 },
    { date: "2024-02-17", count: 2 },
    { date: "2024-02-18", count: 1 },
    { date: "2024-02-19", count: 4 },
    // { date: "2024-02-20", count: 1 },
    { date: "2024-02-21", count: 3 },
    { date: "2024-02-22", count: 1 },
    { date: "2024-02-23", count: 1 },
    { date: "2024-02-24", count: 2 },
    { date: "2024-02-25", count: 4 },
    { date: "2024-02-26", count: 1 },
  ];

  return (
    <div className="w-[100vw] overflow-x-auto">
      {/* You can render the startDate, endDate, and data here */}
      <h1>
        Heatmap from {startDate} to {endDate}
      </h1>
      <div className="flex flex-col w-[1000px] pr-5 my-8 overflow-x-scroll ">
        <div className="calendar-container">
          <CalendarHeatmap
            startDate={"2024-01-01"}
            endDate={"2024-11-13"}
            values={values}
            classForValue={(value:any) => {
                if (!value) return "empty-value";
                return `color-scale-${value.count}`;
            }}
            showWeekdayLabels
            monthLabels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            gutterSize={2}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentHeatMap;
