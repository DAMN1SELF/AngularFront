import { UpdateAccountDTO } from './../../models/cuenta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from '../../service/cuenta-service';
import Swal from 'sweetalert2';
import { CreateAccountDTO, Cuenta, CuentaResponse } from '../../models/cuenta';

@Component({
  selector: 'app-modulo-cuentas',
  standalone: false,
  templateUrl: './modulo-cuentas.html',
  styleUrl: './modulo-cuentas.css',
})
export class ModuloCuentas implements OnInit {
  cuentas: Cuenta[] = [];
  form!: FormGroup;
  editarCuenta: Cuenta | null = null;
  mostrarModal = false;
  tituloModal = 'Nueva Cuenta';
  cuentaSeleccionada: Cuenta | null = null;

  constructor(private fb: FormBuilder, private cuentaService: CuentaService) {}

  ngOnInit(): void {
    this.initForm();
    this.listarCuentas();
  }

  initForm() {
    this.form = this.fb.group({
      numeroCuenta: ['', [Validators.required]],
      tipoCuenta: ['', [Validators.required]],
      saldoInicial: [0, [Validators.required, Validators.min(0)]],
      cuentaId: ['', [Validators.required]],
    });
  }

  listarCuentas() {
    this.cuentaService.obtenerCuentas().subscribe(
      (resp: CuentaResponse) => {
        if (resp.success) {
          this.cuentas = resp.data;
        } else {
          Swal.fire('Error', resp.message, 'error');
        }
      },
      () => {
        Swal.fire('Error', 'No se pudo obtener cuentas', 'error');
      }
    );
  }

  abrirModal(cuenta?: Cuenta) {
    if (cuenta) {
      this.editarCuenta = cuenta;
      this.tituloModal = 'Editar Cuenta';
      this.form.patchValue(cuenta);
    } else {
      this.editarCuenta = null;
      this.tituloModal = 'Nueva Cuenta';
      this.form.reset({ tipoCuenta: '', saldoInicial: 0, cuentaId: '' });
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.editarCuenta = null;
  }

  guardarCuenta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value;
    if (this.editarCuenta) {
      // this.cuentaService.editCuenta(this.editarCuenta.id, data).subscribe({
      //   next: () => {
      //     Swal.fire('Éxito', 'Cuenta actualizada', 'success');
      //     this.listarCuentas();
      //     this.cerrarModal();
      //   },
      //   error: () => Swal.fire('Error', 'No se pudo actualizar cuenta', 'error')
      // });
    } else {
      this.cuentaService.crearCuenta(data).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cuenta creada', 'success');
          this.listarCuentas();
          this.cerrarModal();
        },
        error: () => Swal.fire('Error', 'No se pudo crear cuenta', 'error'),
      });
    }
  }

  darDeBaja(cuenta: Cuenta) {
    this.cuentaService.desactivarCuenta(cuenta.numero_Cuenta).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cuenta dado de baja', 'success');
        this.listarCuentas();
      },
      error: () =>
        Swal.fire('Error', 'No se pudo dar de baja al cuenta', 'error'),
    });
  }

  darDeAlta(cuenta: Cuenta) {
    this.cuentaService.activarCuenta(cuenta.numero_Cuenta).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cuenta dado de alta', 'success');
        this.listarCuentas();
      },
      error: () =>
        Swal.fire('Error', 'No se pudo dar de alta al cuenta', 'error'),
    });
  }

  eliminarCuenta(cuenta: Cuenta) {
    Swal.fire({
      title: '¿Eliminar cuenta?',
      text: `Se eliminará a ${cuenta.numero_Cuenta}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentaService.eliminarCuenta(cuenta.numero_Cuenta).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Cuenta eliminado', 'success');
            this.listarCuentas();
          },
          error: (err) => {
            const userMessage = err?.error?.message || 'No se pudo eliminar cuenta';
            Swal.fire({
              icon: 'error',
              title: err?.status === 404 ? 'No encontrado' : 'Error',
              text: userMessage,
            });
          }
        });
      }
    });
  }

  onGuardarCuenta(dto: CreateAccountDTO | UpdateAccountDTO) {
    if (this.cuentaSeleccionada) {
      // actualizar
      // this.cuentaService.actualizarCuenta(this.cuentaSeleccionada.numero_Cuenta, dto)
      //   .subscribe(() => {
      //     this.mostrarModal = false;
      //     this.listarCuentas();
      //   });
    } else {
      // crear
      console.log('DTO para crear cuenta:', dto);
      this.cuentaService.crearCuenta(dto as CreateAccountDTO)
        .subscribe(() => {
          this.mostrarModal = false;
          this.listarCuentas();
        });
    }
  }


}
