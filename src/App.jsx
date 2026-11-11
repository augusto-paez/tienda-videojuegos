import { useState } from 'react';
import { VISTAS } from './data/vistas';
import Navbar from './components/layout/Navbar';
import Tienda from './components/views/Tienda';
import Checkout from './components/views/Checkout';
import Confirmacion from './components/views/Confirmacion';
import CarritoModal from './components/CarritoModal';

function App() {
  const [vistaActiva, setVistaActiva] = useState(VISTAS.TIENDA);
  const [nombreCliente, setNombreCliente] = useState('');
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);

  const irAConfirmacion = (nombre) => {
    setNombreCliente(nombre);
    setVistaActiva(VISTAS.CONFIRMACION);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <Navbar
        setVistaActiva={setVistaActiva}
        onAbrirCarrito={() => setIsCarritoAbierto(true)}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {vistaActiva === VISTAS.TIENDA && <Tienda />}
        {vistaActiva === VISTAS.CHECKOUT && (
          <Checkout
            setVistaActiva={setVistaActiva}
            irAConfirmacion={irAConfirmacion}
          />
        )}
        {vistaActiva === VISTAS.CONFIRMACION && (
          <Confirmacion
            nombreCliente={nombreCliente}
            setVistaActiva={setVistaActiva}
          />
        )}
      </main>

      {/* Modal fuera del header para evitar problemas de stacking context */}
      <CarritoModal
        isOpen={isCarritoAbierto}
        onClose={() => setIsCarritoAbierto(false)}
        setVistaActiva={setVistaActiva}
      />
    </div>
  );
}

export default App;
