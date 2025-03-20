import React, { useEffect, useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { EditUserSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import User, { UserRegisterModel } from '@/types/User/dto';
import { apiGetUser, apiSetUser } from '@/api/endpoints/user';
import EditProps from '@/types/EditProps';
import EditButtons from '@/components/user/EditButtons';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { FormUser, initialValuesUser } from '@/types/User/form';

export default function EditUser({ setShowErrorModal, setSubmissionError }: EditProps): React.ReactElement {
    const [user, setUser] = useState<User>();
    const authUser = useAuthUser<User>();

    useEffect(() => {
        const fetchUser = async () => {
            if (!authUser) return;

            const request: RequestUser = {
                userID: authUser.id,
            };

            const response = await apiGetUser(request);

            setUser({
                email: response.email,
                username: response.username,
                additional_description: response.additional_description,
                firstName: response.firstName,
                name: response.name,
                telephone: response.telephone,
                profile_picture: response.profile_picture,
                license_verified: response.license_verified,
            });
        };
        fetchUser();
    }, [setShowErrorModal, setSubmissionError]);

    const handleSubmit = async (values: UserRegisterModel) => {
        const request: RequestUser = values;

        const response: ResponseUser = await apiSetUser(request);

        setUser({
            email: values.email,
            username: values.username,
            additional_description: values.additional_description,
            firstName: values.firstName,
            name: values.name,
            telephone: values.telephone,
            profile_picture: values.profile_picture,
            license_verified: values.license_verified,
        });
    };

    const initialValues: FormUser = {
        username: user?.username || initialValuesUser.username,
        email: user?.email || initialValuesUser.email,
        password: initialValuesUser.password,
        confirmPassword: initialValuesUser.confirmPassword,
        name: user?.name || initialValuesUser.name,
        firstName: user?.firstName || initialValuesUser.firstName,
        telephone: user?.telephone || initialValuesUser.telephone,
        additional_description: user?.additional_description || initialValuesUser.additional_description,
        profile_picture: user?.profile_picture || initialValuesUser.profile_picture,
        license_verified: user?.license_verified || initialValuesUser.license_verified,
    };

    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik initialValues={initialValues} validationSchema={EditUserSchema} onSubmit={handleSubmit}>
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label='Username'
                                        name='username'
                                        type='text'
                                        placeholder='username'
                                        formikData={{ value: values.username, error: errors.username, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Email'
                                        name='email'
                                        type='email'
                                        placeholder='contact@example.com'
                                        formikData={{ value: values.email, error: errors.email, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        formikData={{ value: values.password, error: errors.password, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Confirm Password'
                                        name='confirmPassword'
                                        type='password'
                                        formikData={{
                                            value: values.confirmPassword,
                                            error: errors.confirmPassword,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <hr />
                                <h3>Optional Information</h3>
                                <Row>
                                    <FormInput
                                        label='First Name'
                                        name='firstName'
                                        type='text'
                                        placeholder='John'
                                        formikData={{ value: values.firstName, error: errors.firstName, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Last Name'
                                        name='name'
                                        type='text'
                                        placeholder='Doe'
                                        formikData={{ value: values.name, error: errors.name, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Telephone'
                                        name='telephone'
                                        type='tel'
                                        placeholder='555-555-5555'
                                        formikData={{ value: values.telephone, error: errors.telephone, isSubmitting }}
                                    />
                                </Row>
                                <hr />
                                <Row>
                                    <FormInput
                                        label='Additional Information'
                                        name='additional_description'
                                        type='textarea'
                                        placeholder='Tell us about yourself'
                                        formikData={{
                                            value: values.additional_description,
                                            error: errors.additional_description,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Profile Picture'
                                        name='profile_picture'
                                        type='file'
                                        formikData={{
                                            value: values.profile_picture,
                                            error: errors.profile_picture,
                                            isSubmitting,
                                        }}
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
