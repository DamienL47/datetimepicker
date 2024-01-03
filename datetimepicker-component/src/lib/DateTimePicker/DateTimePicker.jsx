import React, { useState } from "react";
import moment from "moment";
import s from "./style.module.css";
import { Calendar } from "../Calendar/Calendar";
import { TimePicker } from "../TimePicker/TimePicker";
import { FORMAT_DATE, FORMAT_TIME } from "../Constants";

export function DateTimePicker({
  value,
  onChange,
  formatDate = FORMAT_DATE[0],
  formatTime = FORMAT_TIME[1],
  showTime = true,
  // ...autres props
}) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDateChange = (newDate) => {
    onChange({ ...value, date: newDate });
    if (!showTime) {
      togglePopup();
    }
  };

  const handleTimeChange = (newTime) => {
    onChange({ ...value, time: newTime });
    togglePopup();
  };

  const displayValue = () => {
    if (!value || !value.date) return "";
    const formattedDate = moment(value.date).format(formatDate);
    const formattedTime =
      showTime && value.time ? ` ${moment(value.time).format(formatTime)}` : "";
    return formattedDate + formattedTime;
  };

  return (
    <div className={s.dateTimePickerContainer}>
      <input
        type="text"
        value={displayValue()}
        onClick={togglePopup}
        readOnly
        className={s.inputField}
      />
      {showPopup && (
        <div className={s.popup}>
          <Calendar
            date={value.date}
            setDate={handleDateChange}
            // ...autres props de Calendar
          />
          {showTime && (
            <TimePicker
              time={value.time}
              setTime={handleTimeChange}
              // ...autres props de TimePicker
            />
          )}
        </div>
      )}
    </div>
  );
}
