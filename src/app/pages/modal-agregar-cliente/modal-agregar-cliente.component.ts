import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-agregar-cliente',
  templateUrl: './modal-agregar-cliente.component.html',
  styleUrls: ['./modal-agregar-cliente.component.scss']
})
export class ModalAgregarClienteComponent implements OnInit {

  public dataMensajes: any;
  public onClose: Subject<any>;
  public userName: String;
  public name: String;
  public email: String;
  public phone: String;
  public startDate: String;
  public endDate: String;

  constructor(
    protected bsModalRef: BsModalRef,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  public cancelar(): void {
    const respuesta = {
      action: this.dataMensajes.btnCancelar
    };
    this.onClose.next(respuesta);
    this.closeModal();
  }

  public continuar(event: Event): void {

    const url = 'http://localhost:8080/client';
    const body = {
      idClient: Math.random()*100,
      userName: this.userName,
      name: this.name,
      email: this.email,
      phone: this.phone,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.dataService.post(url, body,false)
      .subscribe({
        next: (data: any) => {

        }, error: (error) => {
          
        }
      });
    const respuesta = {
      action: 'OK'
    };
    this.onClose.next(respuesta);
    this.closeModal();
  }

}
