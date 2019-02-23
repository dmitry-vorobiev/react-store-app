import './styles.scss';

import * as React from 'react';
import {InputHTMLAttributes, ReactNode} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
}

export function Input(props: Props) {
    return <input {...props} className="Input" />;
}
