import './styles.scss';

import * as React from 'react';
import {ReactNode} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Button} from '../../../../shared/components/ui/Button';
import {auth} from '../../reducers/auth.reducer';

interface Props {
    children?: ReactNode;
    logOut?: () => void;
}

function LogoutButtonView({children, logOut}: Props) {
    return (
        <Button theme="blank" onClick={logOut} aria-describedby="exit" inline>
            {children}
        </Button>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    logOut() {
        dispatch(auth.logOut());
    },
});
export const LogoutButton = connect(
    null,
    mapDispatchToProps
)(LogoutButtonView);
