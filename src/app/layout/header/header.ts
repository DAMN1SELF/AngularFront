import { Router } from '@angular/router';
import { LoginService } from './../../service/login-service';
import { Component ,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

    constructor(private loginService: LoginService, private router: Router) {}

  @Output() toggle = new EventEmitter<void>();
  toggleSidebar() { this.toggle.emit(); }


  Salir() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
