export enum RegisterSteps {
    USER = 1,
    ADDRESS = 2,
    VEHICLE = 3,
    SUMMARY = 4,
}

export interface FormUserLogin {
    userOrEmail: string;
    password: string;
}
