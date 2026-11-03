import { VISTAS } from '../../data/vistas';

export default function Confirmacion({ nombreCliente, setVistaActiva }) {
  return (
    <section className="mx-auto max-w-lg py-16 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-800">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          ✓
        </div>

        <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
          ¡Gracias por tu compra, {nombreCliente}!
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Tu pedido ha sido procesado exitosamente. Recibirás los detalles de tu orden por correo electrónico.
        </p>

        <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setVistaActiva(VISTAS.TIENDA)}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </section>
  );
}