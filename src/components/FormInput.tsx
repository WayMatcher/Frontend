import { Form, Col } from 'react-bootstrap';
import FormInputProps from '@/types/FormInput';

function BaseInput({
    as = 'input',
    type,
    label,
    name,
    placeholder,
    isLoading,
    onChange,
    formikProps,
    selectOptions,
    ...restProps
}: FormInputProps<any>): React.ReactElement {
    const { values, errors, isSubmitting, handleChange, touched } = formikProps;

    const error = errors[name];
    const value = values[name];
    const touchedValue = touched[name];

    return (
        <Form.Group as={Col} controlId={`validationFormik${name}`}>
            {label && <Form.Label>{label}</Form.Label>}
            {as === 'select' ? (
                <Form.Select
                    aria-label={label}
                    name={name}
                    value={value || ''} // Ensure value is not undefined
                    disabled={isSubmitting || isLoading}
                    isValid={touchedValue && !error}
                    isInvalid={touchedValue && !!error} // Add invalid state
                    onChange={onChange || handleChange}
                    {...restProps}
                >
                    {selectOptions?.map(({ name, value }) => (
                        <option key={name} value={value}>
                            {name}
                        </option>
                    ))}
                </Form.Select>
            ) : as === 'switch' ? (
                <Form.Group as={Col} controlId={`validationFormik${name}`}>
                    <Form.Check
                        aria-label={label}
                        type='switch'
                        label={label}
                        name={name}
                        value={value}
                        disabled={isSubmitting}
                        readOnly={isLoading ? true : undefined}
                        isValid={touchedValue && !error}
                        onChange={onChange || handleChange}
                    />
                    {typeof error === 'string' ? (
                        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            ) : (
                <Form.Control
                    as={as}
                    type={type}
                    name={name}
                    value={value || ''} // Ensure value is not undefined
                    placeholder={typeof placeholder === 'number' ? placeholder.toString() : placeholder}
                    disabled={isSubmitting || isLoading}
                    isValid={touchedValue && !error}
                    isInvalid={touchedValue && !!error} // Add invalid state
                    onChange={onChange || handleChange}
                    {...restProps}
                />
            )}
            {typeof error === 'string' ? <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback> : null}
        </Form.Group>
    );
}

const inputTypeMapping: Record<string, Partial<FormInputProps<any>>> = {
    switch: { as: 'switch', type: 'checkbox' },
    textarea: { as: 'textarea' },
    'datetime-local': { type: 'datetime-local' },
    select: { as: 'select' },
    email: { type: 'email' },
    password: { type: 'password' },
    tel: { type: 'tel' },
    number: { type: 'number' },
    text: { type: 'text' },
    file: { type: 'file' },
    color: { type: 'color' },
};

export default function FormInput(props: FormInputProps<any>): React.ReactElement {
    const { type } = props;
    const inputProps = inputTypeMapping[type] || { type: 'text' };
    return <BaseInput {...props} {...inputProps} />;
}
