import React from 'react';
import { Icon, Badge, Calendar, Col, Row, Select } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

const CalendarCellContainer = styled.div`
 height: 100%;
 display: flex;
 justify-content: space-around;
 align-items: center;
 flex-wrap: wrap;
`;

const CalendarCellIcon = styled(Icon)`
 font-size: 2em;
`;

const headerRender = ({ value, type, onChange, onTypeChange }, entriesArray) => {
 const getMonths = entriesArray => {
  const result = entriesArray.map(entry => entry.dateTime.month());
  return [...new Set(result)];
 };

 const getYears = entriesArray => {
  const result = entriesArray.map(entry => entry.dateTime.year());
  return [...new Set(result)];
 };

 const localeData = value.localeData();

 let months = getMonths(entriesArray);
 let month = value.month();
 months = months.map(monthNumber => {
  return <Select.Option key={monthNumber}>{localeData.monthsShort()[monthNumber]}</Select.Option>;
 });

 let years = getYears(entriesArray);
 let lastYear = years[years.length - 1];
 years = years.map(year => {
  return <Select.Option key={year}>{year}</Select.Option>;
 });

 return (
  <Row type="flex" justify="end">
   <Col>
    <Select
     onChange={selectedYear => {
      const now = value.clone().year(selectedYear);
      onChange(now);
     }}
     value={lastYear}>
     {years}
    </Select>
   </Col>
   <Col>
    <Select
     value={localeData.monthsShort()[month]}
     onChange={selectedMonth => {
      const newValue = value.clone();
      newValue.month(parseInt(selectedMonth, 10));
      onChange(newValue);
     }}>
     {months}
    </Select>
   </Col>
  </Row>
 );
};

const dateCellRender = (cellDate, entriesArray, icons) => {
 let toRender = {
  good: 0,
  bad: 0
 };
 entriesArray.forEach(entry => {
  if (entry.dateTime.format('DDMMYYYY') == cellDate.format('DDMMYYYY')) {
   toRender[entry.value] = toRender[entry.value] + 1;
  }
 });
 let renderResult = [];
 for (let icon in toRender) {
  if (toRender[icon] > 0) {
   renderResult.push(
    <Badge key={icon} count={toRender[icon] > 1 ? toRender[icon] : null}>
     <CalendarCellIcon type={icons[icon]} />
    </Badge>
   );
  }
 }
 return <CalendarCellContainer>{renderResult}</CalendarCellContainer>;
};

const BinaryTrackerCalendar = ({ calendarData, icons }) => {
 function onPanelChange(value, mode) {}

 const entriesArray = Object.keys(calendarData).map(key => {
  return { ...calendarData[key], dateTime: new moment(calendarData[key].dateTime) };
 });

 return <Calendar dateCellRender={cellDate => dateCellRender(cellDate, entriesArray, icons)} headerRender={defaultParams => headerRender(defaultParams, entriesArray)} onPanelChange={onPanelChange} />;
};

export default BinaryTrackerCalendar;
