import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private customerService: CustomerService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar){
  }

  ngOnInit(): void{
    this.getCustomers();
  }

  displayedColums: string[]=['id','name','document','documentType','phone','email','actions'];
  dataSourse = new MatTableDataSource<CustomerElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  processCustomerResponse(resp: any){
    const dataCustomer: CustomerElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCustomer = resp.customerResponse.customer;
      listCustomer.forEach((element: CustomerElement) => {
        dataCustomer.push(element)
      });
      this.dataSourse = new MatTableDataSource<CustomerElement>(dataCustomer);
      this.dataSourse.paginator = this.paginator;
    }
  }

  getCustomers(){
    this.customerService.getCustomers()
      .subscribe( (data:any)=>{
        console.log("respuesta customers: ", data);
        this.processCustomerResponse(data);
      }, (error: any)=>{
        console.log("Error: ",error);
      })
  }

  edit(id: number, name:string, documentType: any, document: string, email:string, phone: string, address: string){
    const dialogRef = this.dialog.open(NewCustomerComponent, {
      width: "500px",
      data: {id: id, name: name, documentType: documentType, document: document, email: email, phone: phone, address: address}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Datos del Cliente Actualizados", "Actualizado");
        this.getCustomers();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al actualizar los datos del cliente", "Error!");
        this.getCustomers();
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "450px",
      data: {id: id, module: "customer"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Cliente Eliminado", "Eliminado");
        this.getCustomers();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al eliminar al cliente", "Error!");
        this.getCustomers();
      }
    });
  }

  buscar(termino: string) {
    if (termino.length != 0) {
      this.customerService.getCustomerById(termino)
        .subscribe((resp:any) => {
          this.processCustomerResponse(resp);
      })
    }else{
      return this.getCustomers();
    }
  }

  openSnackBar(message: string, action: string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCustomerComponent, {
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Cliente Agregado", "Guardado");
        this.getCustomers();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al guardar el cliente", "Error!");
        this.getCustomers();
      }
    });
  }

  exportExcel(){
    this.customerService.exportExcelCustomers()
      .subscribe((data:any) => {
        let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement("a");
        anchor.download = "clientes.xlsx";
        anchor.href = fileUrl;
        anchor.click();
        this.openSnackBar("Archivo exportado correctamente", "Exportado");
      }, (error:any) => {
        this.openSnackBar("No se pudo generar el archivo", "Error");
      })
  }

}

export interface CustomerElement {
  id: number;
  name: string;
  documentType: any;
  document: string;
  address: string;
  email: string;
  phone: string;
}
