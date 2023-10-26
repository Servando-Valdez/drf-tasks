import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Task from './Task';
import { useTask } from '../context/task.context';
import { useFilter } from '../context/filter.context';
import ModalDetail from './ModalDetail';
import ModalUpdate from './modalUpdate';
import CreateTask from './CreateTask';
import Filter from './Filter';
const TaskList = () => {
    const { tasks, getTasks, globalTask } = useTask();
    const { filter } = useFilter();

    useEffect(() => {
        // const fetchData = async () => {
        //     await getTasks(filter);
        // };

        // fetchData();
        getTasks();
    }, [filter]);

    return (
        <>
            <div className='d-flex justify-content-center' id="content">
                <div id='table'>
                    <h1 className='text-center'>Task Manager</h1>
                    <CreateTask />
                    <Filter />
                    <Table responsive='md'>
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