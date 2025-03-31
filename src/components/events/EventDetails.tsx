import { Alert, Button, ButtonGroup, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import EventMap from './EventMap';
import EventInvite from './EventInvite';
import '@/components/styles/EventDetails.scss';
import { useNavigate } from 'react-router-dom';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiDeleteEvent, apiUpdateEvent } from '@/api/endpoints/event';
import StopList from './StopList';
import Stop from '@/types/objects/Stop/dto';
import cronparser, { CronExpression } from 'cron-parser';
import FormInput from '../FormInput';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import cronParser from 'cron-parser';
import EventMemberDisplay from './EventMemberDisplay';

const validationSchema = Yup.object({
    isPilot: Yup.boolean(),
    description: Yup.string(),
    startTimestamp: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
    freeSeats: Yup.number().required('Free Seats are required'),
    repeating: Yup.boolean(),
    cronSchedule: Yup.string().when('repeating', {
        is: true,
        then: (schema) => schema.required('Cron schedule is required when repeating is enabled'),
    }),
});

const initialValues = {
    description: '',
    freeSeats: 3,
    repeating: false,
    startTimestamp: new Date(),
    cronSchedule: '',
};
const Details = ({
    event,
    editModeState,
    isOwnedEvent,
}: {
    event: WMEvent;
    editModeState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    isOwnedEvent: boolean;
}) => {
    const stopListState = useState<Stop[]>([]);
    const [loading, setLoading] = useState(false);

    const { showErrorModal } = useContext(ErrorModalContext);

    const authUser = useAuthUser<User>();

    const [editMode, setEditMode] = editModeState;

    useEffect(() => {
        stopListState[1](event.stopList);
    }, [event.stopList]);
    const [cronExpression, setCronExpression] = useState<CronExpression | undefined>();
    const [nextExecution, setNextExecution] = useState<string>('');
    const [repeating, setRepeating] = useState<boolean>(false);

    const onSubmit = async (values: typeof initialValues) => {
        if (editMode) {
            if (!event.eventTypeId) {
                showErrorModal('Event Type ID is undefined');
                return;
            }

            const updatedEvent = {
                ...event,
                description: values.description,
                startTimestamp: new Date(values.startTimestamp).toString(),
                schedule: {
                    cronSchedule: values.cronSchedule,
                    startDate: new Date(values.startTimestamp),
                    userId: event.schedule.userId,
                },
                eventTypeId: event.eventTypeId, // Ensure eventTypeId is defined
            };

            if (updatedEvent.eventId !== undefined) {
                if (!authUser) return;
                try {
                    setLoading(true);
                    await apiUpdateEvent({
                        user: authUser,
                        event: updatedEvent,
                    });
                    setEditMode(false);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        showErrorModal(error.message || 'Failed to update event');
                        throw error;
                    } else {
                        throw new Error('An unknown error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                showErrorModal('Event ID is undefined');
            }
            setEditMode(false);
        }
    };

    return (
        <>
            <Modal.Body>
                <Row>
                    <Col>
                        <Stack>
                            <EventMap width={400} height={600} stopList={event.stopList} />
                        </Stack>
                    </Col>
                    <Col>
                        <h3>Details</h3>
                        {editMode ? (
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize={true}
                                onSubmit={onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validationSchema={validationSchema}
                            >
                                {(formikProps) => {
                                    useEffect(() => {
                                        formikProps.setValues({
                                            description: event.description || '',
                                            freeSeats: event.freeSeats || 3,
                                            repeating: !!event.schedule?.cronSchedule,
                                            startTimestamp: event.startTimestamp
                                                ? new Date(event.startTimestamp)
                                                : new Date(),
                                            cronSchedule: event.schedule?.cronSchedule || '',
                                        });

                                        if (event.startTimestamp && event.schedule?.cronSchedule) {
                                            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                            const startDate = new Date(event.startTimestamp);
                                            const hours = startDate.getHours();
                                            const minutes = startDate.getMinutes();

                                            const adjustedCronSchedule = event.schedule.cronSchedule.replace(
                                                /^0 0/,
                                                `${minutes} ${hours}`,
                                            );

                                            try {
                                                const parsedCron = cronParser.parse(adjustedCronSchedule, {
                                                    tz: timezone,
                                                    currentDate: new Date(),
                                                    startDate: startDate,
                                                });
                                                setCronExpression(parsedCron);
                                                if (parsedCron.hasNext()) {
                                                    setNextExecution(parsedCron.next().toDate().toLocaleString());
                                                }
                                            } catch (error) {
                                                console.error('Invalid cron expression:', error);
                                                setCronExpression(undefined);
                                                setNextExecution('');
                                            }
                                        } else {
                                            setCronExpression(undefined);
                                            setNextExecution('');
                                        }
                                    }, [event]);

                                    return (
                                        <FormikForm>
                                            <Row className='mb-3'>
                                                <FormInput
                                                    label='Description'
                                                    name='description'
                                                    type='textarea'
                                                    placeholder='Something about this way'
                                                    formikProps={formikProps}
                                                    props={{ autoFocus: true }}
                                                />
                                            </Row>
                                            <Row className='mb-3'>
                                                <FormInput
                                                    label='Free Seats'
                                                    name='freeSeats'
                                                    type='number'
                                                    placeholder={3}
                                                    formikProps={formikProps}
                                                />
                                            </Row>
                                            <Row>
                                                <FormInput
                                                    label='Repeating'
                                                    name='repeating'
                                                    type='switch'
                                                    as='switch'
                                                    formikProps={formikProps}
                                                    onChange={(e) => {
                                                        formikProps.handleChange(e);
                                                        setRepeating(!repeating);
                                                    }}
                                                />
                                            </Row>
                                            <Row className='mb-3'>
                                                <Row className='mb-2'>
                                                    <FormInput
                                                        label='Start Date'
                                                        name='startTimestamp'
                                                        type='datetime-local'
                                                        formikProps={formikProps}
                                                    />
                                                    {repeating && (
                                                        <FormInput
                                                            label='Schedule'
                                                            name='cronSchedule'
                                                            type='select'
                                                            formikProps={formikProps}
                                                            selectOptions={[
                                                                { name: 'Daily', value: '0 0 * * *' },
                                                                { name: 'Monthly', value: '0 0 1 * *' },
                                                                { name: 'Weekends', value: '0 0 * * 6,0' },
                                                                { name: 'Weekdays', value: '0 0 * * 1-5' },
                                                                { name: 'Weekly', value: '0 0 * * 0' },
                                                                { name: 'Yearly', value: '0 0 1 1 *' },
                                                            ]}
                                                        />
                                                    )}
                                                </Row>
                                                {cronExpression && (
                                                    <Row>
                                                        <Col>
                                                            <Alert variant={'info'}>Next: {nextExecution}</Alert>
                                                        </Col>
                                                    </Row>
                                                )}
                                            </Row>
                                            <Row className='mb-3'>
                                                <Container>
                                                    <StopList edit={true} stopListState={stopListState} />
                                                    <br />
                                                    {stopListState.length < 2 && (
                                                        <Alert variant='warning'>
                                                            You need to add at least two stops to create a new way.
                                                        </Alert>
                                                    )}
                                                </Container>
                                            </Row>
                                            <br />
                                            <ButtonGroup>
                                                <Button
                                                    type='reset'
                                                    disabled={formikProps.isSubmitting}
                                                    className='btn btn-secondary'
                                                >
                                                    Reset
                                                </Button>
                                                {loading ? (
                                                    <Button
                                                        type='submit'
                                                        disabled={loading}
                                                        className='btn btn-primary'
                                                    >
                                                        Loading...
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type='submit'
                                                        disabled={
                                                            formikProps.isSubmitting || stopListState[0].length < 2
                                                        }
                                                        className='btn btn-primary'
                                                    >
                                                        {formikProps.isSubmitting ? 'Saving...' : 'Save'}
                                                    </Button>
                                                )}
                                            </ButtonGroup>
                                        </FormikForm>
                                    );
                                }}
                            </Formik>
                        ) : (
                            <>
                                {event.description && (
                                    <FormInput
                                        name='description'
                                        type='textarea'
                                        label='Description'
                                        value={event.description}
                                        disabled={!editMode}
                                        readOnly={!isOwnedEvent}
                                        placeholder='Description'
                                        floatingLabel={true}
                                        rows={3}
                                    />
                                )}
                                {event.schedule.cronSchedule ? (
                                    <FormInput
                                        name='schedule'
                                        type='text'
                                        label='Schedule'
                                        value={cronparser
                                            .parse(event.schedule.cronSchedule)
                                            .next()
                                            .toDate()
                                            .toLocaleDateString('de-AT')}
                                        readOnly={!isOwnedEvent}
                                        disabled={!editMode}
                                        placeholder='Start Date & Time'
                                        floatingLabel={true}
                                    />
                                ) : (
                                    <FormInput
                                        name='startDate'
                                        type='text'
                                        label='Start Date & Time'
                                        value={`${new Date(event.startTimestamp).toLocaleDateString()} at ${new Date(event.startTimestamp).toLocaleTimeString()}`}
                                        readOnly={!isOwnedEvent}
                                        disabled={!editMode}
                                        placeholder='Start Date & Time'
                                        floatingLabel={true}
                                    />
                                )}
                                <h4>Stops</h4>
                                <StopList edit={false} stopListState={stopListState} />
                            </>
                        )}
                    </Col>
                    <Col>
                        <Stack>
                            <EventMemberDisplay
                                members={event.eventMembers}
                                freeSeats={event.freeSeats}
                                direction='vertical'
                                owner={isOwnedEvent}
                                event={event}
                            />
                            {isOwnedEvent && (
                                <>
                                    <br />
                                    {/* <EventInvites event={event} owner={isOwnedEvent} /> */}
                                </>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Modal.Body>
        </>
    );
};

const EventDetails = ({ event, showModal }: { event?: WMEvent; showModal: boolean }) => {
    const navigate = useNavigate();

    const { showErrorModal } = useContext(ErrorModalContext);

    const [show, setShow] = useState<boolean>(showModal);
    const [showInvite, setShowInvite] = useState<boolean>(false); // Changed to useState for proper state handling
    const [editMode, setEditMode] = useState<boolean>(false);

    const [isOwnedEvent, setIsOwnedEvent] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();

    const authUser = useAuthUser<User>();
    const handleCloseModal = () => {
        setShow(false);
        navigate('/events');
    };

    useEffect(() => {
        setShow(showModal);
        if (event) {
            setCurrentEvent(event);
        }
    }, [showModal, event]);

    useEffect(() => {
        if (authUser?.userId === currentEvent?.owner.userId) {
            setIsOwnedEvent(true);
        } else {
            setIsOwnedEvent(false);
        }
    }, [currentEvent]);

    const onDelete = async () => {
        try {
            if (!currentEvent?.eventId) return;
            await apiDeleteEvent({ eventId: currentEvent.eventId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                showErrorModal(error.message || 'Failed to delete event');
                throw error;
            } else {
                throw new Error('An unknown error occurred');
            }
        } finally {
            handleCloseModal();
        }
    };

    if (!currentEvent) return null;

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} dialogClassName='modal-wide'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentEvent.stopList[0].address.city} -{' '}
                        {currentEvent.stopList[currentEvent.stopList.length - 1].address.city}
                    </Modal.Title>
                </Modal.Header>
                {isOwnedEvent ? (
                    <Details
                        key={currentEvent.eventId}
                        event={currentEvent}
                        editModeState={[editMode, setEditMode]}
                        isOwnedEvent={isOwnedEvent}
                    />
                ) : (
                    <Details
                        key={currentEvent.eventId}
                        event={currentEvent}
                        editModeState={[editMode, setEditMode]}
                        isOwnedEvent={isOwnedEvent}
                    />
                )}
                <Modal.Footer>
                    <ButtonGroup>
                        {isOwnedEvent === true ? (
                            <Button variant='primary' onClick={() => setEditMode(!editMode)} disabled={editMode}>
                                Edit
                            </Button>
                        ) : null}
                        {isOwnedEvent === true ? (
                            <Button variant='danger' onClick={onDelete}>
                                Delete
                            </Button>
                        ) : null}
                        <Button variant='secondary' onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
            <EventInvite showState={[showInvite, setShowInvite]} event={currentEvent} owner={isOwnedEvent} />
        </>
    );
};

export default EventDetails;
