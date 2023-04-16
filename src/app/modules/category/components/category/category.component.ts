import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService, 
              public dialog: MatDialog,
              private snackBar: MatSnackBar){
  }

  ngOnInit(): void{
    this.getCategories();
  }

  displayedColums: string[]=['id','name','description','actions'];
  dataSourse = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(){
    this.categoryService.getCategories()
      .subscribe( (data:any)=>{
        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);
      }, (error: any)=>{
        console.log("Error: ",error);
      })
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element)
      });
      this.dataSourse = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSourse.paginator = this.paginator;
    }
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Categoría Agregada", "Guardado");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al guardar la categoria", "Error!");
        this.getCategories();
      }
    });
  }

  edit(id: number, name:string, description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: "450px",
      data: {id: id, name: name, description: description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Categoría Actualizada", "Actualizado");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al actualizar la categoria", "Error!");
        this.getCategories();
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "450px",
      data: {id: id, module: "category"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Categoría Eliminada", "Eliminado");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al eliminar la categoria", "Error!");
        this.getCategories();
      }
    });
  }

  buscar(termino: string) {
    if (termino.length != 0) {
      this.categoryService.getCategorieById(termino)
        .subscribe((resp:any) => {
          this.processCategoriesResponse(resp);
      })
    }else{
      return this.getCategories();
    }
  }

  openSnackBar(message: string, action: string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
