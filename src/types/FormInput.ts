import { FormikProps } from 'formik';

/**
 * Interface representing the properties for a form input component.
 *
 * @template T - The type of the form values managed by Formik.
 *
 * @property {string} [label] - Optional label for the input field.
 * @property {string} name - The name attribute of the input field, used for form submission and Formik binding.
 * @property {'textarea' | 'switch' | 'datetime-local' | 'number' | 'text' | 'select' | 'email' | 'password' | 'tel' | 'color' | 'range' | 'url' | 'search' | 'checkbox'} type - The type of the input field, determining its behavior and appearance.
 * @property {string | number} [placeholder] - Optional placeholder text or number for the input field.
 * @property {boolean} [isLoading] - Indicates whether the input field is in a loading state.
 * @property {FormikProps<T>} formikProps - The Formik properties for managing form state and validation.
 * @property {(e: React.ChangeEvent<any>) => void} [onChange] - Optional callback function triggered when the input value changes.
 * @property {{ name: string; value: string | number }[]} [selectOptions] - Optional array of options for a select input field, each containing a name and value.
 * @property {'input' | 'textarea' | 'select'} [as] - Specifies the HTML element to render the input as.
 * @property {any} [key: string] - Allows passing down additional generic properties to the input component.
 */
export default interface FormInputProps<T> {
    label?: string;
    name: string;
    type:
        | 'textarea'
        | 'switch'
        | 'datetime-local'
        | 'number'
        | 'text'
        | 'select'
        | 'email'
        | 'password'
        | 'tel'
        | 'color'
        | 'range'
        | 'url'
        | 'search'
        | 'checkbox'
        | 'file';
    placeholder?: string | number;
    isLoading?: boolean;
    formikProps?: FormikProps<T>;
    onChange?: (e: React.ChangeEvent<any>) => void;
    selectOptions?: { name: string; value: string | number }[];
    as?: 'input' | 'textarea' | 'select' | 'switch';
    [key: string]: any; // Allow passing down generic props
    floatingLabel?: boolean; // Optional prop for floating label functionality
}
