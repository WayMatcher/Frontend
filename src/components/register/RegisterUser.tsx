import React from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Button, Container, Row } from 'react-bootstrap';
import { RegisterUserSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { FormUserRegister, initialValuesUserRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import User from '@/types/objects/User/dto';
import { useEffect } from 'react';

export default function RegisterUser({
    userState,
    done,
}: {
    userState: [
        (User & { password: string }) | null,
        React.Dispatch<React.SetStateAction<(User & { password: string }) | null>>,
    ];
    done: {
        user: boolean;
        address: boolean;
        vehicle: boolean;
        onComplete: (isDone: boolean) => void;
    };
}): React.ReactElement {
    const handleSubmit = async (values: FormUserRegister) => {
        userState[1](values);
        done.onComplete(true);
    };

    return (
        <CollapseWrapper>
            <Container>
                <Formik
                    initialValues={initialValuesUserRegister}
                    validationSchema={RegisterUserSchema}
                    onSubmit={handleSubmit}
                >
                    {(formikProps) => {
                        const { setValues } = formikProps; // Access Formik context here

                        useEffect(() => {
                            if (userState[0]) {
                                setValues({
                                    ...initialValuesUserRegister,
                                    ...userState[0],
                                });
                            }
                        }, [userState, setValues]);

                        return (
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
                                        name='additionaldescription'
                                        type='textarea'
                                        placeholder='Tell us about yourself'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label="Owns driver's license"
                                        name='licenseVerified'
                                        type='switch'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Profile Picture'
                                        name='profilePicture'
                                        type='file'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Button type='submit'>{formikProps.isSubmitting ? 'Saving...' : 'Save'}</Button>
                            </FormikForm>
                        );
                    }}
                </Formik>
            </Container>
        </CollapseWrapper>
    );
}
