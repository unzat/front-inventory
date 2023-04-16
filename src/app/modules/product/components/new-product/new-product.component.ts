import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewCategoryComponent } from 'src/app/modules/category/components/new-category/new-category.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';

export interface Category{
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public productForm: FormGroup;
  estadoFormulario: string = '';
  textoBoton: string = '';
  categories: Category[]=[];
  selectedFile: any;
  nameImg: string = "";

  constructor(private fb: FormBuilder, 
              private categoryService: CategoryService,
              private productService: ProductService,
              private dialogRef: MatDialogRef<NewProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){

    this.estadoFormulario= 'Agregar';
    this.textoBoton='Guardar';

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });

    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario= 'Actualizar';
    }
  }
  
  ngOnInit(): void {
    this.getCategories();
  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('quantity', data.quantity);
    uploadImageData.append('categoryId', data.category);

    if (this.data != null){
      //update
      this.productService.updateProduct(uploadImageData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        });
    } else {
      //save
      this.productService.saveProduct(uploadImageData)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        });
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((data:any) => {
        this.categories = data.categoryResponse.category;
      }, (error:any) => {
        console.log("Error al consultar categorias en carga de productos", error);
      })
  }

  onFileChanged(event: any){  
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    this.nameImg = event.target.files[0].name; 
  }

  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      quantity: [data.quantity, Validators.required],
      category: [data.category.id, Validators.required],
      picture: [data.picture, Validators.required]
    });
  }

}
