import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import PropTypes from 'prop-types';
// import ModalUpdate from "./modalUpdate";
import { errorMessage } from "../utils/messages";
import { useTask } from '../context/task.context';
import { useModal } from "../context/modal.context";
const Task = ({ task }) => {
    // const [localTask, setLocalTask] = useState(task);
    const { onDelete } = useTask();
    const {
        handleShowUpdateShow,
        handleShowDetailShow,
    } = useModal();

    const handleDelete = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/v1/tasks/${task.uuid}`)
                    .then(() => {
                        onDelete(task.uuid);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch(() => {
                        errorMessage('Error to delete task');
                    })
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
                <td className="d-flex justify-content-center">
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