import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import { ModalAgregarClienteComponent } from '../modal-agregar-cliente/modal-agregar-cliente.component';
import * as XLSX from 'xlsx'; 
declare var $;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  nombreKey: string;
  public modalRef: BsModalRef;
  public personList = new Array();
  fileName= 'ExcelSheet.csv';

  constructor(
    private modalServiceBS: BsModalService,
    private dataService: DataService
  ) { }

  /* Metodo para

  (function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
  */

  ngOnInit(): void {
    this.cargarListado();
  }

  /* Metodo para obtener listado de clientes
  * @param 
  */
  cargarListado() {
    this.personList = [];
    const url = 'http://localhost:8080/client';
    this.dataService.get(url, false)
      .subscribe({
        next: (data: any) => {

          data.forEach(item => {
            let client = {
              id: item.idClient,
              username: item.userName,
              bussines: item.name,
              email: item.email,
              phone: item.phone,
              date: item.startDate
            }
            this.personList.push(client);
          });

        }, error: (error) => {

        }
      });
  }
  /* Metodo para agregar clientes
  * @param 
  */
  public exportar() { 
    {
      /* table id is passed over here */   
      let element = document.getElementById('excel-table'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
     
   }
  }

  /* Metodo para realizar busqueda de clientes 
  * @param 
   */
  public actualizarBusqueda() {
     const resultado = this.personList.find( person => person.username === this.nombreKey);
     
   }


  editField: string;

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  edit(id: any) {
  }

  agregarCliente() {

    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalServiceBS.show(ModalAgregarClienteComponent, config);
    this.modalRef.content.onClose.subscribe((result) => {
      
      this.personList = [];
      this.cargarListado();
    });
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
