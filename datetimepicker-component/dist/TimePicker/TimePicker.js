"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = TimePicker;
var _react = _interopRequireDefault(require("react"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
function TimePicker(_ref) {
  let {
    time,
    setTime,
    disabledHours = [],
    formatTime
  } = _ref;
  if (!time) {
    return null;
  }
  const showSeconds = formatTime.includes("ss");
  const handleTimeChange = (e, unit) => {
    setTime({
      ...time,
      [unit]: parseInt(e.target.value, 10)
    });
  };
  const generateOptions = function (min, max) {
    let disabledValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    const options = [];
    for (let i = min; i <= max; i++) {
      if (!disabledValues.includes(i)) {
        options.push( /*#__PURE__*/_react.default.createElement("option", {
          key: i,
          value: i
        }, i.toString().padStart(2, "0")));
      }
    }
    return options;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _styleModule.default.timePicker
  }, !showSeconds ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("select", {
    value: time.hour,
    onChange: e => handleTimeChange(e, "hour"),
    className: _styleModule.default.selector
  }, generateOptions(0, 23, disabledHours)), /*#__PURE__*/_react.default.createElement("span", {
    className: _styleModule.default.separator
  }, ":"), /*#__PURE__*/_react.default.createElement("select", {
    value: time.minute,
    onChange: e => handleTimeChange(e, "minute"),
    className: _styleModule.default.selector
  }, generateOptions(0, 59))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("select", {
    value: time.hour,
    onChange: e => handleTimeChange(e, "hour")
  }, generateOptions(0, 23, disabledHours)), /*#__PURE__*/_react.default.createElement("span", null, ":"), /*#__PURE__*/_react.default.createElement("select", {
    value: time.minute,
    onChange: e => handleTimeChange(e, "minute")
  }, generateOptions(0, 59)), showSeconds && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, ":"), /*#__PURE__*/_react.default.createElement("select", {
    value: time.second,
    onChange: e => handleTimeChange(e, "second")
  }, generateOptions(0, 59)))));
}