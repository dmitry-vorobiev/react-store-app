import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Button} from '../../../../components/ui/Button';
import {ReactComponent as ExitIcon} from '../../../../assets/svg/exit.svg';
import {auth} from '../../reducers/auth.reducer';

interface Props {
    signOut: () => void;
}

function SignOutButtonView({signOut}: Props) {
    return (
        <Button theme="blank" onClick={signOut} aria-describedby="exit" inline>
            <ExitIcon width={22} />
        </Button>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    signOut() {
        dispatch(auth.logOut());
    },
});
export const SignOutButton = connect(
    null,
    mapDispatchToProps
)(SignOutButtonView);
