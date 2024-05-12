import React, { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import NewTask from "../../component/newTask";

dayjs.locale("es");

export const MyCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      start: dayjs("2024-04-28T12:00:00").toDate(),
      end: dayjs("2024-04-28T15:00:00").toDate(),
      title: "Evento 1",
      data: {},
    },
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Función para agregar una nueva tarea al array de eventos
  const addTask = (newTask) => {
    setEvents([...events, newTask]);
  };


  return (
    <div
      style={{
        height: 500,
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <div className="custom-toolbar">
          <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" locale={es} className="custom-datepicker" />
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        views={["week", "day", "agenda"]}
        defaultView="week"
        min={dayjs("2023-12-23T08:00:00").toDate()}
        max={dayjs("2023-12-23T18:00:00").toDate()}
        formats={{
          dayHeaderFormat: (date) => {
            return dayjs(date).format("dddd, DD/MM");
          },
        }}
        date={selectedDate}
        onNavigate={(newDate, view) => {
          setSelectedDate(newDate);
        }}
        messages={{
          allDay: "Todo el día",
          previous: "Anterior",
          next: "Siguiente",
          today: "Actual",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Sin eventos",
        }}
      />
    </div>
  );
};
