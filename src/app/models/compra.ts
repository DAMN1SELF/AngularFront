
export interface Compra {
  fecha_Registro: Date;
  sub_Total: number;
  igv_Total: number;
  total_Total: number;
  detalles: DetalleCompra[];
}
export interface DetalleCompra {
  codigo_item: number;
  nombre_item: string;
  cantidad_item: number;
  precio_item: number;
  subtotal_item: number;
  igv_item: number;
  total_item: number;
}
