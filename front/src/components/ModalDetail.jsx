import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useModal } from '../context/modal.context';
import { useTask } from '../context/task.context';
import Completed from './Completed';
import Pending from './Pending';

/**
 * ModalDetail is a component for displaying detailed information about a task within a modal.
 */
const ModalDetail = () => {
    // Custom hooks to access modal-related state and task details
    const { showDetail, handleCloseDetail } = useModal();
    const {globalTask} = useTask();

    // Style object for customizing the modal content
    const modalContentStyle = {
        maxWidth: '400px', // Sets the desired maximum width
        wordWrap: 'break-word', // Makes long text fit in lines
    };
    return(
        <Modal show={showDetail} onHide={handleCloseDetail}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={modalContentStyle}>
                    <strong>Description:&nbsp;&nbsp;</strong>
                    {globalTask.name}
                    </p>
                <p>
                    <strong>Completed:&nbsp;&nbsp;</strong>  
                    {
                        globalTask.completed ? <Completed/> : <Pending/>
                    }
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetail}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalDetail;