import s from "./style.module.css";

export function Calendar({ date, setDate }) {
  const currentDate = date || {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    day: new Date().getDate(),
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getMonthName = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames;
  };

  const handleDateClick = (day) => {
    setDate({ ...currentDate, day });
  };

  const handleMonthChange = (increment) => {
    let newYear = currentDate.year;
    let newMonth = currentDate.month + increment;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setDate({ ...currentDate, month: newMonth, year: newYear });
  };

  const handleMonthSelect = (e) => {
    setDate({ ...currentDate, month: parseInt(e.target.value, 10) });
  };

  const handleYearSelect = (e) => {
    setDate({ ...currentDate, year: parseInt(e.target.value, 10) });
  };

  const renderMonthSelector = () => {
    return (
      <select value={currentDate.month} onChange={handleMonthSelect}>
        {getMonthName().map((name, index) => (
          <option key={index} value={index + 1}>
            {name}
          </option>
        ))}
      </select>
    );
  };

  const renderYearSelector = () => {
    const years = Array.from(
      { length: 10 },
      (_, i) => currentDate.year - 5 + i
    );
    return (
      <select value={currentDate.year} onChange={handleYearSelect}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  const renderDays = () => {
    return days.map((day) => <div key={day}>{day}</div>);
  };

  const renderCells = () => {
    const daysInMonth = getDaysInMonth(currentDate.month, currentDate.year);
    const firstDayOfMonth = getFirstDayOfMonth(
      currentDate.month,
      currentDate.year
    );
    const cells = [];
    let day = 1;

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-start-${i}`}></div>);
    }

    while (day <= daysInMonth) {
      cells.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={s.cell}
          style={
            day === currentDate.day &&
            currentDate.month === new Date().getMonth() + 1 &&
            currentDate.year === new Date().getFullYear()
              ? { backgroundColor: "#f0f0f0" }
              : null
          }
        >
          {day}
        </div>
      );
      day++;
    }

    return cells;
  };

  return (
    <div className={s.calendar}>
      <div className={s.header}>
        <button onClick={() => handleMonthChange(-1)} className={s.button}>
          {"<"}
        </button>
        {renderMonthSelector()}
        {renderYearSelector()}
        <button onClick={() => handleMonthChange(1)} className={s.button}>
          {">"}
        </button>
      </div>
      <div className={s.days}>{renderDays()}</div>
      <div className={s.cells}>{renderCells()}</div>
    </div>
  );
}
