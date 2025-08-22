import {
  Cliente,
  ClienteResponse,
  CreateClientDTO,
  UpdateClientDTO,
} from './../../models/cliente';
import { ClienteService } from './../../service/cliente-service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modulo-clientes',
  standalone: false,
  templateUrl: './modulo-clientes.html',
  styleUrls: ['./modulo-clientes.css'],
})
export class ModuloClientes implements OnInit {
  clientes: Cliente[] = [];
  cargando = true;
  mostrarModal = false;

  clienteSeleccionado: UpdateClientDTO | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.cargando = true;

    this.clienteService.obtenerClientes().subscribe({
      next: (resp: ClienteResponse) => {
        if (resp.success) {
          this.clientes = resp.data;
        } else {
          Swal.fire('Error', resp.message, 'error');
        }
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        Swal.fire('Error', 'No se pudieron cargar los clientes.', 'error');
      },
    });
  }

  abrirEdicion(cliente: Cliente) {
    this.clienteSeleccionado = { ...cliente, contrasenaHashCliente: '' };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  abrirNuevo() {
    this.clienteSeleccionado = null;
    this.mostrarModal = true;
  }

  darDeBaja(cliente: Cliente) {
    this.clienteService
      .modificarParcialCliente(cliente.codigoCliente, {
        estadoCliente: false,
        codigoCliente: cliente.codigoCliente,
      })
      .subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cliente dado de baja', 'success');
          this.listarClientes();
        },
        error: () =>
          Swal.fire('Error', 'No se pudo dar de baja al cliente', 'error'),
      });
  }

  darDeAlta(cliente: Cliente) {
    this.clienteService
      .modificarParcialCliente(cliente.codigoCliente, {
        estadoCliente: true,
        codigoCliente: cliente.codigoCliente,
      })
      .subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cliente dado de alta', 'success');
          this.listarClientes();
        },
        error: () =>
          Swal.fire('Error', 'No se pudo dar de alta al cliente', 'error'),
      });
  }

  eliminarCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: `Se eliminará a ${cliente.nombresCliente}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(cliente.codigoCliente).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Cliente eliminado', 'success');
            this.listarClientes();
          },
          error: () =>
            Swal.fire('Error', 'No se pudo eliminar al cliente', 'error'),
        });
      }
    });
  }

  guardarCliente(dto: CreateClientDTO | UpdateClientDTO) {
    if (this.clienteSeleccionado) {
      // EDITAR
      this.clienteService
        .actualizarCliente(this.clienteSeleccionado.codigoCliente, dto as UpdateClientDTO)
        .subscribe(() => {
          Swal.fire('Éxito', 'Cliente actualizado', 'success');
          this.listarClientes();
          this.cerrarModal();
        });
    } else {
      // CREAR
      this.clienteService.crearCliente(dto as CreateClientDTO).subscribe(() => {
        Swal.fire('Éxito', 'Cliente creado', 'success');
        this.listarClientes();
        this.cerrarModal();
      });
    }
  }
}
