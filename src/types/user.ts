export interface User {
    id: number;
    username: string;
    email: string;
    // ... other user properties ...
    token?: string; // Optional: Store JWT here after login
}