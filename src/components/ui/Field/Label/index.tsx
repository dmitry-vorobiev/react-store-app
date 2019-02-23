import './styles.scss';

import * as React from 'react';
import {ReactNode} from 'react';

interface Props {
    children?: ReactNode;
}

export function Label({children}: Props) {
    return <label className="form-label">{children}</label>;
}
