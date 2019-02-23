import './styles.scss';

import * as React from 'react';
import {Button} from '../../../../components/ui/Button';
import {Dispatch} from 'redux';
import {auth} from '../../reducers/auth.reducer';
import {connect} from 'react-redux';
import {Input} from '../../../../components/ui/Input';
import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {Field} from '../../../../components/ui/Field';
import {Label} from '../../../../components/ui/Field/Label';

interface Props {
    logIn: () => void;
}

function LoginFormView({logIn}: Props) {
    const [login, changeLogin] = useState('');
    const [password, changePassword] = useState('');

    const onLoginChanged = useCallback(createInputHandler(changeLogin), [changeLogin]);
    const onPasswordChanged = useCallback(createInputHandler(changePassword), [changePassword]);
    const onSubmit = useCallback(createSubmitHandler(logIn), [logIn]);

    return (
        <form className="LoginForm_root" onSubmit={onSubmit}>
            <Field>
                <Label>E-mail</Label>
                <Input
                    id="login"
                    type="email"
                    placeholder="Enter your e-mail"
                    value={login}
                    onChange={onLoginChanged}
                />
            </Field>
            <Field>
                <Label>Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={onPasswordChanged}
                />
            </Field>
            <Button type="submit" onClick={logIn}>
                Sign in
            </Button>
        </form>
    );
}

function createInputHandler(onChange: (val: string) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
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
