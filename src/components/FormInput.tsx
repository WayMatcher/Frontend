import { Form, Col, FloatingLabel } from 'react-bootstrap';
import FormInputProps from '@/types/FormInput';

/**
 * BaseInput component handles rendering of various input types (e.g., text, select, switch, textarea).
 * It integrates with Formik for form state management.
 *
 * @param {FormInputProps<any>} props - The properties for the input component.
 * @returns {React.ReactElement} The rendered input element.
 */
function BaseInput({
    as = 'input', // Determines the type of input element (e.g., 'input', 'select', 'textarea').
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
    // Extract Formik-related properties for form state management.
    const values = formikProps?.values || {};
    const errors = formikProps?.errors || {};
    const isSubmitting = formikProps?.isSubmitting || false;
    const handleChange = formikProps?.handleChange || (() => {});
    const touched = formikProps?.touched || {};

    // Retrieve the current value, error, and touched state for the input field.
    const error = errors[name];
    const value = values[name];
    const touchedValue = touched[name];

    return (
        <>
            {as === 'select' ? (
                // Render a dropdown select input.
                <Form.Select
                    aria-label={label}
                    name={name}
                    value={value || ''} // Ensure value is not undefined.
                    disabled={isSubmitting || isLoading} // Disable input during submission or loading.
                    isValid={touchedValue && !error} // Mark as valid if touched and no error.
                    isInvalid={touchedValue && !!error} // Mark as invalid if touched and has error.
                    onChange={onChange || handleChange}
                    {...restProps}
                >
                    {/* Render options for the select input. */}
                    {selectOptions?.map(({ name, value }) => (
                        <option key={name} value={value}>
                            {name}
                        </option>
                    ))}
                </Form.Select>
            ) : as === 'switch' ? (
                // Render a switch input.
                <Form.Group as={Col} controlId={`validationFormik${name}`}>
                    <Form.Check
                        aria-label={label}
                        type='switch'
                        label={label}
                        name={name}
                        checked={!!value} // Ensure checked is a boolean.
                        disabled={isSubmitting} // Disable during submission.
                        readOnly={isLoading ? true : undefined} // Make read-only if loading.
                        isValid={touchedValue && !error}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            // Handle change for switch input.
                            onChange ? onChange(e) : handleChange({ target: { name, value: checked } });
                        }}
                    />
                    {/* Display error feedback if applicable. */}
                    {typeof error === 'string' ? (
                        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            ) : as === 'textarea' ? (
                // Render a textarea input.
                <Form.Control
                    as={as}
                    type={type}
                    name={name}
                    value={value || ''} // Ensure value is not undefined.
                    placeholder={typeof placeholder === 'number' ? placeholder.toString() : placeholder}
                    disabled={isSubmitting || isLoading}
                    isValid={touchedValue && !error}
                    isInvalid={touchedValue && !!error} // Add invalid state.
                    onChange={onChange || handleChange}
                    rows={3} // Default number of rows for textarea.
                    {...restProps}
                />
            ) : (
                // Render a default input (e.g., text, email).
                <Form.Control
                    as={as}
                    type={type}
                    name={name}
                    value={value || ''} // Ensure value is not undefined.
                    placeholder={typeof placeholder === 'number' ? placeholder.toString() : placeholder}
                    disabled={isSubmitting || isLoading}
                    isValid={touchedValue && !error}
                    isInvalid={touchedValue && !!error} // Add invalid state.
                    onChange={onChange || handleChange}
                    {...restProps}
                />
            )}
            {/* Display error feedback if applicable. */}
            {typeof error === 'string' ? <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback> : null}
        </>
    );
}

/**
 * Mapping of input types to their corresponding properties.
 */
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

/**
 * LabelledInput component wraps BaseInput with a label and error feedback.
 *
 * @param {FormInputProps<any>} props - The properties for the input component.
 * @returns {React.ReactElement} The rendered labelled input element.
 */
const LabelledInput = (props: FormInputProps<any>) => {
    return (
        <Form.Group as={Col} controlId={`validationFormik${props.name}`}>
            {/* Render label if applicable. */}
            {props.label && props.type !== 'checkbox' && <Form.Label>{props.label}</Form.Label>}
            <BaseInput {...props} {...props.inputProps} />
            {/* Display error feedback if applicable. */}
            {typeof props.error === 'string' ? (
                <Form.Control.Feedback type='invalid'>{props.error}</Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

/**
 * FloatingLabelledInput component wraps BaseInput with a floating label and error feedback.
 *
 * @param {FormInputProps<any>} props - The properties for the input component.
 * @returns {React.ReactElement} The rendered floating labelled input element.
 */
const FloatingLabelledInput = (props: FormInputProps<any>) => {
    const { label, name, error, inputProps } = props;
    return (
        <Form.Group as={Col} controlId={`validationFormik${name}`}>
            {/* Render floating label. */}
            <FloatingLabel controlId={`validationFormik${name}`} label={label} className='mb-3'>
                <BaseInput {...props} {...inputProps} />
            </FloatingLabel>
            {/* Display error feedback if applicable. */}
            {typeof error === 'string' ? <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback> : null}
        </Form.Group>
    );
};

/**
 * FormInput component determines whether to render a labelled or floating labelled input.
 *
 * @param {FormInputProps<any>} props - The properties for the input component.
 * @returns {React.ReactElement} The rendered input element.
 */
export default function FormInput(props: FormInputProps<any>): React.ReactElement {
    const { type } = props;
    // Retrieve input properties based on the type.
    const inputProps = inputTypeMapping[type] || { type: 'text' };
    if (props.floatingLabel) {
        // Render floating labelled input if specified.
        return <FloatingLabelledInput {...props} {...inputProps} />;
    } else {
        // Render standard labelled input.
        return <LabelledInput {...props} {...inputProps} />;
    }
}
