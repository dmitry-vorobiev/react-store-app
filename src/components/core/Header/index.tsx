import * as React from 'react';
import {Location, RouteComponentProps} from '@reach/router';
import {Dispatch} from 'redux';
import {auth} from '../../../features/auth/reducers/auth.reducer';
import {connect} from 'react-redux';
import {Button} from '../../ui/Button';

interface Props {
    logOut: () => void;
}

export function HeaderView({logOut}: Props) {
    return (
        <header>
            <Location>
                {({location}: RouteComponentProps) => {
                    const {pathname} = location!;
                    return (
                        !pathname.startsWith('/auth') && (
                            <>
                                You have been signed in. <Button onClick={logOut} inline>Exit</Button>
                            </>
                        )
                    );
                }}
            </Location>
        </header>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logOut() {
        dispatch(auth.logOut());
    },
});
export const Header = connect(
    null,
    mapDispatchToProps
)(HeaderView);
