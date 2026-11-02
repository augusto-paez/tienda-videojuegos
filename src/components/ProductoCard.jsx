import { useCarritoContext } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/formato';

export default function ProductoCard({ producto }) {
  const { agregar, carrito } = useCarritoContext();

  const itemEnCarrito = carrito.find((i) => i.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const sinStock = producto.stock <= 0 || cantidadEnCarrito >= producto.stock;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-800">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        {producto.destacado && (
          <span className="absolute top-2 right-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white shadow">
            Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {producto.categoria}
          </span>
          <span>Stock: {producto.stock - cantidadEnCarrito}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 line-clamp-1 dark:text-white">
          {producto.nombre}
        </h3>

        <p className="mt-1 text-xs text-slate-600 line-clamp-2 dark:text-slate-300">
          {producto.descripcion}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
          <span className="text-lg font-extrabold text-slate-900 dark:text-white">
            {formatearPrecio(producto.precio)}
          </span>

          <button
            type="button"
            onClick={() => agregar(producto)}
            disabled={sinStock}
            className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
          >
            {sinStock ? 'Sin stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}