

export class Alumno {

    idAlumno!: number;
    nombre!: string;
    apellido!: string;
    dni!: string;
    ciclo!: number;
    estado!: string;
    nombreUsuario!: string;
    fecha!: Date;
}
export class AlumnoDTO {

    nombreAlumno!: string;
    apellidoAlumno!: string;
    dniAlumno!: string;
    cicloAlumno!: Number;
    estadoAlumno!: string;
    nombreUsuario!: string;
}

export interface AlumnoResponse {
  fecha: string;
  mensaje: string;
  status:string;
  alumnos: Alumno[];
}
