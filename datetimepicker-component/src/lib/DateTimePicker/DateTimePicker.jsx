import React, { useState } from "react";
import moment from "moment";
import s from "./style.module.css";
import { Calendar } from "../Calendar/Calendar";
import { TimePicker } from "../TimePicker/TimePicker";
import { FORMAT_DATE, FORMAT_TIME } from "../Constants";

export function DateTimePicker({
  value,
  onChange,
  formatDate,
  formatTime,
  showTime,
  language,
  disabledDates,
  disabledDaysOfWeek,
  disabledHours,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDateTimeChange = (newDateTime) => {
    if (showTime && !newDateTime.time) {
      newDateTime.time = value.time || moment().startOf("hour").toDate();
    }
    onChange(newDateTime);
    if (!showTime) {
      togglePopup();
    }
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
            date={value.date || moment().toDate()}
            setDate={(newDate) =>
              handleDateTimeChange({ ...value, date: newDate })
            }
            showTime={showTime}
            disabledDates={disabledDates}
            disabledDaysOfWeek={disabledDaysOfWeek}
            language={language}
          />
          {showTime && (
            <TimePicker
              time={value.time || moment().startOf("hour").toDate()}
              setTime={(newTime) =>
                handleDateTimeChange({ ...value, time: newTime })
              }
              formatTime={formatTime}
              disabledHours={disabledHours}
            />
          )}
        </div>
      )}
    </div>
  );
}
