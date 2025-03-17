import React, { useEffect, useState } from "react";
import { Form as FormikForm, Formik } from "formik";
import { Container, Row } from "react-bootstrap";
import { EditUserSchema } from "../../utils/formValidations";
import FormInput from "../FormInput";
import CollapseWrapper from "../CollapseWrapper";
import User, { UserRegister } from "../../types/dto/User";
import { apiGetUser, apiSetUser } from "../../api/endpoints/user/user";
import EditProps from "../../types/EditProps";
import APIResponse from "../../types/API";
import EditButtons from "./EditButtons";

export default function EditUser({ setShowErrorModal, setSubmissionError }: EditProps): React.ReactElement {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiGetUser();
                if (response.succeeded === true) {
                    setUser(response.user);
                } else {
                    setSubmissionError(response.message);
                    setShowErrorModal(true);
                }
            } catch (error: unknown) {
                console.error('Error fetching user:', error);
                setSubmissionError((error as Error).message);
                setShowErrorModal(true);
            }
        };
        fetchUser();
    }, [setShowErrorModal, setSubmissionError]);

    const handleSubmit = async (values: UserRegister) => {
        apiSetUser(values).then((response: APIResponse) => {
            if (response.succeeded === true) {
                setUser(values);
            } else {
                setSubmissionError(response.message);
                setShowErrorModal(true);
            }
        }).catch((error: unknown) => {
            console.error('Error setting user:', error);
            setSubmissionError((error as Error).message);
            setShowErrorModal(true);
        });
    }

    const initialValues: UserRegister = {
        email: user?.email || '',
        username: user?.username || '',
        password: '',
        confirmPassword: '',
        name: user?.name || '',
        firstName: user?.firstName || '',
        telephone: user?.telephone || '',
        additional_description: user?.additional_description || '',
        profile_picture: user?.profile_picture || '',
        license_verified: user?.license_verified || false,
    }

    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={EditUserSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label="Username"
                                        name="username" type="text"
                                        placeholder="username"
                                        formikData={{ value: values.username, error: errors.username, isSubmitting }}
                                    />
                                    <FormInput
                                        label="Email"
                                        name="email" type="email"
                                        placeholder="contact@example.com"
                                        formikData={{ value: values.email, error: errors.email, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Password"
                                        name="password" type="password"
                                        formikData={{ value: values.password, error: errors.password, isSubmitting }}
                                    />
                                    <FormInput
                                        label="Confirm Password"
                                        name="confirmPassword" type="password"
                                        formikData={{ value: values.confirmPassword, error: errors.confirmPassword, isSubmitting }}
                                    />
                                </Row>
                                <hr />
                                <h3>Optional Information</h3>
                                <Row>
                                    <FormInput
                                        label="First Name"
                                        name="firstName" type="text"
                                        placeholder="John"
                                        formikData={{ value: values.firstName, error: errors.firstName, isSubmitting }}
                                    />
                                    <FormInput
                                        label="Last Name"
                                        name="name" type="text"
                                        placeholder="Doe"
                                        formikData={{ value: values.name, error: errors.name, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Telephone"
                                        name="telephone" type="tel"
                                        placeholder="555-555-5555"
                                        formikData={{ value: values.telephone, error: errors.telephone, isSubmitting }}
                                    />
                                </Row>
                                <hr />
                                <Row>
                                    <FormInput
                                        label="Additional Information"
                                        name="additional_description" type="textarea"
                                        placeholder="Tell us about yourself"
                                        formikData={{ value: values.additional_description, error: errors.additional_description, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Profile Picture"
                                        name="profile_picture" type="file"
                                        formikData={{ value: values.profile_picture, error: errors.profile_picture, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <EditButtons isSubmitting={isSubmitting} />
                                </Row>
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}