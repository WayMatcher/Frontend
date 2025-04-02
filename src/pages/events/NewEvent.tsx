import { apiCreateEvent } from '@/api/endpoints/event';
import StopList from '@/components/events/StopList';
import FormInput from '@/components/FormInput';
import Stop from '@/types/objects/Stop/dto';
import User from '@/types/objects/User/dto';
import { Form as FormikForm, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Alert, Button, ButtonGroup, Container, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Col } from 'react-bootstrap';
import { CronExpression } from 'cron-parser';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { RepeatSchedule, calculateNextExecution } from '@/utils/cronUtils';

/**
 * Validation schema for the event creation form.
 * Ensures required fields are filled and valid.
 */
const validationSchema = Yup.object({
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
 * Initial values for the event creation form.
 */
const initialValues = {
    description: '',
    freeSeats: 3,
    repeating: false,
    startTimestamp: '',
    cronSchedule: '',
};

/**
 * Component for creating a new event.
 * Handles form submission, validation, and dynamic UI updates.
 */
const NewEvent = () => {
    const stopListState = useState<Stop[]>([]); // State for managing the list of stops
    const [searchParams] = useSearchParams(); // Query parameters from the URL
    const [eventTypeId, setEventTypeId] = useState(0); // Event type ID (1 for Pilot, 2 for Passenger)
    const [cronExpression, setCronExpression] = useState<CronExpression | undefined>(); // Parsed cron expression
    const [nextExecution, setNextExecution] = useState<Date>(); // Next execution date for repeating events
    const [startDate, setStartDate] = useState<Date>(); // Start date of the event
    const [repeating, setRepeating] = useState<boolean>(false); // Whether the event is repeating

    const navigate = useNavigate(); // Navigation hook
    const authUser = useAuthUser<User>(); // Authenticated user
    const { showErrorModal } = useContext(ErrorModalContext); // Error modal context
    const [loading, setLoading] = useState(false); // Loading state for form submission

    /**
     * Updates the next execution date when the cron expression or start date changes.
     */
    useEffect(() => {
        if (cronExpression && cronExpression.hasNext()) {
            setNextExecution(cronExpression.next().toDate());
        }
    }, [cronExpression, startDate]);

    /**
     * Determines the event type based on query parameters.
     * Redirects to the events page if no valid type is found.
     */
    useEffect(() => {
        if (searchParams.get('ispilot')) {
            setEventTypeId(1); // Pilot Way
        } else if (searchParams.get('ispassenger')) {
            setEventTypeId(2); // Passenger Way
        } else {
            navigate('/events');
        }
    }, [searchParams]);

    /**
     * Handles form submission to create a new event.
     * @param values - Form values submitted by the user.
     */
    const onSubmit = async (values: typeof initialValues) => {
        if (!values.repeating) {
            values.cronSchedule = ''; // Ensure cronSchedule is empty when repeating is off
        }
        if (authUser === null || !authUser.userId) return;

        try {
            setLoading(true);

            // Validate event type ID
            if (isNaN(eventTypeId) || (eventTypeId !== 1 && eventTypeId !== 2)) {
                navigate('/');
                return;
            }

            // API call to create the event
            const response = await apiCreateEvent({
                user: authUser,
                event: {
                    ...values,
                    eventTypeId,
                    stopList: stopListState[0],
                    schedule: { cronSchedule: values.cronSchedule, userId: authUser.userId },
                },
            });

            // Navigate to the event details page if successful
            if (response.data.eventId) navigate(`/events/${response.data.eventId}`);
            else throw new Error('Failed to create event');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating event:', error.message);
                showErrorModal('Failed to create event. Please try again later.' + error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Redirects to the login page if the user is not authenticated.
     */
    useEffect(() => {
        if (!authUser) {
            console.error('User not logged in, redirecting to login page');
            navigate('/login');
        }
    }, [authUser, navigate]);

    return (
        <Container>
            <h3>
                {eventTypeId === 1 ? (
                    <span className='bi bi-car-front-fill'> New Pilot Way</span>
                ) : eventTypeId === 2 ? (
                    <span className='bi bi-person-fill'> New Passenger Way</span>
                ) : null}
            </h3>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                {(formikProps) => {
                    // Dynamically update cron expression and next execution date based on form values
                    useEffect(() => {
                        const { startTimestamp, cronSchedule } = formikProps.values;

                        if (startTimestamp && cronSchedule) {
                            const tempStartDate = new Date(startTimestamp);
                            setStartDate(tempStartDate);

                            const { cronExpression, nextExecution } = calculateNextExecution(
                                tempStartDate,
                                cronSchedule as RepeatSchedule,
                            );

                            setCronExpression(cronExpression);
                            setNextExecution(nextExecution);
                        } else {
                            setCronExpression(undefined);
                            setNextExecution(undefined);
                        }
                    }, [formikProps.values.startTimestamp, formikProps.values.cronSchedule]);

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
                                        const isRepeating = e.target.checked;
                                        setRepeating(isRepeating);

                                        if (isRepeating && startDate && formikProps.values.cronSchedule) {
                                            const { cronExpression, nextExecution } = calculateNextExecution(
                                                startDate,
                                                formikProps.values.cronSchedule as RepeatSchedule,
                                            );

                                            setCronExpression(cronExpression);
                                            setNextExecution(nextExecution);
                                        } else {
                                            setCronExpression(undefined);
                                            setNextExecution(undefined);
                                        }
                                    }}
                                />
                            </Row>
                            <Row className='mb-3'>
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
                                            { name: 'Daily', value: `Daily` },
                                            { name: 'Monthly', value: `Monthly` },
                                            { name: 'Weekdays', value: `Weekdays` },
                                            { name: 'Weekly', value: `Weekly` },
                                            { name: 'Yearly', value: `Yearly` },
                                        ]}
                                    />
                                )}
                            </Row>
                            {cronExpression && (
                                <Row>
                                    <Col>
                                        <Alert variant={'info'}>Next: {nextExecution?.toLocaleString('de-AT')}</Alert>
                                    </Col>
                                </Row>
                            )}
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
                                <Button type='reset' disabled={formikProps.isSubmitting} className='btn btn-secondary'>
                                    Reset
                                </Button>
                                {loading ? (
                                    <Button type='submit' disabled={loading} className='btn btn-primary'>
                                        Loading...
                                    </Button>
                                ) : (
                                    <Button
                                        type='submit'
                                        disabled={formikProps.isSubmitting || stopListState[0].length < 2}
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
        </Container>
    );
};

export default NewEvent;
