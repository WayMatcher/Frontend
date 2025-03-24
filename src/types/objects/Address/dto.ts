export default interface Address {
    id?: number;
    city: string;
    postal_code: string;
    street: string;
    country: string;
    region?: string;
    state?: string;
    longitude: number;
    latitude: number;
    address_line1?: string;
    address_line2?: string;
    status?: string;
}
