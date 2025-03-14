export default interface FormInputProps {
    label: string;
    name: string;
    type: string;
    value?: string | number;
    placeholder?: string | number;
    error: string | undefined;
}