import './styles.scss';

import * as React from 'react';
import {LabelHTMLAttributes, ReactNode} from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    children?: ReactNode;
}

export function Label(props: Props) {
    return <label {...props} className="form-label"/>;
}
