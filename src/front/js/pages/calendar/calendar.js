import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";



import EditTask from "../../component/editTask";

dayjs.locale("es");

export const MyCalendar = () => {
  const userId = localStorage.getItem("userId");
  const localizer = dayjsLocalizer(dayjs);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const [startTime, setStartTime] = useState("08:00:00");
  const [endTime, setEndTime] = useState("17:00:00");


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/tasks/" + userId, {
          method: "GET",
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
          }
        });
        if (response.ok) {
          const data = await response.json();
          const listaEventos = data.map((task) => {
            const deadlineDate = new Date(task.deadline);
            deadlineDate.setHours(deadlineDate.getHours() - 2);
            deadlineDate.setHours(deadlineDate.getHours() - task.duration);
            const endate = new Date(task.deadline);
            endate.setHours(endate.getHours() - 2);
            return {
              title: task.description,
              start: dayjs(deadlineDate).toDate(),
              end: dayjs(endate).toDate(),
              data: {taskId: task.taskId},
              type: task.type
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

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/userDetails/" + userId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("LA DATAAAAAAAAAAAAAAAAAAAAAAAAAA ESSSS :" + data);
        console.log(data.username);
        setStartTime(data.startTime);
        setEndTime(data.endTime)
      } else {
        console.error("Error en la respuesta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  fetchEvents();
  fetchUserDetails();
}, [userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = async (event) => { // Modificamos para obtener los detalles de la tarea
    try {
      const taskId = event.data.taskId;
      const response = await fetch(`https://organizando-que-es-gerundio.onrender.com/api/tasks/${userId}/${taskId}`, {
        method: "GET",
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
        }
      });

      if (response.ok) {
        const taskData = await response.json();
        setSelectedTask(taskData);
        console.log(taskData) // Almacenamos los detalles de la tarea seleccionada
        setShowNewTaskModal(true);
      } else {
        console.error("Error al obtener los detalles de la tarea");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
        min={dayjs(`2023-12-23T${startTime}`).toDate()}
        max={dayjs(`2023-12-23T${endTime}`).toDate()}
        formats={{
          dayHeaderFormat: (date) => {
            return dayjs(date).format("dddd, DD/MM");
          },
        }}
        date={selectedDate}
        onNavigate={(newDate, view) => {
          setSelectedDate(newDate);
        }}
        onSelectEvent={handleEventClick}
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

        eventPropGetter={
          (event) => {
            let newStyle = {
              color: 'black',
              backgroundColor: "#7a6e51",
              borderRadius: "0px",
              border: "none"
            };
      
            if (event.type){
              newStyle.color = 'white',
              newStyle.backgroundColor = "#29251c"
            }
      
            return {
              className: "",
              style: newStyle
            };
          }
        }
      />

      {/* Modal para mostrar el formulario de nueva tarea */}
      <Modal show={showNewTaskModal} onHide={() => setShowNewTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <EditTask initialTask={selectedTask}/>
        </Modal.Body>
        <Modal.Footer>
          {}
        </Modal.Footer>
      </Modal>


    </div>
  );
};
