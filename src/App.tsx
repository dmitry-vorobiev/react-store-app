import React from 'react';
import './App.css';
import {Redirect, Router} from '@reach/router';
import {AuthPage} from './components/pages/AuthPage';
import {connect} from 'react-redux';
import {AppState} from './store/root.reducer';
import {Guard} from './components/Guard';
import {MainPage} from './components/pages/MainPage';
import {Header} from './components/core/Header';

interface Props {
    loggedIn: boolean;
}

function AppInner({loggedIn}: Props) {
    return (
        <div className="App">
            <Header />
            <Router>
                <Guard path="auth" hasAccess={!loggedIn} redirect="/">
                    <AuthPage path="login" />
                    <Redirect from="/*" to="/auth/login" noThrow />
                </Guard>
                <Guard default hasAccess={loggedIn} redirect="/auth">
                    <MainPage default />
                </Guard>
            </Router>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    loggedIn: state.auth.loggedIn,
});

export const App = connect(mapStateToProps)(AppInner);
