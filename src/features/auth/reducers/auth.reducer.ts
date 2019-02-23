import {createSymbiote, Symbiote} from 'redux-symbiote';
import {AnyAction, Reducer} from 'redux';

export interface AuthState {
    loggedIn: boolean;
}

interface Symbiotes {
    logIn: Symbiote<AuthState>;
    logOut: Symbiote<AuthState>;
}

const initialState: AuthState = {
    loggedIn: false,
};

const symbiotes = {
    logIn: (state: AuthState) => ({
        loggedIn: true,
    }),
    logOut: (state: AuthState) => ({
        loggedIn: false,
    }),
};

const {actions, reducer} = createSymbiote<AuthState, Symbiotes>(initialState, symbiotes, 'auth');

export default reducer as Reducer<AuthState, AnyAction>;
