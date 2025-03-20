import useSignOut from 'react-auth-kit/hooks/useSignOut';
import './styles/NavBar.scss';
import { NavDropdown, Navbar, Nav, Container, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import User from '../types/User/dto';

export default function NavBar() {
    const signOut = useSignOut();
    const authUser = useAuthUser<User>();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    return (
        <Navbar className='NavBar'>
            <Container>
                <Navbar.Brand
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    WayMatcher
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Link to='/' className='nav-link'>
                            Home
                        </Link>
                        <Link to='/events' className='nav-link'>
                            Events
                        </Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <NavDropdown
                                title={authUser?.username}
                                id='basic-nav-dropdown'
                                aria-label='User Options'
                                className='justify-content-end'
                            >
                                <NavDropdown.Item
                                    onClick={() => {
                                        navigate('/user/edit');
                                    }}
                                    aria-label='Edit Profile'
                                >
                                    Edit Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {
                                        signOut();
                                        navigate('/user/login');
                                    }}
                                    aria-label='Logout'
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <ButtonGroup>
                                <Link className='btn btn-primary' to='/user/login'>
                                    Login
                                </Link>
                                <Link className='btn btn-secondary' to='/user/register'>
                                    Register
                                </Link>
                            </ButtonGroup>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
