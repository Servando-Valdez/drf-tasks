import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types';
import { FILTERS } from "../utils/filterConst";
const FilterContext = createContext();


export const FilterProvider = ({ children }) => {

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

FilterProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a TaskProvider');
    }
    return context;
}