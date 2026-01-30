import React, { useState } from 'react';

// UI
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Views
import ListaClinica from './components/listaclinica';
import ListaComercial from './components/listacomercial';
import ProductoForm from './components/ProductoForm';
import ProductoDetalle from './components/ProductoDetalle';
import Historial from './components/Historial';
import RegistroPacientes from './components/Hpaciente';
import Login from './components/Login';
import RetiroForm from './components/RetiroForm';
import Estadisticas from './components/Estadisticas'

// Types
import { Producto } from './types/Producto';

import './styles/index.css';
import './styles/modal.css';


type Section =
  | 'clinica'
  | 'comercial'
  | 'agregarProducto'
  | 'historial'
  | 'retirarProducto'
  | 'pacientes';

type ProductoSinId = Omit<Producto, 'id'>;

// --------------------
// RETIROS
// --------------------
export interface RetiroData {
  nombre: string;
  tipoPresentacion: string;
  lote: string;
  cantidad: number;
  fechaRetiro: string;
  paciente?: string;
  destino?: string;
  persona: {
    nombre: string;
    cargo: string;
  };
}

interface HistorialItem {
  nombre: string;
  medida: string;
  lista: string;
  cantidad: number;
  fechaRetiro: string;
  persona: {
    nombre: string;
    apellido: string;
    cargo: string;
  };
}

interface RegistroPaciente {
  producto: string;
  paciente: string;
  medida: string;
  lugar: string;
  serie: string;
  lista: string;
  fechaRetiro: string;
  personaRetiro: string;
  cargo: string;
}

const App: React.FC = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [section, setSection] = useState<Section>('clinica');

  const [productosClinicos, setProductosClinicos] = useState<Producto[]>([]);
  const [productosComerciales, setProductosComerciales] = useState<Producto[]>([]);

  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const [pacientesRegistrados, setPacientesRegistrados] = useState<RegistroPaciente[]>([]);

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  // --------------------
  // AGREGAR PRODUCTOS
  // --------------------
  const agregarClinico = (producto: ProductoSinId) => {
    setProductosClinicos(prev => [
      ...prev,
      { ...producto, id: crypto.randomUUID() },
    ]);
  };

  const agregarComercial = (producto: ProductoSinId) => {
    setProductosComerciales(prev => [
      ...prev,
      { ...producto, id: crypto.randomUUID() },
    ]);
  };

  // --------------------
  // RETIROS
  // --------------------
  const handleRetiro = (data: RetiroData) => {
    setHistorial(prev => [
      ...prev,
      {
        nombre: data.nombre,
        medida: data.tipoPresentacion,
        lista: data.lote,
        cantidad: data.cantidad,
        fechaRetiro: data.fechaRetiro,
        persona: {
          nombre: data.persona.nombre,
          apellido: '',
          cargo: data.persona.cargo,
        },
      },
    ]);

          if (typeof data.paciente === 'string' && data.paciente.trim() !== '') {
        setPacientesRegistrados(prev => [
          ...prev,
          {
            producto: data.nombre,
            paciente: data.paciente as string, // 👈 FIX
            medida: data.tipoPresentacion,
            lugar: data.destino ?? 'No especificado',
            serie: data.lote,
            lista: data.lote,
            fechaRetiro: data.fechaRetiro,
            personaRetiro: data.persona.nombre,
            cargo: data.persona.cargo,
          },
        ]);
      }

    const actualizar = (lista: Producto[]) =>
      lista.map(p =>
        p.nombre === data.nombre && p.lote === data.lote
          ? { ...p, cantidad: Math.max(0, p.cantidad - data.cantidad) }
          : p
      );

    if (productosClinicos.some(p => p.nombre === data.nombre && p.lote === data.lote)) {
      setProductosClinicos(actualizar);
    } else {
      setProductosComerciales(actualizar);
    }
  };

  // --------------------
  // NAVEGACIÓN
  // --------------------
  const handleSelectSection = (value: string) => {
    setSection(value as Section);
  };

  // --------------------
  // VISTAS
  // --------------------
  const renderContent = () => {
    switch (section) {
      case 'clinica':
        return <ListaClinica productos={productosClinicos} onVerDetalle={setProductoDetalle} />;
      case 'comercial':
        return <ListaComercial productos={productosComerciales} onVerDetalle={setProductoDetalle} />;
      case 'agregarProducto':
        return (
          <ProductoForm
            onAgregarClinico={agregarClinico}
            onAgregarComercial={agregarComercial}
          />
        );
      case 'retirarProducto':
        return (
          <RetiroForm
            productos={[...productosClinicos, ...productosComerciales]}
            onRetiro={handleRetiro}
          />
        );
      case 'historial':
        return <Historial historial={historial} />;
      case 'pacientes':
        return <RegistroPacientes pacientes={pacientesRegistrados} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSelect={handleSelectSection} onLogout={() => setUsuario(null)} />
      <main style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: 40 }}>{renderContent()}</div>
      </main>

      {productoDetalle && (
        <ProductoDetalle
          producto={productoDetalle}
          onClose={() => setProductoDetalle(null)}
        />
      )}
    </div>
  );
};

export default App;

//Pagina supervisor