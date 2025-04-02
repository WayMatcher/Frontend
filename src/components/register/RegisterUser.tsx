import React, { useContext, useState, useEffect } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Button, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import { FormUserRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import User from '@/types/objects/User/dto';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetUsernameList } from '@/api/endpoints/user';
import * as Yup from 'yup';
import LoadingOverlay from '../LoadingOverlay';

/**
 * Component for registering a new user.
 * @param {Object} props - Component props.
 * @param {[User & { password: string } | null, React.Dispatch<React.SetStateAction<User & { password: string } | null>>]} props.userState - State for the user object.
 * @param {Object} props.done - Object to track completion status of different steps.
 * @param {boolean} props.done.user - Indicates if the user step is complete.
 * @param {boolean} props.done.address - Indicates if the address step is complete.
 * @param {boolean} props.done.vehicle - Indicates if the vehicle step is complete.
 * @param {Function} props.done.onComplete - Callback to mark a step as complete.
 * @returns {React.ReactElement} The RegisterUser component.
 */
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
    const [usernames, setUsernames] = useState<string[]>([]); // List of existing usernames
    const [emails, setEmails] = useState<string[]>([]); // List of existing emails
    const [loading, setLoading] = React.useState<boolean>(true); // Loading state for API calls
    const { showErrorModal } = useContext(ErrorModalContext); // Context for displaying error modals

    // Fetch usernames and emails on component mount
    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                setLoading(true);
                const response = await apiGetUsernameList(); // Fetch usernames from the API

                // Extract usernames and emails from the response
                const usernamesList = response.data.map((user: User) => user.username);
                setUsernames(usernamesList);

                const emailList = response.data.map((user: User) => user.email);
                setEmails(emailList);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    showErrorModal(error.message); // Show error modal if an error occurs
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };

        fetchUsernames();
    }, []);

    /**
     * Handles form submission.
     * @param {FormUserRegister} values - Form values submitted by the user.
     */
    const handleSubmit = async (values: FormUserRegister) => {
        userState[1](values); // Update user state with form values
        done.onComplete(true); // Mark the step as complete
    };

    // Validation schema for the form using Yup
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

    // Initial values for the form
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

                        // Update form values if userState changes
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
                                {/* Username and Email Fields */}
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
                                {/* Password Fields */}
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
                                {/* Personal Information Fields */}
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
                                {/* Additional Information Fields */}
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
                                {/* Submit Button */}
                                <Button type='submit'>{formikProps.isSubmitting ? 'Saving...' : 'Save'}</Button>
                            </FormikForm>
                        );
                    }}
                </Formik>
            </LoadingOverlay>
        </CollapseWrapper>
    );
}
