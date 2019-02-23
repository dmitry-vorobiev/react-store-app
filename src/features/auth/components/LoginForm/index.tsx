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
import {Title} from '../../../../components/ui/Title';

interface Props {
    logIn: () => void;
}

function LoginFormView({logIn}: Props) {
    const [login, changeLogin] = useState('');
    const [password, changePassword] = useState('');

    const onLoginChanged = useCallback(createInputHandler(changeLogin), [changeLogin]);
    const onPasswordChanged = useCallback(createInputHandler(changePassword), [changePassword]);

    const canSubmit = login.length > 0 && password.length > 0;

    const onSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            canSubmit && logIn();
        },
        [canSubmit, logIn]
    );

    return (
        <form className="LoginForm_root" onSubmit={onSubmit}>
            <Title size={2}>Sign in</Title>
            <Field>
                <Label htmlFor="login">E-mail</Label>
                <Input
                    id="login"
                    type="email"
                    placeholder="Enter your e-mail"
                    value={login}
                    onChange={onLoginChanged}
                />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={onPasswordChanged}
                />
            </Field>
            <Button type="submit" theme="primary" onClick={logIn} disabled={!canSubmit}>
                Confirm
            </Button>
        </form>
    );
}

function createInputHandler(onChange: (val: string) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
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
