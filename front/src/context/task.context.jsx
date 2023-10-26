import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { errorMessage, successMessage } from '../utils/messages';
import { TaskService } from '../apis/TaskApi';
import { useFilter } from './filter.context';
export const TaskContext = createContext();

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function TaskProvider({ children }) {

    const { filter } = useFilter();

    const [tasks, setTasks] = useState([]);
    const [globalTask, setGlobalTask] = useState(null);

    const taskService = new TaskService();

    const refreshGlobalTask = () => {
        setGlobalTask(null);
    }

    const getTasks = async () => {
        try {
            const data = await taskService.getTasks(filter);
            setTasks(data);
        } catch (error) {
            errorMessage('Error to get tasks');
        }
    };

    const onDelete = async(uuid) => {
        try {
            await taskService.deleteTask(uuid);
            //other way of refresh tasks
            // const updatedTasks = tasks.filter((task) => task.uuid !== uuid);

            //refresh tasks
            getTasks();
            successMessage('Task deleted');
        } catch (error) {
            errorMessage('Error to delete task');
        }
    };

    // const onUpdate = (updateTask) => {
    //     const updatedTasks = tasks.map((task) =>
    //         task.uuid === updateTask.uuid ? updateTask : task
    //     );
    //     setTasks(updatedTasks);
    // };

    const getTask = async (uuid) => {
        try {
            const task = await taskService.getTask(uuid);
            setGlobalTask(task);
        } catch (error) {
            errorMessage('Error to get task');
        }
    };

    const messageName =  (error) =>{
        const {data} = error.response;
            if( data.name){
                errorMessage(data.name);
                return;
            }else{
                errorMessage('Error to create task');
            }
    }

    const handleCreate = async({name}) =>{
        try {
            const newTask = await taskService.createTask({name});
            await getTasks();
            // const updatedTasks = [newTask, ...tasks]
            // setTasks(updatedTasks);
            successMessage('Task created');
        } catch (error) {
            messageName(error)
        }
    }

    const handleUpdate = async ({
        uuid,
        name,
        completed
    }) => {
        try {
            await taskService.updateTask({
                uuid,
                name,
                completed
            })
            refreshGlobalTask();
            // onUpdate(taskUpdated);
            getTasks();
            successMessage('Task updated');
        } catch (error) {
            messageName(error)
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
                // onUpdate,
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