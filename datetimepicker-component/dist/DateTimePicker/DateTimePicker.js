"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePicker = DateTimePicker;
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
var _Calendar = require("../Calendar/Calendar");
var _TimePicker = require("../TimePicker/TimePicker");
function DateTimePicker(_ref) {
  let {
    value,
    onChange,
    formatDate,
    formatTime,
    showTime,
    language,
    disabledDates,
    disabledDaysOfWeek,
    disabledHours
  } = _ref;
  const [showPopup, setShowPopup] = (0, _react.useState)(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleDateTimeChange = newDateTime => {
    if (showTime && !newDateTime.time) {
      newDateTime.time = value.time || (0, _moment.default)().startOf("hour").toDate();
    }
    onChange(newDateTime);
    if (!showTime) {
      togglePopup();
    }
  };
  const displayValue = () => {
    if (!value || !value.date) return "";
    const formattedDate = (0, _moment.default)(value.date).format(formatDate);
    const formattedTime = showTime && value.time ? " ".concat((0, _moment.default)(value.time).format(formatTime)) : "";
    return formattedDate + formattedTime;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _styleModule.default.dateTimePickerContainer
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: displayValue(),
    onClick: togglePopup,
    readOnly: true,
    className: _styleModule.default.inputField
  }), showPopup && /*#__PURE__*/_react.default.createElement("div", {
    className: _styleModule.default.popup
  }, /*#__PURE__*/_react.default.createElement(_Calendar.Calendar, {
    date: value.date || (0, _moment.default)().toDate(),
    setDate: newDate => handleDateTimeChange({
      ...value,
      date: newDate
    }),
    showTime: showTime,
    disabledDates: disabledDates,
    disabledDaysOfWeek: disabledDaysOfWeek,
    language: language
  }), showTime && /*#__PURE__*/_react.default.createElement(_TimePicker.TimePicker, {
    time: value.time || (0, _moment.default)().startOf("hour").toDate(),
    setTime: newTime => handleDateTimeChange({
      ...value,
      time: newTime
    }),
    formatTime: formatTime,
    disabledHours: disabledHours
  })));
}