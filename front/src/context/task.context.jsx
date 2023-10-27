import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { errorMessage, successMessage, confirmMessage } from '../utils/messages';
import { TaskService } from '../apis/TaskApi';
import { useFilter } from './filter.context';

// Create a context
export const TaskContext = createContext();

// Define prop types for TaskProvider
TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * TaskProvider component is responsible for managing the state and operations related to tasks.
 * It provides a context that contains functions to interact with tasks, including getting, creating, updating, and deleting tasks.
 * 
 * @param {object} children - The child components that will have access to the task context.
 */
export function TaskProvider({ children }) {

    const { filter } = useFilter();
    // State to store the list of tasks
    const [tasks, setTasks] = useState([]);
    // State to store the current task for global access
    const [globalTask, setGlobalTask] = useState(null);

    // Task service to interact with tasks
    const taskService = new TaskService();

    /**
     * Reset the global task state to null.
     */
    const refreshGlobalTask = () => {
        setGlobalTask(null);
    }

    /**
     * Fetch and set the list of tasks based on the current filter.
     */
    const getTasks = async () => {
        try {
            const data = await taskService.getTasks(filter);
            setTasks(data);
        } catch (error) {
            errorMessage('Error to get tasks');
        }
    };

    /**
     * Delete a task with the specified UUID, and refresh the task list.
     * 
     * @param {string} uuid - The UUID of the task to delete.
     */
    const handleDelete = async(uuid) => {
        try {
            const result = await confirmMessage();
            if(result.isConfirmed){
                await taskService.deleteTask(uuid);
                await getTasks();
                successMessage('Task deleted');
            }
            
        } catch (error) {
            errorMessage('Error to delete task');
        }
    };

    /**
     * Fetch and set a specific task's details based on its UUID.
     * 
     * @param {string} uuid - The UUID of the task to retrieve.
     */
    const getTask = async (uuid) => {
        try {
            const task = await taskService.getTask(uuid);
            setGlobalTask(task);
        } catch (error) {
            errorMessage('Error to get task');
        }
    };

    /**
     * Extract and display an error message based on the response error.
     * 
     * @param {object} error - The error response object.
     */
    const messageName =  (error, action) =>{
        const {data} = error.response;
            if( data.name){
                errorMessage(data.name);
                return;
            }else{
                errorMessage(`Error to ${action} task`);
            }
    }

    /**
     * Create a new task with the provided name and refresh the task list.
     * 
     * @param {object} taskData - The data for the new task, including its name.
     */
    const handleCreate = async({name}) =>{
        try {
            await taskService.createTask({name});
            await getTasks();
            successMessage('Task created');
        } catch (error) {
            messageName(error, 'create')
        }
    }

    /**
     * Update a task with the provided UUID, name, and completion status, and refresh the task list.
     * 
     * @param {object} taskData - The data for the task update, including UUID, name, and completion status.
     */
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
            getTasks();
            successMessage('Task updated');
        } catch (error) {
            messageName(error, 'update')
        }
    }

    return (
        <TaskContext.Provider
            value={{
                getTask,
                getTasks,
                handleCreate,
                tasks,
                handleDelete,
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

/**
 * Custom hook for accessing the task context.
 * It allows components to access and perform operations related to tasks.
 * 
 * @returns {object} - An object containing functions and states for task management.
 */
export function useTask() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
}