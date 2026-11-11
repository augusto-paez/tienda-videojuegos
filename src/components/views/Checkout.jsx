import { useForm } from 'react-hook-form';
import { useCarritoContext } from '../../context/CarritoContext';
import { formatearPrecio } from '../../utils/formato';
import { VISTAS } from '../../data/vistas';

export default function Checkout({ setVistaActiva, irAConfirmacion }) {
  const { carrito, total, vaciar } = useCarritoContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      metodoEnvio: 'domicilio',
      notas: '',
    },
  });

  // Observa el método de envío para renderizar condicionalmente el campo de dirección
  const metodoEnvio = watch('metodoEnvio');

  const onSubmit = (datos) => {
    vaciar();
    irAConfirmacion(datos.nombre);
  };

  // Protección: si el carrito está vacío, no se puede continuar en checkout
  if (carrito.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          No hay productos en el carrito
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Agregá algún juego antes de realizar el checkout.
        </p>
        <button
          type="button"
          onClick={() => setVistaActiva(VISTAS.TIENDA)}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Finalizar Compra
        </h2>
        <button
          type="button"
          onClick={() => setVistaActiva(VISTAS.TIENDA)}
          className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← Volver al catálogo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Formulario de Checkout */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-800"
          >
            {/* 1. Nombre completo */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Nombre completo *
              </label>
              <input
                id="nombre"
                type="text"
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                })}
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="Ej. Lucas García"
              />
              {errors.nombre && (
                <p id="nombre-error" className="mt-1 text-xs text-red-500">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            {/* 2. Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Correo electrónico *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email no válido',
                  },
                })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 3. Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Teléfono *
              </label>
              <input
                id="telefono"
                type="text"
                {...register('telefono', {
                  required: 'El teléfono es obligatorio',
                  pattern: { value: /^\d+$/, message: 'Solo números' },
                  minLength: { value: 8, message: 'Mínimo 8 dígitos' },
                })}
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="1144332211"
              />
              {errors.telefono && (
                <p id="telefono-error" className="mt-1 text-xs text-red-500">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            {/* 4. Método de envío (radio buttons dentro de fieldset) */}
            <fieldset className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-700">
              <legend className="px-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Método de envío *
              </legend>
              <div className="mt-2 flex gap-6 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="domicilio"
                    {...register('metodoEnvio', { required: true })}
                    className="accent-indigo-600"
                  />
                  <span>Envío a domicilio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="local"
                    {...register('metodoEnvio', { required: true })}
                    className="accent-indigo-600"
                  />
                  <span>Retiro en el local</span>
                </label>
              </div>
            </fieldset>

            {/* 5. Dirección (Condicional con watch) */}
            {metodoEnvio === 'domicilio' && (
              <div>
                <label
                  htmlFor="direccion"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Dirección de entrega *
                </label>
                <input
                  id="direccion"
                  type="text"
                  {...register('direccion', {
                    required: 'La dirección es obligatoria',
                  })}
                  aria-invalid={!!errors.direccion}
                  aria-describedby={errors.direccion ? 'direccion-error' : undefined}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  placeholder="Calle, número, piso, depto"
                />
                {errors.direccion && (
                  <p id="direccion-error" className="mt-1 text-xs text-red-500">
                    {errors.direccion.message}
                  </p>
                )}
              </div>
            )}

            {/* 6. Notas adicionales */}
            <div>
              <label
                htmlFor="notas"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Notas del pedido (opcional)
              </label>
              <textarea
                id="notas"
                rows="2"
                {...register('notas', {
                  maxLength: {
                    value: 200,
                    message: 'Máximo 200 caracteres',
                  },
                })}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="Instrucciones para la entrega..."
              />
              {errors.notas && (
                <p className="mt-1 text-xs text-red-500">{errors.notas.message}</p>
              )}
            </div>

            {/* 7. Términos y condiciones */}
            <div>
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer dark:text-slate-300">
                <input
                  id="terminos"
                  type="checkbox"
                  {...register('terminos', {
                    required: 'Debés aceptar los términos',
                  })}
                  aria-invalid={!!errors.terminos}
                  aria-describedby={errors.terminos ? 'terminos-error' : undefined}
                  className="mt-0.5 rounded-sm accent-indigo-600"
                />
                <span>Acepto los términos y condiciones de compra</span>
              </label>
              {errors.terminos && (
                <p id="terminos-error" className="mt-1 text-xs text-red-500">
                  {errors.terminos.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
            >
              Confirmar pedido
            </button>
          </form>
        </div>

        {/* Resumen del pedido (desde CarritoContext) */}
        <div className="md:col-span-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Resumen del Pedido
            </h3>

            <ul className="mt-4 divide-y divide-slate-100 max-h-72 overflow-y-auto dark:divide-slate-700">
              {carrito.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      {item.cantidad}x
                    </span>
                    <span className="truncate text-slate-800 dark:text-slate-200">
                      {item.nombre}
                    </span>
                  </div>
                  <span className="font-medium text-slate-900 shrink-0 dark:text-white">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
                <span>Total a pagar:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {formatearPrecio(total)}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}