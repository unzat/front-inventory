import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewCategoryComponent } from 'src/app/modules/category/components/new-category/new-category.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{

  public customerForm: FormGroup;
  estadoFormulario: string = '';
  textoBoton: string = '';

  constructor(private fb: FormBuilder, 
              private customerService: CustomerService,
              private dialogRef: MatDialogRef<NewCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.estadoFormulario= 'Agregar';
    this.textoBoton='Guardar';
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      documentType: [null, Validators.required],
      document: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario = 'Actualizar';
      this.textoBoton='Actualizar';
    }
  }

  ngOnInit(): void {
    
  }

  onSave(){
    let data = {
      name: this.customerForm.get('name')?.value,
      documentType: this.customerForm.get('documentType')?.value,
      document: this.customerForm.get('document')?.value,
      email: this.customerForm.get('email')?.value,
      phone: this.customerForm.get('phone')?.value,
      address: this.customerForm.get('address')?.value,
    }
    console.log(data);

    if (this.data != null) {
      this.customerService.updateCustomer(data, this.data.id)
      .subscribe( (data:any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }else{
      this.customerService.saveCustomer(data)
      .subscribe( (data:any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.customerForm = this.fb.group({
      name: [data.name, Validators.required],
      documentType: [data.documentType, Validators.required],
      document: [data.document, Validators.required],
      email: [data.email, Validators.required],
      phone: [data.phone, Validators.required],
      address: [data.address, Validators.required]
    });
  }
}
