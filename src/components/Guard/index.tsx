import * as React from 'react';
import {ReactNode} from 'react';
import {Redirect, RouteComponentProps} from '@reach/router';

interface Props extends RouteComponentProps {
    children: ReactNode;
    hasAccess: boolean;
    redirect: string;
}

export function Guard({children, hasAccess, redirect}: Props) {
    return hasAccess ? <>{children}</> : <Redirect to={redirect} noThrow />;
}
