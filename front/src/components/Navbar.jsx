import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/**
 * Nav is a component for displaying a navigation bar at the top of the application.
 */
const Nav = () => {
    return (
        <Navbar className="bg-dark color-white w-100">
            <Container>
                <Navbar.Brand href="/" className='text-light'>Tasks Manager</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Nav;
