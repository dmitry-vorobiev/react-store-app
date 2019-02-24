import './styles.scss';

import * as React from 'react';
import {FormEvent} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from '@reach/router';
import {Button} from '../../../../shared/components/ui/Button';
import {auth} from '../../reducers/auth.reducer';
import {Input} from '../../../../shared/components/ui/Input';
import {Field} from '../../../../shared/components/ui/Field';
import {Label} from '../../../../shared/components/ui/Field/Label';
import {Title} from '../../../../shared/components/ui/Title';
import {useFormInput} from '../../../../shared/lib/forms/hooks';
import {AppState} from '../../../../store/root.reducer';
import {AuthErrorCode} from '../../model';

interface Props extends RouteComponentProps {
    error: AuthErrorCode | null;
    logIn?: (login: string, password: string) => void;
    signUp?: (login: string, password: string) => void;
}

function AuthFormView({error, logIn, signUp, path}: Props) {
    const login = useFormInput('');
    const password = useFormInput('');
    const repeatPassword = useFormInput('');

    const register = path === 'register';
    const passHaveSameLength = password.value.length === repeatPassword.value.length;
    const passMatch = register ? password.value === repeatPassword.value : true;
    const canSubmit = login.value.length && password.value.length && passMatch;
    const loginError = error === AuthErrorCode.userDoesNotExist;
    const badPassword = error === AuthErrorCode.badPassword;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (canSubmit) {
            register ? signUp!(login.value, password.value) : logIn!(login.value, password.value);
        }
    }

    return (
        <form className="auth_form__root" onSubmit={handleSubmit}>
            <Title size={2}>{register ? 'Create account' : 'Sign in'}</Title>
            <Field>
                <Label htmlFor="login">E-mail:</Label>
                <Input
                    id="login"
                    type="email"
                    placeholder="Enter your e-mail"
                    {...login}
                    invalid={loginError}
                />
                {loginError && <div className="error">Account doesn't exist</div>}
            </Field>
            <Field>
                <Label htmlFor="pass">Password:</Label>
                <Input
                    id="pass"
                    type="password"
                    placeholder="Enter your password"
                    {...password}
                    invalid={badPassword || (passHaveSameLength && !passMatch)}
                />
                {badPassword && <div className="error">Wrong password</div>}
            </Field>
            {register && (
                <Field>
                    <Label htmlFor="repeat-pass">Repeat password:</Label>
                    <Input
                        id="repeat-pass"
                        type="password"
                        placeholder="Repeat your password"
                        {...repeatPassword}
                        invalid={passHaveSameLength && !passMatch}
                    />
                    {passHaveSameLength && !passMatch && (
                        <div className="error">Password doesn't match</div>
                    )}
                </Field>
            )}
            <Button type="submit" theme="primary" disabled={!canSubmit}>
                Confirm
            </Button>
            <div className="link">
                {register && 'Existing customer? '}
                <Link to={register ? '/auth/login' : '/auth/register'}>
                    {register ? 'Sign in' : 'Create a new account'}
                </Link>
            </div>
        </form>
    );
}

function mapStateToProps(state: AppState) {
    return {
        error: state.auth.error,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        logIn(login: string, password: string) {
            dispatch(auth.logIn(login, password));
        },
        signUp(login: string, password: string) {
            dispatch(auth.register(login, password));
        },
    };
}

export const AuthForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthFormView);
