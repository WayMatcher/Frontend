import useUser from '../context/UserUse';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { User, Username, Email } from '../types';
import '../styles/LoginPage.scss';
import { Form, Button, ButtonGroup, Container } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik'; // Import Formik and its types
import * as Yup from 'yup';

const validateEmail = (email: string): RegExpMatchArray | null => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

};
// Define the shape of your form values with an interface
interface LoginFormValues {
  userOrEmail: Username | Email;
  password: string;
}

interface Props {
  user: User; // Replace any with a better type if you have one for your user object.
  logout: () => void; // Type the logout function.
}

const LoginPage = ({ user, logout }: Props) => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    userOrEmail: Yup.string()
      .required('Username or Email is required')
      .test('userOrEmail', 'Invalid username or email', (value) => {
        if (!value) return false; // Required handles the empty case
        if (value.includes('@')) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }
        return /^[a-zA-Z]+$/.test(value);
      }),
    password: Yup.string().required('Password is required'),
  });

  // Initial form values
  const initialValues: LoginFormValues = {
    userOrEmail: '',
    password: '',
  };

  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (values: LoginFormValues, { setSubmitting, setFieldError }: FormikHelpers<LoginFormValues>) => {
    // Simulate an API call (replace with your actual login logic)
    console.log("Submitting", values)
    setTimeout(() => {
      // Example of handling a server error (e.g., invalid credentials)
      if (values.userOrEmail === 'test@test.com' && values.password === 'password') {
        alert('Login Successful!');  // Replace with your actual success handling
        navigate('/'); // Redirect after successful login
      } else {
        setFieldError('userOrEmail', 'Invalid username/email or password'); // Set a general error
        // Or, for more specific errors:
        // setFieldError('password', 'Incorrect password');
      }

      setSubmitting(false); // Always setSubmitting(false) after the async operation
    }, 500);

    const isEmail = validateEmail(values.userOrEmail);

    let userData: User;

    if (isEmail) {
      console.log('The input is an email address');
      userData = await login(values.userOrEmail, values.password);
    } else {
      console.log('The input is a username');
      userData = await login(values.userOrEmail, values.password);
    }


    login(userData);
  };

  if (user) {
    return (
      <div className="loginPage">
        <Form className="loginForm">
          <h2>Login</h2>
          <Form.Group className="mb-3" controlId="loggedIn">
            <h3>You are already logged in</h3>
          </Form.Group>
          <Form.Group className="mb-3" controlId="buttons">
            <ButtonGroup>
              <Button variant="primary" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="primary" onClick={() => navigate('/user')}>
                Edit Profile
              </Button>
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="loginPage">
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,       // Form values (typed!)
              errors,       // Validation errors (typed!)
              touched,      // Tracks if a field has been touched (typed!)
              handleChange,  // Change handler (typed!)
              handleBlur,    // Blur handler (typed!)
              handleSubmit,  // Submit handler (typed!)
              isSubmitting, // Tracks if the form is currently submitting
            }) => (
              <Form noValidate onSubmit={handleSubmit} className="loginForm">
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="formikUserOrEmail">
                  <Form.Label>Username or E-Mail Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username or E-Mail Address"
                    name="userOrEmail" // Important: name attribute must match Formik field name
                    value={values.userOrEmail}
                    onChange={handleChange}
                    onBlur={handleBlur} // Important for 'touched' state
                    isInvalid={touched.userOrEmail && !!errors.userOrEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userOrEmail}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formikPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password" // Match Formik field name
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="buttons">
                  <ButtonGroup>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </Button>
                  </ButtonGroup>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    );
  }
};

export default LoginPage;