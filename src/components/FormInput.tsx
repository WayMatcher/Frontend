import { Form, Col, FloatingLabel } from 'react-bootstrap';
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
    const values = formikProps?.values || {};
    const errors = formikProps?.errors || {};
    const isSubmitting = formikProps?.isSubmitting || false;
    const handleChange = formikProps?.handleChange || (() => {});
    const touched = formikProps?.touched || {};

    const error = errors[name];
    const value = values[name];
    const touchedValue = touched[name];

    return (
        <>
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
                        checked={!!value} // Ensure checked is a boolean
                        disabled={isSubmitting}
                        readOnly={isLoading ? true : undefined}
                        isValid={touchedValue && !error}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            onChange ? onChange(e) : handleChange({ target: { name, value: checked } });
                        }}
                    />
                    {typeof error === 'string' ? (
                        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            ) : as === 'textarea' ? (
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
                    rows={3}
                    {...restProps}
                />
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
        </>
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

const LabelledInput = (props: FormInputProps<any>) => {
    return (
        <Form.Group as={Col} controlId={`validationFormik${props.name}`}>
            {props.label && props.type !== 'checkbox' && <Form.Label>{props.label}</Form.Label>}
            <BaseInput {...props} {...props.inputProps} />
            {typeof props.error === 'string' ? (
                <Form.Control.Feedback type='invalid'>{props.error}</Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

const FloatingLabelledInput = (props: FormInputProps<any>) => {
    const { label, name, error, inputProps } = props;
    return (
        <Form.Group as={Col} controlId={`validationFormik${name}`}>
            <FloatingLabel controlId={`validationFormik${name}`} label={label} className='mb-3'>
                <BaseInput {...props} {...inputProps} />
            </FloatingLabel>
            {typeof error === 'string' ? <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback> : null}
        </Form.Group>
    );
};

export default function FormInput(props: FormInputProps<any>): React.ReactElement {
    const { type } = props;
    const inputProps = inputTypeMapping[type] || { type: 'text' };
    if (props.floatingLabel) {
        return <FloatingLabelledInput {...props} {...inputProps} />;
    } else {
        return <LabelledInput {...props} {...inputProps} />;
    }
}
