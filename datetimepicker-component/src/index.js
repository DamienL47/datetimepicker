import React from "react";
import ReactDOM from "react-dom";
import { DateTimePicker } from "./lib/DateTimePicker/DateTimePicker";
import moment from "moment";

const App = () => {
  return (
    <div>
      <DateTimePicker dateTime={moment} setDateTime={moment} showTime={false} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
