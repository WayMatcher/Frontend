import { Form as FormikForm, Formik, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/RegisterPage.scss';
import { Container, Form, Button, ButtonGroup, InputGroup, Col, Row } from 'react-bootstrap';
import { UserRegister } from '../../types/dto/User';

export default function RegisterPage() {

    const initialValues: UserRegister = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        mfaPending: false,
        name: "",
        firstName: "",
        telephone: "",
        additional_description: "",
        license_verified: false,
        ProfilePicture: "",
        address: {
            city: "",
            country: "",
            street: "",
            postalCode: "",
            address_line1: "",
            address_line2: "",
            latitude: 0,
            longitude: 0,
            region: "",
            state: "",
            status: "",
        }
    }

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values);
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("E-Mail isn't an E-Mail").required("Please enter an E-Mail"),
        username: Yup.string().required("Please enter a Username"),
        password: Yup.string()
            .required("Please enter a Password")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
        name: Yup.string(),
        firstName: Yup.string(),
        telephone: Yup.string(),
        additional_description: Yup.string(),
        ProfilePicture: Yup.string(),
        address: Yup.object({
            city: Yup.string().required("Please enter a City"),
            country: Yup.string().required("Please enter a Country"),
            street: Yup.string().required("Please enter a Street"),
            postalCode: Yup.string().required("Please enter a Postal Code"),
            address_line1: Yup.string(),
            address_line2: Yup.string(),
            latitude: Yup.number(),
            longitude: Yup.number(),
            region: Yup.string(),
            state: Yup.string(),
            status: Yup.string(),
        }),
    })

    return (
        <>
            <Container className="register-page">
                <h1>Register</h1>
                <Formik
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, handleSubmit, errors, isSubmitting }) => (
                        <FormikForm onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Field
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Field
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Field
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <hr />
                            <h3>Optional Information</h3>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Field
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        className={`form-control`}
                                        placeholder="Mustermann"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        className={`form-control`}
                                        placeholder="Max"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Telephone</Form.Label>
                                    <Field
                                        type="tel"
                                        name="telephone"
                                        value={values.telephone}
                                        className={`form-control`}
                                        placeholder="+43 123 456789"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.telephone}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <hr />
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Additional Information</Form.Label>
                                    <Field
                                        type="textarea"
                                        name="additional_description"
                                        value={values.additional_description}
                                        className={`form-control`}
                                        component="textarea"
                                        placeholder="About me..."
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.additional_description}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Field
                                        id="profilePicture"
                                        name="ProfilePicture"
                                        label="Choose File"
                                        type="file"
                                        className={`form-control`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.ProfilePicture}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <br />
                            <Row>
                                <ButtonGroup as={Col}>
                                    <Button type="submit" disabled={isSubmitting}>Register</Button>
                                    <Button type="reset" variant='secondary'>Reset</Button>
                                </ButtonGroup>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
            <br />
        </>
    )
}