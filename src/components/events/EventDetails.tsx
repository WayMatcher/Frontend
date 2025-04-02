import { Alert, Button, ButtonGroup, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import EventMap from '../maps/MultiStopMap';
import EventInvite from './EventInvite';
import '@/components/_styles/EventDetails.scss';
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

/**
 * Validation schema for the event form using Yup.
 */
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

/**
 * Initial values for the event form.
 */
const initialValues = {
    description: '',
    freeSeats: 3,
    repeating: false,
    startTimestamp: '',
    cronSchedule: '',
};

/**
 * Component to display and edit event details.
 * @param {Object} props - Component props.
 * @param {WMEvent} props.event - The event object.
 * @param {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} props.editModeState - State for edit mode.
 * @param {boolean} props.isOwnedEvent - Whether the event is owned by the current user.
 */
const Details = ({
    event,
    editModeState,
    isOwnedEvent,
}: {
    event: WMEvent;
    editModeState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    isOwnedEvent: boolean;
}) => {
    const stopListState = useState<Stop[]>([]); // State for the list of stops
    const [loading, setLoading] = useState(false); // Loading state for form submission
    const { showErrorModal } = useContext(ErrorModalContext); // Error modal context
    const authUser = useAuthUser<User>(); // Authenticated user
    const [editMode, setEditMode] = editModeState; // Edit mode state
    const [cronExpression, setCronExpression] = useState<CronExpression | undefined>(); // Parsed cron expression
    const [nextExecution, setNextExecution] = useState<string>(''); // Next execution time for the cron schedule
    const [repeating, setRepeating] = useState<boolean>(false); // State for repeating events

    // Update stop list when the event's stop list changes
    useEffect(() => {
        stopListState[1](event.stopList);
    }, [event.stopList]);

    /**
     * Handles form submission to update the event.
     * @param {Object} values - Form values.
     */
    const onSubmit = async (values: typeof initialValues) => {
        if (editMode) {
            if (!event.eventTypeId) {
                showErrorModal('Event Type ID is undefined');
                return;
            }

            const updatedEvent = {
                ...event,
                description: values.description,
                startTimestamp: values.startTimestamp,
                schedule: {
                    cronSchedule: values.cronSchedule,
                    startDate: values.startTimestamp,
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
                            {/* Map displaying the stops */}
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
                                    // Update form values and cron expression when the event changes
                                    useEffect(() => {
                                        formikProps.setValues({
                                            description: event.description || '',
                                            freeSeats: event.freeSeats || 3,
                                            repeating: !!event.schedule?.cronSchedule,
                                            startTimestamp: event.startTimestamp ? event.startTimestamp : '',
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
                                            {/* Form inputs for event details */}
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
                                                    {/* Stop list editor */}
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
                                {/* Display event details in read-only mode */}
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
                            {/* Display event members */}
                            <EventMemberDisplay
                                members={event.eventMembers}
                                freeSeats={event.freeSeats}
                                direction='vertical'
                                owner={isOwnedEvent}
                                event={event}
                            />
                        </Stack>
                    </Col>
                </Row>
            </Modal.Body>
        </>
    );
};

/**
 * Main component for displaying event details in a modal.
 * @param {Object} props - Component props.
 * @param {WMEvent} [props.event] - The event object.
 * @param {boolean} props.showModal - Whether the modal is visible.
 */
const EventDetails = ({ event, showModal }: { event?: WMEvent; showModal: boolean }) => {
    const navigate = useNavigate();
    const { showErrorModal } = useContext(ErrorModalContext);
    const [show, setShow] = useState<boolean>(showModal); // Modal visibility state
    const [showInvite, setShowInvite] = useState<boolean>(false); // Invite modal visibility state
    const [editMode, setEditMode] = useState<boolean>(false); // Edit mode state
    const [isOwnedEvent, setIsOwnedEvent] = useState<boolean>(false); // Whether the event is owned by the user
    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>(); // Current event being displayed
    const authUser = useAuthUser<User>(); // Authenticated user

    /**
     * Handles closing the modal and navigating back to the events page.
     */
    const handleCloseModal = () => {
        setShow(false);
        navigate('/events');
    };

    // Update modal visibility and current event when props change
    useEffect(() => {
        setShow(showModal);
        if (event) {
            setCurrentEvent(event);
        }
    }, [showModal, event]);

    // Determine if the current user owns the event
    useEffect(() => {
        if (authUser?.userId === currentEvent?.owner.userId) {
            setIsOwnedEvent(true);
        } else {
            setIsOwnedEvent(false);
        }
    }, [currentEvent]);

    /**
     * Handles deleting the current event.
     */
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
                        {/* Display event title based on the first and last stop */}
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
