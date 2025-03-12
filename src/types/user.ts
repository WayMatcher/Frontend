export interface User {
    id?: number;
    username: string;
    email: string;
    mfaPending: boolean;
    jwt?: string;
}
