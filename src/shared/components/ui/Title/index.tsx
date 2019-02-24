import './styles.scss';

import * as React from 'react';
import {ReactNode} from 'react';

type Size = 1 | 2 | 3 | 4;
interface Props {
    size?: Size;
    children?: ReactNode;
}

export function Title({size = 1, children}: Props) {
    switch (size) {
        default:
        case 1:
            return <h1 className="title">{children}</h1>;
        case 2:
            return <h2 className="title">{children}</h2>;
        case 3:
            return <h3 className="title">{children}</h3>;
        case 4:
            return <h4 className="title">{children}</h4>;
    }
}
