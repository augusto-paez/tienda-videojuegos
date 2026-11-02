import { useState, useEffect } from 'react';

/**
 * Custom Hook genérico para sincronizar estado con localStorage.
 * @param {string} key - Clave de storage.
 * @param {any} initialValue - Valor inicial por defecto.
 * @returns {[any, Function]} - Retorna [value, setValue].
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error al leer de localStorage [key: "${key}"]:`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Error al guardar en localStorage [key: "${key}"]:`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}