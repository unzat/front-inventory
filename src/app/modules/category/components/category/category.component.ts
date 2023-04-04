import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService){
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
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
