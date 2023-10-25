import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types';
import { useTask } from './task.context';

const ModalContext = createContext();

ModalProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export function ModalProvider({ children }){
    const { getTask, refreshGlobalTask } = useTask();
    const [showDetail, setShowDetail] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleShowUpdateClose = () => {
        refreshGlobalTask();
        setShowUpdate(false);
    }
    const handleShowUpdateShow = async(task) => {
        await getTask(task.uuid);
        setShowUpdate(true);
    }

    const handleShowDetailClose = () => {
        refreshGlobalTask()
        setShowDetail(false);
    }
    const handleShowDetailShow = (task) => {
        getTask(task.uuid);
        setShowDetail(true);
    }

    return (
        <ModalContext.Provider
            value={{
                showDetail,
                setShowDetail,
                showUpdate,
                setShowUpdate,
                handleShowUpdateClose,
                handleShowUpdateShow,
                handleShowDetailClose,
                handleShowDetailShow,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
}