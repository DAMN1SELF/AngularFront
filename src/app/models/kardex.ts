export interface ProductoStock {
  id_producto: number;
  nombre_producto: string;
  stock_actual: number;
  costo: number;
  precio_venta: number;
}

export interface MovimientoDetalle {
  tipoMovimiento: number;   // 1=Entrada, 2=Salida
  fechaRegistro: string;
  cantidad: number;
}

export interface MovimientoDetalleResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: MovimientoDetalle[];
}
