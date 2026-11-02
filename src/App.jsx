import { useState } from 'react';
import { VISTAS } from './data/vistas';
import Navbar from './components/layout/Navbar';
import Tienda from './components/views/Tienda';
import Checkout from './components/views/Checkout';
import Confirmacion from './components/views/Confirmacion';

function App() {
  const [vistaActiva, setVistaActiva] = useState(VISTAS.TIENDA);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <Navbar setVistaActiva={setVistaActiva} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {vistaActiva === VISTAS.TIENDA && <Tienda />}
        {vistaActiva === VISTAS.CHECKOUT && <Checkout setVistaActiva={setVistaActiva} />}
        {vistaActiva === VISTAS.CONFIRMACION && <Confirmacion setVistaActiva={setVistaActiva} />}
      </main>
    </div>
  );
}

export default App;