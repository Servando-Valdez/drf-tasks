import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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
