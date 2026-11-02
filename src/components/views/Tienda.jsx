import { useState } from 'react';
import { productos } from '../../data/productos';
import ProductoList from '../ProductoList';

export default function Tienda() {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Catálogo de Videojuegos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Explorá nuestra selección de 20 títulos disponibles
          </p>
        </div>

        <div className="w-full sm:w-72">
          <label htmlFor="buscador" className="sr-only">
            Buscar videojuegos
          </label>
          <input
            id="buscador"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      <ProductoList productos={productosFiltrados} />
    </div>
  );
}