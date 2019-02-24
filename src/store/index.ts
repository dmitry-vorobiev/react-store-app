import {AnyAction, applyMiddleware, createStore, Dispatch, MiddlewareAPI, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AppState, rootReducer} from './root.reducer';

const thunk = (store: MiddlewareAPI<Dispatch<any>, AppState>) => (next: Dispatch) => (
    action: AnyAction | Function
) => (typeof action === 'function' ? action(store.dispatch, store.getState) : next(action));

export function configureStore() {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
