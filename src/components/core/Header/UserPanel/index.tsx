import './styles.scss';

import {Location, RouteComponentProps} from '@reach/router';
import {LogoutButton} from '../../../../features/auth/components/LogoutButton';
import * as React from 'react';

interface Props {
    login: string;
}

export function UserPanel({login}: Props) {
    return (
        <Location>
            {({location}: RouteComponentProps) => {
                const {pathname} = location!;
                return (
                    !pathname.startsWith('/auth') && (
                        <div className="user_panel">
                            <span className="login">{login}</span>
                            <LogoutButton>
                                <div className="log_out">Exit</div>
                            </LogoutButton>
                        </div>
                    )
                );
            }}
        </Location>
    );
}
