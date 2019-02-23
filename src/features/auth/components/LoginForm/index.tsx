import './styles.scss';

import * as React from 'react';
import {Button} from '../../../../components/ui/Button';
import {Dispatch} from 'redux';
import {auth} from '../../reducers/auth.reducer';
import {connect} from 'react-redux';

interface Props {
    logIn: () => void;
}

function LoginFormView({logIn}: Props) {
    return (
        <div className="LoginForm_root">
            <div>
                Press button below to log in.
            </div>
            <Button onClick={logIn}>Sign in</Button>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logIn() {
        dispatch(auth.logIn());
    },
});
export const LoginForm = connect(
    null,
    mapDispatchToProps
)(LoginFormView);
