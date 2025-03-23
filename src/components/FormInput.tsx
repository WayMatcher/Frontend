import { Form, Col } from 'react-bootstrap';
import FormInputProps from '@/types/FormInput';

export default function FormInput({
    label,
    name,
    type,
    placeholder,
    isLoading,
    formikProps,
}: FormInputProps<any>): React.ReactElement {
    const { values, errors, isSubmitting, handleChange, touched } = formikProps;

    const error = errors[name];
    const value = values[name];

    return (
        <Form.Group as={Col} controlId={`validationFormik${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                value={value}
                placeholder={typeof placeholder === 'number' ? placeholder?.toString() : placeholder}
                disabled={isSubmitting}
                readOnly={isLoading ? true : undefined}
                isValid={touched && !error}
                onChange={handleChange}
            />
            {typeof error === 'string' ? <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback> : null}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    );
}
