import React, { useState, useMemo } from 'react';
import '../styles/productoslist.css';

export interface RegistroPaciente {
  producto: string;
  paciente: string;
  medida?: string;
  lugar?: string;
  serie?: string;
  lista: string;
  fechaRetiro: string;
  personaRetiro: string;
  cargo: string;
}

interface PacientesProps {
  pacientes: RegistroPaciente[];
}

type ColumnaPaciente = keyof RegistroPaciente;

const Pacientes: React.FC<PacientesProps> = ({ pacientes }) => {
  const [filtro, setFiltro] = useState('');
  const [columnaOrden, setColumnaOrden] = useState<ColumnaPaciente | null>(null);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const pacientesFiltrados = useMemo(() => {
    let resultado = [...pacientes];

    if (filtro.trim()) {
      const busqueda = filtro.toLowerCase();
      resultado = resultado.filter(p =>
        Object.values(p).some(valor =>
          valor?.toString().toLowerCase().includes(busqueda)
        )
      );
    }

    if (columnaOrden) {
      resultado.sort((a, b) => {
        const valorA = a[columnaOrden] ?? '';
        const valorB = b[columnaOrden] ?? '';

        if (valorA < valorB) return ordenAscendente ? -1 : 1;
        if (valorA > valorB) return ordenAscendente ? 1 : -1;
        return 0;
      });
    }

    return resultado;
  }, [pacientes, filtro, columnaOrden, ordenAscendente]);

  const manejarOrdenar = (columna: ColumnaPaciente) => {
    if (columnaOrden === columna) {
      setOrdenAscendente(prev => !prev);
    } else {
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  const obtenerIconoOrden = (columna: ColumnaPaciente) =>
    columnaOrden !== columna ? '↕️' : ordenAscendente ? '↑' : '↓';

  const formatearFecha = (fecha: string) => {
    const f = new Date(fecha);
    return isNaN(f.getTime())
      ? fecha
      : f.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  };

  if (pacientes.length === 0) {
    return (
      <div className="productos-list">
        <h2 className="productos-title">Registro de Retiro</h2>
        <div className="mensaje-vacio">No hay pacientes registrados.</div>
      </div>
    );
  }

  return (
    <div className="productos-list">
      <h2 className="productos-title">Registro de Pacientes</h2>

      <input
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="productos-search"
      />

      <table className="productos-table">
        <thead>
          <tr>
            {[
              { key: 'producto', label: 'Producto' },
              { key: 'paciente', label: 'Paciente' },
              { key: 'medida', label: 'Medida' },
              { key: 'lugar', label: 'Lugar' },
              { key: 'serie', label: 'Serie' },
              { key: 'lista', label: 'Lista' },
              { key: 'fechaRetiro', label: 'Fecha' },
              { key: 'personaRetiro', label: 'Retiró' },
              { key: 'cargo', label: 'Cargo' },
            ].map(col => (
              <th
                key={col.key}
                onClick={() => manejarOrdenar(col.key as ColumnaPaciente)}
                className="sortable-header"
              >
                {col.label} {obtenerIconoOrden(col.key as ColumnaPaciente)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {pacientesFiltrados.map((p, i) => (
            <tr key={i} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{p.producto}</td>
              <td className="patient-name">{p.paciente}</td>
              <td>{p.medida ?? '-'}</td>
              <td>{p.lugar ?? '-'}</td>
              <td className="lot-badge">{p.serie ?? '-'}</td>
              <td>{p.lista}</td>
              <td className="date-cell">{formatearFecha(p.fechaRetiro)}</td>
              <td>{p.personaRetiro}</td>
              <td className={`role-badge ${p.cargo.toLowerCase()}`}>
                {p.cargo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .sortable-header { cursor: pointer; user-select: none; }
        .even-row { background: #fafafa; }
        .odd-row { background: #fff; }
        .patient-name { font-weight: 600; }
        .lot-badge {
          background: #e8f5e9;
          padding: 2px 8px;
          border-radius: 12px;
          font-family: monospace;
        }
        .role-badge {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 0.85em;
        }
        .date-cell { font-size: 0.9em; color: #666; }
      `}</style>
    </div>
  );
};

export default Pacientes;
