import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{
  public categoryForm: FormGroup;
  estadoFormulario: string = '';
  textoBoton: string = '';
  constructor(private fb: FormBuilder, 
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<NewCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.estadoFormulario= 'Agregar';
    this.textoBoton='Guardar';
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
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
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if (data != null) {
      this.categoryService.updateCategorie(data, this.data.id)
      .subscribe( (data:any) => {
        //console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }else{
      this.categoryService.saveCategorie(data)
      .subscribe( (data:any) => {
        //console.log(data);
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
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }
}
