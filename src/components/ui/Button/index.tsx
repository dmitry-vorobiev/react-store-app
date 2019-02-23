import './styles.scss';

import * as React from 'react';
import {ButtonHTMLAttributes, ReactNode} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    theme?: 'primary';
    inline?: boolean;
}

export function Button(props: Props) {
    const {theme = '', inline} = props;
    const className = ['button', theme, inline ? 'inline' : ''].filter(c => c).join(' ');
    return <button {...props} className={className} />;
}
