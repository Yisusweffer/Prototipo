import React, { useState } from 'react';
import { Producto } from '../types/Producto';

interface InventarioProps {
  productos: Producto[];
}

const Inventario: React.FC<InventarioProps> = ({ productos }) => {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const isBajoStock = (cantidad: number) => cantidad <= 5;

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>📦 Inventario de Farmacia</h2>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: 8,
          width: '100%',
          maxWidth: 320,
          marginBottom: 20,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />

      {/* Tabla */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#102552', color: '#fff' }}>
              <th style={thStyle}>Producto</th>
              <th style={thStyle}>Presentación</th>
              <th style={thStyle}>Lote</th>
              <th style={thStyle}>Vencimiento</th>
              <th style={thStyle}>Cantidad</th>
              <th style={thStyle}>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 16 }}>
                  No hay productos registrados
                </td>
              </tr>
            )}

            {productosFiltrados.map((producto, index) => (
              <tr
                key={index}
                style={{
                  background: isBajoStock(producto.cantidad)
                    ? '#fff3cd'
                    : '#ffffff'
                }}
              >
                <td style={tdStyle}>{producto.nombre}</td>
                <td style={tdStyle}>{producto.medida}</td>
                <td style={tdStyle}>{producto.serie}</td>
                <td style={tdStyle}>{producto.fechaVencimiento}</td>
                <td style={{
                  ...tdStyle,
                  color: isBajoStock(producto.cantidad) ? '#d32f2f' : '#000',
                  fontWeight: isBajoStock(producto.cantidad) ? 'bold' : 'normal'
                }}>
                  {producto.cantidad}
                </td>
                <td style={tdStyle}>{producto.ubicacion || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        🔴 Stock bajo (≤ 5 unidades)
      </p>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: 10,
  textAlign: 'left',
  fontWeight: 600
};

const tdStyle: React.CSSProperties = {
  padding: 10,
  borderBottom: '1px solid #ddd'
};

export default Inventario;