import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Contexto privado (no se exporta directamente)
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Persiste la preferencia en localStorage con clave 'tema' (inicia en 'dark')
  const [tema, setTema] = useLocalStorage('tema', 'dark');

  const toggleTema = () => {
    setTema((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Aplica o remueve la clase 'dark' en el elemento <html>
  useEffect(() => {
    const root = document.documentElement;
    if (tema === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [tema]);

  const value = {
    tema,
    esOscuro: tema === 'dark',
    toggleTema,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook consumidor con guardia de seguridad
export function useThemeContext() {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error('useThemeContext() debe usarse dentro de <ThemeProvider>');
  }
  return contexto;
}