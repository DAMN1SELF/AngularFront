import { LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Principal } from './paginas/principal/principal';
import { Menu } from './reusables/menu/menu';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Login } from './auth/login/login';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import localeEs from '@angular/common/locales/es';
import { CompraRegistro } from './compras/compra-registro/compra-registro';
import { BuscarProductoModal } from './compras/buscar-producto-modal/buscar-producto-modal';
import { VentasRegistro } from './compras/ventas-registro/ventas-registro';
import { Kardex } from './compras/kardex/kardex';
import { KardexDetalle } from './compras/kardex-detalle/kardex-detalle';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { ModuloClientes } from './banco/modulo-clientes/modulo-clientes';


registerLocaleData(localeEs);
@NgModule({
  declarations: [
    App,
    Principal,
    Menu,
    Login,
    CompraRegistro,
    BuscarProductoModal,
    VentasRegistro,
    Kardex,
    KardexDetalle,
    Sidebar,
    Header,
    ModuloClientes,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
        {
            path: 'principal', component: Principal, canActivate: [AuthGuard],
            children: [
                { path: 'CLIENTES', component: ModuloClientes },
                { path: 'CUENTAS', component: VentasRegistro },
                { path: 'MOVIMIENTOS', component: Kardex },
                { path: 'REPORTES', component: Kardex },
            ]
        },
        { path: 'login', component: Login },
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: '**', redirectTo: '/login' }
    ]),

],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],



  bootstrap: [App]
})

export class AppModule { }
