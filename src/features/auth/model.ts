export enum AuthErrorCode {
    badCredentials = 'BAD_CREDENTIALS',
    alreadyRegistered = 'ALREADY_REGISTERED'
}

export interface User {
    email: string;
    password: string;
}