import {AnyAction, combineReducers, Reducer} from 'redux';
import auth, {AuthState} from '../features/auth/reducers/auth.reducer';

export interface AppState {
    auth: AuthState;
}

const appState: Reducer<AppState, AnyAction> = combineReducers({
    auth,
});

export const rootReducer: Reducer<AppState, AnyAction> = (state, action) => appState(state, action);
