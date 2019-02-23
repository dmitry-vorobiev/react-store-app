import './styles.scss';

import * as React from 'react';
import {Location, RouteComponentProps} from '@reach/router';
import {SignOutButton} from '../../../features/auth/components/SignOutButton';
import {Title} from '../../ui/Title';

export function Header() {
    return (
        <header className="header_root">
            <Title>React store app</Title>
            <Location>
                {({location}: RouteComponentProps) => {
                    const {pathname} = location!;
                    return (
                        !pathname.startsWith('/auth') && (
                            <>
                                You have been signed in. <SignOutButton />
                            </>
                        )
                    );
                }}
            </Location>
        </header>
    );
}
