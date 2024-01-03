import React, { useState, useEffect } from "react";
import moment from "moment";
import s from "./style.module.css";
import { FORMAT_DATE, FORMAT_TIME } from "../Constants";
import { TimePicker } from "../TimePicker/TimePicker";

export function Calendar({
  date,
  setDate,
  disabledDates = [],
  disabledDaysOfWeek = [],
  range = false,
  language = "en",
  formatDate = FORMAT_DATE[0],
  showTime = true,
  formatTime = FORMAT_TIME[0],
}) {
  useEffect(() => {
    moment.locale(language);
  }, [language]);

  const [currentDate, setCurrentDate] = useState(
    date ? moment(date) : moment()
  );
  const [showTimePicker, setShowTimePicker] = useState(true);

  useEffect(() => {
    setCurrentDate(date ? moment(date) : moment());
  }, [date]);

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
      setDate({ ...date, date: selectedDate });
      if (!showTime) {
        setShowTimePicker(false);
      }
    }
  };

  const handleTimePickerToggle = () => {
    setShowTimePicker(!showTimePicker);
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

  const renderDays = () => daysOfWeek.map((day) => <div key={day}>{day}</div>);

  const renderCells = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = getFirstDayOfMonth();
    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-start-${i}`} className={s.cell}></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      cells.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`${s.cell} ${isDisabled ? s.disabled : ""}`}
        >
          {day}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className={s.calendarContainer}>
      <div className={s.header}>
        {renderYearSelector()}
        {renderMonthSelector()}
        {showTime && (
          <button
            onClick={handleTimePickerToggle}
            className={s.timePickerToggle}
          >
            {showTimePicker ? "Hide Time" : "Pick Time"}
          </button>
        )}
      </div>
      <div className={s.days}>{renderDays()}</div>
      <div className={s.cells}>{renderCells()}</div>
      <div className={s.times}>
        {showTimePicker && showTime && (
          <TimePicker
            time={date.time}
            setTime={(newTime) => setDate({ ...date, time: newTime })}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
}
