import React, { useState, useEffect } from "react";

const EditTask = ({ initialTask }) => {
  const [task, setTask] = useState(initialTask);

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var taskDuration = task.duration;
    if (task.durationType == "words") {
      taskDuration = parseFloat(task.duration) / parseFloat(task.wordsPerHour);
    } else {
      taskDuration = parseFloat(task.duration);
    }
    try {
      const userId = localStorage.getItem("userId");
      const taskId = task.taskId;
      const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/tasks/" + userId + "/" + taskId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          description: task.description,
          duration: taskDuration,
          deadline: task.deadline,
          type: task.type,
        }),
      });
      if (response.ok) {
        console.log(response.json());
         window.location.href = "/calendar";
      } else {
        // La solicitud falló, mostramos un mensaje de error
        console.error("No se pudo registrar. Inténtelo de nuevo más tarde.");
      }
    } catch (error) {
      // Error en la solicitud
      console.error("Error en la solicitud:", error);
    }
    // Limpia el formulario o reinicia el estado
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const taskId = task.taskId;

      const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/tasks/" + userId + "/" + taskId, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(response.json());
        window.location.href = "/calendar";
      } else {
        // La solicitud falló, mostramos un mensaje de error
        console.error("Error al borrar.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la tarea:
          <input type="text" name="description" defaultValue={task.description} onChange={handleChange} required />
        </label>
        <label>
          Fecha de fin:
          <input type="datetime-local" name="deadline" defaultValue={formatDateForInput(task.deadline)} onChange={handleChange} required />
        </label>
        <label>
          Duración:
          <input type="number" name="duration" defaultValue={task.duration} onChange={handleChange} required />
        </label>
        <label>
          <input type="radio" name="durationType" value="hours" defaultChecked={"hours"} onChange={handleChange} />
          Horas
        </label>
        <label>
          <input type="radio" name="durationType" value="words" onChange={handleChange} />
          Palabras
        </label>
        {task.durationType === "words" && (
          <label>
            Palabras por hora:
            <input type="number" name="wordsPerHour" defaultValue={task.wordsPerHour} onChange={handleChange} required />
          </label>
        )}
        <label>
          <input type="checkbox" name="type" defaultChecked={task.type} onChange={() => setTask({ ...task, type: !task.type })} />
          Prioridad
        </label>
        <button type="submit">Guardar tarea</button>
        <button type="button" onClick={handleDelete}>
          Borrar
        </button>
      </form>
    </>
  );
};
export default EditTask;
