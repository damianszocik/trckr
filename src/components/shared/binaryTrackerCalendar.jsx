import React from 'react';
import { Icon, Calendar, Col, Row, Select, Radio } from 'antd';

const BinaryTracerCalendar = ({ calendarData, icons }) => {
 function onPanelChange(value, mode) {
  console.log(value, mode);
 }
 console.log(calendarData);
 console.log(icons);
 return (
  <Calendar
   headerRender={({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
     current.month(i);
     months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
     monthOptions.push(
      <Select.Option className="month-item" key={`${index}`}>
       {months[index]}
      </Select.Option>
     );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
     options.push(
      <Select.Option key={i} value={i} className="year-item">
       {i}
      </Select.Option>
     );
    }
    return (
     <div style={{ padding: 10 }}>
      <div style={{ marginBottom: '10px' }}>Custom header </div>
      <Row type="flex" justify="end">
       <Col>
        <Select
         size="small"
         dropdownMatchSelectWidth={false}
         className="my-year-select"
         onChange={newYear => {
          const now = value.clone().year(newYear);
          onChange(now);
         }}
         value={String(year)}>
         {options}
        </Select>
       </Col>
       <Col>
        <Select
         size="small"
         dropdownMatchSelectWidth={false}
         value={String(month)}
         onChange={selectedMonth => {
          const newValue = value.clone();
          newValue.month(parseInt(selectedMonth, 10));
          onChange(newValue);
         }}>
         {monthOptions}
        </Select>
       </Col>
      </Row>
     </div>
    );
   }}
   onPanelChange={onPanelChange}
  />
 );
};

export default BinaryTracerCalendar;
