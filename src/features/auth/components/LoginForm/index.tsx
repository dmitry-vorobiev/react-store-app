import './styles.scss';

import * as React from 'react';
import {Button} from '../../../../components/ui/Button';
import {Dispatch} from 'redux';
import {auth} from '../../reducers/auth.reducer';
import {connect} from 'react-redux';
import {Input} from '../../../../components/ui/Input';
import {FormEvent, useCallback} from 'react';

interface Props {
    logIn: () => void;
}

function LoginFormView({logIn}: Props) {
    const onSubmit = useCallback(() => createSubmitHandler(logIn), [logIn]);

    return (
        <form className="LoginForm_root" onSubmit={onSubmit}>
            <Input type="email" />
            <Input type="password" />
            <Button type="submit" onClick={logIn}>
                Sign in
            </Button>
        </form>
    );
}

function createSubmitHandler(onSubmit: () => void) {
    return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };
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
