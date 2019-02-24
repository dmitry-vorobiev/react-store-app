import './styles.scss';

import * as React from 'react';
import {FormEvent} from 'react';
import {AnyAction, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from '@reach/router';
import {Button} from '../../../../shared/components/ui/Button';
import {auth} from '../../reducers/auth.reducer';
import {Input} from '../../../../shared/components/ui/Input';
import {Field} from '../../../../shared/components/ui/Field';
import {Label} from '../../../../shared/components/ui/Field/Label';
import {Title} from '../../../../shared/components/ui/Title';
import {useFormInput} from '../../../../shared/lib/forms/hooks';

interface Props extends RouteComponentProps {
    logIn: (login: string) => void;
    signUp: (login: string, password: string) => void;
}

function AuthFormView({logIn, signUp, path}: Props) {
    const login = useFormInput('');
    const password = useFormInput('');
    const repeatPassword = useFormInput('');

    const register = path === 'register';
    const passHaveSameLength = password.value.length === repeatPassword.value.length;
    const passMatch = register ? password.value === repeatPassword.value : true;
    const canSubmit = login.value.length && password.value.length && passMatch;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (canSubmit) {
            register ? signUp(login.value, password.value) : logIn(login.value);
        }
    }

    return (
        <form className="auth_form__root" onSubmit={handleSubmit}>
            <Title size={2}>{register ? 'Create account' : 'Sign in'}</Title>
            <Field>
                <Label htmlFor="login">E-mail:</Label>
                <Input id="login" type="email" placeholder="Enter your e-mail" {...login} />
            </Field>
            <Field>
                <Label htmlFor="pass">Password:</Label>
                <Input
                    id="pass"
                    type="password"
                    placeholder="Enter your password"
                    {...password}
                    invalid={passHaveSameLength && !passMatch}
                />
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    logIn(login: string) {
        dispatch(auth.logIn(login));
    },
    signUp(login: string, password: string) {
        // @ts-ignore
        dispatch(auth.register(login, password));
    },
});
export const AuthForm = connect(
    null,
    mapDispatchToProps
)(AuthFormView);
