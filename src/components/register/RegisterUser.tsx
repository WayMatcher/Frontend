import React from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { RegisterUserSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { FormUserRegister, initialValuesUserRegister, StepsRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import RegisterButtons from '@/components/register/RegisterButtons';
import User from '@/types/objects/User/dto';

export default function RegisterUser({
    step,
    setUser,
}: {
    step: [StepsRegister, React.Dispatch<React.SetStateAction<StepsRegister>>];
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}): React.ReactElement {
    const [currentStep, setStep] = step;
    const handleSubmit = async (values: FormUserRegister) => {
        setUser(values);
        setStep(StepsRegister.ADDRESS);
    };
    if (currentStep !== StepsRegister.USER) return <></>;
    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValuesUserRegister}
                        validationSchema={RegisterUserSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label='Username'
                                        name='username'
                                        type='text'
                                        placeholder='username'
                                        formikData={{ value: values.username, error: errors.username, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Email'
                                        name='email'
                                        type='email'
                                        placeholder='contact@example.com'
                                        formikData={{ value: values.email, error: errors.email, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        formikData={{ value: values.password, error: errors.password, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Confirm Password'
                                        name='password_confirm'
                                        type='password'
                                        formikData={{
                                            value: values.password_confirm,
                                            error: errors.password_confirm,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <hr />
                                <h3>Optional Information</h3>
                                <Row>
                                    <FormInput
                                        label='First Name'
                                        name='firstName'
                                        type='text'
                                        placeholder='John'
                                        formikData={{ value: values.firstName, error: errors.firstName, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Last Name'
                                        name='name'
                                        type='text'
                                        placeholder='Doe'
                                        formikData={{ value: values.name, error: errors.name, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Telephone'
                                        name='telephone'
                                        type='tel'
                                        placeholder='555-555-5555'
                                        formikData={{ value: values.telephone, error: errors.telephone, isSubmitting }}
                                    />
                                </Row>
                                <hr />
                                <Row>
                                    <FormInput
                                        label='Additional Information'
                                        name='additional_description'
                                        type='textarea'
                                        placeholder='Tell us about yourself'
                                        formikData={{
                                            value: values.additional_description,
                                            error: errors.additional_description,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Profile Picture'
                                        name='profile_picture'
                                        type='file'
                                        formikData={{
                                            value: values.profile_picture,
                                            error: errors.profile_picture,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <RegisterButtons nextStep={StepsRegister.ADDRESS} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
