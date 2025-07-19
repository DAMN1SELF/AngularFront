
export interface Venta {
  fecha_Registro: Date;          // Fecha en formato ISO (YYYY-MM-DDTHH:mm:ss)
  sub_Total: number;
  igv_Total: number;
  total_Total: number;
  detalles: DetalleVenta[];
}

export interface DetalleVenta {
  codigo_item: number;
  nombre_item: string;
  cantidad_item: number;
  precio_item: number;
  subtotal_item: number;
  igv_item: number;
  total_item: number;
}
