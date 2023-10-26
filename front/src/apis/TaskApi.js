import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
        baseURL: 'http://localhost:8000/api',
})

/**
 * TaskService is a class that provides methods for interacting with tasks through HTTP requests.
 */
export class TaskService {

         // Static variable to hold the singleton instance
        static _instance = null;
        /**
         * Constructor for TaskService.
         * It ensures that only one instance of TaskService is created (Singleton pattern).
         */
        constructor() {
                if (TaskService._instance) {
                        return TaskService._instance;
                }

                TaskService._instance = this;
        }

        /**
         * Fetch a list of tasks based on the specified status.
         *
         * @param {string} status - The status of tasks to retrieve (e.g., 'completed', 'pending').
         * @returns {Promise} - A promise that resolves to the retrieved tasks.
         */
        async getTasks(status) {
                const response = await instance.get(`/tasks?status=${status}`);
                return response.data;
        }

        /**
         * Fetch details of a task based on its UUID.
         *
         * @param {string} uuid - The UUID of the task to retrieve.
         * @returns {Promise} - A promise that resolves to the task details.
         */
        async getTask(uuid) {
                const response = await instance.get(`/tasks/${uuid}`);
                return response.data;
        }

        /**
         * Create a new task with the provided name.
         *
         * @param {object} taskData - An object containing the task's name.
         * @returns {Promise} - A promise that resolves to the created task.
         */
        async createTask({ name }) {
                const response = await instance.post('/tasks', {
                        name: name
                });
                return response.data;
        }

        /**
         * Update a task with new data.
         *
         * @param {object} task - An object containing the updated task data, including UUID, name, and completion status.
         * @returns {Promise} - A promise that resolves to the updated task.
         */
        async updateTask(task) {
                const response = await instance.put(`/tasks/${task.uuid}`, task);
                return response.data;
        }

        /**
         * Delete a task based on its UUID.
         *
         * @param {string} uuid - The UUID of the task to delete.
         * @returns {Promise} - A promise that resolves after the task is deleted.
         */
        async deleteTask(uuid) {
                const response = await instance.delete(`/tasks/${uuid}`);
                return response.data;
        }
}