import axios from 'axios';

const instance = axios.create({
        baseURL: 'http://localhost:8000/api',
})

export class TaskService{
        
        async getTasks(){
                const response = await instance.get('/tasks');
                return response.data;
        }

        async getTask(uuid){
                const response = await instance.get(`/tasks/${uuid}`);
                return response.data;
        }
        
        async createTask(task){
                const response = await instance.post('/tasks', task);
                return response.data;
        }
        
        async updateTask(task) {
                const response = await instance.put(`/tasks/${task.uuid}`, task);
                return response.data;
        }

        async deleteTask(task){
                const response = await instance.delete(`/tasks/${task.uuid}`);
                return response.data;
        }
}