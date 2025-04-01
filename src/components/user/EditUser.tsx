import React, { useContext } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import { Formik, Form as FormikForm } from 'formik';
import { apiDeleteUser, apiGetUser, apiSetUser } from '@/api/endpoints/user';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import EditButtons from './EditButtons';
import LoadingOverlay from '../LoadingOverlay';
import * as Yup from 'yup';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

export default function EditUser(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [loading, setLoading] = React.useState(true);
    const [deletePopup, setDeletePopup] = React.useState(false);
    const authUser = useAuthUser<User>();

    const signOut = useSignOut();

    const navigate = useNavigate();

    const initialValues: Omit<User, 'email' | 'username'> & { password: string; password_confirm: string } = {
        password: '',
        password_confirm: '',
        firstname: '',
        name: '',
        telephone: '',
        additionalDescription: '',
        profilePicture: undefined,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("E-Mail isn't an E-Mail").required('Please enter an E-Mail'),
        username: Yup.string().required('Please enter a Username'),
        name: Yup.string(),
        firstName: Yup.string(),
        telephone: Yup.string(),
        additionaldescription: Yup.string(),
        licenseVerified: Yup.boolean(),
    });

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

            await apiSetUser(hydratedData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                showErrorModal(error.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleDelete = async () => {
        if (authUser?.userId) {
            try {
                setLoading(true);
                await apiDeleteUser({ userId: authUser.userId });
                signOut();
                navigate('/login');
                setDeletePopup(false);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    showErrorModal(error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <LoadingOverlay isLoading={loading}>
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
                                        setLoading(false);
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
                                            isLoading={loading}
                                            formikProps={formikProps}
                                        />
                                        <FormInput
                                            label='Confirm Password'
                                            name='password_confirm'
                                            type='password'
                                            isLoading={loading}
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
                                            isLoading={loading}
                                            formikProps={formikProps}
                                        />
                                        <FormInput
                                            label='Last Name'
                                            name='name'
                                            type='text'
                                            placeholder='Doe'
                                            isLoading={loading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='Telephone'
                                            name='telephone'
                                            type='tel'
                                            placeholder='555-555-5555'
                                            isLoading={loading}
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
                                            isLoading={loading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label="Owns driver's license"
                                            name='licenseVerified'
                                            type='switch'
                                            isLoading={loading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='Profile Picture'
                                            name='profilePicture'
                                            type='file'
                                            isLoading={loading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <br />
                                    <div className='d-flex justify-content-between'>
                                        <EditButtons isLoading={loading} isSubmitting={formikProps.isSubmitting} />
                                        <Button onClick={() => setDeletePopup(true)} variant='danger'>
                                            Delete
                                        </Button>
                                    </div>
                                </FormikForm>
                            );
                        }}
                    </Formik>
                </LoadingOverlay>
            </CollapseWrapper>
            <Modal show={deletePopup} onHide={() => setDeletePopup(false)} centered>
                <Modal.Body>
                    <h3>{authUser?.username}</h3>
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Container className='d-flex justify-content-between'>
                        <Button variant='secondary' onClick={() => setDeletePopup(false)}>
                            Cancel
                        </Button>
                        <Button variant='danger' onClick={handleDelete}>
                            Delete User
                        </Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    );
}
