import React, { useContext } from "react";
import { Form as FormikForm, Formik } from "formik";
import { Container, Row } from "react-bootstrap";
import { RegisterUserSchema } from "../../utils/formValidations";
import RegisterContext from "../../contexts/RegisterContext";
import FormInput from "../FormInput";
import RegisterSteps from "../../types/RegisterSteps";
import CollapseWrapper from "../CollapseWrapper";
import RegisterNavButtons from "./RegisterNavButtons";
import { UserRegister } from "../../types/dto/User";

export default function RegisterUser(): React.ReactElement {
    const { registerUser, setRegisterUser, setStep } = useContext(RegisterContext);

    const handleSubmit = async (values: typeof initialValues) => {
        setRegisterUser(values);
        setStep(RegisterSteps.ADDRESS);
    }

    const initialValues: UserRegister = {
        email: registerUser?.email || '',
        username: registerUser?.username || '',
        password: registerUser?.password || '',
        confirmPassword: registerUser?.confirmPassword || '',
        name: registerUser?.name || '',
        firstName: registerUser?.firstName || '',
        telephone: registerUser?.telephone || '',
        additional_description: registerUser?.additional_description || '',
        profile_picture: registerUser?.profile_picture || '',
        license_verified: registerUser?.license_verified || false,
    }

    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValues}
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
                                <RegisterNavButtons nextStep={RegisterSteps.ADDRESS} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}