import './styles.scss';

import * as React from 'react';
import {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    theme?: 'default';
    inline?: boolean;
}

export function Button(props: Props) {
    const {theme = 'default', inline} = props;
    const className = `Button ${theme} ${inline ? 'inline' : ''}`;

    return <button {...props} className={className} />;
}
