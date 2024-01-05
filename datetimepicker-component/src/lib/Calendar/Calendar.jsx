import React, { useState, useEffect } from "react";
import moment from "moment";
import s from "./style.module.css";

export function Calendar({
  date,
  setDate,
  disabledDates = [],
  disabledDaysOfWeek = [],
  language = "en",
  showTime,
}) {
  useEffect(() => {
    moment.locale(language);
  }, [language]);

  const [currentDate, setCurrentDate] = useState(
    date ? moment(date) : moment()
  );

  useEffect(() => {
    setCurrentDate(date ? moment(date) : moment());
  }, [date]);

  const setCurrentDateToToday = () => {
    const today = moment();
    if (!isDateDisabled(today.date())) {
      setDate(today);
    }
  };

  const daysOfWeek = moment.weekdaysShort();
  const monthNames = moment.months();

  const getDaysInMonth = () => currentDate.daysInMonth();
  const getFirstDayOfMonth = () => currentDate.clone().startOf("month").day();

  const isDateDisabled = (day) => {
    const checkDate = currentDate.clone().date(day);
    const dayOfWeek = checkDate.day();
    const formattedDate = checkDate.format("YYYY-MM-DD");

    return (
      disabledDaysOfWeek.includes(dayOfWeek) ||
      disabledDates.includes(formattedDate)
    );
  };

  const handleDateClick = (day) => {
    const selectedDate = currentDate.clone().date(day);
    if (!isDateDisabled(day)) {
      setDate(selectedDate);
    }
  };

  const renderMonthSelector = () => (
    <select
      value={currentDate.month()}
      onChange={(e) =>
        setCurrentDate(currentDate.clone().month(e.target.value))
      }
      className={s.selector}
    >
      {monthNames.map((month, index) => (
        <option key={month} value={index}>
          {month}
        </option>
      ))}
    </select>
  );

  const renderYearSelector = () => {
    const currentYear = currentDate.year();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
    return (
      <select
        value={currentYear}
        onChange={(e) =>
          setCurrentDate(currentDate.clone().year(e.target.value))
        }
        className={s.selector}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  const renderDays = () =>
    daysOfWeek.map((day) => (
      <div key={day} className={s.dayOfWeek}>
        {day}
      </div>
    ));

  const renderCells = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = getFirstDayOfMonth();
    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-start-${i}`} className={s.emptyCell}></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      cells.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`${showTime ? s.cell : s.cellSTF} ${
            isDisabled ? s.disabledCell : ""
          }`}
        >
          {day}
        </div>
      );
    }
    return cells;
  };

  const calendarClass = showTime ? s.calendarContainer : s.calendarContainerSTF;

  return (
    <div className={calendarClass}>
      <div className={showTime ? s.header : s.headerSTF}>
        {renderMonthSelector()}
        {renderYearSelector()}
        <button className={s.button} onClick={setCurrentDateToToday}>
          Today
        </button>
      </div>
      <div className={showTime ? s.days : s.daysSTF}>{renderDays()}</div>
      <div className={showTime ? s.cells : s.cellsSTF}>{renderCells()}</div>
    </div>
  );
}
