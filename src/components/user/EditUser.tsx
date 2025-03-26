import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import { Formik, Form as FormikForm } from 'formik';
import { apiGetUser, apiSetUser } from '@/api/endpoints/user';
import { RegisterUserSchema } from '@/utils/formValidations';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import EditButtons from './EditButtons';
import LoadingOverlay from '../LoadingOverlay';

export default function EditUser(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const authUser = useAuthUser<User>();

    const initialValues: Omit<User, 'email' | 'username'> & { password: string; password_confirm: string } = {
        password: '',
        password_confirm: '',
        firstname: '',
        name: '',
        telephone: '',
        additionalDescription: '',
        profilepicture: undefined,
    };

    const validationSchema = RegisterUserSchema;

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            if (authUser?.userId === undefined) {
                showErrorModal('No user logged in!');
                return;
            }

            const { password_confirm, password, ...tempData } = values;

            const hydratedData = {
                user: {
                    ...tempData,
                    userId: authUser.userId,
                    username: authUser.username,
                    email: authUser.email,
                },
                password: password ? password : '',
            };

            const response = await apiSetUser(hydratedData);
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
                <LoadingOverlay isLoading={isLoading}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {(formikProps) => {
                            React.useEffect(() => {
                                const fetchData = async () => {
                                    try {
                                        if (authUser?.userId === undefined) {
                                            showErrorModal('No user logged in!');
                                            return;
                                        }

                                        const response = await apiGetUser({ userID: authUser.userId });

                                        formikProps.setValues({
                                            ...initialValues,
                                            ...response.data,
                                            password: '',
                                            password_confirm: '',
                                        });
                                        formikProps.validateForm();
                                    } catch (error: unknown) {
                                        showErrorModal((error as Error).message);
                                    } finally {
                                        setIsLoading(false);
                                    }
                                };
                                fetchData();
                            }, []);

                            return (
                                <FormikForm>
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
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='First Name'
                                            name='firstname'
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
                                            name='additionalDescription'
                                            type='textarea'
                                            placeholder='Tell us about yourself'
                                            isLoading={isLoading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='Profile Picture'
                                            name='profilepicture'
                                            type='file'
                                            isLoading={isLoading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <br />
                                    <EditButtons isLoading={isLoading} isSubmitting={formikProps.isSubmitting} />
                                </FormikForm>
                            );
                        }}
                    </Formik>
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
