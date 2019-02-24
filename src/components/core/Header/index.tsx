import './styles.scss';

import * as React from 'react';
import {connect} from "react-redux";
import {Location, RouteComponentProps} from '@reach/router';
import {LogoutButton} from '../../../features/auth/components/LogoutButton';
import {Title} from '../../../shared/components/ui/Title';
import {AppState} from "../../../store/root.reducer";

interface Props {
    login: string;
}

function HeaderView({login = ''}: Props) {
    return (
        <header className="header_root">
            <Title>React store app</Title>
            <Location>
                {({location}: RouteComponentProps) => {
                    const {pathname} = location!;
                    return (
                        !pathname.startsWith('/auth') && (
                            <div>
                                {login} <LogoutButton />
                            </div>
                        )
                    );
                }}
            </Location>
        </header>
    );
}

const mapStateToProps = (state: AppState) => ({
    login: state.auth.login
});

    export const Header= connect(mapStateToProps)(HeaderView);
