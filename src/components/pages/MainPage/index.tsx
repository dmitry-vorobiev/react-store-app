import * as React from 'react';
import {RouteComponentProps} from "@reach/router";

interface Props extends RouteComponentProps {

}

export function MainPage(props: Props) {
    return (
        <div>
            You have been logged In
        </div>
    );
}