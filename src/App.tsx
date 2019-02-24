import React from 'react';
import {Redirect, Router} from '@reach/router';
import {AuthPage} from './components/pages/AuthPage';
import {connect} from 'react-redux';
import {AppState} from './store/root.reducer';
import {Guard} from './features/auth/components/Guard';
import {MainPage} from './components/pages/MainPage';
import {Header} from './components/core/Header';
import {AuthForm} from "./features/auth/components/AuthForm";

interface Props {
    loggedIn: boolean;
}

function AppInner({loggedIn}: Props) {
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

const mapStateToProps = (state: AppState) => ({
    loggedIn: state.auth.authorized,
});

export const App = connect(mapStateToProps)(AppInner);
