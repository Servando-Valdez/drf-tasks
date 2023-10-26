import Dropdown from 'react-bootstrap/Dropdown';
import { FILTERS } from '../utils/filterConst';
import { useFilter } from '../context/filter.context';

/**
 * Filter is a component for selecting and applying a filter to tasks.
 * It provides a dropdown menu with filter options.
 */
const Filter = () => {
    // Custom hook to access filter-related state and functions
    const { filter, setFilter } = useFilter();

    //Handler function for selecting a filter option.
    //It updates the selected filter and logs the selected filter value.
    const handleFilter = (filter) => {
        setFilter(filter);
    }

    return (
        <Dropdown className='mb-2'>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    Object.values(FILTERS).map((filterItem) => (
                        <Dropdown.Item
                            key={filterItem}
                            onClick={() => handleFilter(filterItem)}
                        >
                            {filterItem}
                            
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Filter;