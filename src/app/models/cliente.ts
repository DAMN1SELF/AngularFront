export interface Cliente {
  codigoCliente: number;
  nombresCliente: string;
  generoCliente?: string;
  edadCliente?: number;
  identificacionCliente?: string;
  direccionCliente?: string;
  telefonoCliente?: string;
  estadoCliente: boolean;
  fechaRegistroCliente: string;
}

export interface ClienteResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Cliente[];
}

export interface CreateClientDTO {
  nombresCliente: string;
  generoCliente: string;
  edadCliente: number;
  identificacionCliente: string;
  direccionCliente: string;
  telefonoCliente: string;
  contrasenaHashCliente: string;
}


export interface UpdateClientDTO {

  codigoCliente: number;
  nombresCliente: string;
  generoCliente?: string;
  edadCliente?: number;
  identificacionCliente?: string;
  direccionCliente?: string;
  telefonoCliente?: string;
  contrasenaHashCliente?: string;
}

export interface PatchClientDTO {
  codigoCliente?: number;
  nombresCliente?: string;
  generoCliente?: string;
  edadCliente?: number;
  identificacionCliente?: string;
  direccionCliente?: string;
  telefonoCliente?: string;
  contrasenaHashCliente?: string;
  estadoCliente?: boolean;
}
