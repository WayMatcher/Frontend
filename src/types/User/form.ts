export enum StepsRegister {
    USER = 1,
    ADDRESS = 2,
    VEHICLE = 3,
    SUMMARY = 4,
}

export interface FormUserLogin {
    userOrEmail: string;
    password: string;
}

export interface FormLoginUser {
    userOrEmail: string;
    password: string;
}

export const InitialValuesLoginUser: FormLoginUser = {
    userOrEmail: '',
    password: '',
};

export interface FormMFAToken {
    mfaToken: string;
}

export const initialValuesMFAToken: FormMFAToken = {
    mfaToken: '',
};

export interface FormUser {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    firstName: string;
    telephone: string;
    additional_description: string;
    profile_picture: string;
    license_verified: boolean;
}

export const initialValuesUser: FormUser = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    firstName: '',
    telephone: '',
    additional_description: '',
    profile_picture: '',
    license_verified: false,
};
