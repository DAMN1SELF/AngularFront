import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login-service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  usuario: any[] = []
  formLogin: FormGroup

  constructor(
    private _loginService: LoginService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = new FormGroup({
      Identificacion: new FormControl(null, [Validators.required]),
      Clave: new FormControl(null, [Validators.required])
    })
  }


  ngOnInit(): void {
    this.initForm()
  }


  initForm() {
    this.formLogin = new FormGroup({
      Identificacion: new FormControl(null, [Validators.required]),
      Clave: new FormControl(null, [Validators.required])
    })
  }



  login() {
    if (this.formLogin.valid) {
      console.log("Acceso", this.formLogin.value)
      this._loginService.ingresar(this.formLogin.value)
        .subscribe({
          next: (res) => {
            console.log("Response: ", res)
            this.route.navigate(['/principal'])
          },
          error: (err: HttpErrorResponse) => {
            this.alertaError("Identificador o Clave incorrecta ")
          }
        });
    }
  }




  alertaError(message: string) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
    this.formLogin.reset();
  }


}
