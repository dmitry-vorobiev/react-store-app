import React, {useEffect} from 'react';
import {Redirect, Router} from '@reach/router';
import {AuthPage} from './components/pages/AuthPage';
import {connect} from 'react-redux';
import {AppState} from './store/root.reducer';
import {Guard} from './features/auth/components/Guard';
import {MainPage} from './components/pages/MainPage';
import {Header} from './components/core/Header';
import {AuthForm} from './features/auth/components/AuthForm';
import {Dispatch} from 'redux';
import {auth} from './features/auth/reducers/auth.reducer';

interface Props {
    init?: () => void;
    loggedIn: boolean;
}

function AppInner({init, loggedIn}: Props) {
    useEffect(() => {
        init!();
    }, []);

    return (
        <div className="App">
            <Header />
            <Router>
                <AuthPage path="auth">
                    <Guard hasAccess={!loggedIn} redirect="/" default>
                        <AuthForm path="login" />
                        <AuthForm path="register" />
                        <Redirect from="/*" to="/auth/login" noThrow />
                    </Guard>
                </AuthPage>
                <Guard hasAccess={loggedIn} redirect="/auth" default>
                    <MainPage default />
                </Guard>
            </Router>
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        loggedIn: state.auth.authorized,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        init() {
            dispatch(auth.init());
        },
    };
}

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppInner);
