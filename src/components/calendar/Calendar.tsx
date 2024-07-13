// File: src/components/calendar/Calendar.tsx
import { useState, useEffect } from "react";
import { now, months } from "../../utils/tools";
import Day from "./Day";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { capFirstLetter, monthName, dayName } from "../../utils/tools";
import { Dayjs } from "dayjs";
import { SelectedDay } from "../../types/types";
import { BsCalendarEvent } from "react-icons/bs";
import "./Calendar.css";

let index: number = now.weekOfMonth;
let month: number = now.month;
let unselected: SelectedDay = {
  date: -1,
  month: -1,
  year: -1
};

interface CalendarProps {
  onSelectDay: (selectedDay: SelectedDay) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDay }) => {
  const [days, setDays] = useState<Dayjs[]>(months()[now.weekOfMonth]);
  const [selected, setSelected] = useState<SelectedDay>(unselected);

  useEffect(() => {
    onSelectDay(selected);
  }, [selected, onSelectDay]);

  const selectDay = (d: number, m: number, y: number): void => {
    if (d === selected.date && m === selected.month && y === selected.year) {
      setSelected(unselected);
      return;
    }
    setSelected({ date: d, month: m, year: y });
  };

  const navigate = (nav: boolean): void => {
    if (nav) {
      index++;
      if (index > 4) {
        index = 0;
        month++;
        if (days[0].date() === months(month)[index][0].date()) {
          index++;
        }
      }
    } else {
      index--;
      if (index < 0) {
        index = 4;
        month--;
        if (days[0].date() === months(month)[index][0].date()) {
          index--;
        }
      }
    }
    setDays(months(month)[index]);
  };

  const reset = (): void => {
    setDays(months()[now.weekOfMonth]);
    index = now.weekOfMonth;
    month = now.month;
  };

  return (
    <div className="calendar">
      <div className="navbar">
        <FiArrowLeft onClick={() => navigate(false)} className="btn medium-sz dark" />
        <FiArrowRight onClick={() => navigate(true)} className="btn medium-sz dark" />
        <h1 className="dark ms-5 month">
          {capFirstLetter(monthName(days[0].month() + 1))} {days[0].year()}
        </h1>
        <button className="reset-today todat" onClick={reset}>
          <BsCalendarEvent className="me-5" />
          Today
        </button>
      </div>
      <div className="navbar-days">
        {days.map((day) => (
          <Day
            key={day.day()}
            day={dayName(day.day())}
            date={day.date()}
            month={day.month()}
            year={day.year()}
            today={day.date() === now.date && day.month() === now.month && day.year() === now.year}
            handlerSelect={selectDay}
            selected={day.date() === selected.date && day.month() === selected.month && day.year() === selected.year}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
