import './styles.scss';

import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from '@reach/router';
import {Button} from '../../../../components/ui/Button';
import {auth} from '../../reducers/auth.reducer';
import {Input} from '../../../../components/ui/Input';
import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {Field} from '../../../../components/ui/Field';
import {Label} from '../../../../components/ui/Field/Label';
import {Title} from '../../../../components/ui/Title';

interface Props extends RouteComponentProps {
    logIn: () => void;
    signUp: () => void;
}

function AuthFormView({logIn, signUp, path}: Props) {
    const register = path === 'register';

    const [login, changeLogin] = useState('');
    const [pass, changePass] = useState('');
    const [secPass, changeSecPass] = useState('');

    const onLoginChanged = useCallback(createInputHandler(changeLogin), [changeLogin]);
    const onPassChanged = useCallback(createInputHandler(changePass), [changePass]);
    const onSecPassChanged = useCallback(createInputHandler(changeSecPass), [changeSecPass]);

    const canSubmit = login.length > 0 && pass.length > 0 && (register ? pass === secPass : true);

    const onSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            canSubmit && logIn();
            if (canSubmit) {
                register ? signUp() : logIn();
            }
        },
        [canSubmit, register, logIn, signUp]
    );

    return (
        <form className="auth_form__root" onSubmit={onSubmit}>
            <Title size={2}>{register ? 'Sign up' : 'Sign in'}</Title>
            <Field>
                <Label htmlFor="login">E-mail:</Label>
                <Input
                    id="login"
                    type="email"
                    placeholder="Enter your e-mail"
                    value={login}
                    onChange={onLoginChanged}
                />
            </Field>
            <Field>
                <Label htmlFor="pass">Password:</Label>
                <Input
                    id="pass"
                    type="password"
                    placeholder="Enter your password"
                    value={pass}
                    onChange={onPassChanged}
                />
            </Field>
            {register && (
                <Field>
                    <Label htmlFor="sec-pass">Repeat password:</Label>
                    <Input
                        id="sec-pass"
                        type="password"
                        placeholder="Repeat your password"
                        value={secPass}
                        onChange={onSecPassChanged}
                    />
                </Field>
            )}
            <Button type="submit" theme="primary" onClick={logIn} disabled={!canSubmit}>
                Confirm
            </Button>
            {register && pass !== secPass && <div className="error">Password doesn't match</div>}
            <span>
                {register && 'Existing customer? '}
                <Link to={register ? '/auth/login' : '/auth/register'}>
                    {register ? 'Sign in' : 'Create a new account'}
                </Link>
            </span>
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
    signUp() {
        dispatch(auth.logIn());
    },
});
export const AuthForm = connect(
    null,
    mapDispatchToProps
)(AuthFormView);
