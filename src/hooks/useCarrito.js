import { useLocalStorage } from './useLocalStorage';

export function useCarrito() {
  const [carrito, setCarrito] = useLocalStorage('carrito', []);

  // Total acumulado en pesos argentinos
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Cantidad total de unidades de todos los productos
  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  // Verifica si un producto ya se encuentra en el carrito
  const estaEnElCarrito = (id) => {
    return carrito.some((item) => item.id === id);
  };

  // Agrega un producto: incrementa si ya existe (hasta agotar stock) o lo crea con cantidad 1
  const agregar = (producto) => {
    if (!producto || producto.stock <= 0) return;

    setCarrito((prev) => {
      const yaEsta = prev.find((item) => item.id === producto.id);
      if (yaEsta) {
        // No superar el stock disponible
        if (yaEsta.cantidad >= producto.stock) return prev;
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Modifica la cantidad con delta (+1 o -1); si llega a 0, se elimina del array
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          const nuevaCantidad = item.cantidad + delta;
          // Evita superar el stock al sumar
          if (delta > 0 && nuevaCantidad > item.stock) {
            return item;
          }

          return { ...item, cantidad: nuevaCantidad };
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  // Elimina un item específico por su id
  const quitar = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Vacía el carrito completo
  const vaciar = () => {
    setCarrito([]);
  };

  return {
    carrito,
    cantidadTotal,
    total,
    estaEnElCarrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  };
}