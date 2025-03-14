import React, { useContext } from "react";
import { Form as FormikForm, Formik, Field } from "formik";
import { Container, Form, InputGroup, Col, Row, Button } from "react-bootstrap";
import { RegisterUserSchema } from "../../../formValidations";
import { RegisterUserInitialValues } from "../../../formInitialValues";
import RegisterContext from "../../../contexts/RegisterContext";
import { RegisterStepProps } from '../../../types/RegisterSteps';

export default function RegisterUser({ setStepValidity, step }: RegisterStepProps): React.ReactElement {

    const { setRegisterUser } = useContext(RegisterContext);

    const handleSubmit = async (values: typeof RegisterUserInitialValues) => {
        setRegisterUser(values);
        setStepValidity(1, true);
    }

    return (
        <>
            <h2>User</h2>
            <Container>
                <Formik
                    initialValues={RegisterUserInitialValues}
                    validationSchema={RegisterUserSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors }) => (
                        <FormikForm>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Field
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Field
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Field
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <hr />
                            <h3>Optional Information</h3>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Field
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        className={`form-control`}
                                        placeholder="Mustermann"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        className={`form-control`}
                                        placeholder="Max"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Telephone</Form.Label>
                                    <Field
                                        type="tel"
                                        name="telephone"
                                        value={values.telephone}
                                        className={`form-control`}
                                        placeholder="+43123456789"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.telephone}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <hr />
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Additional Information</Form.Label>
                                    <Field
                                        type="textarea"
                                        name="additional_description"
                                        value={values.additional_description}
                                        className={`form-control`}
                                        component="textarea"
                                        placeholder="About me..."
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.additional_description}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Field
                                        id="profile_picture"
                                        name="profile_picture"
                                        label="Choose File"
                                        type="file"
                                        className={`form-control`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.profile_picture}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type='submit'>Submit</Button>
                                </Col>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    );
}