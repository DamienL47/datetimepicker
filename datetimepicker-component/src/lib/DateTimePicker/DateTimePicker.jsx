import s from "./style.module.css";
import { Calendar } from "../Calendar/Calendar";
import { TimePicker } from "../TimePicker/TimePicker";

export function DateTimePicker({ dateTime, setDateTime, showTime = true }) {
  const handleDateChange = (date) => {
    setDateTime({ ...dateTime, date });
  };

  const handleTimeChange = (time) => {
    setDateTime({ ...dateTime, time });
  };

  return (
    <div className={s.dateTimePicker}>
      <Calendar date={dateTime.date} setDate={handleDateChange} />
      {showTime && (
        <TimePicker time={dateTime.time} setTime={handleTimeChange} />
      )}
    </div>
  );
}
