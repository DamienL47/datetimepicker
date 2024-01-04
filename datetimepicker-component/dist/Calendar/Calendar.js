"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = Calendar;
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
function Calendar(_ref) {
  let {
    date,
    setDate,
    disabledDates = [],
    disabledDaysOfWeek = [],
    language = "en",
    showTime
  } = _ref;
  (0, _react.useEffect)(() => {
    _moment.default.locale(language);
  }, [language]);
  const [currentDate, setCurrentDate] = (0, _react.useState)(date ? (0, _moment.default)(date) : (0, _moment.default)());
  (0, _react.useEffect)(() => {
    setCurrentDate(date ? (0, _moment.default)(date) : (0, _moment.default)());
  }, [date]);
  const daysOfWeek = _moment.default.weekdaysShort();
  const monthNames = _moment.default.months();
  const getDaysInMonth = () => currentDate.daysInMonth();
  const getFirstDayOfMonth = () => currentDate.clone().startOf("month").day();
  const isDateDisabled = day => {
    const checkDate = currentDate.clone().date(day);
    const dayOfWeek = checkDate.day();
    const formattedDate = checkDate.format("YYYY-MM-DD");
    return disabledDaysOfWeek.includes(dayOfWeek) || disabledDates.includes(formattedDate);
  };
  const handleDateClick = day => {
    const selectedDate = currentDate.clone().date(day);
    if (!isDateDisabled(day)) {
      setDate(selectedDate);
    }
  };
  const renderMonthSelector = () => /*#__PURE__*/_react.default.createElement("select", {
    value: currentDate.month(),
    onChange: e => setCurrentDate(currentDate.clone().month(e.target.value)),
    className: _styleModule.default.selector
  }, monthNames.map((month, index) => /*#__PURE__*/_react.default.createElement("option", {
    key: month,
    value: index
  }, month)));
  const renderYearSelector = () => {
    const currentYear = currentDate.year();
    const years = Array.from({
      length: 10
    }, (_, i) => currentYear - 5 + i);
    return /*#__PURE__*/_react.default.createElement("select", {
      value: currentYear,
      onChange: e => setCurrentDate(currentDate.clone().year(e.target.value)),
      className: _styleModule.default.selector
    }, years.map(year => /*#__PURE__*/_react.default.createElement("option", {
      key: year,
      value: year
    }, year)));
  };
  const renderDays = () => daysOfWeek.map(day => /*#__PURE__*/_react.default.createElement("div", {
    key: day,
    className: _styleModule.default.dayOfWeek
  }, day));
  const renderCells = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = getFirstDayOfMonth();
    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "empty-start-".concat(i),
        className: _styleModule.default.emptyCell
      }));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      cells.push( /*#__PURE__*/_react.default.createElement("div", {
        key: day,
        onClick: () => handleDateClick(day),
        className: "".concat(showTime ? _styleModule.default.cell : _styleModule.default.cellSTF, " ").concat(isDisabled ? _styleModule.default.disabledCell : "")
      }, day));
    }
    return cells;
  };
  const calendarClass = showTime ? _styleModule.default.calendarContainer : _styleModule.default.calendarContainerSTF;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: calendarClass
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: showTime ? _styleModule.default.header : _styleModule.default.headerSTF
  }, renderMonthSelector(), renderYearSelector()), /*#__PURE__*/_react.default.createElement("div", {
    className: showTime ? _styleModule.default.days : _styleModule.default.daysSTF
  }, renderDays()), /*#__PURE__*/_react.default.createElement("div", {
    className: showTime ? _styleModule.default.cells : _styleModule.default.cellsSTF
  }, renderCells()));
}