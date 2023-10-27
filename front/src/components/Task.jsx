import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import PropTypes from 'prop-types';
import { useTask } from '../context/task.context';
import { useModal } from "../context/modal.context";

/**
 * Task is a component representing a single task in the task list.
 * It provides options to view task details, update the task, and delete it.
 * 
 * @param {object} task - The task object to be displayed.
 */
const Task = ({ task }) => {
    // Custom hook to access task-related functions and modal-related functions
    const { handleDelete } = useTask();
    const {
        handleShowUpdate,
        handleShowDetail,
    } = useModal();

    return (
        <>
            <tr className="bording" onClick={()=> handleShowDetail(task)}>
                <td className={
                    task.completed ? 'text-decoration-line-through' : ''
                }
                >{task.name}</td>
                <td className="d-flex justify-content-end">
                    <button
                        className='btn btn-warning mx-2 text-white'
                        onClick={()=> handleShowUpdate(task)}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className='btn btn-danger mx-2'
                        onClick={()=> handleDelete(task.uuid)}
                    >
                        <DeleteIcon />
                    </button>
                </td>
            </tr>
        </>
    )
};

Task.propTypes = {
    task: PropTypes.shape({
        completed: PropTypes.bool,
        name: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
    }).isRequired
};

export default Task;