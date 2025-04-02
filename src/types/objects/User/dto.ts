import Address from '@/types/objects/Address/dto';

/**
 * Represents the base structure of a user.
 */
interface BaseUser {
    /** The username of the user. */
    username: string;

    /** The email address of the user. */
    email: string;
}

/**
 * Represents a detailed user object extending the base user structure.
 */
export default interface User extends BaseUser {
    /** The unique identifier for the user (optional). */
    userId?: number;

    /** The first name of the user (optional). */
    firstname?: string;

    /** The last name or full name of the user (optional). */
    name?: string;

    /** Additional description or notes about the user (optional). */
    additionalDescription?: string;

    /** Indicates whether the user's license has been verified (optional). */
    licenseVerified?: boolean;

    /** The profile picture of the user as a Blob object (optional). */
    profilePicture?: Blob;

    /** The telephone number of the user (optional). */
    telephone?: string;

    /** The address of the user, represented by the Address object (optional). */
    address?: Address;

    /** The JSON Web Token (JWT) associated with the user (optional). */
    jwt?: string;
}
