export enum AuthErrorCode {
    badCredentials = 'BAD_CREDENTIALS',
    alreadyRegistered = 'ALREADY_REGISTERED',
    userNotFound = 'NOT_FOUND'
}

export interface User {
    email: string;
    password: string;
}