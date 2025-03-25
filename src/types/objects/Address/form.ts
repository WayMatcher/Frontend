import Address from './dto';

export interface FormAddress extends Address {
    street: string;
    postalcode: string;
    region: string;
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    longitude: number;
    latitude: number;
}

export const initialValuesAddress: FormAddress = {
    street: '',
    postalcode: '',
    region: '',
    country: '',
    countrycode: '',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    longitude: 0,
    latitude: 0,
};
