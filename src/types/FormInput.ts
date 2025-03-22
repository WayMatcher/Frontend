export default interface FormInputProps {
    label: string;
    name: string;
    type: string;
    placeholder?: string | number;
    formikData: FormikData;
    props?: any;
}

export interface FormikData {
    value?: string | number | Date;
    error?: string;
    isSubmitting?: boolean;
}
