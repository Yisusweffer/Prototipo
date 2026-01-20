export interface Producto {
  id: string;                 // Identificador único
  nombre: string;            // Nombre del producto (comercial y/o genérico)
  medida: string;            // Presentación/Medida (ej. 500 mg, 5 ml, Tableta, Ampolla)
  lote: string;              // Número de lote o serie
  cantidad: number;          // Cantidad en inventario
  fechaVencimiento: string;  // Fecha de vencimiento (YYYY-MM-DD)
  categoria: string;         // Categoría (Medicamento, Insumo, Equipo)
  stock: number;            // Cantidad mínima en stock
  tipoPresentacion?: string; // Tipo y presentación (Tableta, Frasco, Ampolla, Inyección, Parche, etc.)
  serie?: string;          // Número de serie para equipos
  
  // Propiedades opcionales
  unidadMedida?: string;     // Unidad de medida específica (mg, ml, unidades)
  ubicacion?: string;        // Ubicación en almacén
  proveedor?: string;        // Proveedor principal
  condicionesAlmacenamiento?: string; // Condiciones de almacenamiento
  codigo?: string;           // Código adicional
}