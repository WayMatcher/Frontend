import React, { FormEvent, useState } from 'react';
import useUser from '../context/UserUse';
import { useNavigate } from 'react-router-dom';
import { loginEmail, loginUsername } from '../api/auth';
import { User } from '../types';
import '../styles/LoginPage.scss';
import { Form, Button } from 'react-bootstrap';


const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const LoginPage: React.FC = () => {
  const [validated, setValidated] = useState(false);

  const [userOrEMail, setUserOrEMail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUser();
  const navigate = useNavigate();

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

  return (
    <Form className='loginForm' noValidate validated={validated} onSubmit={handleSubmit}>
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
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};


export default LoginPage;