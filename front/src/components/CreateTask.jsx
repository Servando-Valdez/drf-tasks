import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useTask } from '../context/task.context';

const CreateTask = () => {
    const [newTask, setNewTask] = useState('');
    const { handleCreate } = useTask();

    const handleNewTask = (e) => {
        setNewTask(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreate({ nombre: newTask });
        setNewTask('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <Form.Control
                        id='form-create'
                        type="text"
                        placeholder="Enter task"
                        aria-label="Enter task"
                        required
                        value={newTask}
                        onChange={handleNewTask}
                        className='p-2'
                        style={{ boxShadow: 'none' }}
                    />
                    <Button variant="primary" type='submit'>
                        Create
                    </Button>
                </div>
            </form>
        </div>

    )
};

export default CreateTask;
