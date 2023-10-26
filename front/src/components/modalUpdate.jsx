
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useModal } from '../context/modal.context';
import { useTask } from '../context/task.context';
const ModalUpdate = () =>{
    const {globalTask, handleUpdate} = useTask();
    const [updateTask, setUpdateTask] = useState('');
    const [updateCompleted, setUpdateCompleted] = useState(false);

    const { showUpdate, handleShowUpdateClose  } = useModal();

    const handleUpdateTask = (e) => {
        setUpdateTask(e.target.value);
    };

    const handleUpdateCompleted = () => {
        setUpdateCompleted(!updateCompleted);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        handleUpdate({
            uuid: globalTask.uuid,
            name: updateTask,
            completed: updateCompleted,
        
        });
        handleShowUpdateClose();
    }

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