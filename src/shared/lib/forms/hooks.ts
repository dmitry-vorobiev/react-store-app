import {ChangeEvent, useState} from 'react';

export function useFormInput(initialValue = '') {
    const [value, changeValue] = useState(initialValue);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        changeValue(event.target.value);
    }

    return {
        value,
        onChange: handleChange,
    };
}
