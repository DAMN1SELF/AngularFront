import { Component, OnInit } from '@angular/core';
import { Alumno, AlumnoDTO } from '../../models/alumno';
import { AlumnoService } from '../../service/alumno-service';

import Modal from 'bootstrap/js/dist/modal';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-component',
  standalone: false,
  templateUrl: './alumno-component.html',
  styleUrl: './alumno-component.css'
})


export class AlumnoComponent implements OnInit {

  ciclos = [1, 2, 3, 4, 5, 6];
  estado = [
    { idEstado: 'A', nombre: 'Activo' },
    { idEstado: 'I', nombre: 'Inactivo' }
  ];
  alumnoForm: Alumno = new Alumno();

  modalModo: 'agregar' | 'editar' = 'agregar';
  modalRef: any;
  idEstadoSeleccionado: string = '';

  alumnos: Alumno[] = [];

  constructor(
    private alumnoservice: AlumnoService,
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarAlumnos();

  }


  abrirModal(modo: 'agregar' | 'editar', alumno?: Alumno) {
    this.modalModo = modo;

    if (modo === 'editar' && alumno) {
      this.idEstadoSeleccionado = alumno.estado;
      this.alumnoForm = { ...alumno };
    } else {
      this.alumnoForm = new Alumno();
      this.idEstadoSeleccionado = 'A';
    }

    const modalElement = document.getElementById('alumnoModal');
    this.modalRef = new Modal(modalElement);
    this.modalRef.show();
  }
  guardarAlumno() {
    if (!this.alumnoForm.nombre || !this.alumnoForm.apellido || !this.alumnoForm.dni || !this.alumnoForm.ciclo ||
      !this.idEstadoSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: '❌ Por favor completa todos los campos obligatorios.'
      });

      return;
    }

    var NombreUsuario = this.loginService.getUsuarioDelToken();
    if (!NombreUsuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: '⚠️ Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
      });
      this.modalRef.hide();
      this.router.navigate(['/login']);
      return;
    }
    const dto: AlumnoDTO = {
      nombreAlumno: this.alumnoForm.nombre,
      apellidoAlumno: this.alumnoForm.apellido,
      dniAlumno: this.alumnoForm.dni,
      cicloAlumno: this.alumnoForm.ciclo,
      estadoAlumno: this.idEstadoSeleccionado,
      nombreUsuario: NombreUsuario
    };

    if (this.modalModo === 'agregar') {
      this.agregarAlumnoBackend(dto);
    } else {
      this.editarAlumnoBackend(this.alumnoForm.idAlumno, dto);
    }

    this.modalRef.hide();
  }

  agregarAlumnoBackend(dto: AlumnoDTO) {
    this.alumnoservice.agregarAlumno(dto).subscribe({
      next: () => {
        Swal.fire('✅ Alumno agregada', '', 'success');
        this.listarAlumnos();
        this.modalRef.hide();
      },
      error: () => {
        Swal.fire('❌ Error al agregar alumno', 'Inténtalo nuevamente.', 'error');
      }
    });
  }

  editarAlumnoBackend(id: number, dto: AlumnoDTO) {
    this.alumnoservice.editarAlumno(id, dto).subscribe({
      next: () => {
        Swal.fire('✅ Alumno editada', '', 'success');
        this.listarAlumnos();
        this.modalRef.hide();
      },
      error: () => {
        Swal.fire('❌ Error al editar alumno', 'Inténtalo nuevamente.', 'error');
      }
    });
  }

  eliminarAlumno(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta alumno?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.alumnoservice.eliminarAlumno(id).subscribe({
          next: () => {
            Swal.fire('✅ Alumno eliminada', '', 'success');
            this.listarAlumnos();
          },
          error: () => {
            Swal.fire('❌ Error al eliminar alumno', 'Inténtalo nuevamente.', 'error');
          }
        });
      }
    });
  }


  listarAlumnos() {
    this.alumnoservice.listarAlumnoes().subscribe({
      next: (data) => {
        console.log('🎵 Lista de alumnoes obtenida:', data);
        this.alumnos = data;
      },
      error: (err) => {
        console.error('❌ Error al obtener alumnoes:', err);
      }
    });
  }
  soloNumeros(event: any) {
    const valor = event.target.value;
    event.target.value = valor.replace(/\D/g, '');
    this.alumnoForm.dni = event.target.value;
  }

}
