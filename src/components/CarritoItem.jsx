import { useCarritoContext } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/formato';

export default function CarritoItem({ item }) {
  const { cambiarCantidad, quitar } = useCarritoContext();

  const noPuedeSumar = item.cantidad >= item.stock;

  return (
    <li className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 dark:border-slate-700">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={item.imagen}
          alt={item.nombre}
          className="h-12 w-16 rounded object-cover"
        />
        <div className="truncate">
          <p className="font-semibold text-slate-800 truncate dark:text-slate-100">
            {item.nombre}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatearPrecio(item.precio)} c/u
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600">
          <button
            type="button"
            onClick={() => cambiarCantidad(item.id, -1)}
            aria-label="Restar uno"
            className="px-2 py-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {item.cantidad}
          </span>
          <button
            type="button"
            onClick={() => cambiarCantidad(item.id, 1)}
            disabled={noPuedeSumar}
            aria-label="Sumar uno"
            className="px-2 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            +
          </button>
        </div>

        <span className="w-20 text-right text-sm font-bold text-slate-800 dark:text-slate-100">
          {formatearPrecio(item.precio * item.cantidad)}
        </span>

        <button
          type="button"
          onClick={() => quitar(item.id)}
          aria-label={`Eliminar ${item.nombre}`}
          className="text-xs text-red-500 hover:underline"
        >
          Quitar
        </button>
      </div>
    </li>
  );
}