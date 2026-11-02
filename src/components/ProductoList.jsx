import ProductoCard from './ProductoCard';

export default function ProductoList({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 dark:text-slate-400">
        <p className="text-lg font-medium">No se encontraron videojuegos</p>
        <p className="text-sm">Probá con otro término de búsqueda.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </section>
  );
}