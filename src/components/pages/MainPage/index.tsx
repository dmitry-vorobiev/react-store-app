import * as React from 'react';
import {RouteComponentProps} from "@reach/router";

interface Props extends RouteComponentProps {

}

export function MainPage(props: Props) {
    return (
        <section className="global__container">
            There should be the main content
        </section>
    );
}