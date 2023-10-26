import axios from 'axios';

const instance = axios.create({
        baseURL: 'http://localhost:8000/api',
})

export class TaskService{
        
        async getTasks(status){
                const response = await instance.get(`/tasks?status=${status}`);
                return response.data;
        }

        async getTask(uuid){
                const response = await instance.get(`/tasks/${uuid}`);
                return response.data;
        }
        
        async createTask({name}){
                const response = await instance.post('/tasks', {
                    name: name
                });
                return response.data;
        }
        
        async updateTask(task) {
                const response = await instance.put(`/tasks/${task.uuid}`, task);
                return response.data;
        }

        async deleteTask(uuid){
                const response = await instance.delete(`/tasks/${uuid}`);
                return response.data;
        }
}