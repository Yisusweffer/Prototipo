import { useState } from 'react';
import { Producto } from '../types/Producto';
import '../styles/productoform.css';

type ProductoFormData = Omit<Producto, 'id'>;

interface ProductoFormProps {
  onAgregarClinico: (producto: ProductoFormData) => void;
  onAgregarComercial: (producto: ProductoFormData) => void;
}

const ProductoForm: React.FC<ProductoFormProps> = ({
  onAgregarClinico,
  onAgregarComercial,
}) => {
  const [producto, setProducto] = useState<ProductoFormData>({
    nombre: '',
    medida: '',
    lote: '',
    cantidad: 0,
    fechaVencimiento: '',
    categoria: 'Medicamento',
    stock: 0,
    tipoPresentacion: '',
    unidadMedida: '',
    ubicacion: '',
    proveedor: '',
    condicionesAlmacenamiento: '',
    codigo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setProducto(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (tipo: 'clinico' | 'comercial') => {
    if (
      !producto.nombre ||
      !producto.medida ||
      !producto.lote ||
      !producto.fechaVencimiento
    ) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    tipo === 'clinico'
      ? onAgregarClinico(producto)
      : onAgregarComercial(producto);

    setProducto({
      nombre: '',
      medida: '',
      lote: '',
      cantidad: 0,
      fechaVencimiento: '',
      categoria: 'Medicamento',
      stock: 0,
      tipoPresentacion: '',
      unidadMedida: '',
      ubicacion: '',
      proveedor: '',
      condicionesAlmacenamiento: '',
      codigo: '',
    });
  };

  return (
    <div className="producto-form">
      <h2>Registrar Producto</h2>

      <input
        name="nombre"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChange={handleChange}
      />

      <input
        name="medida"
        placeholder="Medida / Presentación"
        value={producto.medida}
        onChange={handleChange}
      />

      <input
        name="lote"
        placeholder="Lote"
        value={producto.lote}
        onChange={handleChange}
      />

      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={producto.cantidad}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock mínimo"
        value={producto.stock}
        onChange={handleChange}
      />

      <input
        type="date"
        name="fechaVencimiento"
        value={producto.fechaVencimiento}
        onChange={handleChange}
      />

      <select
        name="categoria"
        value={producto.categoria}
        onChange={handleChange}
      >
        <option value="Medicamento">Medicamento</option>
        <option value="Insumo">Insumo</option>
        <option value="Equipo">Equipo</option>
      </select>

      <input
        name="tipoPresentacion"
        placeholder="Tipo de presentación"
        value={producto.tipoPresentacion}
        onChange={handleChange}
      />

      <input
        name="unidadMedida"
        placeholder="Unidad de medida"
        value={producto.unidadMedida}
        onChange={handleChange}
      />

      <input
        name="ubicacion"
        placeholder="Ubicación"
        value={producto.ubicacion}
        onChange={handleChange}
      />

      <input
        name="proveedor"
        placeholder="Proveedor"
        value={producto.proveedor}
        onChange={handleChange}
      />

      <input
        name="condicionesAlmacenamiento"
        placeholder="Condiciones de almacenamiento"
        value={producto.condicionesAlmacenamiento}
        onChange={handleChange}
      />

      <input
        name="codigo"
        placeholder="Código interno"
        value={producto.codigo}
        onChange={handleChange}
      />

      <div style={{ marginTop: '1rem', display: 'flex', gap: '12px' }}>
        <button onClick={() => handleSubmit('clinico')}>
          Agregar Clínico
        </button>

        <button onClick={() => handleSubmit('comercial')}>
          Agregar Comercial
        </button>
      </div>
    </div>
  );
};

export default ProductoForm;
