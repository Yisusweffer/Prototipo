import React from 'react';
import '../styles/productoslist.css';

export interface HistorialItem {
  nombre: string;
  cantidadMedida?: number;
  unidadMedida?: string;
  lista: string;
  fechaRetiro: string;
  persona: {
    nombre: string;
    apellido?: string;
    cargo: string;
  };
}

interface HistorialProps {
  historial: HistorialItem[];
}

const Historial: React.FC<HistorialProps> = ({ historial }) => {
  if (historial.length === 0) {
    return (
      <div className="productos-list">
        <h2 className="productos-title">Historial de Mercancía</h2>
        <p>No hay movimientos registrados.</p>
      </div>
    );
  }

  return (
    <div className="productos-list">
      <h2 className="productos-title">Historial de Mercancía</h2>

      <table className="productos-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad / Medida</th>
            <th>Lista</th>
            <th>Fecha de Retiro</th>
            <th>Persona que Retiró</th>
            <th>Cargo</th>
          </tr>
        </thead>

        <tbody>
          {historial.map((item, i) => (
            <tr key={i}>
              <td>{item.nombre}</td>

              <td>
                {item.cantidadMedida
                  ? `${item.cantidadMedida} ${item.unidadMedida ?? ''}`
                  : item.unidadMedida ?? '-'}
              </td>

              <td>{item.lista}</td>

              <td>{item.fechaRetiro}</td>

              <td>
                {item.persona.nombre}
                {item.persona.apellido
                  ? ` ${item.persona.apellido}`
                  : ''}
              </td>

              <td className={`role-badge ${item.persona.cargo.toLowerCase()}`}>
                {item.persona.cargo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .role-badge {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 0.85em;
          background: #e3f2fd;
          color: #1565c0;
        }
      `}</style>
    </div>
  );
};

export default Historial;