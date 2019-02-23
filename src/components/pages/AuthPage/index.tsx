import './styles.scss';

import * as React from 'react';
import {ReactNode} from 'react';
import {RouteComponentProps} from '@reach/router';

interface Props extends RouteComponentProps {
    children?: ReactNode;
}

export function AuthPage({children}: Props) {
    return <div className="auth_root">{children}</div>;
}
