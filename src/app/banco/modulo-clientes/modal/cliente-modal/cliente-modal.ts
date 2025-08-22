
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, CreateClientDTO, UpdateClientDTO } from '../../../../models/cliente';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.html',
  standalone: false,
  styleUrls: ['./cliente-modal.css']
})
export class ClienteModal implements OnInit {
  @Input() clienteEditar: Cliente | null = null;
  @Output() guardar = new EventEmitter<CreateClientDTO | UpdateClientDTO>();
  @Output() cerrar = new EventEmitter<void>();

  form!: FormGroup;
  titulo = 'Nuevo Cliente';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigoCliente: [null],
      nombresCliente: ['', Validators.required],
      generoCliente: ['', Validators.required],
      edadCliente: [0, [Validators.required, Validators.min(0), Validators.max(120)]],
      identificacionCliente: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      direccionCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      contrasenaHashCliente: ['', this.clienteEditar ? [] : Validators.required]
    });

    if (this.clienteEditar) {
      this.titulo = 'Editar Cliente';
      this.form.patchValue(this.clienteEditar);
    }
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
