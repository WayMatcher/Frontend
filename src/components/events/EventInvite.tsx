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
import LoadingOverlay from '../LoadingOverlay';

export const EventInvite = ({
    showState,
    owner,
    event,
}: {
    showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    owner?: boolean;
    event: WMEvent;
}) => {
    const [usernameList, setUsernameList] = useState<{ userId: number; username: string }[]>([]);

    const [show, setShow] = showState;

    const authUser = useAuthUser<User>();
    const [loading, setLoading] = useState(false);
    const { showErrorModal } = useContext(ErrorModalContext);
    if (!authUser) return null;

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                setLoading(true);
                const response = await apiGetUsernameList();

                const uniqueUsernames = response.data
                    .filter((user: User) => user.userId !== undefined && user.userId !== authUser.userId)
                    .map((user: User) => ({
                        userId: user.userId || -1,
                        username: user.username,
                    }));

                setUsernameList(uniqueUsernames);
            } catch (error) {
                showErrorModal(error instanceof Error ? error.message : 'An error occurred');
                return;
            } finally {
                setLoading(false);
            }
        };
        if (owner && show) {
            fetchUsernames();
        }
    }, [show, owner]);

    useEffect(() => {
        if (!show) {
            setShow(false); // Ensure modal closes properly
        }
    }, [show]);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            {owner === true ? (
                <LoadingOverlay isLoading={loading}>
                    <Invite event={event} setShow={setShow} userList={usernameList} />
                </LoadingOverlay>
            ) : (
                <LoadingOverlay isLoading={loading}>
                    <Request event={event} authUser={authUser} setShow={setShow} />
                </LoadingOverlay>
            )}
        </Modal>
    );
};

const Invite = ({
    event,
    userList,
    setShow,
}: {
    event: WMEvent;
    userList: {
        userId: number;
        username: string;
    }[];
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { showErrorModal } = useContext(ErrorModalContext);

    const userIdArray = userList.map((user) => user.userId);

    const handleInvite = async (values: { userId: number; message: string; isPilot: boolean }) => {
        try {
            await apiSendInvite({
                userId: values.userId,
                eventId: event.eventId,
                message: values.message,
                isPilot: values.isPilot,
            });
            setShow(false);
        } catch (error) {
            showErrorModal(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const validationSchema = Yup.object({
        message: Yup.string(),
        userId: Yup.number().oneOf(userIdArray).min(1).required('User is required'),
    });

    return (
        <Formik
            initialValues={{ userId: -1, message: '', isPilot: false }}
            onSubmit={handleInvite}
            validationSchema={validationSchema}
        >
            {(formikProps) => (
                <FormikForm>
                    <Modal.Header closeButton>
                        <Modal.Title>{'Invite User'}</Modal.Title>
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
                                    placeholder={'Enter a message you want to send to the user'}
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
                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId={`validationFormik_username`}>
                                <Form.Label>Username</Form.Label>
                                <Form.Select
                                    aria-label='Username select'
                                    name='userId'
                                    value={formikProps.values.userId}
                                    disabled={formikProps.isSubmitting}
                                    isValid={formikProps.touched.userId && !formikProps.errors.userId}
                                    onChange={formikProps.handleChange}
                                >
                                    {userList.map(({ userId, username }) => (
                                        <option aria-description={username} value={userId} key={userId}>
                                            {username}
                                        </option>
                                    ))}
                                </Form.Select>
                                {typeof formikProps.errors.userId === 'string' ? (
                                    <Form.Control.Feedback type='invalid'>
                                        {formikProps.errors.userId}
                                    </Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId={`validationFormik_isPilot`}>
                                <Form.Switch type='switch' id='isPilot' name='isPilot' label='Invite as Pilot Role' />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button variant='secondary' onClick={() => setShow(false)}>
                                Close
                            </Button>
                            <Button type='submit'>{'Invite'}</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </FormikForm>
            )}
        </Formik>
    );
};

const Request = ({
    authUser,
    event,
    setShow,
}: {
    authUser: User;
    event: WMEvent;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { showErrorModal } = useContext(ErrorModalContext);
    const handleRequest = async (values: { message: string; isPilot: boolean }) => {
        try {
            if (authUser.userId === undefined) throw new Error('No user ID provided');

            await apiRequestInvite({
                userId: authUser.userId,
                eventId: event.eventId,
                message: values.message,
                isPilot: values.isPilot,
            });
            setShow(false);
        } catch (error) {
            showErrorModal(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const validationSchema = Yup.object({
        message: Yup.string(),
        isPilot: Yup.boolean(),
    });

    return (
        <Formik
            initialValues={{ message: '', isPilot: false }}
            onSubmit={handleRequest}
            validationSchema={validationSchema}
        >
            {(formikProps) => (
                <FormikForm>
                    <Modal.Header closeButton>
                        <Modal.Title>{'Request Match'}</Modal.Title>
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
                                    placeholder={'Enter a message you want to send to the Owner'}
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
                            <Row>
                                <Form.Group as={Col} controlId={`validationFormik_isPilot`}>
                                    <Form.Switch
                                        type='switch'
                                        id='isPilot'
                                        name='isPilot'
                                        onChange={() =>
                                            formikProps.setValues({
                                                ...formikProps.values,
                                                isPilot: !formikProps.values.isPilot,
                                            })
                                        }
                                        label='Request as Pilot Role'
                                    />
                                </Form.Group>
                            </Row>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button variant='secondary' onClick={() => setShow(false)}>
                                Close
                            </Button>
                            <Button type='submit'>Request</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </FormikForm>
            )}
        </Formik>
    );
};

export default EventInvite;
