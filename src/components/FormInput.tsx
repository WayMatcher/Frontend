import { Field } from 'formik';
import { Form, Col } from 'react-bootstrap';
import FormInputProps from '../types/FormInput';

export default function FormInput({ label, name, type, placeholder, formikData }: FormInputProps): React.ReactElement {
    return (
        <Form.Group as={Col}>
            <Form.Label>{label}</Form.Label>
            <Field
                type={type}
                name={name}
                value={formikData.value}
                placeholder={placeholder}
                className={`form-control ${formikData.error ? 'is-invalid' : ''}`}
                component={type === 'textarea' ? 'textarea' : undefined}
                disabled={formikData.isSubmitting}
            />
            <Form.Control.Feedback type='invalid'>{formikData.error}</Form.Control.Feedback>
        </Form.Group>
    );
}
