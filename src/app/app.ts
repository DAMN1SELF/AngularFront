import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html', template: '<router-outlet></router-outlet>',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
   constructor(private router: Router) {
    this.forceRedirectToLogin();
  }

  private forceRedirectToLogin() {
    if (this.router.url === '/' || this.router.url === '') {
      this.router.navigate(['/login']);
    }
  }
}
