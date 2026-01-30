import React from 'react';
import { Producto } from '../types/Producto';

interface ListaComercialProps {
  productos: Producto[];
  onVerDetalle: (producto: Producto) => void;
  onEliminar?: (index: number) => void; // ✅ OPCIONAL
}

const ListaComercial: React.FC<ListaComercialProps> = ({
  productos,
  onVerDetalle,
  onEliminar,
}) => {
  return (
    <div className="lista-comercial">
      <h2>Inventario de Paciente</h2>

      {productos.length === 0 ? (
      <div className="mensaje-vacio">No hay productos registrados.</div>
      ) : (
        <table className="productos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Medida</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Lote</th>
              <th>Vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto, i) => (
              <tr key={producto.id ?? i}>
                <td>{producto.nombre}</td>
                <td>{producto.medida}</td>
                <td>{producto.categoria}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.lote}</td>
                <td>{producto.fechaVencimiento}</td>

                <td className="acciones">
                  {/* Ver detalle */}
                  <button
                    onClick={() => onVerDetalle(producto)}
                    className="productos-ver"
                  >
                    Ver
                  </button>

                  {/* 🔥 AQUÍ VA EXACTAMENTE LO QUE PREGUNTASTE */}
                  {onEliminar && (
                    <button
                      onClick={() => onEliminar(i)}
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

export default ListaComercial;