import { useState } from 'react';

/**
 * Custom Hook para alternar estados booleanos de la interfaz.
 * @param {boolean} initialValue - Valor inicial (default false)
 * @returns {[boolean, Function, Function, Function]} - [value, toggle, setTrue, setFalse]
 */
export function useToggle(initialValue = false) {
    const [value, setValue] = useState(Boolean(initialValue));

    const toggle = () => setValue((prev) => !prev);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    return [value, toggle, setTrue, setFalse];
}