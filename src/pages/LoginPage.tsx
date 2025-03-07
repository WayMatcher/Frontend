import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import '../styles/LoginPage.scss';
import { User } from '../types/user';
import { Form, Button, ButtonGroup, Container } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';


interface Props {
  user: User | null;
}

const LoginPage = ({ user: User }: Props) => {


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
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit} className="loginForm">
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="formikUserOrEmail">
                  <Form.Label>Username or E-Mail Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username or E-Mail Address"
                    name="userOrEmail"
                    value={values.userOrEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.userOrEmail && !!errors.userOrEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {typeof errors.userOrEmail === 'string' && errors.userOrEmail}
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
                    name="password"
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