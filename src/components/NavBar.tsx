import '../styles/NavBar.scss';
import useUser from '../contexts/UserUse';
import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap';

function NavBar() {
  const { user, logout } = useUser();

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">WayMatcher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.username} id="basic-nav-dropdown" aria-label='User Options' className='justify-content-end'>
                <NavDropdown.Item href='/user' aria-label='Edit Profile'>Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href='/' onClick={logout} aria-label='Logout'>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" className='justify-content-end'>
                <NavDropdown.Item href='/login' aria-label='Login'>Login</NavDropdown.Item>
                <NavDropdown.Item href='/logout' aria-label='Register'>Register</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default NavBar;