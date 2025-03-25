import React from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RegisterUserSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { FormUserRegister, initialValuesUserRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import User from '@/types/objects/User/dto';

export default function RegisterUser({
    userState,
    onComplete,
}: {
    userState: [
        (User & { password: string }) | null,
        React.Dispatch<React.SetStateAction<(User & { password: string }) | null>>,
    ];
    onComplete: (isDone: boolean) => void;
}): React.ReactElement {
    const navigate = useNavigate();

    const handleSubmit = async (values: FormUserRegister) => {
        userState[1](values);
        onComplete(true);
        navigate('/register/address');
    };

    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValuesUserRegister}
                        validationSchema={RegisterUserSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Username'
                                        name='username'
                                        type='text'
                                        placeholder='username'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Email'
                                        name='email'
                                        type='email'
                                        placeholder='contact@example.com'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Confirm Password'
                                        name='password_confirm'
                                        type='password'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <hr />
                                <h3>Optional Information</h3>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='First Name'
                                        name='firstName'
                                        type='text'
                                        placeholder='John'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Last Name'
                                        name='name'
                                        type='text'
                                        placeholder='Doe'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Telephone'
                                        name='telephone'
                                        type='tel'
                                        placeholder='555-555-5555'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <hr />
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Additional Information'
                                        name='additional_description'
                                        type='textarea'
                                        placeholder='Tell us about yourself'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Profile Picture'
                                        name='profile_picture'
                                        type='file'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Button type='submit'>{formikProps.isSubmitting ? 'Saving...' : 'Save'}</Button>
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
