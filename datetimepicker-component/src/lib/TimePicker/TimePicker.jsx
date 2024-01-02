import s from "./style.module.css";

export function TimePicker({ time, setTime }) {
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    let intValue = parseInt(value, 10);

    // Validation des valeurs
    if (name === "hour" && (intValue < 0 || intValue > 23)) return;
    if (
      (name === "minute" || name === "second") &&
      (intValue < 0 || intValue > 59)
    )
      return;
    if (isNaN(intValue)) intValue = 0;

    setTime({ ...time, [name]: intValue });
  };

  const formatTimeValue = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className={s.timePicker}>
      <input
        type="number"
        name="hour"
        value={formatTimeValue(time.hour)}
        onChange={handleTimeChange}
        min="0"
        max="23"
      />
      <span>:</span>
      <input
        type="number"
        name="minute"
        value={formatTimeValue(time.minute)}
        onChange={handleTimeChange}
        min="0"
        max="59"
      />
      <span>:</span>
      <input
        type="number"
        name="second"
        value={formatTimeValue(time.second)}
        onChange={handleTimeChange}
        min="0"
        max="59"
      />
    </div>
  );
}
