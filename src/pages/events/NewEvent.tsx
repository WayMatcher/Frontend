import { createEvent } from '@/api/endpoints/event';
import FormInput from '@/components/FormInput';
import EditButtons from '@/components/user/EditButtons';
import User from '@/types/objects/User/dto';
import { Form as FormikForm, Formik } from 'formik';
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

    const onSubmit = async (values: any) => {
        if (!authUser) return;
        const response = await createEvent(values, authUser);
        navigate(`/events/${response.data.id}`);
    };

    return (
        <Container>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, errors, isSubmitting }) => (
                    <FormikForm>
                        <Row>
                            <FormInput
                                label='Title'
                                name='name'
                                type='text'
                                placeholder='An interesting Title'
                                formikData={{
                                    value: values.name,
                                    error: errors.name,
                                    isSubmitting,
                                }}
                                props={{ autoFocus: true }}
                            />
                        </Row>
                        <Row>
                            <FormInput
                                label='Description'
                                name='description'
                                type='textarea'
                                placeholder='A detailed description'
                                formikData={{ value: values.description, error: errors.description, isSubmitting }}
                            />
                        </Row>
                        <Row>
                            <FormInput
                                label='Destination'
                                name='location'
                                type='text'
                                placeholder='The destination'
                                formikData={{ value: values.location, error: errors.location, isSubmitting }}
                            />
                        </Row>
                        <Row>
                            <FormInput
                                label='Date'
                                name='date'
                                type='date'
                                placeholder={initialValues.date}
                                formikData={{ value: values.date, error: errors.date, isSubmitting }}
                            />
                        </Row>
                        <Row>
                            <FormInput
                                label='Capacity'
                                name='capacity'
                                type='number'
                                placeholder={3}
                                formikData={{
                                    value: values.capacity,
                                    error: errors.capacity,
                                    isSubmitting,
                                }}
                            />
                            <FormInput
                                label='Price'
                                name='price'
                                type='number'
                                placeholder={45.99}
                                formikData={{
                                    value: values.price,
                                    error: errors.price,
                                    isSubmitting,
                                }}
                            />
                        </Row>
                        <br />
                        <EditButtons isSubmitting={isSubmitting} />
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default NewEvent;
