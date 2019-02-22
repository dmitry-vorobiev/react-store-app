import * as React from 'react';
import {RouteComponentProps} from "@reach/router";
import {LoginForm} from "../../../features/auth/components/LoginForm";

export function AuthPage(props: RouteComponentProps) {
    return (
        <LoginForm/>
    );
}