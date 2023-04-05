import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

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
        this.openSnackBar("Algo salio mal al guardar la categoria", "Error");
        this.getCategories();
      }
    });
  }

  openSnackBar(message: string, action: string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
