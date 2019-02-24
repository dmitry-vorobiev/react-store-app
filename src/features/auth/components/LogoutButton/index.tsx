import './styles.scss';

import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Button} from '../../../../shared/components/ui/Button';
import {ReactComponent as ExitIcon} from '../../../../assets/svg/exit.svg';
import {auth} from '../../reducers/auth.reducer';

interface Props {
    signOut?: () => void;
}

function LogoutButtonView({signOut}: Props) {
    return (
        <Button theme="blank" onClick={signOut} aria-describedby="exit" inline>
            <ExitIcon className="sign_out" width={22} />
        </Button>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    signOut() {
        dispatch(auth.logOut());
    },
});
export const LogoutButton = connect(
    null,
    mapDispatchToProps
)(LogoutButtonView);
