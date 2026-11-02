import { createContext, useContext } from 'react';
import { useCarrito } from '../hooks/useCarrito';

// Contexto privado (no se exporta directamente)
const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const valorCarrito = useCarrito();

  return (
    <CarritoContext.Provider value={valorCarrito}>
      {children}
    </CarritoContext.Provider>
  );
}

// Hook consumidor con guardia de seguridad
export function useCarritoContext() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarritoContext() debe usarse dentro de <CarritoProvider>');
  }
  return contexto;
}