import {AnyAction, Dispatch, Reducer} from 'redux';
import {createSymbiote} from 'redux-symbiote';
import cookies from '../lib/cookies';
import {AuthErrorCode} from '../model';
import {sha256} from 'js-sha256';

export interface AuthState {
    authorized: boolean;
    error: AuthErrorCode | null;
    login: string;
}

interface Actions {
    logIn: (login: string) => AnyAction;
    logOut: () => AnyAction;
    fail: (error: AuthErrorCode) => AnyAction;
}

const initialState: AuthState = {
    authorized: false,
    error: null,
    login: '',
};

const symbiotes = {
    logIn: (state: AuthState, login: string) => ({
        authorized: true,
        error: null,
        login,
    }),
    logOut: (state: AuthState) => initialState,
    fail: (state: AuthState, error: AuthErrorCode) => ({
        ...state,
        error,
    }),
};

const {actions, reducer} = createSymbiote<AuthState, Actions>(initialState, symbiotes, 'auth');
const key = 'react-store-app';

function calculateHash(login: string, password: string) {
    // TODO real implementation
    return sha256(`${login}:${password}`);
}

function saveCookie(login: string, hash: string) {
    const value = `${login}:${hash}`;
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    const expiresAt = new Date(tomorrow).toUTCString();
    cookies.setItem(key, value, expiresAt, '/');
}

function matchCredentials(login: string, password: string): [string, boolean] {
    const hash = calculateHash(login, password);
    const hasMatch = hash === localStorage.getItem(login);
    return [hash, hasMatch];
}

function hasUser(login: string): boolean {
    return !!localStorage.getItem(login);
}

function saveUser(login: string, hash: string) {
    localStorage.setItem(login, hash);
}

function retrieveStoredLogin() {
    const credentials = cookies.getItem(key); // login:hash

    if (credentials) {
        const delimiterPos = credentials.indexOf(':');
        return delimiterPos > -1 ? credentials.slice(0, delimiterPos) : '';
    } else {
        return '';
    }
}

function init() {
    return (dispatch: Dispatch) => {
        const login = retrieveStoredLogin();

        if (login) {
            dispatch(actions.logIn(login));
        }
    };
}

function logIn(login: string, password: string) {
    return (dispatch: Dispatch) => {
        const [hash, matches] = matchCredentials(login, password);

        if (matches) {
            saveCookie(login, hash);
            dispatch(actions.logIn(login));
        } else {
            dispatch(actions.fail(AuthErrorCode.badCredentials));
        }
    };
}

function logOut() {
    return (dispatch: Dispatch) => {
        cookies.removeItem(key, '/');
        dispatch(actions.logOut());
    };
}

function register(login: string, password: string) {
    return (dispatch: Dispatch) => {
        if (hasUser(login)) {
            dispatch(actions.fail(AuthErrorCode.alreadyRegistered));
        } else {
            const hash = calculateHash(login, password);
            saveUser(login, hash);
            saveCookie(login, hash);
            dispatch(actions.logIn(login));
        }
    };
}

export default reducer as Reducer<AuthState>;
export const auth = {
    init,
    logIn,
    logOut,
    register,
};
