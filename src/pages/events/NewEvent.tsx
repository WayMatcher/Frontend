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
import cronParser, { CronExpression } from 'cron-parser';
import ErrorModalContext from '@/contexts/ErrorModalContext';

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

const initialValues = {
    description: '',
    freeSeats: 3,
    repeating: false,
    startTimestamp: '',
    cronSchedule: '',
};

const NewEvent = () => {
    const stopListState = useState<Stop[]>([]);
    const [searchParams] = useSearchParams();
    const [eventTypeId, setEventTypeId] = useState(0);
    const [cronExpression, setCronExpression] = useState<CronExpression | undefined>();
    const [nextExecution, setNextExecution] = useState<string>('');
    const [repeating, setRepeating] = useState<boolean>(false);

    const navigate = useNavigate();

    const authUser = useAuthUser<User>();

    const { showErrorModal } = useContext(ErrorModalContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cronExpression && cronExpression.hasNext()) {
            setNextExecution(cronExpression.next().toDate().toLocaleString());
        }
    }, [cronExpression]);

    useEffect(() => {
        if (searchParams.get('ispilot')) {
            setEventTypeId(1); // Pilot Way
        } else if (searchParams.get('ispassenger')) {
            setEventTypeId(2); // Passenger Way
        } else {
            navigate('/events');
        }
    }, [searchParams]);

    const onSubmit = async (values: typeof initialValues) => {
        if (!values.repeating) {
            values.cronSchedule = ''; // Ensure cronSchedule is empty when repeating is off
        }
        if (authUser === null || !authUser.userId) return;
        try {
            setLoading(true);

            if (isNaN(eventTypeId) || (eventTypeId !== 1 && eventTypeId !== 2)) {
                navigate('/');
                return;
            }

            const response = await apiCreateEvent({
                user: authUser,
                event: {
                    ...values,
                    eventTypeId,
                    stopList: stopListState[0],
                    schedule: { cronSchedule: values.cronSchedule, userId: authUser.userId },
                },
            });
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
                    useEffect(() => {
                        if (formikProps.values.startTimestamp && formikProps.values.cronSchedule) {
                            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                            const startDate = new Date(formikProps.values.startTimestamp);
                            const hours = startDate.getHours();
                            const minutes = startDate.getMinutes();

                            const adjustedCronSchedule = formikProps.values.cronSchedule.replace(
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
