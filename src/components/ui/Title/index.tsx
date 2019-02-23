import './styles.scss';

import * as React from 'react';
import {HTMLAttributes, ReactNode} from 'react';

type Size = 1 | 2 | 3 | 4;
interface Props extends HTMLAttributes<HTMLHeadingElement> {
    size?: Size;
    children?: ReactNode;
}

export function Title(props: Props) {
    const {size} = props;

    switch (size) {
        default:
        case 1:
            return <h1 {...props} className="title" />;
        case 2:
            return <h2 {...props} className="title" />;
        case 3:
            return <h3 {...props} className="title" />;
        case 4:
            return <h4 {...props} className="title" />;
    }
}
