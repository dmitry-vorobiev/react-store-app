import './styles.scss';

import * as React from 'react';
import {ButtonHTMLAttributes, ReactNode} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    theme?: 'primary';
    inline?: boolean;
}

export function Button(props: Props) {
    const {disabled, inline, children, type, onClick, theme = ''} = props;
    const className = ['button', theme, inline ? 'inline' : ''].filter(c => c).join(' ');
    return (
        <button type={type} onClick={onClick} className={className} disabled={disabled}>
            {children}
        </button>
    );
}
