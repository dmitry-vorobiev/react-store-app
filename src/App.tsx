import React, {Component} from 'react';
import './App.css';
import {Router} from '@reach/router';
import {AuthPage} from './components/pages/AuthPage';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <AuthPage path="auth" />
                </Router>
            </div>
        );
    }
}
export default App;
