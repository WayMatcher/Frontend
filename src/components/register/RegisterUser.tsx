import React, { useContext } from "react";
import { Form as FormikForm, Formik } from "formik";
import { Container, Col, Row, Button } from "react-bootstrap";
import { RegisterUserSchema } from "../../formValidations";
import { RegisterUserInitialValues } from "../../formInitialValues";
import RegisterContext from "../../contexts/RegisterContext";
import FormInput from "../FormInput";
import RegisterSteps from "../../types/RegisterSteps";

export default function RegisterUser(): React.ReactElement {
    const { setRegisterUser, setStep } = useContext(RegisterContext);

    const handleSubmit = async (values: typeof RegisterUserInitialValues) => {
        setRegisterUser(values);
        setStep(RegisterSteps.ADDRESS);
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
                                <FormInput
                                    label="Username"
                                    name="username" type="text"
                                    placeholder="username"
                                    value={values.username} error={errors.username}
                                />
                                <FormInput
                                    label="Email"
                                    name="email" type="email"
                                    placeholder="contact@example.com"
                                    value={values.email} error={errors.email}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Password"
                                    name="password" type="password"
                                    value={values.password} error={errors.password}
                                />
                                <FormInput
                                    label="Confirm Password"
                                    name="confirmPassword" type="password"
                                    value={values.confirmPassword} error={errors.confirmPassword}
                                />
                            </Row>
                            <hr />
                            <h3>Optional Information</h3>
                            <Row>
                                <FormInput
                                    label="First Name"
                                    name="firstName" type="text"
                                    placeholder="John"
                                    value={values.firstName} error={errors.firstName}
                                />
                                <FormInput
                                    label="Last Name"
                                    name="name" type="text"
                                    placeholder="Doe"
                                    value={values.name} error={errors.name} />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Telephone"
                                    name="telephone" type="tel"
                                    placeholder="555-555-5555"
                                    value={values.telephone} error={errors.telephone}
                                />
                            </Row>
                            <hr />
                            <Row>
                                <FormInput
                                    label="Additional Information"
                                    name="additional_description" type="textarea"
                                    placeholder="Tell us about yourself"
                                    value={values.additional_description} error={errors.additional_description}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Profile Picture"
                                    name="profile_picture" type="file"
                                    value={values.profile_picture} error={errors.profile_picture} />
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Button type='submit'>Next</Button>
                                </Col>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    );
}