import Modal from './ui/Modal';
import CarritoItem from './CarritoItem';
import { useCarritoContext } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/formato';
import { VISTAS } from '../data/vistas';

export default function CarritoModal({ isOpen, onClose, setVistaActiva }) {
  const { carrito, total, vaciar } = useCarritoContext();

  const handleIrAlCheckout = () => {
    onClose();
    setVistaActiva(VISTAS.CHECKOUT);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} titulo="Tu Carrito">
      {carrito.length === 0 ? (
        <div className="py-8 text-center text-slate-500 dark:text-slate-400">
          <p className="text-lg">Tu carrito está vacío</p>
          <p className="text-sm mt-1">¡Explorá el catálogo y sumá tus juegos favoritos!</p>
        </div>
      ) : (
        <div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
            {carrito.map((item) => (
              <CarritoItem key={item.id} item={item} />
            ))}
          </ul>

          <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>Total:</span>
              <span>{formatearPrecio(total)}</span>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={vaciar}
                className="w-1/3 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Vaciar
              </button>
              <button
                type="button"
                onClick={handleIrAlCheckout}
                disabled={carrito.length === 0}
                className="w-2/3 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
              >
                Ir al checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}