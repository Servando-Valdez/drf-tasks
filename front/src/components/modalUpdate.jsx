
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useModal } from '../context/modal.context';
import { useTask } from '../context/task.context';


/**
 * ModalUpdate is a component for updating task details within a modal.
 */
const ModalUpdate = () =>{
    // State variables to track updated task information
    const [updateTask, setUpdateTask] = useState('');
    const [updateCompleted, setUpdateCompleted] = useState(false);

    // Custom hooks to access task details, update function, and modal-related state
    const {globalTask, handleUpdate} = useTask();
    const { showUpdate, handleShowUpdateClose  } = useModal();

    //Handler function to update the task name as the user types.
    const handleUpdateTask = (e) => {
        setUpdateTask(e.target.value);
    };

    //Handler function to toggle the completion status of the task.
    const handleUpdateCompleted = () => {
        setUpdateCompleted(!updateCompleted);
    };

    //Handler function to submit the form and update the task.
    const handleSubmit = async(e) => {
        e.preventDefault();
        handleUpdate({
            uuid: globalTask.uuid,
            name: updateTask,
            completed: updateCompleted,
        
        });
        handleShowUpdateClose();
    }

    /**
     * UseEffect to set initial values for updateTask and updateCompleted
     * when the modal is shown (controlled by showUpdate).
     */
    useEffect(() => {
        setUpdateTask(globalTask.name);
        setUpdateCompleted(globalTask.completed);
    }, [showUpdate]);

    return(
        <Modal show={showUpdate} onHide={handleShowUpdateClose}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter task"
                        aria-label="Enter task"
                        required
                        value={updateTask}
                        onChange={handleUpdateTask}
                        className='pt-2'
                    />

                    <Form.Check
                        type="checkbox"
                        label="Completed"
                        value={updateCompleted}
                        checked={updateCompleted}
                        onChange={handleUpdateCompleted}
                        className='pt-2 '
                    />
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleShowUpdateClose}
                >Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalUpdate;