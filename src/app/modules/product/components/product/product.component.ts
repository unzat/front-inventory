import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  displayedColums: string[]=['id','name','price','quantity','category','picture','actions'];
  dataSourse = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts()
      .subscribe((data:any) => {
        console.log("Respuesta de productos: ", data);
        this.processProductResponse(data);
      }, (error: any) => {
        console.log("Error productos: ", error);
      })
  }

  processProductResponse(resp: any) {
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listProduct = resp.productResponse.product;
      listProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dataProduct.push(element)
      });
      this.dataSourse = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSourse.paginator = this.paginator;
    }
  }
}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: any;
  picture: any;
}
