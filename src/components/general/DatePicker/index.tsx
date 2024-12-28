import { useEffect, useState, useMemo } from "react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  const [year, setYear] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [daysNumber, setDaysNumber] = useState<number>(0);
  // const [selectDay, setSelectDay] = useState<number>(0);
  const [opendaysbox, setOpendaysbox] = useState<boolean>(false);

  console.log(date)

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
  };

  const getDaysInMonth = (month: number, year: number) => {
    setOpendaysbox(true)
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    if (year && month) {
      const days = getDaysInMonth(Number(month), Number(year));
      setDaysNumber(days);
    }
  }, [month, year]);

  const handleClickDay = (day: number) => {
    // setSelectDay(day);
    const adjustedMonth = Number(month) - 1; // Adjust month to be zero-based
    const newDate = new Date(Number(year), adjustedMonth, day);

    // Update the date in the parent component
    setDate(newDate);
    setOpendaysbox(false);
  };

  const daysArray = useMemo(() => {
    return Array.from({ length: daysNumber }, (_, index) => index + 1);
  }, [daysNumber]);

  return (
    <div className="bg-[#000814]  text-white flex flex-col justify-center items-center relative">
      <div className="bg-[#000814]  text-white flex gap-3 py-3">
        <select className="bg-[#000814] sm:text-xs w-[80px] rounded-lg text-center border text-white" name="years" id="years" onChange={handleYearChange}>
          {Array.from({ length: 30 }, (_, i) => (
            <option className="bg-[#000814]  text-white" key={i} value={1995 + i}>
              {1995 + i}
            </option>
          ))}
        </select>
        <select className="bg-[#000814] w-[80px] sm:text-xs rounded-lg text-center border text-white" name="months" id="months" onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option className="bg-[#000814]  text-white" key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "short" })}
            </option>
          ))}
        </select>
      </div>

      {opendaysbox && <div
      className="bg-[#161D29] z-10 w-[250px] gap-3 p-5 rounded-lg absolute top-[80px] text-white grid grid-rows-7 grid-cols-5 border"
      >
        {daysNumber > 0 ? (
          daysArray.map((day) => (
            <button
            className="w-[30px] bg-[#132138] border hover:scale-125 duration-300 rounded-md "
              key={day}
              onClick={() => handleClickDay(day)}
            >
              {day}
            </button>
          ))
        ) : (
          <div style={{ gridColumn: "span 5", textAlign: "center" }}>0</div>
        )}
      </div>}
    </div>
  );
}
