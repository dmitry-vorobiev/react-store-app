import {AnyAction, Dispatch, Reducer} from 'redux';
import {createSymbiote} from 'redux-symbiote';
import cookies from '../lib/cookies';
import {AuthErrorCode} from '../model';
import {sha256} from 'js-sha256';
import {createUser, retrieveUser} from '../api';

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
    return sha256(`${login}:${password}`);
}

function saveCookie(login: string, hash: string) {
    const value = `${login}:${hash}`;
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    const expiresAt = new Date(tomorrow).toUTCString();
    cookies.setItem(key, value, expiresAt, '/');
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

const init = () => (dispatch: Dispatch) => {
    const login = retrieveStoredLogin();
    if (login) {
        dispatch(actions.logIn(login));
    }
};

const logIn = (login: string, password: string) => async (dispatch: Dispatch) => {
    const user = await retrieveUser(login);

    if (user) {
        const hash = calculateHash(login, password);

        if (hash === user.password) {
            saveCookie(login, hash);
            dispatch(actions.logIn(login));
        } else {
            dispatch(actions.fail(AuthErrorCode.badCredentials));
        }
    } else {
        dispatch(actions.fail(AuthErrorCode.userNotFound));
    }
};

function logOut() {
    return (dispatch: Dispatch) => {
        cookies.removeItem(key, '/');
        dispatch(actions.logOut());
    };
}

const register = (login: string, password: string) => async (dispatch: Dispatch) => {
    const user = await retrieveUser(login);

    if (user) {
        dispatch(actions.fail(AuthErrorCode.alreadyRegistered));
    } else {
        const hash = calculateHash(login, password);
        await createUser(login, hash);
        saveCookie(login, hash);
        dispatch(actions.logIn(login));
    }
};

export default reducer as Reducer<AuthState>;
export const auth = {
    init,
    logIn,
    logOut,
    register,
};
