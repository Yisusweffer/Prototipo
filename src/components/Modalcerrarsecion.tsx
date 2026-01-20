import React from 'react';
import ReactDOM from 'react-dom';

interface ModalCerrarSesionProps {
  visible: boolean;
  username: string;
  password: string;
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalCerrarSesion: React.FC<ModalCerrarSesionProps> = ({
  visible,
  username,
  password,
  setUsername,
  setPassword,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Confirmar cierre de sesión</h3>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <button onClick={onCancel} style={cancelBtn}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={confirmBtn}>
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalCerrarSesion;

/* ====== ESTILOS ====== */

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const modalStyle: React.CSSProperties = {
  background: '#fff',
  padding: 24,
  borderRadius: 8,
  width: 320,
  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 8,
  marginBottom: 10,
};

const confirmBtn: React.CSSProperties = {
  background: '#d32f2f',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: 4,
  marginLeft: 8,
  cursor: 'pointer',
};

const cancelBtn: React.CSSProperties = {
  background: '#ccc',
  border: 'none',
  padding: '8px 14px',
  borderRadius: 4,
  cursor: 'pointer',
};
