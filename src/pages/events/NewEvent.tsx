import { createEvent } from '@/api/endpoints/event';
import FormInput from '@/components/FormInput';
import EditButtons from '@/components/user/EditButtons';
import WMEvent from '@/types/objects/Event/dto';
import User from '@/types/objects/User/dto';
import { Form as FormikForm, Formik } from 'formik';
import { useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
    date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
    location: Yup.string().required('A destination is required'),
    capacity: Yup.number().required('Capacity is required'),
    price: Yup.number(),
});

const initialValues = {
    name: '',
    description: '',
    date: '',
    location: '',
    capacity: 3,
    price: '',
};

const NewEvent = () => {
    const navigate = useNavigate();

    const authUser = useAuthUser<User>();

    const isLoading = false;

    const onSubmit = async (values: typeof initialValues) => {
        if (!authUser) return;
        const response = await createEvent({ user: authUser, wmevent: values, stops: [], schedule: { schedule: '' } });
        navigate(`/events/${response.data.eventId}`);
    };

    useEffect(() => {
        if (!authUser) {
            console.log('User not logged in, redirecting to login page');
            navigate('/login');
        }
    }, [authUser, navigate]);

    return (
        <Container>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                {(formikProps) => (
                    <FormikForm>
                        <Row className='mb-3'>
                            <FormInput
                                label='Title'
                                name='name'
                                type='text'
                                placeholder='An interesting Title'
                                formikProps={formikProps}
                                props={{ autoFocus: true }}
                            />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput
                                label='Description'
                                name='description'
                                type='textarea'
                                placeholder='A detailed description'
                                formikProps={formikProps}
                            />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput
                                label='Destination'
                                name='location'
                                type='text'
                                placeholder='The destination'
                                formikProps={formikProps}
                            />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput
                                label='Date'
                                name='date'
                                type='date'
                                placeholder={initialValues.date}
                                formikProps={formikProps}
                            />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput
                                label='Capacity'
                                name='capacity'
                                type='number'
                                placeholder={3}
                                formikProps={formikProps}
                            />
                            <FormInput
                                label='Price'
                                name='price'
                                type='number'
                                placeholder={45.99}
                                formikProps={formikProps}
                            />
                        </Row>
                        <br />
                        <EditButtons isLoading={isLoading} isSubmitting={formikProps.isSubmitting} />
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default NewEvent;
