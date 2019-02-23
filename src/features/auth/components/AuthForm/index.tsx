import './styles.scss';

import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from '@reach/router';
import {Button} from '../../../../components/ui/Button';
import {auth} from '../../reducers/auth.reducer';
import {Input} from '../../../../components/ui/Input';
import {ChangeEvent, FormEvent, useState} from 'react';
import {Field} from '../../../../components/ui/Field';
import {Label} from '../../../../components/ui/Field/Label';
import {Title} from '../../../../components/ui/Title';

interface Props extends RouteComponentProps {
    logIn: () => void;
    signUp: () => void;
}

function AuthFormView({logIn, signUp, path}: Props) {
    const [login, changeLogin] = useState('');
    const [pass, changePass] = useState('');
    const [secPass, changeSecPass] = useState('');

    const register = path === 'register';
    const canSubmit = login.length > 0 && pass.length > 0 && (register ? pass === secPass : true);

    function handleLoginChanged(event: ChangeEvent<HTMLInputElement>) {
        changeLogin(event.target.value);
    }

    function handlePassChanged(event: ChangeEvent<HTMLInputElement>) {
        changePass(event.target.value);
    }

    function handleSecPassChanged(event: ChangeEvent<HTMLInputElement>) {
        changeSecPass(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        canSubmit && logIn();
        if (canSubmit) {
            register ? signUp() : logIn();
        }
    }

    return (
        <form className="auth_form__root" onSubmit={handleSubmit}>
            <Title size={2}>{register ? 'Sign up' : 'Sign in'}</Title>
            <Field>
                <Label htmlFor="login">E-mail:</Label>
                <Input
                    id="login"
                    type="email"
                    placeholder="Enter your e-mail"
                    value={login}
                    onChange={handleLoginChanged}
                />
            </Field>
            <Field>
                <Label htmlFor="pass">Password:</Label>
                <Input
                    id="pass"
                    type="password"
                    placeholder="Enter your password"
                    value={pass}
                    onChange={handlePassChanged}
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
                        onChange={handleSecPassChanged}
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
