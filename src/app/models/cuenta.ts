export interface Cuenta {
  numero_Cuenta: string;
  cliente_Id: number;
  tipo_Cuenta: number;
  saldo_Inicial: number;
  saldo_Actual: number;
  estado_Cuenta: boolean;
  fecha_Apertura: string;
  nombres_Cliente: string;
}

export interface CuentaResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Cuenta[];
}

export interface CreateAccountDTO  {
  Cliente_Id?: number;
  Tipo_Cuenta: number;
  Saldo_Inicial: number;
}


export interface UpdateAccountDTO  {
  numero_Cuenta: string;
  cliente_Id?: number;
  tipo_Cuenta: number;
  saldo_Inicial: number;
}
