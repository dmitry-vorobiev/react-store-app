import {createSymbiote, Symbiote} from 'redux-symbiote';
import {AnyAction, Reducer} from 'redux';

export interface AuthState {
    loggedIn: boolean;
}

interface Actions {
    logIn: () => AnyAction;
    logOut: () => AnyAction;
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

const {actions, reducer} = createSymbiote<AuthState, Actions>(initialState, symbiotes, 'auth');

export default reducer as Reducer<AuthState, AnyAction>;
export const auth = {
    ...actions
};
