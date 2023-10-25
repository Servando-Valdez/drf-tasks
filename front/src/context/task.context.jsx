import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { errorMessage, successMessage } from '../utils/messages';
import { TaskService } from '../apis/TaskApi';

export const TaskContext = createContext();

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [globalTask, setGlobalTask] = useState(null);

    const taskService = new TaskService();

    const refreshGlobalTask = () => {
        setGlobalTask(null);
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

    // const onCreate = (newTask) => {
    //     console.log('newTask', newTask);
    //     const updatedTasks = [...tasks, newTask];
    //     setTasks(updatedTasks);
    //     successMessage('Task created');
    // };

    const onDelete = async(uuid) => {
        try {
            await taskService.deleteTask(uuid);
            //other way of refresh tasks
            // const updatedTasks = tasks.filter((task) => task.uuid !== uuid);

            //refresh tasks
            getTasks();
            successMessage('Task deleted');
        } catch (error) {
            console.log('error', error);
            errorMessage('Error to delete task');
        }
    };

    const onUpdate = (updateTask) => {
        const updatedTasks = tasks.map((task) =>
            task.uuid === updateTask.uuid ? updateTask : task
        );
        setTasks(updatedTasks);
    };

    const getTask = async (uuid) => {
        try {
            const task = await taskService.getTask(uuid);
            setGlobalTask(task);
        } catch (error) {
            errorMessage('Error to get task');
        }
    };

    const handleCreate = async({nombre}) =>{
        try {
            const newTask = await taskService.createTask({nombre});
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            successMessage('Task created');
        } catch (error) {
            errorMessage('Error to create task');
        }
    }

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
            refreshGlobalTask();
            onUpdate(taskUpdated);
            successMessage('Task updated');
        } catch (error) {
            errorMessage('Error to update task');
        }
    }

    return (
        <TaskContext.Provider
            value={{
                getTask,
                getTasks,
                handleCreate,
                tasks,
                onDelete,
                onUpdate,
                // onCreate,
                globalTask,
                setGlobalTask,
                refreshGlobalTask,
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