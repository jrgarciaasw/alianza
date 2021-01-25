import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAgregarClienteComponent } from './pages/modal-agregar-cliente/modal-agregar-cliente.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    MenuComponent,
    HomeComponent,
    ModalAgregarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    ModalAgregarClienteComponent
  ],
  providers: [
    BsModalRef,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
