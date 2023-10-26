import Dropdown from 'react-bootstrap/Dropdown';
import { FILTERS } from '../utils/filterConst';
import { useFilter } from '../context/filter.context';

const Filter = () => {
    
    const { filter, setFilter } = useFilter();

    const handleFilter = (filter) => {
        setFilter(filter);
        console.log(filter);
    }

    return (
        <Dropdown className='mb-2' style={{ width: '150px' }}>
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