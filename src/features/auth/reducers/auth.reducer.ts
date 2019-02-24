import {AnyAction, Dispatch, Reducer} from 'redux';
import {createSymbiote} from 'redux-symbiote';
import cookies from '../lib/cookies';

export interface AuthState {
    authorized: boolean;
    login: string;
}

interface Actions {
    logIn: (login: string) => AnyAction;
    logOut: () => AnyAction;
}

const initialState: AuthState = {
    authorized: false,
    login: '',
};

const key = 'react-store-app';

const symbiotes = {
    logIn: (state: AuthState, login: string) => ({
        authorized: true,
        login,
    }),
    logOut: (state: AuthState) => initialState,
};

const {actions, reducer} = createSymbiote<AuthState, Actions>(initialState, symbiotes, 'auth');

function register(login: string, password: string) {
    return (dispatch: Dispatch) => {
        cookies.setItem(key, `${login}:${password}`, null, null, 'localhost', true);
        dispatch(actions.logIn(login));
    }
}

export default reducer as Reducer<AuthState>;
export const auth = {
    ...actions,
    register
};
