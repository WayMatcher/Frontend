import '../styles/RegisterPage.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [validated, setValidated] = useState(false);

  const [userOrEMail, setUserOrEMail] = useState('');


  const { login } = useUser();

  const handleSubmit = async (event: FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    } else {
      setValidated(true);
      try {
        if (!userOrEMail || !password) {
          console.error('Username and password are required');
          return;
        }

        const isEmail = validateEmail(userOrEMail);

        let userData: User;

        if (isEmail) {
          console.log('The input is an email address');
          userData = await loginEmail(userOrEMail, password);
        } else {
          console.log('The input is a username');
          userData = await loginUsername(userOrEMail, password);
        }


        login(userData);

        navigate('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  };

  if (user) {
    return (
      <div className='loginPage'>
        <Form validated={validated} onSubmit={handleSubmit} className='loginForm'>
          <h2>Login</h2>
          <Form.Group className="mb-3" controlId="loggedIn">
            <h3>You are already logged in</h3>
          </Form.Group >
          <Form.Group className='mb-3' controlId='buttons'>
            <ButtonGroup>
              <Button variant='primary' onClick={() => navigate('/')}>Home</Button>
              <Button variant='primary' onClick={() => navigate('/user')}>Edit Profile</Button>
              <Button variant='secondary' onClick={logout}>Logout</Button>
            </ButtonGroup>
          </Form.Group>
        </Form>
      </div>
    );
  } else {
    return (
      <div className='loginPage'>
        <Container>
          <Form validated={validated} onSubmit={handleSubmit} className='loginForm'>
            <h2>Login</h2>
            <Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username or E-Mail Address</Form.Label>
                <Form.Control type="text" pattern="^[a-zA-Z]+|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="Enter username or E-Mail Address" onChange={(e) => setUserOrEMail(e.target.value)} required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
            </Form.Group>
            <Form.Group className='mb-3' controlId='buttons'>
              <ButtonGroup>
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button variant='secondary' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </ButtonGroup>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}