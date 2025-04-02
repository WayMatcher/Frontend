import User from './dto';

/**
 * Interface representing the structure of an MFA token form.
 */
interface FormMFAToken {
    /**
     * The MFA token string.
     */
    mfaToken: string;
}

/**
 * Initial values for the MFA token form.
 */
export const initialValuesMFAToken: FormMFAToken = {
    mfaToken: '', // Default value for the MFA token.
};

/**
 * Interface representing the structure of a user form.
 * Extends the base `User` interface and adds additional fields.
 */
interface FormUser extends User {
    /**
     * User's email address.
     */
    email: string;

    /**
     * User's username.
     */
    username: string;

    /**
     * User's password.
     */
    password: string;

    /**
     * Confirmation of the user's password.
     */
    password_confirm: string;

    /**
     * User's full name.
     */
    name: string;

    /**
     * User's first name.
     */
    firstName: string;

    /**
     * User's telephone number.
     */
    telephone: string;

    /**
     * Additional description about the user.
     */
    additionaldescription: string;

    /**
     * URL or path to the user's profile picture.
     */
    profile_picture: string;

    /**
     * Indicates whether the user's license is verified.
     */
    licenseVerified: boolean;
}

/**
 * Interface representing the structure of a user registration form.
 * Extends `FormUser` and ensures password fields are included.
 */
export interface FormUserRegister extends FormUser {
    /**
     * User's password (repeated for registration purposes).
     */
    password: string;

    /**
     * Confirmation of the user's password (repeated for registration purposes).
     */
    password_confirm: string;
}
