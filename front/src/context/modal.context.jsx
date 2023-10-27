import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types';
import { useTask } from './task.context';
// Create a context
const ModalContext = createContext();

// Define prop types for ModalProvider
ModalProvider.propTypes = {
    children: propTypes.node.isRequired,
};

/**
 * ModalProvider component manages the state of modal dialogs for showing task details and updates.
 * It provides a context with functions and states related to modals.
 * 
 * @param {object} children - The child components that will have access to the modal context.
 */
export function ModalProvider({ children }){
    const { getTask, refreshGlobalTask } = useTask();
    const [showDetail, setShowDetail] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    /**
     * Close the update modal and refresh the global task.
     */
    const handleCloseUpdate = () => {
        refreshGlobalTask();
        setShowUpdate(false);
    }

    /**
     * Show the update modal and fetch the task data.
     * 
     * @param {object} task - The task to be updated.
     */
    const handleShowUpdate = async(task) => {
        await getTask(task.uuid);
        setShowUpdate(true);
    }

    /**
     * Close the detail modal and refresh the global task.
     */
    const handleCloseDetail = () => {
        refreshGlobalTask()
        setShowDetail(false);
        console.log(showDetail);
    }

    /**
     * Show the detail modal and fetch the task data.
     * 
     * @param {object} task - The task to be displayed in detail.
     */
    const handleShowDetail = (task) => {
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
                handleCloseUpdate,
                handleShowUpdate,
                handleCloseDetail,
                handleShowDetail,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

/**
 * Custom hook for accessing the modal context.
 * It allows components to access the modal state and functions for managing modals.
 * 
 * @returns {object} - An object containing modal states and functions.
 */
export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a TaskProvider');
    }
    return context;
}