import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types';
import { FILTERS } from "../utils/filterConst";

// Create a context for filtering tasks
const FilterContext = createContext();

/**
 * FilterProvider component is responsible for managing the filtering state.
 * It provides a context that contains the current filter and a function to update it.
 * 
 * @param {object} children - The child components that will have access to the filtering context.
 */
export const FilterProvider = ({ children }) => {
     // Initialize the filter state with the default value (FILTERS.ALL)
    const [filter, setFilter] = useState(FILTERS.ALL);

    return (
        <FilterContext.Provider
            value={{
                filter,
                setFilter,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

// Define prop types for FilterProvider
FilterProvider.propTypes = {
    children: propTypes.node.isRequired,
};

/**
 * Custom hook for accessing the filter context.
 * It allows components to access and update the current filter.
 * 
 * @returns {object} - An object containing the current filter and a function to update it.
 */
export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a TaskProvider');
    }
    return context;
}