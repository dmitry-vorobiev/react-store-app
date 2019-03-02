import './styles.scss';

import * as React from 'react';
import {connect} from 'react-redux';
import {Title} from '../../../shared/components/ui/Title';
import {AppState} from '../../../store/root.reducer';
import {UserPanel} from './UserPanel';

interface Props {
    login: string;
}

function HeaderView({login = ''}: Props) {
    return (
        <header className="header_root global_container">
            <Title>React store app</Title>
            <UserPanel login={login} />
        </header>
    );
}

const mapStateToProps = (state: AppState) => ({
    login: state.auth.login,
});

export const Header = connect(mapStateToProps)(HeaderView);
