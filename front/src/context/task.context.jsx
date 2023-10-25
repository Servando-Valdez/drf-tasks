import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { errorMessage, successMessage } from '../utils/messages';
import { TaskService } from '../apis/TaskApi';

export const TaskContext = createContext();

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const nullTask = {
    uuid: '',
    nombre: '',
    completada: '',
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    // const [showDetail, setShowDetail] = useState(false);
    const [globalTask, setGlobalTask] = useState(nullTask);

    const taskService = new TaskService();

    const refreshTask = () => {
        setGlobalTask(nullTask);
    }

    const getTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch (error) {
            console.log('error', error);
            errorMessage('Error to get tasks');
        }
    };

    const onCreate = (newTask) => {
        console.log('newTask', newTask);
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        successMessage('Task created');
    };

    const onDelete = (uuid) => {
        const updatedTasks = tasks.filter((task) => task.uuid !== uuid);
        setTasks(updatedTasks);
        successMessage('Task deleted')
        // También puedes manejar aquí el cierre de modales si es necesario.
    };

    const onUpdate = (updateTask) => {
        const updatedTasks = tasks.map((task) =>
            task.uuid === updateTask.uuid ? updateTask : task
        );
        setTasks(updatedTasks);
        // También puedes manejar aquí el cierre de modales si es necesario.
    };

    const getTask = async (uuid) => {
        try {
            const task = await taskService.getTask(uuid);
            setGlobalTask(task);
        } catch (error) {
            errorMessage('Error to get task');
        }
    };

    const handleUpdate = async ({
        uuid,
        nombre,
        completada
    }) => {
        try {
            const taskUpdated = await taskService.updateTask({
                uuid,
                nombre,
                completada
            })
            // const updateTask = globalTask;
            // updateTask.nombre = name;
            // updateTask.completada = completed;
            setGlobalTask(nullTask);
            onUpdate(taskUpdated);
            successMessage('Task updated2');
        } catch (error) {
            console.log('error', error);
            errorMessage('Error to update task');
        }
    }

    return (
        <TaskContext.Provider
            value={{
                getTask,
                getTasks,
                tasks,
                // showDetail,
                // setShowDetail,
                onDelete,
                onUpdate,
                onCreate,
                globalTask,
                setGlobalTask,
                refreshTask,
                handleUpdate,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTask() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
}