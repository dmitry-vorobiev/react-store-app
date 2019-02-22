import {AnyAction, combineReducers, Reducer} from 'redux';

interface AppState {

}

const appState: Reducer<AppState, AnyAction> = combineReducers({
});

export const rootReducer: Reducer<AppState, AnyAction> = (state, action) =>
    appState(state, action);