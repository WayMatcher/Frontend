import { apiGetUsernameList } from '@/api/endpoints/user';
import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Form, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { apiRequestInvite, apiSendInvite } from '@/api/endpoints/invite';
import WMEvent from '@/types/objects/Event/dto';
import User from '@/types/objects/User/dto';

export const EventInvite = ({
    showState,
    owner,
    event,
}: {
    showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    owner?: boolean;
    event: WMEvent;
}) => {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [usernameList, setUsernameList] = useState<string[]>([]);
    const [show, setShow] = showState;

    const authUser = useAuthUser<User>();

    useEffect(() => {
        const fetchUsernames = async () => {
            const response = await apiGetUsernameList();

            // Remove duplicates from Usernamelist
            const uniqueUsernames = [...new Set(response.data)];
            setUsernameList(uniqueUsernames);
        };
        if (!owner) {
            fetchUsernames();
        }
    }, []);

    const handleInvite = async (values: { username?: string; message?: string }) => {
        if (!authUser?.userId) return;

        const apiCall =
            owner && values.username
                ? () =>
                      apiSendInvite({
                          ownerUsername: authUser.username,
                          username: values.username || '',
                          eventId: event.eventId,
                          message: values.message,
                      })
                : () =>
                      apiRequestInvite({
                          username: authUser.username,
                          eventId: event.eventId,
                          message: values.message,
                      });

        try {
            await apiCall();
            setShow(false);
        } catch (error) {
            showErrorModal(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const validationSchema = Yup.object({
        message: Yup.string(),
        ...(owner && {
            username: Yup.string().oneOf(usernameList).min(1).required('User is required'),
        }),
    });

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Formik
                initialValues={{ username: owner ? '' : undefined, message: '' }}
                onSubmit={handleInvite}
                validationSchema={validationSchema}
            >
                {(formikProps) => (
                    <FormikForm>
                        <Modal.Header closeButton>
                            <Modal.Title>{owner ? 'Request Invite' : 'Invite User'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className='mb-3'>
                                <Form.Group as={Col} controlId={`validationFormik_message`}>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        aria-label='Message to send'
                                        as={'textarea'}
                                        name={'message'}
                                        value={formikProps.values.message}
                                        placeholder={
                                            owner
                                                ? 'Enter a message you want to send to the owner'
                                                : 'Enter a message you want to send to the user'
                                        }
                                        disabled={formikProps.isSubmitting}
                                        isValid={formikProps.touched.message && !formikProps.errors.message}
                                        onChange={formikProps.handleChange}
                                    />
                                    {typeof formikProps.errors.message === 'string' ? (
                                        <Form.Control.Feedback type='invalid'>
                                            {formikProps.errors.message}
                                        </Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            {!owner && (
                                <Row className='mb-3'>
                                    <Form.Group as={Col} controlId={`validationFormik_username`}>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Select
                                            aria-label='Username select'
                                            name='username'
                                            value={formikProps.values.username}
                                            disabled={formikProps.isSubmitting}
                                            isValid={formikProps.touched.username && !formikProps.errors.username}
                                            onChange={formikProps.handleChange}
                                        >
                                            {usernameList.map((username) => (
                                                <option aria-description={username} value={username}>
                                                    {username}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {typeof formikProps.errors.username === 'string' ? (
                                            <Form.Control.Feedback type='invalid'>
                                                {formikProps.errors.username}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Row>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonGroup>
                                <Button variant='secondary' onClick={() => setShow(false)}>
                                    Close
                                </Button>
                                <Button type='submit' disabled={!!formikProps.errors || !formikProps.touched}>
                                    {owner ? 'Request' : 'Invite'}
                                </Button>
                            </ButtonGroup>
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    );
};
export default EventInvite;
