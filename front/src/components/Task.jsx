import Swal from "sweetalert2";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import PropTypes from 'prop-types';
import { useTask } from '../context/task.context';
import { useModal } from "../context/modal.context";

const Task = ({ task }) => {
    const { onDelete } = useTask();
    const {
        handleShowUpdateShow,
        handleShowDetailShow,
    } = useModal();

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

    const handleShowDetail = ()=>{
        handleShowDetailShow(task);
    }

    const handleShowUpdate = () =>{
        handleShowUpdateShow(task);
    }

    return (
        <>
            <tr>
                <td className={
                    task.completada ? 'text-decoration-line-through' : ''
                }
                    onClick={handleShowDetail}
                >{task.nombre}</td>
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
        completada: PropTypes.bool,
        nombre: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
    }).isRequired
};

export default Task;