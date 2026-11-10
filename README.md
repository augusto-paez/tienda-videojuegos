# Tienda Videojuegos

🔗 **Demo en vivo:** https://tienda-video-juegos.netlify.app

## Qué es
Tienda Videojuegos es una SPA de comercio electrónico construida con React, Tailwind CSS v4 y React Hook Form. Permite recorrer un catálogo de 20 videojuegos, filtrar por nombre en tiempo real, gestionar un carrito con límite de stock y persistencia en localStorage, y completar una orden mediante un formulario de checkout validado.

## Cómo correrlo
```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm run dev
```

## Mis contextos

* **`CarritoContext`**: Guarda el estado del array de items del carrito y expone las acciones para agregar productos, modificar cantidades (+1 / -1), eliminar y vaciar, junto a los valores calculados de total y cantidad de unidades. Lo consumen el `Navbar` (para el contador del badge), `CarritoModal` (para listar y editar cantidades), `ProductoCard` (para el botón de agregar y control de stock) y `Checkout` (para el resumen del pedido y vaciado post-compra). Es global porque el estado de la compra debe estar accesible de forma sincronizada en toda la navegación.
* **`ThemeContext`**: Guarda la preferencia del tema visual (`'dark'` o `'light'`), persistida en `localStorage` con la clave `'tema'`, sincronizando la clase `dark` en el elemento raíz `<html>` y proveyendo la función `toggleTema`. Lo consumen el `Navbar` y la estructura general de la aplicación. Es global porque el modo oscuro afecta el diseño de todas las vistas y componentes.

## Mis hooks

* **`useCarrito`**: Encapsula la lógica de negocio del carrito, garantizando inmutabilidad estricta (mediante `map`, `spread` y `filter`), control de stock máximo y persistencia en `localStorage`. Devuelve `{ carrito, cantidadTotal, total, estaEnElCarrito, agregar, cambiarCantidad, quitar, vaciar }`.
* **`useLocalStorage`**: Sincroniza un estado de React de forma genérica con `localStorage`, gestionando la lectura inicial, el parseo seguro y la persistencia ante recargas (F5). Devuelve `[storedValue, setStoredValue]`.
* **`useToggle`**: Maneja el toggle de valores booleanos de interfaz. Devuelve `[value, toggle, setTrue, setFalse]`.
* **`useCarritoContext`**: Hook consumidor que expone el valor de `CarritoContext` e implementa una guardia que lanza una excepción si se utiliza fuera del `<CarritoProvider>`.
* **`useThemeContext`**: Hook consumidor que expone el valor de `ThemeContext` e implementa una guardia que lanza una excepción si se utiliza fuera del `<ThemeProvider>`.

## Decisiones de estado

* **Buscador de juegos:** vive como un `useState` local dentro de `views/Tienda.jsx`. No se ubicó en un contexto porque ninguna otra vista ni componente fuera de la tienda necesita conocer el término buscado.
* **Apertura del modal del carrito:** vive como un `useState` local dentro de `Navbar.jsx`.
* **Totales del carrito:** tanto `total` como `cantidadTotal` se calculan exclusivamente como valores derivados mediante `reduce` dentro de `useCarrito.js`. No son `useState` para evitar estados desincronizados o redundantes.
* **Campos del formulario:** son controlados al 100% por `react-hook-form` con `register` y `watch`, sin `useState` individuales ni `onChange` manuales.

## Prop drilling: antes y después

* **Antes de Context:** era necesario pasar el array del carrito, funciones de mutación y contadores a través de múltiples niveles: desde `App` hacia `Navbar`, `Tienda`, `ProductoList`, `ProductoCard` y el modal, acumulando más de 5 props que atravesaban componentes intermedios sin que estos las usaran.
* **Después de Context:** cero prop drilling. Ningún componente recibe props que no utilice directamente. Cada elemento consume lo que necesita directo de su respectivo hook de contexto, y `App.jsx` solo conserva la responsabilidad de alternar la vista activa.

## Qué generé con IA

Se utilizó asistencia de IA como soporte de desarrollo para:
* Estructuración inicial del proyecto con Vite y Tailwind CSS v4.
* Armado del catálogo de 20 videojuegos con datos consistentes (imágenes, descripciones, categorías y stocks).
* Patrones de accesibilidad (`aria-invalid`, `aria-describedby` y etiquetas semánticas de formulario).
* **Correcciones y validaciones a mano:** se garantizó la inmutabilidad funcional en las operaciones de carrito, se implementó el envío forzado de `null` en el campo dirección cuando el método de envío es retiro en local, se verificó la ausencia total de hooks prohibidos (`useMemo`, `useCallback`, `useReducer`), y se comprobó que todos los precios utilicen la función centralizada `formatearPrecio`.