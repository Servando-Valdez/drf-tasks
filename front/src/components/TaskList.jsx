import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
// import Task from './Task';
import {useTask} from '../context/task.context';
const TaskList = () => {
    const { tasks, getTasks } = useTask();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
        <div className='d-lg-flex justify-content-center'>
            <div id='table' className='w-50'>
            <h1 className='text-center'>Task Manager</h1>
                <Table responsive='md'>
                    <thead>
                        <tr>
                            <th className='col-sm-6'>Task</th>
                            <th className='col-sm-6 '></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='col-sm-6'>Task</td>
                            <td className='col-sm-6 '></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
        </>
    )
};

export default TaskList;