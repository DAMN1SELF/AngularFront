import { ClienteService } from './../../../../service/cliente-service';
import {
  CreateAccountDTO,
  UpdateAccountDTO,
} from './../../../../models/cuenta';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../../models/cliente';

@Component({
  selector: 'app-cuenta-modal',
  standalone: false,
  templateUrl: './cuenta-modal.html',
  styleUrl: './cuenta-modal.css',
})
export class CuentaModal implements OnInit {
  @Input() cuentaEditar: any = null;
  @Output() guardar = new EventEmitter<CreateAccountDTO | UpdateAccountDTO>();
  @Output() cerrar = new EventEmitter<void>();

  form!: FormGroup;
  titulo = 'Nueva Cuenta';
  clientes: Cliente[] = [];

  tipos = [
    { value: 1, label: 'Ahorros' },
    { value: 2, label: 'Corriente' },
  ];

  constructor(
    private fb: FormBuilder,
    private ClienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cliente_Id: [null, Validators.required],
      tipo_Cuenta: [null, Validators.required],
      saldo_Inicial: [0, [Validators.required, Validators.min(0)]],
    });

    this.cargarClientes();

    if (this.cuentaEditar) {
      this.form.patchValue({
        cliente_Id: this.cuentaEditar.cliente_Id,
        tipo_Cuenta: this.cuentaEditar.tipo_Cuenta,
        saldo_Inicial: this.cuentaEditar.saldo_Inicial ?? 0,
      });
    }
  }
  cargarClientes(): void {
    this.ClienteService.obtenerClientes().subscribe({
      next: (resp) => {
        // 👇 Ajusta según tu modelo
        this.clientes = resp.data;
      },
      error: (err) => {
        console.error('Error cargando clientes:', err);
      },
    });
  }
  onGuardar() {
    if (this.form.valid) {
      this.guardar.emit(this.form.value);
    }
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
