import Swal from "sweetalert2";
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
    const { onDelete } = useTask();
    const {
        handleShowUpdateShow,
        handleShowDetailShow,
    } = useModal();

    //Handler function to delete a task after user confirmation.
    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(task.uuid);
            }
        })
    }

    //Handler function to display task details in a modal
    const handleShowDetail = ()=>{
        handleShowDetailShow(task);
    }
    //Handler function to display the update modal for the task.
    const handleShowUpdate = () =>{
        handleShowUpdateShow(task);
    }

    return (
        <>
            <tr className="bording">
                <td className={
                    task.completed ? 'text-decoration-line-through' : ''
                }
                    onClick={handleShowDetail}
                >{task.name}</td>
                <td className="d-flex justify-content-end">
                    <button
                        className='btn btn-warning mx-2 text-white'
                        onClick={handleShowUpdate}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className='btn btn-danger mx-2'
                        onClick={handleDelete}
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