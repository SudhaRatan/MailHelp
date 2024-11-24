/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface WeekRangeSwitcherProps {
  onRangeChange: (range: DateRange) => void;
}

const WeekRangeSwitcher = ({ onRangeChange }: WeekRangeSwitcherProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // const getWeekRange = (date: Date): DateRange => {
  //   const start = new Date(date);
  //   const day = start.getDay();
  //   // Convert to Monday (1) from current day
  //   // If Sunday (0), go back 6 days, else go back to closest Monday
  //   start.setDate(start.getDate() - (day === 0 ? 6 : (day - 1)));
    
  //   const end = new Date(start);
  //   end.setDate(start.getDate() + 6); // Add 6 days to get to Sunday
    
  //   // Ensure start is set to beginning of day and end to end of day
  //   start.setHours(0, 0, 0, 0);
  //   end.setHours(23, 59, 59, 999);
    
  //   return {
  //     start,
  //     end,
  //     weekNumber: getWeekNumber(start)
  //   };
  // };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  // const getWeekNumber = (date: Date) => {
  //   const target = new Date(date);
  //   const firstDayOfYear = new Date(target.getFullYear(), 0, 1);
  //   const dayNr = Math.ceil(
  //     (target.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)
  //   );
  //   const weekNr = Math.ceil((dayNr + firstDayOfYear.getDay() - 1) / 7);
  //   return weekNr;
  // };

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  // Calculate current range and emit changes
  const range = useMemo(() => {
    const start = new Date(currentDate);
    const day = start.getDay();
    // Convert to Monday (1) from current day
    // If Sunday (0), go back 6 days, else go back to closest Monday
    start.setDate(start.getDate() - (day === 0 ? 6 : (day - 1)));
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Add 6 days to get to Sunday
    
    // Ensure start is set to beginning of day and end to end of day
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    
    return {
      start,
      end,
    };
  }, [currentDate]);

  // Emit range changes whenever currentDate changes
  useEffect(() => {
    onRangeChange(range);
  }, [range]);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md max-h-[70px]">
      <div className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <button 
            onClick={() => navigateWeek(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Previous week"
          >
            <svg 
              className="w-4 h-4 text-gray-600" 
              fill="none" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold text-gray-800">
              {formatDate(range.start)} - {formatDate(range.end)}
            </div>
          </div>

          <button 
            onClick={() => navigateWeek(1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Next week"
          >
            <svg 
              className="w-4 h-4 text-gray-600" 
              fill="none" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekRangeSwitcher;