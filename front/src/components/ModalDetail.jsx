import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useModal } from '../context/modal.context';
import { useTask } from '../context/task.context';
import Completed from './Completed';
import Pending from './Pending';

const ModalDetail = () => {
    const { showDetail, handleShowDetailClose } = useModal();
    const {globalTask} = useTask();

    const modalContentStyle = {
        maxWidth: '400px', // Sets the desired maximum width
        wordWrap: 'break-word', // Makes long text fit in lines
    };
    return(
        <Modal show={showDetail} onHide={handleShowDetailClose}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={modalContentStyle}>
                    <strong>Completed:&nbsp;&nbsp;</strong>
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
                <Button variant="secondary" onClick={handleShowDetailClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalDetail;