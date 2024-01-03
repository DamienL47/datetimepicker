import React from "react";
import s from "./style.module.css";
import { FORMAT_TIME } from "../Constants";

export function TimePicker({ time, setTime, disabledHours = [], formatTime }) {
  if (!time) {
    return null;
  }

  const showSeconds = formatTime.includes("ss");

  const handleTimeChange = (e, unit) => {
    setTime({ ...time, [unit]: parseInt(e.target.value, 10) });
  };

  const generateOptions = (min, max, disabledValues = []) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      if (!disabledValues.includes(i)) {
        options.push(
          <option key={i} value={i}>
            {i.toString().padStart(2, "0")}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <div className={s.timePicker}>
      {!showSeconds ? (
        <>
          <select
            value={time.hour}
            onChange={(e) => handleTimeChange(e, "hour")}
            className={s.selector}
          >
            {generateOptions(0, 23, disabledHours)}
          </select>
          <span className={s.separator}>:</span>
          <select
            value={time.minute}
            onChange={(e) => handleTimeChange(e, "minute")}
            className={s.selector}
          >
            {generateOptions(0, 59)}
          </select>
        </>
      ) : (
        <>
          <select
            value={time.hour}
            onChange={(e) => handleTimeChange(e, "hour")}
          >
            {generateOptions(0, 23, disabledHours)}
          </select>
          <span>:</span>
          <select
            value={time.minute}
            onChange={(e) => handleTimeChange(e, "minute")}
          >
            {generateOptions(0, 59)}
          </select>
          {showSeconds && (
            <>
              <span>:</span>
              <select
                value={time.second}
                onChange={(e) => handleTimeChange(e, "second")}
              >
                {generateOptions(0, 59)}
              </select>
            </>
          )}
        </>
      )}
    </div>
  );
}
