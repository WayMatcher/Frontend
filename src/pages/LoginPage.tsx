// Forms
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { loginUser } from '../api/auth'; // APIs
import { LoginCredentials, LoginResponse } from '../types/api';

// Contexts
import MFAContext from '../contexts/MFAContext';

// React
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';

// Components
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap'; // Bootstrap
import ErrorModal from '../components/ErrorModal'; // Error Modal

const LoginPage: React.FC = () => {
  const { setMFA } = useContext(MFAContext);
  const navigate = useNavigate();

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    userOrEmail: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    userOrEmail: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmissionError(null);
    try {
      const credentials: LoginCredentials = {
        username: values.userOrEmail,
        password: values.password,
      }


      const loginResponse: LoginResponse = await loginUser(credentials);
      setMFA(loginResponse.succeeded); // Sets MFA token required depending if login was successful

      if (loginResponse.succeeded === true) {
        navigate('./mfa'); // Navigates to MFA page if login was successful
      } else {
        setSubmissionError("Login Failed: " + loginResponse.message); // Sets error message if login failed
        handleShowErrorModal(); // Shows error modal
      }

    } catch (err: unknown) {
      setSubmissionError("Unknown error occured: " + (err as Error).message);
      handleShowErrorModal(); // Shows error modal
    } finally {
      setSubmitting(false);
    }
  };

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleShowErrorModal = () => {
    setShowErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <Container className='loginContainer'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="loginForm">
            <h2>Login</h2>
            <Form.Group>
              <Form.Label htmlFor="userOrEmail">Username or E-Mail Address</Form.Label>
              <Form.Control
                type="text"
                id="userOrEmail"
                name="userOrEmail"
                placeholder="Enter username or E-Mail Address"
                className="form-control"
              />
              <Form.Control.Feedback>
                <ErrorMessage name="userOrEmail" />
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
              <Form.Control.Feedback>
                <ErrorMessage name="password" />
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <ButtonGroup>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate('../register')}
                >
                  Register
                </Button>
              </ButtonGroup>
            </Form.Group>
            <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal}>
              {submissionError}
            </ErrorModal>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;