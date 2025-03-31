import React, { useContext, useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Button, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import { FormUserRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import User from '@/types/objects/User/dto';
import { useEffect } from 'react';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetUsernameList } from '@/api/endpoints/user';
import * as Yup from 'yup';
import LoadingOverlay from '../LoadingOverlay';

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
    const [usernames, setUsernames] = useState<string[]>([]);
    const [emails, setEmails] = useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const { showErrorModal } = useContext(ErrorModalContext);

    // Fetch Usernames on Page load
    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                setLoading(true);
                // Fetch usernames from the API or any other source
                const response = await apiGetUsernameList();

                // Sets the usernames
                const usernamesList = response.data.map((user: User) => user.username);
                setUsernames(usernamesList);

                // Sets the emails
                const emailList = response.data.map((user: User) => user.email);
                setEmails(emailList);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    showErrorModal(error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsernames();
    }, []);

    const handleSubmit = async (values: FormUserRegister) => {
        userState[1](values);
        done.onComplete(true);
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("E-Mail isn't an E-Mail")
            .required('Please enter an E-Mail')
            .test('unique-email', 'This email is already taken', (value) => !emails.includes(value || '')),
        username: Yup.string()
            .required('Please enter a Username')
            .test('unique-username', 'This username is already taken', (value) => !usernames.includes(value || '')),
        password: Yup.string()
            .required('Please enter a Password')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.',
            ),
        password_confirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
        name: Yup.string(),
        firstName: Yup.string(),
        telephone: Yup.string(),
        additionaldescription: Yup.string(),
        ProfilePicture: Yup.string(),
        licenseVerified: Yup.boolean(),
    });

    const initialValues: FormUserRegister = {
        email: '',
        username: '',
        password: '',
        password_confirm: '',
        name: '',
        firstName: '',
        telephone: '',
        additionaldescription: '',
        profile_picture: '',
        licenseVerified: false,
    };

    return (
        <CollapseWrapper>
            <LoadingOverlay isLoading={loading}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {(formikProps) => {
                        const { setValues } = formikProps; // Access Formik context here

                        useEffect(() => {
                            if (userState[0]) {
                                setValues({
                                    ...initialValues,
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
            </LoadingOverlay>
        </CollapseWrapper>
    );
}
