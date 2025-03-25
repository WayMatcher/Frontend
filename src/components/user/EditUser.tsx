import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import { Formik, Form as FormikForm } from 'formik';
import { apiGetUser, apiSetUser } from '@/api/endpoints/user';
import { RegisterUserSchema } from '@/utils/formValidations';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import EditButtons from './EditButtons';

export default function EditUser(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const authUser = useAuthUser<User>();

    let initialValues = {
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        firstName: '',
        name: '',
        telephone: '',
        additional_description: '',
        profile_picture: '',
    };

    const validationSchema = RegisterUserSchema;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                const response = await apiGetUser({ userID: authUser.userId });

                initialValues = { ...initialValues, ...response.data, password: '', password_confirm: '' };
            } catch (error: unknown) {
                showErrorModal((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            if (authUser?.userId === undefined) {
                showErrorModal('No user logged in!');
                return;
            }

            const response = await apiSetUser(values);
            console.log(response);
        } catch (error: unknown) {
            if (error instanceof Error) {
                showErrorModal(error.message);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {(formikProps) => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Username'
                                        name='username'
                                        type='text'
                                        isLoading={isLoading}
                                        placeholder='username'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Email'
                                        name='email'
                                        type='email'
                                        placeholder='contact@example.com'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Confirm Password'
                                        name='password_confirm'
                                        type='password'
                                        isLoading={isLoading}
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
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Last Name'
                                        name='name'
                                        type='text'
                                        placeholder='Doe'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Telephone'
                                        name='telephone'
                                        type='tel'
                                        placeholder='555-555-5555'
                                        isLoading={isLoading}
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
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Profile Picture'
                                        name='profile_picture'
                                        type='file'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <br />
                                <EditButtons isLoading={isLoading} isSubmitting={formikProps.isSubmitting} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
