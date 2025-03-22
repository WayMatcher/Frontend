import { Field } from 'formik';
import { Form, Col } from 'react-bootstrap';
import FormInputProps from '../types/FormInput';

export default function FormInput({
    label,
    name,
    type,
    placeholder,
    formikData,
    props,
}: FormInputProps): React.ReactElement {
    const { value, error, isSubmitting } = formikData;

    return (
        <Form.Group as={Col}>
            <Form.Label>{label}</Form.Label>
            <Field
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                component={type === 'textarea' ? 'textarea' : undefined}
                disabled={isSubmitting}
                {...props}
            />
            <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
        </Form.Group>
    );
}
