import { Component } from '@angular/core';
import { LoginService } from '../../service/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  constructor(private loginService: LoginService, private router: Router) {}

    salir() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
