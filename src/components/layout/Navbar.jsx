import { useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { useCarritoContext } from '../../context/CarritoContext';
import CarritoModal from '../CarritoModal';

export default function Navbar({ setVistaActiva }) {
  const { esOscuro, toggleTema } = useThemeContext();
  const { cantidadTotal } = useCarritoContext();
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-black tracking-wider text-indigo-600 dark:text-indigo-400">
          🎮 Tienda Videojuegos
        </h1>

        <div className="flex items-center gap-3">
          {/* Botón de alternar tema */}
          <button
            type="button"
            onClick={toggleTema}
            aria-label="Cambiar tema"
            className="rounded-xl border border-slate-200 p-2 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {esOscuro ? '☀️ Claro' : '🌙 Oscuro'}
          </button>

          {/* Botón de abrir carrito */}
          <button
            type="button"
            onClick={() => setIsCarritoAbierto(true)}
            aria-label="Ver carrito"
            className="relative flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700"
          >
            <span>🛒 Carrito</span>
            {cantidadTotal > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-indigo-600">
                {cantidadTotal}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Modal del carrito */}
      <CarritoModal
        isOpen={isCarritoAbierto}
        onClose={() => setIsCarritoAbierto(false)}
        setVistaActiva={setVistaActiva}
      />
    </header>
  );
}