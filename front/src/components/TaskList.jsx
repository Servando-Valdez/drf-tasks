import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Task from './Task';
import { useTask } from '../context/task.context';
import { useFilter } from '../context/filter.context';
import ModalDetail from './ModalDetail';
import ModalUpdate from './modalUpdate';
import CreateTask from './CreateTask';
import Filter from './Filter';

/**
 * TaskList is a component for displaying a list of tasks.
 * It retrieves and renders the tasks based on the current filter settings.
 */
const TaskList = () => {
    // Custom hooks to access task-related state and functions
    const { tasks, getTasks, globalTask } = useTask();
    // Custom hook to access the filter state
    const { filter } = useFilter();

    /**
     * useEffect is used to fetch and update the list of tasks when the component mounts
     * and whenever the filter value changes. It ensures that the task list is up-to-date
     * with the current filter settings.
     */
    useEffect(() => {
        getTasks();
    }, [filter]);

    return (
        <>
            <div className='d-flex justify-content-center' id="content">
                <div id='table'>
                    <h1 className='text-center'>Task Manager</h1>
                    <CreateTask />
                    <Filter />
                    <Table responsive='sm'>
                        <thead>
                            <tr>
                                <th className='col-sm-6'>Task</th>
                                <th className='col-sm-6 '></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task) => (
                                    <Task
                                        key={task.uuid}
                                        task={task}
                                    />
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            {
                globalTask === null ? null : <ModalDetail />
            }
            {
                globalTask === null ? null : <ModalUpdate />
            }
        </>
    )
};

export default TaskList;