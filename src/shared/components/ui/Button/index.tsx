import './styles.scss';

import * as React from 'react';
import {ButtonHTMLAttributes, ReactNode} from 'react';

type Theme = 'primary' | 'blank';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    theme?: Theme;
    inline?: boolean;
}

export function Button(props: Props) {
    const {disabled, id, inline, children, type, onClick, theme = ''} = props;
    const className = ['button', theme, inline ? 'inline' : '', props.className].join(' ');
    return (
        <button id={id} type={type} onClick={onClick} className={className} disabled={disabled}>
            {children}
        </button>
    );
}
