import './styles.scss';

import * as React from 'react';
import {ReactNode} from 'react';

interface Props {
    children?: ReactNode;
}

export function Field({children}: Props) {
    return <div className="form-field">{children}</div>;
}
