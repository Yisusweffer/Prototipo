import React, { useState } from 'react';
import { Producto } from '../types/Producto';
import '../styles/productoslist.css';

interface ListaClinicaProps {
  productos: Producto[];
  onVerDetalle: (producto: Producto) => void;
  onEliminar?: (id: string) => void; // ✅ ahora opcional
}

const ListaClinica: React.FC<ListaClinicaProps> = ({
  productos,
  onVerDetalle,
  onEliminar,
}) => {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-list">
      <h2 className="productos-title">Productos Clínicos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="productos-search"
      />

      {productosFiltrados.length === 0 && (
        <div className="mensaje-vacio">No hay productos registrados.</div>
      )}

      {productosFiltrados.length > 0 && (
        <table className="productos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Presentación</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Fecha vencimiento</th>
              <th>Lote</th>
              <th>Ubicación</th>
              <th>Condiciones</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.map(producto => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.tipoPresentacion || producto.medida}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.unidadMedida || '—'}</td>

                {/* ✅ CORREGIDO */}
                <td>{producto.fechaVencimiento}</td>

                <td>{producto.lote}</td>
                <td>{producto.ubicacion || 'No asignada'}</td>
                <td>{producto.condicionesAlmacenamiento || '—'}</td>

                <td>
                  <button
                    onClick={() => onVerDetalle(producto)}
                    className="productos-details"
                  >
                    Información
                  </button>

                  {onEliminar && (
                    <button
                      onClick={() => onEliminar(producto.id)}
                      className="productos-delete"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaClinica;