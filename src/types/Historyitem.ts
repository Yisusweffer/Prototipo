export interface HistoryItem {
  nombre: string;
  tipoPresentacion: string;
  lote: string;
  cantidad: number;
  fechaRetiro: string;
  persona: {
    nombre: string;
    cargo: string;
  };
}