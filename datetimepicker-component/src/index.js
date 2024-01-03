import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { DateTimePicker } from "./lib/DateTimePicker/DateTimePicker";
import moment from "moment";
import { FORMAT_DATE, FORMAT_TIME } from "./lib/Constants";
import "moment/locale/fr";

const App = () => {
  const [dateTime, setDateTime] = useState({
    date: moment(),
    time: {
      hour: moment().hour(),
      minute: moment().minute(),
      second: moment().second(),
    },
  });

  const handleDateTimeChange = (newDateTime) => {
    setDateTime(newDateTime);
  };

  return (
    <div>
      <DateTimePicker
        value={dateTime}
        onChange={handleDateTimeChange}
        showTime={false}
        formatDate={FORMAT_DATE[0]}
        formatTime={FORMAT_TIME[1]}
        language={"en"}
      />
    </div>
  );
};

// Utilisation de createRoot pour rendre l'application React
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
