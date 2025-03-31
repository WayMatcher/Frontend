import User from './dto';

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

export interface FormUser extends User {
    email: string;
    username: string;
    password: string;
    password_confirm: string;
    name: string;
    firstName: string;
    telephone: string;
    additionaldescription: string;
    profile_picture: string;
    licenseVerified: boolean;
}

export const initialValuesUser: FormUser = {
    email: '',
    username: '',
    password: '',
    password_confirm: '',
    name: '',
    firstName: '',
    telephone: '',
    additionaldescription: '',
    profile_picture: '',
    licenseVerified: false,
};

export interface FormUserRegister extends FormUser {
    password: string;
    password_confirm: string;
}

export interface FormUserEdit extends FormUser {
    password: string;
    password_confirm: string;
}

export const initialValuesUserEdit: FormUserEdit = {
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    name: '',
    firstName: '',
    telephone: '',
    additionaldescription: '',
    profile_picture: '',
    licenseVerified: false,
};
