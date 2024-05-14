import React, { useState, useEffect } from 'react';

const EditTask = (initialTask) => {
    const [task, setTask] = useState({
        name: '',
        startDate: '',
        endDate: '',
        duration: '',
        durationType: 'hours', // Opciones: 'hours' o 'words'
        wordsPerHour: '',
        priority: false
    });
    useEffect(() => {
      if (initialTask) {
          setTask(initialTask); // Actualizamos el estado cuando cambia la tarea seleccionada
      }
  }, [task]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        var taskDuration = 0.0;
        if (task.durationType == "words") {
            taskDuration = parseFloat(task.duration)/parseFloat(task.wordsPerHour)
        } else {
            taskDuration = parseFloat(task.duration)
        }
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch('https://7q5hgfs0-3001.uks1.devtunnels.ms/api/tasks/' + userId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    description: task.name,
                    duration: taskDuration,
                    deadline: task.endDate,
                    type: task.priority
                }),
            });
            if (response.ok) {
                console.log(response.json())
                setTask({
                    name: '',
                    startDate: '',
                    endDate: '',
                    duration: '',
                    durationType: 'hours',
                    wordsPerHour: '',
                    priority: false
                });
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

 

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de la tarea:
                <input type="text" name="name" value={task.name} onChange={handleChange} required />
            </label>
            <label>
                Fecha de fin:
                <input type="datetime-local" name="endDate" value={task.endDate} onChange={handleChange} required />
            </label>
            <label>
                Duración:
                <input type="number" name="duration" value={task.duration} onChange={handleChange} required />
            </label>
            <label>
                <input type="radio" name="durationType" value="hours" checked={task.durationType === 'hours'} onChange={handleChange} />
                Horas
            </label>
            <label>
                <input type="radio" name="durationType" value="words" checked={task.durationType === 'words'} onChange={handleChange} />
                Palabras
            </label>
            {task.durationType === 'words' && (
                <label>
                    Palabras por hora:
                    <input type="number" name="wordsPerHour" value={task.wordsPerHour} onChange={handleChange} required />
                </label>
            )}
            <label>
                <input type="checkbox" name="priority" checked={task.priority} onChange={() => setTask({ ...task, priority: !task.priority })} />
                Prioridad
            </label>
            <button type="submit">Guardar tarea</button>
            <button type="submit">Borrar</button>
        </form>
    );
    
};
export default EditTask;


