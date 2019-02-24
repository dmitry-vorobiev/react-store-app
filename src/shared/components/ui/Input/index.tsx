import './styles.scss';

import * as React from 'react';
import {InputHTMLAttributes, ReactNode} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
    invalid?: boolean
}

export function Input(props: Props) {
    const {id, invalid, type, placeholder, value, onChange} = props;
    const className = ['input', invalid ? 'invalid' : '', props.className].join(' ');

    return (
        <input
            id={id}
            type={type}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
