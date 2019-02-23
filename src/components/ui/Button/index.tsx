import * as React from 'react';
import {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export function Button(props: Props) {
    return <button {...props} />;
}
