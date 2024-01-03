// import React from "react";
// import ReactDOM from "react-dom";
// import { DateTimePicker } from "./lib/DateTimePicker/DateTimePicker";
// import moment from "moment";

// const App = () => {
//   return (
//     <div>
//       <DateTimePicker dateTime={moment} setDateTime={moment} showTime={true} />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("root"));

//test

import React, { useState } from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<App />, document.getElementById("root"));
