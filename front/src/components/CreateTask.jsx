import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useTask } from '../context/task.context';

/**
 * CreateTask is a component for creating a new task.
 * It allows the user to input a task name and create it.
 */
const CreateTask = () => {
    // State to store the new task name
    const [newTask, setNewTask] = useState('');
    // Custom hook to access task-related functions (e.g., handleCreate)
    const { handleCreate } = useTask();

    //Handler function to update the new task name as the user types.
    const handleNewTask = (e) => {
        setNewTask(e.target.value);
    };

    //Handler function to submit the form and create a new task.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreate({ name: newTask });
        setNewTask('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='mb-2'>
                <div className='input-group'>
                    <Form.Control
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
