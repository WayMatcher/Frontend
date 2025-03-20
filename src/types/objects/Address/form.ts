import Address from './dto';

export interface FormAddress extends Address {
    street: string;
    postal_code: string;
    region: string;
    country: string;
    state: string;
    city: string;
    address_line1: string;
    address_line2: string;
    longitude: number;
    latitude: number;
}

export const initialValuesAddress: FormAddress = {
    street: '',
    postal_code: '',
    region: '',
    country: '',
    state: '',
    city: '',
    address_line1: '',
    address_line2: '',
    longitude: 0,
    latitude: 0,
};
