import '../styles/NavBar.scss';
import UserContext from '../contexts/UserContext';
import { NavDropdown, Navbar, Nav, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar className="NavBar">
      <Container>
        <Navbar.Brand href="/">WayMatcher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to='/' className='nav-link'>Home</Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.username} id="basic-nav-dropdown" aria-label='User Options' className='justify-content-end'>
                <NavDropdown.Item href='/user' aria-label='Edit Profile'>Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href='/' aria-label='Logout'>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <ButtonGroup>
                <Link className='btn btn-primary' to='/user/login'>Login</Link>
                <Link className='btn btn-secondary' to="/user/register">Register</Link>
              </ButtonGroup>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default NavBar;