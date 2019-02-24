import {AnyAction, Dispatch, Reducer} from 'redux';
import {createSymbiote} from 'redux-symbiote';
import cookies from '../lib/cookies';
import {AuthErrorCode} from "../model";

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
        error
    })
};

const {actions, reducer} = createSymbiote<AuthState, Actions>(initialState, symbiotes, 'auth');
const key = 'react-store-app';

function logIn(login: string, password: string) {
    return (dispatch: Dispatch) => {
        const cookie = cookies.getItem(key);

        if (cookie && cookie.includes(login)) {
            if (cookie.includes(password)) {
                dispatch(actions.logIn(login));
            } else {
                dispatch(actions.fail(AuthErrorCode.badPassword));
            }
        } else {
            dispatch(actions.fail(AuthErrorCode.userDoesNotExist));
        }
    }
}

function register(login: string, password: string) {
    return (dispatch: Dispatch) => {
        const tomorrow = (new Date()).getTime() + 24 * 60 * 60 * 1000;
        const expiresAt = new Date(tomorrow).toUTCString();
        cookies.setItem(key, `${login}:${password}`, expiresAt, '/');
        dispatch(actions.logIn(login));
    }
}

export default reducer as Reducer<AuthState>;
export const auth = {
    logIn,
    logOut: actions.logOut,
    register
};
