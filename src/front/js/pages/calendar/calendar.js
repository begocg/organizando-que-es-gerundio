import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import NewTask from "../../component/newTask";

dayjs.locale("es");

export const MyCalendar = () => {
  const userId = localStorage.getItem("userId");
  const localizer = dayjsLocalizer(dayjs);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://7q5hgfs0-3001.uks1.devtunnels.ms/api/tasks/" + userId
        );
        if (response.ok) {
          const data = await response.json();
          const listaEventos = data.map((task) => {
            const deadlineDate = new Date(task.deadline);
            deadlineDate.setHours(deadlineDate.getHours() - task.duration);
            return {
              title: task.description,
              start: dayjs(deadlineDate).toDate(),
              end: dayjs(new Date(task.deadline)).toDate()
            };
          });
          setEvents(listaEventos);
        } else {
          console.error("Error en la respuesta");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      style={{
        height: 500,
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%"
      }}
    >
      <div className="custom-toolbar">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          locale={es}
          className="custom-datepicker"
        />
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
          }
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
          noEventsInRange: "Sin eventos"
        }}

      />
    </div>
  );
};
