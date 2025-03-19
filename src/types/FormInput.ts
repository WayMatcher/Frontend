export default interface FormInputProps {
    label: string;
    name: string;
    type: string;
    placeholder?: string | number;
    formikData: FormikData;
}

export interface FormikData {
    value?: string | number;
    error?: string;
    isSubmitting?: boolean;
}
