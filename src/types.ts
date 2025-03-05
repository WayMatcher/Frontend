export interface UserContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export interface UserProviderProps {
    children: React.ReactNode;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}