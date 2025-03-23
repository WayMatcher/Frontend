import { FormikProps } from 'formik';

export default interface FormInputProps<T> {
    label: string;
    name: string;
    type: string;
    placeholder?: string | number;
    isLoading?: boolean;
    formikProps: FormikProps<T>;
    props?: any;
}

export interface FormikData {
    value?: string | number | Date;
    error?: string;
    isSubmitting?: boolean;
    isLoading?: boolean;
    touched?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
