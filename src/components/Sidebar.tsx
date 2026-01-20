import React, { useState } from 'react';
import '../styles/sidebar.css'; // Importa el archivo CSS para los estilos

interface SidebarProps {
  onSelect: (
    section:
      | 'clinica'
      | 'comercial'
      | 'agregarProducto'
      | 'registro'
      | 'historial'
      | 'pacientes' // Cambiado de 'paciente' a 'pacientes' para consistencia
      | 'inventario'
      | 'retirarProducto'
  ) => void;
  onLogout: () => void; // Función para manejar el cierre de sesión.
}

/**
 * Sidebar: Menú lateral de navegación.
 * Permite seleccionar entre registro/control, inventario, historial, agregar y retirar insumos.
 * Llama a la función onSelect con la sección elegida.
 */

const Sidebar: React.FC<SidebarProps> = ({ onSelect, onLogout }) => {
  const [showInventarioList, setShowInventarioList] = useState(false);
  const [showRegistroList, setShowRegistroList] = useState(false);

  // Muestra/oculta el submenú de registro
  const handleRegistroClick = () => {
    setShowRegistroList((prev) => !prev);
  };

  // Muestra/oculta el submenú de inventario
  const handleInventarioClick = () => {
    setShowInventarioList((prev) => !prev);
  };

  return (
    <div className="sidebar">
      {/* Botón para mostrar el submenú de registro y control */}
      <button className="sidebar-button" onClick={handleRegistroClick}>
        Registro y Control
      </button>
      {showRegistroList && (
        <div style={{ marginLeft: '1rem', marginTop: '0.3rem' }}>
          {/* Botón para agregar insumo */}
          <button className="sidebar-button" onClick={() => onSelect('agregarProducto')}>
            Agregar Insumo
          </button>
          {/* Botón para retirar insumo (muestra el formulario de retiro) */}
          <button className="sidebar-button" onClick={() => onSelect('retirarProducto')}>
            Retirar Insumo
          </button>
          {/* Botón para ver el historial de mercancía */}
          <button className="sidebar-button" onClick={() => onSelect('historial')}>
            Historial de Mercancía
          </button>
          {/* Botón para ver el historial de pacientes */}
          <button className="sidebar-button" onClick={() => onSelect('pacientes')}>
            Historial de Pacientes
          </button>
        </div>
      )}
      
      {/* Botón para mostrar el submenú de inventario */}
      <button className="sidebar-button" onClick={handleInventarioClick}>
        Inventario
      </button>
      {showInventarioList && (
        <div style={{ marginLeft: '1rem', marginTop: '0.3rem' }}>
          {/* Botón para ver la lista clínica */}
          <button className="sidebar-button" onClick={() => onSelect('clinica')}>
            Interno
          </button>
          {/* Botón para ver la lista comercial */}
          <button className="sidebar-button" onClick={() => onSelect('comercial')}>
            Paciente
          </button>
        </div>
      )}
      
      {/* Botón para cerrar sesión */}
      <button className="sidebar-button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;
